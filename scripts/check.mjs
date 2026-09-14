// Pre-deploy checks for the Transfer Copilot POC.
// No dependencies: run with `node scripts/check.mjs`.
// Catches the failure modes that actually bit this repo — dead data, broken
// asset paths, and hardcoded sample figures shipped inside dist/index.html.

import { readFileSync, existsSync, readdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const failures = [];
const fail = (msg) => failures.push(msg);
const read = (p) => readFileSync(join(root, p), "utf8");

const scripts = ["data.js", "schools.js", "workflow.js", "app.js"];

// 1. Syntax.
for (const file of scripts) {
  try {
    execFileSync(process.execPath, ["--check", join(dist, file)], { stdio: "pipe" });
  } catch (error) {
    fail(`syntax error in dist/${file}\n${error.stderr?.toString().trim()}`);
  }
}

// 2. Load the data layer in a sandbox so the checks below run against real values.
const sandbox = { document: { addEventListener() {} }, window: {} };
vm.createContext(sandbox);
let loaded = {};
try {
  const source = ["data.js", "schools.js"].map((f) => read(`dist/${f}`)).join("\n");
  loaded = vm.runInContext(
    `${source}\n;({COURSES, ASSIST_AGREEMENTS, SCHOOL_ASSETS})`,
    sandbox,
    { filename: "data+schools" }
  );
} catch (error) {
  fail(`could not evaluate the data layer: ${error.message}`);
}
// workflow.js touches the DOM at load; pull the campus list out by regex instead.
const campusSource = read("dist/workflow.js").match(/const CAMPUSES=(\[.*?\]);/s);
const CAMPUSES = campusSource ? JSON.parse(campusSource[1]) : [];
if (!CAMPUSES.length) fail("could not read CAMPUSES from dist/workflow.js");

const { COURSES = [], ASSIST_AGREEMENTS = {}, SCHOOL_ASSETS = {} } = loaded;
if (!COURSES.length) fail("COURSES is empty — dist/data.js did not load");
if (!Object.keys(SCHOOL_ASSETS).length) fail("SCHOOL_ASSETS is empty — dist/schools.js did not load");
const courseIds = new Set(COURSES.map((c) => c.id));
const campusIds = new Set(CAMPUSES.map((c) => c.id));

// 3. Every ASSIST agreement points at campuses and courses that exist.
for (const [campusId, agreement] of Object.entries(ASSIST_AGREEMENTS)) {
  if (!campusIds.has(campusId)) fail(`ASSIST_AGREEMENTS has unknown campus "${campusId}"`);
  for (const id of agreement.reviewed ?? []) {
    if (!courseIds.has(id)) fail(`${campusId} agreement reviews unknown course "${id}"`);
  }
  for (const id of Object.keys(agreement.matches ?? {})) {
    if (!courseIds.has(id)) fail(`${campusId} agreement matches unknown course "${id}"`);
    if (!(agreement.reviewed ?? []).includes(id)) {
      fail(`${campusId} matches "${id}" but does not list it as reviewed`);
    }
  }
  for (const field of ["program", "year", "published", "source"]) {
    if (!agreement[field]) fail(`${campusId} agreement is missing "${field}"`);
  }
}

// 4. Course records carry the provenance the UI promises.
for (const course of COURSES) {
  for (const field of ["code", "title", "units", "source", "sourceDate", "catalogYear"]) {
    if (course[field] === undefined || course[field] === "") {
      fail(`course ${course.id} is missing "${field}"`);
    }
  }
  if (!Array.isArray(course.targets)) fail(`course ${course.id} has no targets array`);
  for (const id of course.targets ?? []) {
    if (!campusIds.has(id)) fail(`course ${course.id} targets unknown campus "${id}"`);
  }
}

// 5. Every campus resolves a school mark, and every referenced file exists.
for (const campus of CAMPUSES) {
  if (!SCHOOL_ASSETS[campus.id]) fail(`no SCHOOL_ASSETS entry for campus "${campus.id}"`);
}
const referenced = new Set();
for (const [id, asset] of Object.entries(SCHOOL_ASSETS)) {
  if (!asset.short) fail(`SCHOOL_ASSETS.${id} has no monogram fallback`);
  if (!asset.path) continue;
  referenced.add(asset.path.replace("./", ""));
  if (!existsSync(join(dist, asset.path.replace("./", "")))) {
    fail(`SCHOOL_ASSETS.${id} points at missing file ${asset.path}`);
  }
}
for (const file of readdirSync(join(dist, "assets/schools"))) {
  if (!referenced.has(`assets/schools/${file}`)) fail(`unused asset assets/schools/${file}`);
}

// 6. Shipped markup must not contain invented sample figures. JS overwrites these
// containers on render, but the numbers are still fabricated data in a public artifact.
const html = read("dist/index.html");
const fabricated = [
  [/class="target-row"/, "hardcoded target rows in #target-list"],
  [/\d+\s*<span>\/\s*\d+<\/span>/, "hardcoded progress fraction (e.g. 6 / 10)"],
  [/id="plan-units">(?!0<)/, "non-zero placeholder in #plan-units"],
  [/id="plan-benefit">(?!0<)/, "non-zero placeholder in #plan-benefit"],
  [/class="tiny-tag">\d+ targets/, "hardcoded target count"],
  [/San Diego Mesa College<\/small>/, "hardcoded home college in the header"],
];
for (const [pattern, label] of fabricated) {
  if (pattern.test(html)) fail(`dist/index.html contains ${label}`);
}

if (failures.length) {
  console.error(`\n${failures.length} check(s) failed:\n`);
  for (const message of failures) console.error(`  - ${message}`);
  process.exit(1);
}
console.log(
  `All checks passed: ${scripts.length} scripts, ${COURSES.length} courses, ` +
    `${CAMPUSES.length} campuses, ${Object.keys(ASSIST_AGREEMENTS).length} ASSIST agreements.`
);
