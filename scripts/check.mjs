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
    `${source}\n;({COURSES, ALL_COURSES, MIRAMAR_UCB_CS_COURSES, MIRAMAR_UCB_CS_AGREEMENT, ASSIST_AGREEMENTS, SCHOOL_ASSETS})`,
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

const { COURSES = [], ALL_COURSES = [], MIRAMAR_UCB_CS_COURSES = [], MIRAMAR_UCB_CS_AGREEMENT = {}, ASSIST_AGREEMENTS = {}, SCHOOL_ASSETS = {} } = loaded;
if (!COURSES.length) fail("COURSES is empty — dist/data.js did not load");
if (ALL_COURSES.length !== COURSES.length + MIRAMAR_UCB_CS_COURSES.length) fail("ALL_COURSES does not include both sample datasets");
if (!Object.keys(SCHOOL_ASSETS).length) fail("SCHOOL_ASSETS is empty — dist/schools.js did not load");
const courseIds = new Set(ALL_COURSES.map((c) => c.id));
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
for (const course of ALL_COURSES) {
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

// 4b. The source-driven Miramar agreement must preserve its decision logic.
if (!MIRAMAR_UCB_CS_AGREEMENT.source) fail("Miramar agreement has no official source");
// Shape: sections → lettered groups (rule "all" | "one") → receiving-course items → AND bundle of courseIds.
const agreementItems = (MIRAMAR_UCB_CS_AGREEMENT.sections ?? []).flatMap((section) => {
  if (!section.title || !section.instruction) fail(`Miramar section ${section.id} is missing its ASSIST title or instruction`);
  return (section.groups ?? []).flatMap((group) => {
    if (!["all", "one"].includes(group.rule)) fail(`Miramar group ${group.id} has unknown rule "${group.rule}"`);
    if (group.rule === "one" && !group.instruction) fail(`Miramar group ${group.id} needs its ASSIST instruction text`);
    return group.items ?? [];
  });
});
if (!agreementItems.length) fail("Miramar agreement has no requirement items");
for (const item of agreementItems) {
  if (!item.receivingCode || !item.receivingTitle) fail(`Miramar item ${item.id} is missing its receiving course`);
  if (!Array.isArray(item.courseIds)) { fail(`Miramar item ${item.id} has no courseIds array`); continue; }
  if (!item.courseIds.length && !item.noArticulation && !item.atUniversity) fail(`Miramar item ${item.id} has no courses and no no-articulation text`);
  for (const id of [...item.courseIds, ...(item.acceptedCourseIds ?? [])]) if (!courseIds.has(id)) fail(`Miramar item ${item.id} references unknown course "${id}"`);
  for (const id of item.acceptedCourseIds ?? []) if (!item.courseIds.includes(id)) fail(`Miramar item ${item.id} accepts "${id}" outside its course bundle`);
  if (item.acceptedCourseIds && !item.note) fail(`Miramar item ${item.id} narrows its bundle without quoting the agreement note`);
}
for (const course of MIRAMAR_UCB_CS_COURSES) {
  if (!agreementItems.some((item) => item.courseIds?.includes(course.id))) fail(`Miramar course ${course.id} is not placed in any agreement item`);
}
const workflow = read("dist/workflow.js");
for (const label of ["Required · Group A", "Required · Group B", "Highly recommended", "Review", "MIRAMAR COURSE", "BERKELEY EQUIVALENT"]) {
  if (!workflow.includes(label)) fail(`guided agreement workflow is missing "${label}"`);
}
if (!workflow.includes("data-agreement-next") || !workflow.includes("data-agreement-back")) fail("guided agreement workflow has no next/back controls");

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
  `All checks passed: ${scripts.length} scripts, ${ALL_COURSES.length} courses, ` +
    `${CAMPUSES.length} campuses, ${Object.keys(ASSIST_AGREEMENTS).length} ASSIST agreements.`
);
