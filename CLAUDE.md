# Transfer Copilot — San Diego POC

A browser-only proof of concept for California community-college transfer planning.
Deliberately narrow. Read `README.md` for scope and `docs/export-step-plan.md` for the
next planned feature.

Product and business reference: `docs/foundational-brief.md`. It is long — read the
relevant section when a decision touches scope, data rights, evidence labeling or
monetization, rather than loading all of it.

## Commands

```
node scripts/check.mjs     # required before every commit — syntax, asset paths, data integrity
node preview-server.mjs    # local static preview
```

CI runs `scripts/check.mjs` before the Pages deploy. A push that fails it does not ship.

## Architecture

No build step, no framework, no package.json. `dist/` is the deployed site, served as-is
by GitHub Pages. Scripts load in order via `defer` and share one global scope:

- `data.js` — course records, `SOURCES`, `ASSIST_AGREEMENTS` (frozen agreement snapshots)
- `schools.js` — `schoolBadge()`, institution marks with monogram fallbacks
- `workflow.js` — `PLAN` state, `COLLEGES`/`CAMPUSES`/`MAJORS`, the 4-step wizard
- `schedule.js` — dated SDCCD class search snapshot (`SDCCD_SCHEDULE`) for Find your next class
- `app.js` — dashboard render, evidence dialogs, scenarios, sharing, WebMCP tools

State lives in `PLAN` in tab memory only. No backend, no accounts, no localStorage, no
persistence across refresh. This is a privacy commitment stated in the UI, not an
oversight — do not add storage without being asked.

## Non-negotiables

**Never scrape ASSIST.** Agreement data is hand-entered from source-linked snapshots. There is
no ASSIST data access and no timeline: ASSIST's September 2026 reply gives system offices and
institutions priority access (estimated Fall 2026), while license, fees, terms and capacity for
other requestors are still undetermined. No scheduled fetchers, no background network calls, no
runtime third-party requests — school marks are bundled locally for this reason.

**Three-way evidence labeling.** `relationship(course, target)` in `app.js` returns
`verified` (published source), `demo` (illustrative), or `unknown` (no major-specific
evidence). This distinction is the product's core integrity claim. Never collapse the
three, never let `unknown` render as satisfied or green, never treat absence of data as
absence of a requirement.

**No completion or admission claims.** General catalog transferability is not major
articulation. Progress is not eligibility and never admission odds. Course statuses are
self-reported; registered and planned work never counts toward completed totals. Prerequisites are
unknown and must say so. Sections and seats come only from the dated SDCCD snapshot in
`schedule.js`; always show its term and as-of date, link to the official search, and never
present it as live. Keep instructor names and emails out of it.

**No invented figures in shipped markup.** `dist/index.html` once carried hardcoded
sample numbers that `render()` overwrote. `scripts/check.mjs` now fails on them. Leave
containers empty or zeroed and let JS populate them.

**Every academic claim carries a source.** Course records need `source`, `sourceDate` and
`catalogYear`; agreements need `program`, `year`, `published` and `source`. The check
script enforces this.

## Conventions

- Compact single-line JS, no semicolon-free style, `"use strict"` at the top of each file.
- Templates are string concatenation. Run any user-supplied value through `escapeHTML()` —
  the intended major is free text and reaches several templates.
- Adding a campus means: `CAMPUSES` in `workflow.js` (with `city`, shown on its selection
  tile) + a `SCHOOL_ASSETS` entry in `schools.js` + a bundled mark under
  `dist/assets/schools/`. The check script fails if these drift apart, and also flags
  unused assets.
- Step 1 and Step 2 pickers are `.school-tile` cards (logo, name, city). The native
  radio/checkbox stays inside each tile, visually hidden, for keyboard use and validation.
- Highlight color is the light-blue `--accent` token family. Green is reserved for
  meaning: Completed status and source-linked evidence. Don't reintroduce lime.
- School marks display at 38px or smaller. New bundled files should be 160px max
  dimension; six older marks (Channel Islands, Chico, CSUSM, Monterey Bay, Northridge,
  SDSU) are still 180–504px and could be downscaled when an image tool is available.
- Major matching is `isCS()` in `workflow.js`, normalized so "CS" and "Computer Science,
  B.S." both resolve. It is an exact alias match on purpose: "Computer Science and
  Engineering" and similar combined majors are different programs and must stay `unknown`.
  Adding a second major means generalizing this, not adding a branch.

## Current state

The demo focuses on Miramar → Computer Science. Complete 2025–26 agreements exist for UC
Berkeley (CS B.A.), UCLA (CS B.S.) and Cal Poly San Luis Obispo (CS B.S.) in
`MIRAMAR_CS_AGREEMENTS` (`data.js`), with the 31 Miramar sending courses in
`MIRAMAR_CS_COURSES`. They were read on ASSIST and entered by hand; if licensed ASSIST access is
ever granted, ingestion replaces these snapshots — do not add page reads or scrapers. The Mesa
fallback (seven catalog courses, partial Berkeley/UCLA/Pomona snapshots, two UCSD department
equivalencies) remains for other colleges. Everything else is illustrative or unknown.

Choosing Miramar + Computer Science and any of those schools switches the coursework step to a
walkthrough with one stage per agreement group (`agreementStages()` / `agreementSectionHTML()`
in `workflow.js`). The data mirrors ASSIST: section (`counts` = feeds Transfer Completion) →
group (`rule: "all" | "one" | "units"` with `minUnits`, ASSIST instruction text verbatim) →
receiving item → Miramar courses. `options` are OR alternatives (each an AND bundle);
`acceptedCourseIds` narrows a bundle where an agreement note says so; `alternateListing` items
repeat content listed elsewhere and are never counted. Shared helpers (`itemLevel`,
`groupLevels`, `agreementDecisionLevels`) live in `data.js`. A status set on a Miramar course
updates every school that uses it; a "choose one" pick only clears other options whose courses
no other requirement or school uses. `scripts/check.mjs` validates this structure.

Where Miramar has no articulated course for a Berkeley item, Step 4 shows `NEARBY_UCB_CS`
(`data.js`): the same 2025–26 agreement read on ASSIST for City, Mesa, Grossmont, Cuyamaca,
Southwestern, Palomar and MiraCosta. Options are informational — never selectable or counted
toward progress — and a course set must be completed at that one college. Items with no option
anywhere say so and list the colleges checked.

The dashboard's Your Destinations panel shows a Transfer Completion ring inside each destination's
clickable card (the whole card opens that school's applicability dialog)
(`requirementCoverage()` / `coverageRingHTML()` in `app.js`): the share of that agreement's
required decisions that are **completed**. Registered and planned decisions are drawn lighter in
the ring and labeled "not counted"; only completed work moves the percentage. It is only computed from a complete source-linked agreement (today Miramar → UC
Berkeley, UCLA and Cal Poly SLO CS, using each agreement's counted sections, including
requirements Miramar cannot articulate); every other destination shows "not calculated". Never derive a percentage from
illustrative or unverified matches, and never label registered or planned work as finished.

The "Your next best move" card (`nextMove()` in `app.js`) sits after the schools as a light-blue
box. Transfer Efficiency is a 0–100 course-level planning score. Destination reach supplies 70%
of the score. The other 30% measures articulation value per unit: required decisions earn 3
evidence points, other source-linked destination relationships earn 2, and illustrative
relationships earn 1. The interface labels 85–100 Excellent, 70–84 Strong, 50–69 Moderate and
0–49 Limited, and always says this is not an admission probability. Each destination row shows
the Transfer Completion change and the agreement note with a source link. It suggests one course
that isn't completed yet (not added, planned or registered, tagged accordingly) and ranks by this
score, destination reach and required-decision gain. A course
that adds nothing (e.g. MATH 255 when CS accepts MATH 254 alone) is never recommended.

Course statuses in the wizard are set with course tiles (`wizardCourseRow()` in
`workflow.js`): selecting a tile slides a Completed / Registered / Planning panel in from the
right, and the tile is color-coded by status with a text label. The dashboard's Next Semester
section reuses the same tiles for planning and not-added courses that a selected agreement
still needs (`neededCourseIds()`: counted requirements not yet completed; a "choose one" group
with a planned or registered pick only needs that pick), each mapped to every selected school
with `courseMapRowHTML()`. There are no scenario presets. Find your next class lists every
not-completed course. Its `SDCCD_SCHEDULE` sections are collapsed behind a `+` disclosure by
default; expanding shows up to three sections (home college first) and a link to the rest in the
SDCCD class search. Refreshing that snapshot
is a manual read of the public search page for the 31 course codes.

Review and export is a separate workflow launched from the dashboard's `Review & export` action;
it is not a fifth onboarding step. It uses one versioned in-browser snapshot for working Markdown,
DOCX and XLSX downloads plus a print/save-PDF report. No export is sent to a server. Playwright smoke tests cover
the Miramar → Berkeley/UCLA flow on desktop and the Coursework layout on mobile.
