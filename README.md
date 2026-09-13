# Transfer Copilot — San Diego POC

A browser-only proof of concept. Plain static HTML, CSS and JavaScript; no accounts, backend, live AI, payment links, private student records, or enrollment actions.

## 90-second demonstration

1. Start with the fictional Mesa student and three UC/CSU targets.
2. Click UC San Diego to show the sample pathway and source limitations.
3. Switch from Balanced plan (11 units) to Lighter load (7 units).
4. Add PHYS 196 or remove another course; watch units, target counts and warnings change.
5. Open “Why these courses?” to explain the transparent overlap calculation.
6. Search for calculus, open course evidence, and follow the official class-search link.
7. Preview the family/counselor view; copy or download the sample summary.

## Scope and provenance

Research snapshot: September 13, 2026.

- Seven Mesa course codes, titles, units and general UC/CSU transferability: [official Mesa 2026–27 catalog](https://www.sdccd.edu/docs/ISPT/instsrv/Catalogs/MetaFiles/2026_2027/Mesa2026_2027.pdf). Course pages are linked per record in dist/data.js.
- Official UCSD math department table: [transfer equivalencies](https://math.ucsd.edu/students/undergraduate/transfer-equivalencies). Mesa row dated June 16, 2026 lists MATH 150 → UCSD MATH 20A and MATH 151 → UCSD MATH 20B. Individual applicability is not certified.
- UCSD target context: [major preparation](https://admissions.ucsd.edu/transfer/transfer-major-preparation.html).
- SDSU target context: [SDCCD pathway](https://admissions.sdsu.edu/transfers/sdccd). The demo does not determine pathway eligibility.
- CSUSM comparison context: [historical 2023–24 advising worksheet](https://www.csusm.edu/academicadvising/majorminor/worksheets/cs/cs.pdf). It is not treated as a 2027 admissions agreement.
- Actual class search: [SDCCD](https://www.sdccd.edu/students/class-search/search.html).

Only a bounded set of public course facts was collected. ASSIST was not scraped. The owner reports submitting an API request; approval and integration remain pending. No scheduled scraper or background network process is included.

All student history, non-calculus campus mappings, checklist totals, priorities and overlap recommendations are illustrative. General transferability is not major articulation. Current sections, seats, prerequisites and schedule feasibility are unknown. This is not a complete major, GE, GPA, unit, TAG, ADT or admissions audit.

## Structure

- dist/index.html — page structure, metadata and custom favicon.
- dist/style.css — responsive styling.
- dist/data.js — small public-fact dataset, source links, and explicitly illustrative target metadata.
- dist/app.js — deterministic sample interactions and source explanations.
- preview-server.mjs — local static preview.
- .openai/hosting.json — Sites identity and static output declaration.

## Validation performed

- JavaScript syntax checked.
- Desktop and 390px mobile layout checked; no document-level horizontal overflow.
- Tested balanced/lighter/custom selections, workload warning, target exclusion, reset, search, empty state, modal close, sharing view and summary totals.
- No browser runtime errors observed.
- WebMCP tools are feature-detected and expose the same sample state. The installed test browser did not provide a native document.modelContext registry, so native WebMCP validation was unavailable; it is not a dependency of the demo.

## Before production

Replace demo mapping arrays with authorized, versioned official rules. Add agreement-year applicability, grouped articulation logic, prerequisite evidence, full scope labeling, reviewed test cases, and a correction process. Obtain separate authorized schedule data before claiming live course availability. Preserve source dates and visible unknown states.

## What to learn from a demo

Can a student explain their next step and its tradeoff? Do they distinguish progress from admission odds? Does a counselor find the summary useful? Would they return for the next registration cycle? Does this decision workflow improve on tools they already use?

The linked foundational brief remains the business/product reference; this POC is a deliberately narrow test, not a production implementation.

