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

const scripts = ["data.js", "schools.js", "workflow.js", "schedule.js", "app.js", "export.js"];

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
  const source = ["data.js", "schools.js", "schedule.js"].map((f) => read(`dist/${f}`)).join("\n");
  loaded = vm.runInContext(
    `${source}\n;({COURSES, ALL_COURSES, MIRAMAR_CS_COURSES, MIRAMAR_CS_AGREEMENTS, NEARBY_UCB_CS, ASSIST_AGREEMENTS, SCHOOL_ASSETS, SDCCD_SCHEDULE})`,
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
for (const campus of CAMPUSES) if (!campus.city) fail(`campus "${campus.id}" has no city for its selection tile`);

const { COURSES = [], ALL_COURSES = [], MIRAMAR_CS_COURSES = [], MIRAMAR_CS_AGREEMENTS = {}, NEARBY_UCB_CS = {}, ASSIST_AGREEMENTS = {}, SCHOOL_ASSETS = {}, SDCCD_SCHEDULE = {} } = loaded;
if (!COURSES.length) fail("COURSES is empty — dist/data.js did not load");
if (ALL_COURSES.length !== COURSES.length + MIRAMAR_CS_COURSES.length) fail("ALL_COURSES does not include both sample datasets");
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

// 4b. Source-driven Miramar agreements must preserve their decision logic.
const agreementList = Object.values(MIRAMAR_CS_AGREEMENTS);
if (!agreementList.length) fail("MIRAMAR_CS_AGREEMENTS is empty");
const allAgreementItems = [];
for (const agreement of agreementList) {
  for (const field of ["id", "targetId", "receiving", "shortName", "program", "year", "source", "efficiencyLabel"]) if (!agreement[field]) fail("Miramar agreement " + agreement.id + " is missing " + field);
  if (!campusIds.has(agreement.targetId)) fail("Miramar agreement " + agreement.id + " targets unknown campus " + agreement.targetId);
  if (!(agreement.sections ?? []).some((s) => s.counts)) fail("Miramar agreement " + agreement.id + " has no counted section");
  const itemIds = new Set();
  for (const section of agreement.sections ?? []) {
    if (!section.title) fail(agreement.id + " section " + section.id + " has no title");
    for (const group of section.groups ?? []) {
      if (!["all", "one", "units"].includes(group.rule)) fail(agreement.id + " group " + group.id + " has unknown rule " + group.rule);
      if (group.rule !== "all" && !group.instruction) fail(agreement.id + " group " + group.id + " needs its ASSIST instruction text");
      if (group.rule === "units" && !(group.minUnits > 0)) fail(agreement.id + " group " + group.id + " needs minUnits");
      for (const item of group.items ?? []) {
        if (itemIds.has(item.id)) fail(agreement.id + " repeats item id " + item.id);
        itemIds.add(item.id);
        allAgreementItems.push(item);
        if (!item.receivingCode || !item.receivingTitle) fail(agreement.id + " item " + item.id + " is missing its receiving course");
        if (!Array.isArray(item.courseIds)) { fail(agreement.id + " item " + item.id + " has no courseIds array"); continue; }
        if (!item.courseIds.length && !item.noArticulation && !item.atUniversity) fail(agreement.id + " item " + item.id + " has no courses and no no-articulation text");
        for (const id of [...(item.options ?? []).flat(), ...item.courseIds, ...(item.acceptedCourseIds ?? [])]) if (!courseIds.has(id)) fail(agreement.id + " item " + item.id + " references unknown course " + id);
        if (item.options && item.options.flat().some((id) => !item.courseIds.includes(id))) fail(agreement.id + " item " + item.id + " options are missing from courseIds");
        for (const id of item.acceptedCourseIds ?? []) if (!item.courseIds.includes(id)) fail(agreement.id + " item " + item.id + " accepts " + id + " outside its course bundle");
        if (item.acceptedCourseIds && !item.note) fail(agreement.id + " item " + item.id + " narrows its bundle without quoting the agreement note");
      }
    }
  }
}
for (const course of MIRAMAR_CS_COURSES) {
  if (!allAgreementItems.some((item) => item.courseIds?.includes(course.id))) fail("Miramar course " + course.id + " is not placed in any agreement item");
}
// 4c. Options at other colleges must point at checked, source-linked agreements and only fill gaps in their agreement.
const nearbyAgreement = MIRAMAR_CS_AGREEMENTS[NEARBY_UCB_CS.targetId];
if (!nearbyAgreement) fail("NEARBY_UCB_CS.targetId does not match a Miramar agreement");
const agreementItems = nearbyAgreement ? nearbyAgreement.sections.flatMap((s) => s.groups.flatMap((g) => g.items)) : [];
if (!NEARBY_UCB_CS.year || !NEARBY_UCB_CS.retrieved) fail("NEARBY_UCB_CS needs year and retrieved date");
const nearbyIds = new Set((NEARBY_UCB_CS.checked ?? []).map((c) => c.id));
for (const c of NEARBY_UCB_CS.checked ?? []) {
  for (const field of ["name", "city", "source"]) if (!c[field]) fail("nearby college " + c.id + " is missing " + field);
  if (!SCHOOL_ASSETS[c.id]) fail("nearby college " + c.id + " has no SCHOOL_ASSETS monogram");
}
for (const [reqId, options] of Object.entries(NEARBY_UCB_CS.options ?? {})) {
  const item = agreementItems.find((i) => i.id === reqId);
  if (!item) fail("nearby options reference unknown requirement " + reqId);
  else if (item.courseIds.length || item.atUniversity) fail("nearby options for " + reqId + ", which is not a no-articulation item");
  for (const option of options) {
    if (!nearbyIds.has(option.college)) fail("nearby option for " + reqId + " uses unchecked college " + option.college);
    if (!option.courses?.length || option.courses.some((c) => !c.code || !c.title || !c.units)) fail("nearby option for " + reqId + " at " + option.college + " has incomplete courses");
  }
}
const workflow = read("dist/workflow.js");
for (const label of ["function agreementStages(", "section.groups.map", "function agreementSectionHTML(", "MIRAMAR COURSE", " EQUIVALENT", "function reviewFrame(", "STEP '+String(PLAN.step).padStart(2,\"0\")+' / 04"]) {
  if (!workflow.includes(label)) fail("guided agreement workflow is missing " + label);
}
for (const label of ["major-tile", "major-mark", "aria-pressed", "syncMajorTiles"]) if (!workflow.includes(label)) fail("major selection tiles are missing " + label);
if (!workflow.includes("data-agreement-next") || !workflow.includes("data-agreement-back")) fail("guided agreement workflow has no next/back controls");
const app = read("dist/app.js");
for (const label of ["Transfer Completion", "efficiencyScore", "coverage*.7", "unitValue*.3", "function efficiencyRating", "data-action=\"why\"", "details class=\"schedule\""]) if (!app.includes(label)) fail("decision scoring is missing " + label);
if (workflow.includes("workflow-review") || workflow.includes("workflow-progress") || workflow.includes("workflow-steps") || workflow.includes("PLAN.step=5")) fail("the setup must remain a focused four-step flow without a progress rail or embedded export step");
const exportSource = read("dist/export.js");
for (const label of ["buildExportSnapshot", "exportMarkdown", "exportDocx", "exportXlsx", "printPlan", "data-export-format"]) if (!exportSource.includes(label)) fail("review/export is missing " + label);

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

// 5b. The SDCCD schedule snapshot is dated, sourced and covers every Miramar sending course.
if (!SDCCD_SCHEDULE.term || !/^\d{4}-\d{2}-\d{2}$/.test(SDCCD_SCHEDULE.retrieved ?? "") || !/^https:\/\/www\.sdccd\.edu\//.test(SDCCD_SCHEDULE.source ?? "")) fail("SDCCD_SCHEDULE needs term, retrieved (YYYY-MM-DD) and an sdccd.edu source");
const scheduleCourses = SDCCD_SCHEDULE.courses ?? {};
const scheduleColleges = Object.keys(SDCCD_SCHEDULE.colleges ?? {});
for (const c of MIRAMAR_CS_COURSES) if (!scheduleCourses[c.code]) fail(`SDCCD_SCHEDULE has no entry for ${c.code}`);
for (const [code, entry] of Object.entries(scheduleCourses)) {
  const byCollege = entry.byCollege ?? {};
  const sum = Object.values(byCollege).reduce((a, b) => a + b, 0);
  if (sum !== entry.total) fail(`SDCCD_SCHEDULE ${code}: byCollege sums to ${sum}, total is ${entry.total}`);
  if (!Array.isArray(entry.sections) || !entry.sections.length || entry.sections.length > entry.total) fail(`SDCCD_SCHEDULE ${code}: sections missing or more than total`);
  if (entry.open > entry.total) fail(`SDCCD_SCHEDULE ${code}: more open sections than total`);
  for (const row of entry.sections ?? []) {
    if (row.length !== 10) fail(`SDCCD_SCHEDULE ${code} #${row[0]}: expected 10 fields (no instructor data)`);
    if (!scheduleColleges.includes(row[1])) fail(`SDCCD_SCHEDULE ${code} #${row[0]}: unknown college "${row[1]}"`);
    if (!["Open", "Full", "Closed"].includes(row[5])) fail(`SDCCD_SCHEDULE ${code} #${row[0]}: unknown status "${row[5]}"`);
    if (![row[0], row[6], row[7], row[8], row[9]].every(Number.isInteger)) fail(`SDCCD_SCHEDULE ${code} #${row[0]}: non-integer seat fields`);
  }
}
for (const k of scheduleColleges) if (!SCHOOL_ASSETS[SDCCD_SCHEDULE.colleges[k].id]) fail(`SDCCD_SCHEDULE college ${k} has no school mark`);

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
