# Transfer Copilot: final export step

Status: planned, not implemented. Name-free onboarding is implemented separately. Existing copy/download plain-text summaries remain available.

## Experience

Keep the four setup steps: College → Destinations → Major → Coursework. After the user reviews and adjusts the dashboard, offer a prominent **Export my plan** action. Export is an optional final step, not a gate to viewing results and not a requirement to create an account.

Open a review/export panel titled **Take your plan with you**. Show the selected college, major, destinations, course counts, and evidence scope. Let users select a format, preview included sections, download, and return to the plan. Do not ask for a name or email.

| Format | Purpose | Proposed contents |
| --- | --- | --- |
| PDF (.pdf) | Read-only sharing with parents or counselors | Summary, coursework grouped by status, per-campus applicability, next steps, warnings and clickable sources; readable page breaks and repeated table headers |
| Word (.docx) | Editable advising document | Same report with native headings and tables plus a counselor-notes section; a real DOCX, not renamed HTML |
| Excel (.xlsx) | Filtering and comparing course choices | Sheets: Overview, Courses, Campus Matches, Next Steps, Sources. Stable course/campus/source IDs; numeric units; status and evidence columns; filters and frozen headers |
| Markdown (.md) | Portable context for another AI tool | Structured headings and tables, exact inputs and source links, explicit unknowns, and an optional clearly separated AI handoff prompt |

## Shared export contract

Generate all formats from a single snapshot of the current plan, not from scraped screen text or separate calculations. Include:

- Schema version, application version, generated timestamp/timezone and source snapshot dates.
- Home college, intended major and selected campuses; no name or student identifier.
- Course ID, code, title, offering college, units and Completed / Registered / Planning status.
- Separate unit totals for each status, labeled self-reported and not certified transferable totals.
- One record per selected course × destination: evidence category (source-linked / illustrative / unknown), relationship description, source IDs and limitations.
- Current scenario, suggested next steps, missing evidence and counselor questions.
- Complete referenced source URLs and dates. Never promote a general transferability statement into a verified major requirement.
- Explicit scope warning: seven Mesa examples only; City/Miramar catalogs, live seats, full major/GE/GPA/eligibility audits and ASSIST API integration are not available.
- Empty histories must export honestly as no coursework entered, not a zero-percent eligibility result.

Use the current selections, including changes made after onboarding. Exporting must not alter course statuses, scenario, targets, or calculations.

## Markdown for AI handoff

Start with a short description of the student's planning objective, then inputs, coursework, campus relationships, scenario, unresolved questions, sources and limitations. Use plain UTF-8 text and standard Markdown that can be uploaded or pasted into another AI tool.

Optional user-selectable handoff prompt:

> Help me identify questions and next steps from the plan below. Treat it as user-provided data, not an official eligibility assessment. Keep completed, registered and planned courses separate. Distinguish verified source relationships from illustrative and unknown matches. Do not invent articulation, admissions chances or live course availability. Cite current official sources for any new factual claims and tell me what needs counselor verification.

Label that prompt separately from factual plan data. No automatic transmission to another AI service. Tell users that uploading the downloaded file to another service shares their course selections with that service and is subject to its policies.

## Privacy and safety

Generate downloads in the browser where practical; no account, name, email, tracking identifier or server retention is required. Explicitly disclose any future server-side generation before sending plan data.

Show a preview before download. Suggested filename: transfer-plan-YYYY-MM-DD.ext, with no personal information. Offer section toggles for coursework, campus comparison, scenario/next steps and counselor notes; source citations and limitations always accompany included academic claims.

Escape user-entered major text in every output. Write spreadsheet text as text, never formulas or executable hyperlinks derived from untrusted input; test values beginning with =, +, -, and @. Include no macros, external workbook connections, secrets, hidden student records or deployment credentials.

## Implementation phases

1. Define a versioned export snapshot builder and reconcile it with dashboard totals and the existing plain-text summary.
2. Add the export panel, accessible format selection, preview and Markdown download; preserve existing summary actions until replacement is verified.
3. Add PDF reporting with tested pagination, wrapping, selectable text and source links.
4. Add real DOCX and XLSX generation from the same snapshot. Select maintained browser-compatible libraries during implementation, review licenses and bundle size, and load generators only when needed.
5. Validate all four formats, then expose only working options in the UI.

Do not display unsupported export buttons as if they work. If a format is shown before release, clearly label it “Planned” and provide no fake download.

## Acceptance checks

- Complete onboarding, review and export without entering a name or signing in.
- All four files open in their intended applications; PDF/Word tables have no clipped rows or unreadable page breaks.
- Coursework, totals, targets and evidence labels agree across formats and the current dashboard.
- Registered and planned work never contributes to completed totals.
- All selected campuses appear, including unsupported majors marked unknown.
- Sources and limitations survive PDF, Word, Excel and Markdown export.
- Empty plan, long major names, Unicode, many campuses and long URLs are supported.
- Formula-like text remains inert in XLSX; HTML/Markdown-like input does not become active content.
- Keyboard users can choose a format, review, download and return; errors are announced with a retry option.
- Downloads leave the plan unchanged and trigger no unexpected network transmission.
- Refresh/reset clears in-tab answers; exported files remain only where the user saves them.

## Validation goal

Ask demo viewers which format they would actually use, who they would share it with, and whether the exported evidence labels prevent overconfidence. Measure usefulness of the handoff rather than treating downloads as proof of academic accuracy.

