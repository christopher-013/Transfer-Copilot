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
- `app.js` — dashboard render, evidence dialogs, scenarios, sharing, WebMCP tools

State lives in `PLAN` in tab memory only. No backend, no accounts, no localStorage, no
persistence across refresh. This is a privacy commitment stated in the UI, not an
oversight — do not add storage without being asked.

## Non-negotiables

**Never scrape ASSIST.** Agreement data is hand-entered from source-linked snapshots. An
API request is pending approval. No scheduled fetchers, no background network calls, no
runtime third-party requests — school marks are bundled locally for this reason.

**Three-way evidence labeling.** `relationship(course, target)` in `app.js` returns
`verified` (published source), `demo` (illustrative), or `unknown` (no major-specific
evidence). This distinction is the product's core integrity claim. Never collapse the
three, never let `unknown` render as satisfied or green, never treat absence of data as
absence of a requirement.

**No completion or admission claims.** General catalog transferability is not major
articulation. Progress is not eligibility and never admission odds. Course statuses are
self-reported; registered and planned work never counts toward completed totals. Current
sections, seats and prerequisites are unknown and must say so.

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

Computer Science is the only major with real coverage: ASSIST snapshots for UC Berkeley,
UCLA and Cal Poly Pomona, plus two UCSD department equivalencies. Everything else is
explicitly illustrative or unknown. Seven Mesa catalog courses; City, Miramar and
Continuing Education catalogs are not imported.

Choosing Miramar + UC Berkeley + Computer Science switches the coursework step to the full
Miramar → UC Berkeley CS B.A. agreement (`MIRAMAR_UCB_CS_AGREEMENT` in `data.js`, selected
by `activeAssistAgreement()`). It mirrors the ASSIST page: sections → lettered groups
(`rule: "all" | "one"`, with ASSIST's instruction text verbatim) → receiving course → Miramar
AND bundle, plus no-articulation and must-take-at-university items. In a `"one"` group,
choosing a course clears the other options. `scripts/check.mjs` validates this structure.

Where Miramar has no articulated course for a Berkeley item, Step 4 shows `NEARBY_UCB_CS`
(`data.js`): the same 2025–26 agreement read on ASSIST for City, Mesa, Grossmont, Cuyamaca,
Southwestern, Palomar and MiraCosta. Options are informational — never selectable or counted
toward progress — and a course set must be completed at that one college. Items with no option
anywhere say so and list the colleges checked.

Course statuses in the wizard are set with course tiles (`wizardCourseRow()` in
`workflow.js`): selecting a tile slides a Completed / Registered / Planning panel in from the
right, and the tile is color-coded by status with a text label. The dashboard course table
still uses a `<select>`.

Next planned work is the export step — see `docs/export-step-plan.md`. It is a plan, not
an implementation; the plain-text summary is what exists today. Do not ship export buttons
that do not work.
