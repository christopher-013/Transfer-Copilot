# Transfer Copilot — San Diego POC

A browser-only proof of concept. Plain static HTML, CSS and JavaScript; no accounts, backend, live AI, payment links, private student records, or enrollment actions.

## 90-second demonstration

1. Choose SDCCD or one of its colleges. No name or account is requested.
2. Select destinations from nine undergraduate UC campuses and 22 CSU universities.
3. Enter an intended major. Computer Science has the richest illustrative coverage.
4. Mark the seven Mesa course examples Completed, Registered or Planning, or explicitly start empty.
5. Review a personalized campus comparison with source-linked, illustrative and unknown applicability distinguished.
6. Compare balanced/lighter scenarios; completed and registered courses are preserved.
7. Edit the profile or coursework, inspect official evidence, and preview the family/counselor summary.

Answers exist only in tab memory and reset on refresh. Nothing is sent to a backend. Copying the public demo link does not share answers. Explicitly copying or downloading a summary includes the course selections.

## Planned exports

See [the export step plan](docs/export-step-plan.md) for the proposed final PDF, Word, Excel and Markdown export experience. This is a roadmap, not implemented export functionality; the existing plain-text summary remains available.

## School identity

The workspace navigation runs across the top so the comparison uses the full page width. Institution listings use locally bundled marks retrieved from official school sites, with visible text names and monogram fallbacks. See [school asset sources](docs/school-asset-sources.md) for provenance and the non-affiliation notice.

## Scope and provenance

Course and agreement research snapshot: September 13, 2026. School identity marks were retrieved September 14, 2026; see [school asset sources](docs/school-asset-sources.md).

- Seven Mesa course codes, titles, units and general UC/CSU transferability: [official Mesa 2026–27 catalog](https://www.sdccd.edu/docs/ISPT/instsrv/Catalogs/MetaFiles/2026_2027/Mesa2026_2027.pdf). Course pages are linked per record in dist/data.js.
- Official UCSD math department table: [transfer equivalencies](https://math.ucsd.edu/students/undergraduate/transfer-equivalencies). Mesa row dated June 16, 2026 lists MATH 150 → UCSD MATH 20A and MATH 151 → UCSD MATH 20B. Individual applicability is not certified.
- UCSD target context: [major preparation](https://admissions.ucsd.edu/transfer/transfer-major-preparation.html).
- SDSU target context: [SDCCD pathway](https://admissions.sdsu.edu/transfers/sdccd). The demo does not determine pathway eligibility.
- CSUSM comparison context: [historical 2023–24 advising worksheet](https://www.csusm.edu/academicadvising/majorminor/worksheets/cs/cs.pdf). It is not treated as a 2027 admissions agreement.
- Actual class search: [SDCCD](https://www.sdccd.edu/students/class-search/search.html).

Only a bounded set of public course facts was collected. ASSIST was not scraped. The owner reports submitting an API request; approval and integration remain pending. No scheduled scraper or background network process is included.

Student history is entered by the demo visitor, not preloaded. Only seven Mesa catalog examples are imported; choosing City, Miramar or Continuing Education does not substitute their course catalogs. All non-calculus campus mappings and overlap recommendations are illustrative. Unsupported campus/major combinations remain explicitly unknown. General transferability is not major articulation. Current sections, seats, prerequisites and schedule feasibility are unknown. This is not a complete major, GE, GPA, unit, TAG, ADT or admissions audit.

## Structure

- dist/index.html — page structure, metadata and custom favicon.
- dist/style.css — responsive styling.
- dist/data.js — small public-fact dataset, source links, and the frozen ASSIST Computer Science agreement snapshot.
- dist/app.js — deterministic sample interactions and source explanations.
- dist/workflow.js — four-step onboarding, campus directory and in-memory student state.
- dist/workflow.css — responsive onboarding and personalized comparison styles.
- dist/workspace.css — dashboard shell, navigation and school-mark styles.
- dist/schools.js — school-mark lookup with text monogram fallbacks.
- dist/assets/schools/ — locally bundled institution marks.
- scripts/check.mjs — pre-deploy syntax and data-integrity checks (`node scripts/check.mjs`).
- preview-server.mjs — local static preview.
- .openai/hosting.json — Sites identity and static output declaration.

## Validation performed

- `node scripts/check.mjs` passes: JavaScript syntax, asset-path integrity, agreement/course ID integrity, and no hardcoded sample figures in shipped markup. The same check runs in CI before a Pages deploy.
- Desktop and 390px mobile layout checked; no document-level horizontal overflow.
- Tested onboarding through personalized results, separate status totals, balanced/lighter/original selections, edit/cancel, reset, search, sharing and source scope labels.
- No browser runtime errors observed.
- WebMCP tools are feature-detected and expose the same sample state. The installed test browser did not provide a native document.modelContext registry, so native WebMCP validation was unavailable; it is not a dependency of the demo.

## Before production

Replace demo mapping arrays with authorized, versioned official rules. Add agreement-year applicability, grouped articulation logic, prerequisite evidence, full scope labeling, reviewed test cases, and a correction process. Obtain separate authorized schedule data before claiming live course availability. Preserve source dates and visible unknown states.

## What to learn from a demo

Can a student explain their next step and its tradeoff? Do they distinguish progress from admission odds? Does a counselor find the summary useful? Would they return for the next registration cycle? Does this decision workflow improve on tools they already use?

The [foundational brief](docs/foundational-brief.md) remains the business/product reference; this POC is a deliberately narrow test, not a production implementation.
