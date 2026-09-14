# Transfer Copilot

## Foundational product and business requirements

| Field | Status |
|---|---|
| Working name | Transfer Copilot |
| Earlier working names | College Transfer Planner, Transfer Planner, TransferPath |
| Version | 1.0 — foundational concept; not a validated business plan |
| Prepared | September 13, 2026 |
| External information checked | September 11, 2026; reconfirm before implementation or commercial commitments |
| Initial audience | California community-college students exploring transfer to UC, with CSU expansion or selected cross-system pilot coverage |
| Product owner | Project owner; staffing and operating entity to be determined |
| Core question | **What should I do next to maximize my transfer options?** |
| Critical dependency | Authorized access to sufficiently complete official articulation and requirement data |

This brief reconstructs the transfer-planning concept from an earlier exploratory discussion. It preserves the reasoning and evolution of the idea while adding proposed requirements, acceptance criteria, and validation gates for a later build.

Statements about the concept's origin come from that discussion. External facts are dated snapshots with source links. Feature specifications, formulas, sample sizes, milestones, and financial scenarios are **proposals or hypotheses**, not commitments or validated outcomes. No affiliate applications, ASSIST approvals, institutional agreements, or production integrations are established by this document.

This is a planning reference, not an individual student's academic plan. Course examples and percentages are illustrative; they must not be used to make enrollment decisions.

## Contents

1. [Executive summary](#1-executive-summary)
2. [Origin and evolution](#2-origin-and-evolution)
3. [Problem, users, and business thesis](#3-problem-users-and-business-thesis)
4. [Positioning and product principles](#4-positioning-and-product-principles)
5. [Competitive landscape](#5-competitive-landscape)
6. [Differentiation and defensibility](#6-differentiation-and-defensibility)
7. [End-to-end experience](#7-end-to-end-experience)
8. [Feature specifications](#8-feature-specifications)
9. [Functional requirements](#9-functional-requirements)
10. [Data access and no-scraping policy](#10-data-access-and-no-scraping-policy)
11. [Data model, architecture, and quality](#11-data-model-architecture-and-quality)
12. [MVP scope and acceptance](#12-mvp-scope-and-acceptance)
13. [Homepage messaging](#13-proposed-homepage-messaging)
14. [Affiliate model and partner programs](#14-free-for-students-model-and-partner-programs)
15. [Revenue hypotheses and economics](#15-business-and-revenue-hypotheses)
16. [Acquisition and distribution](#16-acquisition-and-distribution-hypotheses)
17. [Validation plan](#17-validation-plan)
18. [Metrics](#18-success-metrics-and-guardrails)
19. [Phased roadmap](#19-phased-roadmap)
20. [Risks and open decisions](#20-risks-mitigations-and-open-decisions)
21. [Concrete next steps and backlog](#21-concrete-next-steps-and-implementation-backlog)
22. [Source notes and decision history](#22-source-notes-and-decision-history)

## 1. Executive summary

Transfer Copilot comes from firsthand experience using ASSIST to plan a transfer from a California community college to UC. Official information exists, but combining several campus and major agreements into a practical semester plan takes time, interpretation, and repeated comparisons.

The proposed product converts that work into understandable decisions: what the student has completed, what remains, which courses to take next, which alternatives preserve the most options, and where a missing course could actually be taken.

The central promise is:

> **What should I do next to maximize my transfer options?**

The strongest product package combines next-semester recommendations, comparison across campus-major targets, a transparent Transfer Efficiency Score, scenario planning, Transfer Risk alerts, official-source citations, course shopping, and student-controlled parent sharing. A later counselor dashboard could improve distribution and support an institutional business.

The full vision is broader than the first release. The proposed live MVP evaluates supported major-preparation requirements, not complete transfer eligibility, and suggests candidate course bundles rather than confirmed enrollable schedules. Section 12 defines these boundaries; they must appear in the product, not only in this document.

The recommended business model keeps essential planning **free for students**. Revenue comes from optional, relevant services around the student's journey: tutoring, writing support, supplemental learning, admissions counseling, housing, and other transition needs. Compensation must not influence academic course or campus recommendations.

The main prerequisite is authorized ASSIST access. Its Data page, updated August 19, 2026, still limits fulfillment to institutional operations and says capacity for non-institution-sponsored requestors is being determined. Published API specifications do not establish that an independent commercial developer can obtain access today. The project must confirm licensing, fees, dataset coverage, storage rights, and permitted derived use before committing to a production articulation engine. [ASSIST Data](https://resource.assist.org/data)

Competition is stronger than the original idea first assumed. Official tools and independent planners already offer comparison, planning, AI, scenarios, alerts, and counselor functions. The launch must prove a particular workflow is better: helping a student make a feasible next-semester choice across several targets, understand its consequences, verify its sources, and execute it.

## 2. Origin and evolution

### 2.1 Origin

The idea came from watching a California community-college student use ASSIST to explore transfer options to UC, and wanting to make the process easier for other students and families.

The observation was not that official articulation information was unnecessary. It was that a family still needed to:

- interpret requirements and notes;
- compare several campus-major destinations;
- reconcile completed, current, and planned courses;
- identify overlapping and target-specific requirements;
- sequence classes across terms;
- investigate courses at other colleges;
- understand whether the overall plan remained on track.

That early experience is valuable input, but one family's experience must be supplemented with research across colleges, majors, work schedules, financial constraints, and student backgrounds.

### 2.2 Business origin

The discussion began by exploring affiliate-supported websites: areas where a useful tool could generate income through partner programs.

The transferable business pattern was:

**A specific problem → a useful tool → a relevant next action → an optional partner transaction**

The College Transfer Planner attracted interest because it could create recurring value over a 12–24 month planning journey. Students might return when they complete classes, change targets, register, apply, receive decisions, and arrange a move.

That retention period is a hypothesis to validate. It does not mean every registered student will remain active for two years.

### 2.3 How the idea changed

| Stage | Original thinking | What the next discussion changed |
|---|---|---|
| Affiliate site | Explain transfer paths and earn from related services | The planning tool itself must be useful enough to attract and retain students |
| Transfer planner | Enter courses once and compare completion across schools | Direct competitors already do much of this |
| Transfer-planning SaaS | Free core plus a possible $29/year Pro tier | Partner research increased interest in keeping student planning free |
| Transfer Copilot | Recommend next actions, compare tradeoffs, find courses, and catch risk | This became the preferred positioning, subject to data access and competitive validation |

Preserve this evolution when making later decisions. The early Pro price was an experiment idea, not a settled pricing decision. Likewise, the initial impression of low competition was revised after examining actual products.

## 3. Problem, users, and business thesis

### 3.1 The problem

Students may use ASSIST, UC TAP, the CSU Transfer Planner, campus admissions pages, community-college catalogs and schedules, counselors, spreadsheets, and family discussions. Each supports part of the process. Students still have to reconcile the pieces.

The highest-value unresolved questions are practical:

- Which next-semester course advances several of my targets?
- Which requirement is urgent because it starts a long sequence?
- What do I lose if I skip or delay a course?
- Would changing majors or dropping a target reduce unnecessary coursework?
- Where can I take a missing class within my schedule and location constraints?
- What is supported by official evidence, and what still needs a counselor?

Potential consequences include unnecessary units, missed prerequisites, delayed transfer, closed options, repeated manual work, and anxiety. These are problem hypotheses to investigate through recent student behavior.

### 3.2 Primary personas

| Persona | Main job | Design implication |
|---|---|---|
| Transfer student | Choose the next courses and keep preferred destinations feasible | Fast course entry, visible tradeoffs, editable constraints, explanations |
| Parent or chosen supporter | Understand progress and help discuss decisions | Plain-language summary with student-controlled access |
| Community-college counselor | Review a plan, identify exceptions, and resolve questions | Exact evidence, uncertainty, corrections, export, minimal duplicate entry |
| Transfer-center administrator, later | Help a cohort and identify recurring barriers | Consent-aware aggregate views and institutional workflow integration |

The student owns the plan. Parent access is optional. A counselor's acknowledgement should be dated and scoped; it must not become a blanket guarantee that every future change is approved.

### 3.3 Business thesis

A useful free planner can build a trusted relationship with students at recurring moments of need. Optional services can generate revenue without making essential academic guidance conditional on payment.

Hypotheses to test:

1. Students prefer actionable next-course guidance over a gaps-only checklist.
2. Comparing several targets produces repeat value at registration time.
3. Free access improves adoption, word of mouth, and counselor referrals.
4. Relevant offers convert better than a generic affiliate directory.
5. Affiliate income can cover a meaningful part of data, support, and product costs.
6. A counselor product may support recurring revenue if it improves an existing workflow.

ASSIST reported 1.9 million unique visitors in 2024–25 and more than one million uses of its Agreement Comparison tool. This demonstrates demand for transfer information and comparison, but these visitors are not the addressable paying market for this product. The discussion's earlier figure of 68,611 annual CCC-to-UC/CSU transfers should be separately verified and defined before use in market sizing. [ASSIST Winter 2026 newsletter](https://resource.assist.org/Portals/0/ASSISTance%20Newsletters%20and%20Coverpages/Winter%202026_ASSISTance%20Newsletter.pdf)

## 4. Positioning and product principles

### 4.1 Recommended positioning

> Transfer Copilot helps California community-college students decide what to take next so they can satisfy requirements efficiently and keep more transfer pathways open.

The primary question remains:

> **What should I do next to maximize my transfer options?**

Supporting messages:

- Know what to take next semester.
- See which courses help the most of your selected targets.
- Understand what changes before you change your plan.
- Find a practical way to take missing courses.
- Bring a clearer plan and better questions to your counselor.

### 4.2 Product principles

1. **Official sources determine academic relationships.**
2. **AI is the interface, not the authority.**
3. Explain every important recommendation, score, and risk.
4. Preserve student choice and show tradeoffs.
5. Treat unknown, unsupported, stale, and conflicting data as visible states.
6. Distinguish required, recommended, transferable, and articulated.
7. Preserve academic year, agreement version, and source notes.
8. Give students control over sharing.
9. Keep commercial compensation out of academic calculations.
10. Expand coverage only as fast as the team can verify and maintain it.

The initial product should not promise admission probabilities, guaranteed outcomes, statewide completeness, application submission, nationwide planning, or current seats without a reliable schedule source.

## 5. Competitive landscape

This is a dated desk-research snapshot, not a complete hands-on comparison. Public product descriptions establish what a provider claims; they do not independently prove accuracy, adoption, data rights, or feature quality.

| Product | Role and capabilities | Primary question | Implication |
|---|---|---|---|
| [ASSIST](https://resource.assist.org/FAQ) | Official California articulation repository; compares two agreements and describes an AI transfer articulation/exploration tool under development | Does this coursework articulate or satisfy a listed relationship? | Preserve its authority. Do not claim it can only display one agreement or has no comparison capability |
| [UC TAP](https://uctap.universityofcalifornia.edu/students/) | Free official UC coursework planning, minimum-requirement progress, communications, and TAG-related workflow | Am I progressing toward UC transfer requirements? | Complement its official workflow; do not imply Transfer Copilot replaces TAG or UC application processes |
| [CSU Transfer Planner](https://www.calstate.edu/apply/transfer) | Official CSU program exploration, coursework, GE/GPA progress, major/ADT tracking, timeline scenarios, alerts, and institutional views | Am I progressing toward a CSU pathway and timeline? | Generic planning, scenarios, risk alerts, and counselor dashboards already exist |
| [TransferPlanner.app](https://www.transferplanner.app/) | One course plan checked across ranked UC targets; grouped requirements and alternatives; missing/no-articulation states | How does one plan match multiple UCs? | A close competitor. Its September 2026 page advertised free beta, 61 hand-validated agreements, six CCCs, nine UCs, four majors, and 2025–26 data |
| [TransferAI](https://aitransfer.app/) | Publicly described as an ASSIST agreement explorer and AI Counselor for California transfer questions | Can AI explain or explore articulation? | AI alone is not a differentiator. Data provenance, actual coverage, freshness, and answer quality require direct examination |
| [Plan My Transfer](https://www.planmytransfer.com/) | UC/CSU target and coursework tracking, semester planning, remaining-work indicators, GE and deadline context, and AI assistance | What plan covers my transfer targets and remaining requirements? | Another direct competitor. The original discussion also cited multi-college history and overlap optimization |
| [Transferology](https://collegesource.com/transfer-tools/transferology/) | Nationwide transfer-credit network, replacement-course search, institutional information, and a staff product | Where might my credits transfer, or where can I take a replacement course? | National scale and institutional relationships are meaningful advantages. Current section availability remains a separate problem |

UC TAP already provides authorized counselor access, preliminary units/GPA and seven-course-pattern information, communications, and TAG evaluation tools. Counselor collaboration itself is therefore not a new category. [UC TAP counselor information](https://uctap.universityofcalifornia.edu/counselors/reports/)

The CSU planner's documented functions include major/ADT progress and a transfer timeline calculator with what-if and falling-behind guidance. Its existence raises the bar for proposed risk and scenario features. [CSU major/ADT progress](https://help.liaisonedu.com/CSU_Transfer_Planner_Student_Help_Center/Viewing_Your_Transfer_Plan/Major_Requirements_and_ADT_Progress), [CSU timeline calculator](https://help.liaisonedu.com/CSU_Transfer_Planner_Student_Help_Center/Viewing_Your_Transfer_Plan/Transfer_Timeline_Calculator)

The original research cited a Plan My Transfer developer post reporting more than 3,000 users in May 2026. Preserve this as founder-reported adoption, not audited evidence. Its existence and described optimization overlap are more strategically important than the exact number. [Developer's May 2026 post](https://www.reddit.com/r/TransferStudents/comments/1t9um61/i_spent_the_last_few_years_building_a_free_ccc_to/)

Transferology can identify replacement courses, but its FAQ directs students to institutions to determine how course content is offered. A course match does not establish a current section, meeting time, or open seat. [Transferology FAQ](https://transferology-support.collegesource.com/article/3182-frequently-asked-questions)

### Competitive questions to investigate

Run the same synthetic student profile through all seven products. Record:

- supported colleges, majors, systems, and academic years;
- multi-college course history and target priority;
- prerequisite and AND/OR rule handling;
- next-semester recommendations and workload constraints;
- overlap optimization and consequences of removing a target;
- course-level scenarios and risk explanations;
- citations, unknown states, source freshness, and correction paths;
- current schedules, modality, prerequisites, and seats;
- student sharing and counselor workflow;
- time to useful result and pricing.

Mark untested features **unknown**, not absent. Do not assume a competitor's public use of ASSIST data proves a particular licensing status.

## 6. Differentiation and defensibility

The earlier concept's “easier ASSIST” positioning is insufficient. Several products already offer a friendlier interface, AI explanation, or multi-campus progress.

The differentiation hypothesis is the combined workflow:

> **Choose a feasible next-semester schedule across multiple targets, understand which options it preserves, see the consequences of alternatives, verify the evidence, and find a real way to take the courses.**

That is the mature-product aspiration. Until offerings, meeting times, seats, and local enrollment prerequisites are verified, the MVP promises an **academically compatible candidate bundle under the modeled constraints**, with operational feasibility unresolved. Do not call a bundle a confirmed schedule or imply the student can enroll in it.

The strongest areas to test are:

| Differentiator | Why it may matter | What must be demonstrated |
|---|---|---|
| Cross-target next-semester choices | A student needs a decision rather than only a status | Better recommendations under actual workload, prerequisite, and timing constraints |
| UC and CSU together | Students may want options across systems | Correct cross-system rules, with no oversimplified eligibility claims |
| Explainable Transfer Efficiency | Makes overlap and sequence value understandable | Users understand the score and counselors agree with the tradeoffs |
| Real course availability | Turns planning into execution | Authorized, fresh offerings; unknown seats clearly labeled |
| Student-controlled family view | Parents need an understandable progress picture | Useful collaboration without taking control from the student |
| Evidence-rich counselor preparation | Reduces reconstruction before an appointment | Less duplicated work and faster review than existing workflows |

Longer-term defensibility could come from licensed source relationships, accurate rule modeling, maintained schedule integrations, regression-tested interpretations, a trusted correction process, counselor relationships, and repeat student use. These are capabilities to build; they are not existing assets.

## 7. End-to-end experience

1. **Establish the student context.** Home college, other colleges attended, target major family, transfer term, workload, modality, geography, and time constraints.
2. **Enter academic history.** Completed, current, and planned courses with terms, units, and grades where needed. Let the student correct everything.
3. **Select campus-major targets.** A target is a specific program at a campus. Rank priorities without automatically discarding lower-priority options.
4. **Review current status.** Show completed work, planned work, gaps, unresolved rules, source year, and freshness within the evaluated requirement categories; separately show categories not evaluated.
5. **Choose next-semester actions.** Present a short ranked set of candidate course bundles compatible with known academic constraints, with reasons, alternatives, and unresolved feasibility checks.
6. **Compare a scenario.** Change a course, target, major, load, or date and see the difference.
7. **Check practical execution.** Show authorized offerings or official schedule links; identify enrollment questions.
8. **Save and review.** Export or share the plan with sources, unknowns, and specific counselor questions.
9. **Return when something changes.** Update a grade, course, target, offering, or source; review the impact before accepting the revised plan.

## 8. Feature specifications

### 8.1 Next-semester recommendations

**Job:** “What should I take next semester?”

Inputs include the student's academic history, campus-major targets and priorities, intended transfer term, maximum units, prerequisites, schedules where known, location/modality preferences, pinned courses, and exclusions.

Separate hard constraints from preferences. A missing prerequisite, incompatible course sequence, term conflict, or maximum load cannot simply be outweighed by a high score. Lower travel, fewer units, a preferred modality, and more targets advanced can be ranking preferences.

For each proposed course, show:

- requirement or sequence advanced;
- targets helped, not helped, and still uncertain;
- required versus recommended status;
- why it matters this term;
- alternatives;
- known prerequisites and availability;
- effect of delaying or skipping it;
- official source and academic year.

For a schedule, show total units, known conflicts, unresolved enrollment questions, option coverage, and risks. Offer two or three alternatives when useful: broadest target coverage, lighter load, or earliest supported preparation completion.

If a necessary constraint is unknown, flag the result as conditional; absence of data is not proof that the constraint is satisfied. In the MVP, label these outputs "candidate course plans" and require official schedule, prerequisite-clearance, and registration checks before enrollment. The ranking considers only the declared academic coverage in Section 12.2a.

The discussion used an illustrative community-college student considering Computer Engineering at several UC campuses, with courses such as second-semester physics, assembly language, and Discrete Math. These examples are **not verified articulations, schedules, or any real student's profile**.

The phrase “keeps 4/4 options open” needs a narrow definition: no supported planning requirement has been contradicted under the displayed assumptions. It must not mean guaranteed eligibility or admission.

### 8.2 Transfer Efficiency Score

**Job:** “Which courses give me the most options?”

The conversation proposed examples such as “98% Transfer Value” versus “24% Transfer Value,” but did not define a formula. Preserve the concept, not those numbers as calculations.

A recommended first implementation is two understandable measures:

1. **Target coverage:** count of selected targets for which a course or completed course bundle advances an unmet requirement, with the targets named.
2. **Efficiency index:** an optional 0–100 comparative score explaining priorities, sequence value, unit efficiency, and feasibility.

Proposed research rubric:

| Component | Illustrative maximum points |
|---|---:|
| Weighted unmet requirement coverage | 35 |
| Preservation of selected options | 20 |
| Prerequisite/sequence urgency | 20 |
| Avoidance of unnecessary or redundant units | 10 |
| Practical fit with the term and known constraints | 10 |
| Resolution of a documented risk | 5 |
| **Total** | **100** |

These weights are an initial hypothesis. Define normalization before implementation and test for double-counting between coverage, preservation, urgency, and risk reduction.

Rules:

- Scores are relative to this student's targets and current plan.
- Required and recommended work remain distinguishable.
- A partial AND bundle must not be counted as a fully satisfied requirement.
- A sequence-starting course can have value without immediately satisfying the destination course.
- Evidence confidence is displayed separately; unavailable data is not equivalent to low academic value.
- Do not calculate a score if core evidence is insufficient.
- No partner commission is an input.
- Do not display the score as an admission probability or universal course quality.
- A schedule score must evaluate the whole bundle; it is not an average of course scores.

Start with coverage counts and component explanations. Keep the numerical index internal until students can interpret it and counselors find its rankings defensible.

### 8.3 Scenario planning

**Job:** “What happens if I change this?”

Examples:

- Drop UCLA from the target list.
- Switch from Computer Engineering to Computer Science.
- Skip or delay a programming course.
- Reduce the next term to nine units.
- Take a course at another community college.
- Move the intended transfer term.

Duplicate the baseline and compare:

- added or removed requirements;
- additional or avoided coursework;
- affected and unaffected targets;
- timing changes;
- risks created or resolved;
- evidence gaps;
- changes in target coverage and efficiency.

Preserve the baseline, support undo, and require confirmation before replacing the primary plan. Saved scenarios must record the same source and calculation versions needed to reproduce them.

### 8.4 Cross-community-college course shopping

**Job:** “Where can I actually take this missing course?”

A course result should distinguish:

| Academic match | Operational offering |
|---|---|
| Exact receiving-campus requirement and official articulation | College, term, section, modality, dates, schedule, prerequisites, and seats |
| Agreement year and any multi-course conditions | Schedule source and last refresh |
| Required/recommended/unknown status | Open/waitlisted/closed/unknown status |

Filter by nearby/online, term, summer, units, meeting time, and known constraints. Link to registration instructions and identify prerequisite clearance, enrollment, travel, or schedule questions the student must resolve.

ASSIST's FAQ states that it does not provide community-college-to-community-college transfer information. Therefore, finding a course at College B that articulates to a target university does **not** prove that College A will accept it as a local prerequisite or toward a local award. Verify each receiving-campus relationship and any local prerequisite acceptance separately. Do not assume courses with similar names, numbering, or partial sequences are interchangeable. [ASSIST FAQ](https://resource.assist.org/FAQ)

MVP fallback: show an authorized academic match with an official schedule link and “current offering/seat status not verified.” Add live seats only through reliable authorized sources.

### 8.5 Transfer Risk alerts

**Job:** “What could delay or compromise my plan, and what can I do?”

Candidate risks:

- an unmet prerequisite or long sequence;
- a critical course placed too late;
- one target's requirements diverging from the rest;
- a missing major agreement or no articulated course;
- stale or conflicting data;
- a course unavailable in the needed term;
- known schedule or workload conflict;
- a verified application or program deadline requiring action.

Each alert contains severity, affected target, consequence, date or term, supporting rule, source freshness, and a proposed resolution. “Fix my plan” should preview the proposed change, not silently change it.

Keep academic risks distinct from data risks. Unknown information must not appear green. Avoid broad “on track for admission” labels; show what is on track and what has not been evaluated.

### 8.6 Ask Transfer: AI as interface, not authority

**Job:** “Explain what the official rules mean for my plan.”

Example: “Do I need assembly language for Berkeley and UCSD?”

The response should identify exact targets, retrieve approved rules, explain required/recommended/unknown states, calculate the consequences through the rule engine, cite the sources, and identify what needs human review.

The system must not infer equivalence from course titles, invent deadlines, fill missing rules from general model knowledge, or state that academic preparation guarantees admission.

Use the sequence:

**Official records → structured rule evaluation → recommendation and risk results → plain-language explanation**

Every material academic claim needs a usable source. If the source cannot support the answer, explain the uncertainty and give a precise next question for the counselor or institution.

### 8.7 Parent sharing and dashboard

**Job:** “Are we on track?”

The conversation imagined a simple view with units, GPA, target universities, progress, next-semester courses, and transfer timing. These fields should be student-selectable; a parent need not receive grades or a full course history by default.

Include:

- intended transfer term;
- chosen targets;
- next-term plan;
- progress described with a clear denominator;
- unresolved risks and questions;
- upcoming decisions;
- source and plan update date.

Use read-only access by default. Give the student a preview, named recipients or scoped links, revocation, optional expiration, and clear visibility into who can access the plan. Supporter suggestions remain separate from the student's record.

### 8.8 Counselor dashboard

**Job:** “Help me prepare for and improve a transfer-planning appointment.”

Later capabilities:

- consent-aware roster;
- students needing attention and reasons;
- cross-system plan comparison;
- exact evidence and exceptions;
- questions submitted before an appointment;
- notes, corrections, and scoped review acknowledgement;
- export, access roles, and audit history.

A color-coded caseload was discussed—such as 21 on track, eight needing attention, and three at risk—but these are fictional demonstration numbers. The strategic test is whether this saves time compared with UC TAP, CSU tools, and existing campus systems.

### 8.9 Reverse destination discovery, later

The longer-term question is “Where should I consider transferring?” Inputs might include courses, major interest, GPA, geography, budget, system preference, and timing.

Rank understandable dimensions such as supported requirements completed, additional coursework, published costs, and estimated time needed. Any reach/target/safer language or admission competitiveness model requires separate data, methodology, and fairness validation. Defer personalized admission probabilities.

## 9. Functional requirements

Priorities: **P0** = required for the narrow data-integrated MVP; **P1** = private-beta extension; **P2** = later product.

| ID | Priority | Requirement | Acceptance evidence |
|---|---|---|---|
| FR-01 | P0 | Manual course history across supported colleges, with term, units, grade, and completed/current/planned status | Every field is editable; ambiguous entries remain unresolved; no title-only equivalence |
| FR-02 | P0 | Campus-major targets, priority, transfer term, and coverage check | Removing or reprioritizing a target recalculates results; unsupported combinations are identified |
| FR-03 | P0 | Structured requirement groups and source notes | AND/OR, alternatives, sequences, no-articulation, and year-sensitive cases pass expert-reviewed examples |
| FR-04 | P0 | Cross-target audit within declared academic scope | Satisfied, planned, missing, uncertain, conflicting, and unsupported states are distinct; unevaluated requirement categories remain visible |
| FR-05 | P0 | Next-semester recommendation under constraints | Candidate bundle respects known modeled constraints, flags unresolved feasibility, and explains targets advanced, tradeoffs, and sources |
| FR-06 | P0 internal / P1 public | Transfer Efficiency components | Same inputs reproduce the same score; confidence is separate; partial groups do not falsely satisfy requirements |
| FR-07 | P0 lightweight | One baseline and one alternate scenario | Differences are explained; undo and baseline preservation work |
| FR-08 | P0 | Source-based Transfer Risk | Each warning has a rule, consequence, evidence, and resolution; unknown data cannot become a green status |
| FR-09 | P0 | Source and freshness panel | Every consequential academic output links to the applicable source and academic year |
| FR-10 | P0 | Save and counselor export | Export includes the plan, assumptions, unresolved questions, citations, and versions |
| FR-11 | P0 | Error reporting and correction queue | Harmful output can be suppressed; corrected cases enter regression coverage |
| FR-12 | P0 basic / P1 expanded | Internal coverage and data health controls | Staff can see source age, unsupported targets, failed refreshes, and active rule versions |
| FR-13 | P1 | Student-controlled sharing | Read-only default, preview, revocation, and optional expiration; no unapproved edits by recipients |
| FR-14 | P1/P2 | Cross-college course discovery | Articulation and current offering are independently sourced; seats may be unknown |
| FR-15 | P1 | Grounded Ask Transfer | Unsupported academic claims are refused or qualified; citations support the actual answer |
| FR-16 | P1 | Contextual partner cards | Disclosure is visible; academic ranking is unchanged with partners enabled or disabled |
| FR-17 | P2 | Counselor cohort review | Consent, evidence, notes, access control, and correction workflow function together |
| FR-18 | P2 | Reverse destination exploration | Every ranking dimension is documented; unsupported admission predictions are excluded |
| FR-19 | P0 | Agreement applicability and mixed-college safeguards | No automatic newest-year substitution or unsupported cross-college bundle composition; uncertain cases require review |

## 10. Data access and no-scraping policy

### 10.1 ASSIST dependency

ASSIST's Data page, updated August 19, 2026, describes currently available text extracts for transferable-course and general-education information, while articulation data and JSON APIs are part of expansion. Fulfillment remains restricted to segment/institution administrators for critical operations; institutional access has priority and additional capacity for independent requestors remains undetermined. [ASSIST Data](https://resource.assist.org/data)

The older March 2025 statement anticipated processing third-party contracts, licenses, and applicable fees during 2026–27. This was a planning target, not a guaranteed availability date; the newer August 2026 notice controls the current feasibility assumption. [ASSIST March 2025 statement](https://resource.assist.org/Portals/0/Statement%20on%20ASSIST%20Data%20Requests_2025-3-18_docx%20%281%29.pdf)

The governance policy addresses independent third parties, including businesses, and requires a license and applicable fees before extracts are provided. The existence of API specifications does not itself grant access. [ASSIST Data Governance Policy](https://resource.assist.org/Policies/Data-Sharing), [API specifications](https://resource.assist.org/Portals/0/ASSIST%20Data%20Extract%20%26%20API%20Specifications%20V3_docx.pdf)

### 10.2 Questions to obtain in writing

Contact **help@assist.org**, as identified by ASSIST's published data-request process. A short draft inquiry explaining the proposed student-facing application appears in Section 21.2. There is no record that it was sent or that a reply was received. [ASSIST request process](https://resource.assist.org/data)

Ask:

1. Can an independent student-facing commercial application apply now?
2. Is an institution-sponsored pilot possible, and what scope would it permit?
3. Which datasets, endpoints, colleges, agreement types, and historical years are available?
4. Are major articulation, course relationships, notes, and group logic included?
5. What setup, annual, licensing, and usage fees apply?
6. What rate limits, support, and availability commitments exist?
7. Can data be cached, stored, versioned, and used for change detection?
8. Are derived comparisons, scores, recommendations, and end-user displays allowed?
9. What source attribution, deep links, and branding rules apply?
10. Is a sandbox or sample licensed dataset available?
11. How are updates and corrections delivered?
12. What must happen to data, derived records, and saved plans if the license ends?
13. Are affiliate-supported student services compatible with the permitted use?

Be transparent about the intended commercial model. Present the student benefit clearly without concealing monetization.

### 10.3 No-scraping principle

The project will use authorized feeds, APIs, or expressly permitted datasets. It will not build a production database by scraping ASSIST, bypassing access controls, harvesting browser requests, copying another planner's database, or using unlicensed extraction as a substitute for access.

ASSIST's 2025 statement described performance problems from excessive unauthorized scraping. Its terms also restrict obtaining material through unintended means and using data without permission. These support the product's explicit no-scraping policy; the actual agreement should receive qualified legal review before launch. [ASSIST statement](https://resource.assist.org/Portals/0/Statement%20on%20ASSIST%20Data%20Requests_2025-3-18_docx%20%281%29.pdf), [ASSIST Terms of Use](https://resource.assist.org/Development/Terms)

Manual copying is not automatically an authorized workaround. Pre-authorization prototypes should use synthetic data, official links, and research exercises within permitted use. Public academic recommendations require the appropriate rights and verified sources.

### 10.4 Decision gate

| Outcome | Decision |
|---|---|
| Workable direct access and adequate data | Build the narrow real-data MVP |
| Institution-sponsored access only | Pursue a pilot limited to the authorized institution and scope |
| Access delayed | Continue interviews and synthetic prototypes; defer production articulation evaluation |
| Data excludes essential major rules | Re-scope claims and functionality; do not simulate completeness |
| Access denied or unaffordable | Stop this version of the engine and explicitly reconsider the product |

Potential pivots include a student-owned planning workspace with official links, a counselor appointment preparation tool, or an authorized schedule-discovery service that makes no articulation claim. These would have different value propositions and economics.

## 11. Data model, architecture, and quality

### 11.1 Source hierarchy

| Information | Authority |
|---|---|
| Covered articulation and transferability | ASSIST and the relevant official system records |
| Admissions, major-specific requirements, exceptions, deadlines | Applicable UC, CSU, or receiving-campus official source |
| Course catalog, prerequisites, offerings, registration | Offering college and authorized schedule sources |
| Student history and preferences | Student-supplied records, explicitly marked as self-reported |
| Plan evaluation | Deterministic calculations from approved source records |
| Explanation | Product text or grounded AI, citing the underlying evidence |
| Partner service details | Commercial provider, clearly outside academic authority |

When official sources appear inconsistent, show the conflict and route the precise question to the responsible institution or counselor. Do not silently choose whichever answer makes the plan look complete.

### 11.2 Minimum canonical data model

- **Institution:** stable ID, official name, system, term calendar.
- **Program target:** campus, major, degree/program identifier, effective period.
- **Course version:** institution, identifier, aliases, units, term validity, title.
- **Agreement:** sending/receiving institutions, type, academic year, source reference.
- **Requirement group:** AND/OR logic, alternatives, sequences, minimum conditions, notes.
- **Articulation relationship:** exact sending course or bundle, receiving requirement, conditions.
- **Requirement classification:** required, recommended, advisory, GE, transferable, no articulation.
- **Source record:** URL/document, owner, retrieval time, effective year, permitted-use metadata, version.
- **Course offering:** term, section, modality, schedule, prerequisites, status, independent refresh time.
- **Student history:** courses, grades, statuses, terms, self-reported provenance.
- **Plan/scenario:** targets, priorities, constraints, pinned courses, source versions, timestamps.
- **Recommendation:** courses/actions, calculation version, component values, explanation, sources.
- **Alert:** rule, severity, affected target, timing, evidence, resolution.
- **Sharing grant:** student, recipient or token, scope, expiry, revocation.
- **Correction:** report, reviewer, evidence, change, affected plans, regression case.

Preserve logic and source notes. Do not flatten an agreement to independent course pairs if the rule requires a full bundle. Repeats, withdrawals, exam credit, mixed calendars, renamed courses, and legacy agreements need explicit supported handling or a referral state.

#### Agreement-year and mixed-college semantics

- Store course-taking term, course version, agreement effective period, and target transfer term as separate fields.
- Select an agreement through a documented, expert-reviewed applicability rule supported by the relevant official policy. Do not assume the newest available agreement governs every completed or planned course.
- When the applicable year or catalog-rights treatment is unclear, show "agreement applicability requires review." Retain the candidate evidence, but do not issue a definitive satisfied/missing outcome that depends on an unverified year choice.
- Missing historical coverage is an unsupported state, not permission to substitute current equivalencies. Reassess future coursework when the relevant official records are published.
- Accept a history spanning multiple colleges, but evaluate each course against the exact sending-college and receiving-target relationship. Similar names and numbers are not identity.
- Do not combine portions of a multi-course articulation across sending colleges unless the receiving institution's applicable official guidance explicitly supports that combination. Otherwise, mark the bundle unresolved and prepare a precise counselor/institution question.
- A manual reviewer decision must record evidence, reviewer, date, and scope; it must not silently become a general rule for other students.

### 11.3 Architecture

A proposed architecture has four clear responsibilities:

1. **Ingest and validate authorized sources.** Preserve versions and report missing data.
2. **Evaluate rules and generate candidate schedules.** Apply deterministic logic and hard constraints.
3. **Explain results.** Show structured reasons first; add grounded AI only when evidence handling works.
4. **Operate and correct.** Monitor freshness, audit outputs, review errors, notify affected users, and roll back bad updates.

Academic evaluation should work without the language model. Partner selection should be a separate service that cannot alter evaluation inputs or ranking.

### 11.4 Quality and non-functional requirements

| Area | Proposed requirement |
|---|---|
| Accuracy | Counselor-reviewed gold cases; zero known critical false academic claims at pilot release |
| Evidence | All consequential academic outputs include applicable sources and versions |
| Safe failure | Unknown or contradictory data blocks definitive completion/eligibility claims |
| Reproducibility | Same plan, source versions, and engine version yield the same academic result |
| Updates | Preview changes to saved plans; retain old calculation context and rollback capability |
| Privacy | Collect only necessary data; student-controlled export, deletion, and sharing |
| Security | Encryption, least privilege, secure sessions, protected sharing tokens, audit history |
| Accessibility | Proposed WCAG 2.2 AA target, keyboard use, screen readers, non-color status labels, mobile testing |
| Performance | Set measured targets before build; aim for responsive entry and understandable calculation progress |
| Operations | Correction owner and severity rules; ability to suppress affected recommendations |
| Institutional readiness | Determine applicable contracts, privacy obligations, age handling, and campus requirements before institutional pilots |

Do not claim FERPA compliance solely because the product serves college students. Determine obligations based on actual data flows, institutional relationships, and user ages with qualified review.

### 11.5 High-value verification cases

The test set should include:

- one course satisfying different requirements across targets;
- an incomplete AND sequence;
- several OR alternatives;
- no course articulated but a requirement still present;
- required versus recommended preparation;
- an agreement missing for the selected year;
- completed coursework whose historical agreement differs from the current agreement;
- an unresolved agreement-applicability or catalog-rights question;
- a mixed-college sequence with no explicit permission to combine its parts;
- a separately documented mixed-college exception that applies only to a named case;
- course renumbering or changed units;
- a dropped, failed, or repeated class;
- semester/quarter data needing supported conversion;
- an offering that exists but has no confirmed seat;
- an academically useful course with a local prerequisite not cleared;
- target removal and scenario rollback;
- an answer the AI must decline because evidence is missing.

## 12. MVP scope and acceptance

### 12.1 Two stages of MVP

**Discovery prototype, before authorization:** one-page concept, synthetic onboarding, sample multi-target comparison, next-semester suggestion, scenario, risk card, source panel, and parent-view mockup. Clearly label demonstrations; do not present them as real enrollment guidance.

**Real-data MVP, after authorization:** a tightly bounded student planning tool that proves the next-action loop on supported pathways.

### 12.2 Proposed pilot boundary

A starting assumption is:

- two or three California community colleges;
- one major family;
- three to five campus-major targets;
- the relevant supported academic year plus only necessary historical coverage;
- manual course entry;
- a primary plan and one alternative;
- requirements audit, next-semester recommendations, basic risk, citations, save/export, and correction intake.

The first user need is CCC-to-UC. Include selected CSU targets only if data coverage, expert review, and research support the cross-system wedge. Do not expand scope merely to make the positioning sound broader.

Choose the exact colleges and major family after comparing demand, source completeness, counselor access, competition, and maintenance cost. CS/Computer Engineering is a candidate from the discussion, not a committed launch segment.

### 12.2a Academic coverage contract for P0

The default narrow MVP is a **major-preparation planning aid**, not a complete eligibility, GE, graduation, or admission audit. A source-backed receiving-campus requirement must establish whether preparation is required or recommended; an articulation relationship alone must not invent that classification.

| Requirement category | Default P0 handling |
|---|---|
| Supported major preparation and articulation | Evaluate only authorized, validated campus-major/year rules and applicable course groups |
| Prerequisite sequences and grade conditions attached to those rules | Evaluate where explicit and supported; otherwise show unresolved conditions |
| Overall transferable-unit totals, minimum eligibility GPA, and repeat/exam-credit treatment | Not certified by the major-preparation engine; show not evaluated and direct users to official checks |
| UC seven-course pattern and system-level eligibility | Not evaluated in default P0; keep a separate visible official-verification checklist |
| GE, Cal-GETC or other applicable GE patterns, and campus graduation requirements | Not evaluated in default P0; do not infer completion from major progress |
| TAG, CSU/ADT-specific conditions, campus selection criteria, and application deadlines | Separate official workflows; unmodeled unless individually added, sourced, and tested |
| Term offerings, local prerequisite clearance, registration eligibility, meeting conflicts, and seats | Independently verify where possible; otherwise show unknown and official next-check links |

Every dashboard and export must state "Major-preparation progress only" while this boundary applies. Its denominator includes only the declared evaluated requirements. Unmodeled categories appear as "Not evaluated—official review needed," never green, complete, or irrelevant.

A student reaching 100% of this narrow denominator still has other transfer checks to complete. Suppress aggregate "transfer ready," "all requirements complete," and admission/eligibility claims. Expand a category only after data rights, domain review, fixtures, and UI scope labels are updated together.

### 12.3 P0 experience

A student can enter courses, select at least two supported targets, review major-preparation gaps and unevaluated categories, obtain an explained conditional next-term suggestion, compare one meaningful change, inspect sources, and save a counselor-ready plan.

Use target-coverage counts first. The numerical Transfer Efficiency index can remain internal. Course discovery can begin with verified academic matches and official schedule links, with current offering status explicitly unknown.

### 12.4 Deferred capabilities

- Automated transcript import.
- Full statewide coverage.
- Live open-seat aggregation.
- Broad Ask Transfer chatbot.
- Full parent accounts and counselor caseload management.
- Application/TAG submission.
- Admission probability or personalized “chance me” scoring.
- Reverse destination ranking and nationwide expansion.
- Banking or credit affiliates.
- A large marketplace of partners.
- Unverified deadline notifications.

### 12.5 Definition of done

- Every supported academic outcome is reproducible and source-linked.
- Unsupported situations produce a useful uncertainty state.
- A student can create, edit, save, export, and compare a plan.
- Recommendations explain which targets benefit and why.
- No known hard constraint is silently violated.
- Counselors can audit the key logic and report corrections.
- Bad source updates can be suppressed or rolled back.
- Product value, errors, source freshness, and return behavior are measured.
- The supported college/major/year scope is visible before users invest time entering data.
- Academic categories not evaluated and enrollment-feasibility unknowns are visible in every plan and export.
- Historical and mixed-college test cases cannot produce unsupported completion claims.

## 13. Proposed homepage messaging

This is proposed copy for testing, not a claim that the product or integrations already exist.

### 13.1 Hero

**Headline:** Know what to take next. Keep more transfer options open.

**Subheadline:** Turn your California community-college coursework into a clear next-semester plan. Compare UC transfer paths, see what is missing, and understand which classes move you toward several goals.

**Primary call to action:** Build my transfer plan

**Secondary call to action:** Explore a sample plan

**Supporting line:** Free core planning for students. Clear explanations. Links to official sources.

Until live data access and validated coverage exist, change the primary call to action to **Join the pilot** and label the sample as a demonstration. Do not display institutional logos, an "official partner" badge, or an API claim without authorization. Advertise CSU support only when that coverage is genuinely available.

For the narrow live MVP, add a prominent qualifier: **"Pilot: major-preparation planning for selected colleges, majors, and years. Complete transfer eligibility and class enrollment must be checked separately."** Align the subheadline and benefit copy with that scope; broader messaging is for the validated future product.

### 13.2 The problem and the answer

**Section headline:** ASSIST shows the agreements. Your next decision still needs a plan.

**Body:** You may be comparing several campuses, balancing prerequisites, and wondering whether one class will help with more than one goal. Transfer Copilot brings those questions into one place so you can see a practical next step and the evidence behind it.

**Three-step explanation:**

1. **Tell us where you are.** Add your college, completed and planned courses, and transfer interests.
2. **Compare your options.** See remaining requirements and the courses that matter across your targets.
3. **Choose a next step.** Compare semester scenarios, flag risks, and prepare questions for your counselor.

### 13.3 Benefit blocks

- **Make your next semester count.** Understand which courses satisfy verified requirements and unlock later courses.
- **Keep alternatives visible.** See what changes if you add a campus, switch majors, reduce your workload, or cannot get a class.
- **Find an actionable route.** Explore supported course alternatives and follow links to current college schedules.
- **Understand the "why."** Open the official agreement or policy behind a recommendation.
- **Bring your support team.** Share a student-controlled summary with a parent or counselor.

Example interface text: "This course contributes to requirements for three of your selected targets. One additional target remains unverified." Any actual count must come from the supported data, not marketing copy.

### 13.4 Trust and FAQ copy

**Is this an official UC, CSU, or ASSIST service?** No. Transfer Copilot is an independent planning aid. Official institutions determine transfer credit and admission.

**Does a complete plan guarantee admission?** No. Requirement progress is not an admission probability or guarantee.

**Why is core planning free?** Optional partner services may pay us when you use a disclosed referral link. Buying a service is never required to use essential planning features, and commissions do not determine academic recommendations.

**Can I use courses from another community college?** Sometimes there may be useful alternatives. Each course must be checked against the destination's applicable agreement and any enrollment, prerequisite, residency, or sequence rules. An available section alone does not establish that it fits your plan.

**What if you cannot verify something?** We show the uncertainty and the relevant official source or counselor question rather than inventing an answer.

**Can my parent see my information?** Only what you choose to share, through access you can revoke.

Avoid: "guaranteed transfer," "maximize your admission odds," "every California course," "real-time seats," "official ASSIST integration," or "AI counselor" implying professional authority unless the underlying claim is appropriately supported. Test "Transfer Copilot" against "College Transfer Planner" for comprehension and discoverability; conduct naming, domain, and trademark checks before commitment.

## 14. Free-for-students model and partner programs

### 14.1 Monetization thesis

A student planning a transfer may also need help with a difficult class, writing, applications, housing, or the move to a university. A free planner can introduce useful optional services at the moment of need.

The intended value exchange is straightforward: the student receives free essential planning; the product earns disclosed referral revenue when a suitable service is voluntarily used. The academic recommendation engine remains commercially neutral.

This is an opportunity to test, not evidence that affiliate revenue will cover the cost of reliable academic data and support. Program existence does not mean acceptance of this project, permission for every acquisition channel, or a guaranteed payout.

### 14.2 Programs discussed and their current planning status

The following is a dated research inventory, not a list of secured partners. Reconfirm the applicable offer and agreement immediately before implementation.

| Program/category | Relevance and possible placement | Published evidence or commercial status | Planning decision |
|---|---|---|---|
| **Wyzant — tutoring** | Optional help beside a challenging course or a student-requested study-support panel | Its affiliate FAQ describes attribution to a new student's first completed lesson and free application. A separately published terms page uses a different lead-based payment description; do not assume one fixed public rate applies. [FAQ](https://support.wyzant.com/policies-and-contact-us/affiliate-support/affiliate-platform-faqs/), [application](https://www.wyzant.com/partner/apply), [terms](https://www.wyzant.com/partner/termsandconditions) | Strong early fit. Obtain the actual offer, qualifying event, attribution rules, payout, and channel restrictions. |
| **Grammarly — writing support** | Optional clarity, grammar, and revision assistance during applications | Published standard economics are $0.20 for a qualifying free signup and $20 for a Pro upgrade, with a stated 90-day cookie window; approval and program conditions apply. [Program](https://www.grammarly.com/affiliates), [commission information](https://support.grammarly.com/hc/en-us/articles/360037054452-Commissions-and-remittance-options) | Attractive lightweight test; promote authentic student writing, never essay ghostwriting or guaranteed admission. |
| **Coursera — supplemental online learning** | Academic preparation, exploration of a major, or career skills | The public program advertises 15–45% on eligible purchases and a 30-day window; subscription commission generally applies to the first month, not recurring renewals. Confirm eligibility for the specific product. [Program](https://www.coursera.org/about/affiliates) | Useful supplement; never imply a course satisfies UC/CSU credit requirements without destination-specific official evidence. |
| **edX — supplemental online learning** | Preparation, enrichment, and verified-certificate learning | Published terms describe a free Impact program, a 60-day window, and standard/coupon rates of 10%/5%; exclusions include master's degrees and boot camps. [Program](https://www.edx.org/affiliate-program) | Similar role to Coursera. Verify current eligible products and net commission. |
| **Empowerly and other admissions counseling** | Optional human help with applications, transfer strategy, or essay review | Empowerly has a partnership route. Its referral terms do not establish a universal public publisher payout; applicable rewards are specified in its platform, with restrictions requiring review. [Partnerships](https://empowerly.com/partnerships/), [referral terms](https://empowerly.com/referrals-terms-and-conditions/) | Potentially higher-value later relationship. Confirm transfer-specific expertise, affordability, commercial compatibility, and student outcomes. |
| **Sophia Learning — alternative course provider** | Discussed as an education partnership possibility | Public partnerships address institutions, employers, schools, and communities; this is not proof of a standard open publisher affiliate offer. [Partnerships](https://partnerships.sophia.org/) | Treat as exploratory. A provider's credit recommendation is not destination acceptance; do not recommend it as a CCC-to-UC shortcut without specific official confirmation. |
| **Amber and other housing providers** | After destination selection, when housing is a real task | Amber advertises a consumer referral reward of £50 under qualifying conditions. That is not a verified commercial publisher commission. Separate university partnership options exist. [Consumer referral](https://amberstudent.com/referral-programme), [university partnerships](https://amberstudent.com/university-partnerships/) | Explore later; establish California inventory, publisher eligibility, cancellations, payout timing, and currency. |
| **Bold.org and scholarships** | Scholarship discovery and funding checklists | Bold.org presents custom partnerships, not a standard guaranteed affiliate payout. [Partnerships](https://bold.org/partnerships/) | Useful engagement and student value even with little direct revenue. Do not treat scholarship availability as paid placement or sell academic profiles. |
| **Banking, including services such as SoFi** | Potential transition-related service mentioned during exploration | No compelling, verified program and offer were established for this project | Defer. Financial promotions add suitability, trust, and compliance concerns; the business should not depend on lending or credit-card commissions. |
| **Other services** | Textbooks, software, laptops, moving/storage, internships, career support, and relevant test preparation | Categories discussed or adjacent hypotheses; no specific approved offers established | Add only after demonstrated student demand and partner diligence. Keep the first launch small. |

### 14.3 Sequence and placement

Start with one or two low-friction, relevant categories: tutoring and writing support. Test supplemental learning only with a clear distinction between preparation and transferable academic credit. Negotiate counseling after there is evidence of qualified demand. Housing becomes relevant later in the student's journey; scholarships can be valuable before they monetize.

Use a separate "Optional support" module, not a sponsored item disguised as a required course or urgent academic alert. Students should be able to dismiss it without losing planning functionality.

Never infer a need to buy tutoring solely from a grade, or pressure a student with "your transfer is at risk unless you purchase." Show free campus tutoring, writing centers, financial-aid offices, and counseling alongside commercial alternatives where relevant.

### 14.4 Commercial operating requirements

For each proposed partner, record:

- Application status and legal entity.
- Eligible countries, students, products, and traffic channels.
- Conversion definition: lead, first lesson, purchase, booking, or completed stay.
- Attribution window, cross-device behavior, consent dependencies, and duplicate rules.
- Commission, reversals, cancellations, payout threshold, currency, and delay.
- Paid-search, paid-social, brand bidding, email, and coupon restrictions.
- Required disclosures and approved creative.
- Data sent to the provider; minimum necessary identifiers only.
- Support escalation, termination rights, and replacement options.

For Wyzant specifically, the Affiliate FAQ states a blanket restriction on PPC/SEM, including paid social, while the separate partner-terms page describes a different PPC framework. Resolve this discrepancy in writing and follow the accepted network/program agreement before any paid acquisition connected to the offer. Do not assume all affiliate programs permit paid-ad funnels. [Wyzant Affiliate FAQ](https://support.wyzant.com/policies-and-contact-us/affiliate-support/affiliate-platform-faqs/), [separate partner terms](https://www.wyzant.com/partner/termsandconditions)

Empowerly's published referral terms include a broad competitive-activity restriction during the agreement and for one year afterward. This could conflict with operating Transfer Copilot. Require qualified legal review of the actual proposed agreement before signing; a custom partnership arrangement may have different terms. Do not assume the public referral agreement is commercially compatible with this product. [Empowerly referral terms](https://empowerly.com/referrals-terms-and-conditions/)

Academic targets, grades, transcripts, and risk alerts must not be sent to partners merely because a student viewed a referral. Optional tracking consent and commercial disclosures need a separate privacy/legal review before launch. No partner outreach, application, or message has been sent as part of this brief.

## 15. Business and revenue hypotheses

### 15.1 Original illustrative affiliate scenario

The conversation explored the following model for **10,000 active students in one year**. These are assumed full-cohort conversion rates, not observed funnel performance. Different rows may include the same student.

| Category | Assumed annual qualifying conversions | Assumed payout | Illustrative annual gross revenue |
|---|---:|---:|---:|
| Tutoring | 5% = 500 | $10 | $5,000 |
| Grammarly Pro | 5% = 500 | $20 | $10,000 |
| Online courses | 3% = 300 | $20 | $6,000 |
| Admissions counseling | 2% = 200 | $50 | $10,000 |
| Housing | 1% = 100 | $50 | $5,000 |
| **Total** | **1,600 events; not necessarily unique students** | — | **$36,000/year** |

Only the Grammarly $20 figure aligns with a published standard payout in the research snapshot; even it is subject to eligibility and terms. The other dollar amounts are modeling assumptions, not established offers. In particular, the housing assumption is not a conversion of Amber's consumer £50 reward into a publisher contract.

This scenario yields **$3.60 gross revenue per annual active student**, before reversals, operating costs, data licensing, taxes, or acquisition costs. It could support a modest project under favorable costs; it does not establish a venture-scale business or founder income.

### 15.2 Reconciling earlier revenue ambitions

The conversation also floated $10–$30 lifetime revenue per student and, in another framing, $20–$50 over a two-year journey. These are aspirations requiring evidence, not conclusions of the table above.

Even if the same $3.60 annual economics repeated for two years, the result would be $7.20 gross per student before attrition. Repetition is not guaranteed: many referral offers pay only for a new customer or first purchase, and students may use the product during only one planning cycle.

Do not mix annual active users, cumulative signups, two-year cohorts, and lifetime value. Report cohort revenue over a stated observation period and distinguish collected cash from pending commissions.

### 15.3 Bottom-up funnel model

For each category, estimate:

**Active students × eligible fraction × relevant offer exposure × outbound click rate × qualifying conversion rate × net approved payout**

For example, a purely hypothetical tutoring funnel of 10,000 × 40% × 50% × 10% × 20% × $10 produces $400, far below the original $5,000 tutoring assumption. This is not a forecast; it demonstrates why multiplying a broad user count by an optimistic conversion rate can overstate revenue.

Track the actual stages independently. Use partner-confirmed conversions, account for attribution loss, and avoid double-counting multiple events that earn only one commission.

### 15.4 Costs and unit economics

Model at least:

- ASSIST licensing, access, and ongoing data-maintenance costs.
- Domain-specialist review and academic-rule quality assurance.
- Engineering, hosting, storage, security, and observability.
- Model usage, especially document extraction and chat.
- Customer support, correction handling, and source freshness work.
- Content, distribution, affiliate operations, and legal/privacy review.

**Contribution per active student = realized net referral revenue − variable service cost.**

**Operating break-even active students = annual fixed costs ÷ positive contribution per active student.**

Illustration only: at $3.60 realized annual revenue and $1.20 variable cost, contribution is $2.40; $60,000 fixed annual costs would require 25,000 similarly monetizing annual active students. If variable cost is $3.60 or higher, scale alone does not fix that model.

Maintain a low/base/high model by cohort. Stress-test missing partner approvals, lower conversion, longer sales cycles, cancellations, paid acquisition, and data fees. An organic distribution strategy can reduce cash acquisition expense but still consumes founder or staff time.

### 15.5 Optional later business models

- **Institutional/counselor subscriptions:** roster workflows, consented plan review, triage, and reporting, subject to procurement and security requirements.
- **Clearly labeled sponsorships:** relevant resources without influence over academic rankings.
- **Optional family convenience features:** potentially paid collaboration or organization tools, but never a paywall around essential academic risks or evidence.
- **Partnership/licensing services:** only where source contracts allow the proposed use.

An earlier $29/year paid-feature thought experiment would generate $145,000 gross with 5,000 paying customers. It is arithmetic, not demand evidence, and is not the recommended starting model. Preserve free core planning; revisit optional pricing only after testing whether people value the proposed paid capability.

Do not use student-data sales as a fallback monetization model.

## 16. Acquisition and distribution hypotheses

The first distribution advantage may be lived experience and useful advice rather than broad advertising.

1. **Founder-led discovery:** recruit students and families navigating the same CCC-to-UC process, with consent and without exposing any individual student's records.
2. **Counselor and transfer-center relationships:** ask for workflow feedback and narrowly scoped pilots; do not imply institutional endorsement before it exists.
3. **Source-backed educational content:** explain common transfer-planning questions, with institution/year context and links to official guidance.
4. **Student communities:** contribute useful explanations under community rules; disclose affiliation, avoid spam and unsupported success claims.
5. **Shareable plans:** student-controlled exports and permissioned summaries can create referrals while helping families and counselors.
6. **Campus-major landing pages:** only for genuinely supported pathways, maintained against the correct data year; avoid mass-generated pages that suggest coverage the engine lacks.

Potential content themes include comparing several campus-major targets, preparing for a counselor meeting, planning around a prerequisite sequence, and asking the right questions when a course is unavailable.

Measure acquisition by activated, supported students—not impressions or raw signups. Avoid paid scaling until retention, academic reliability, partner permissions, and positive contribution are demonstrated. The newsletter usage figure discussed earlier describes ASSIST's reach, not an addressable paid-customer count for this product.

## 17. Validation plan

All sample sizes and thresholds below are proposed pilot decisions, not industry benchmarks. Set them before collecting results, document deviations, and do not treat a small convenience sample as proof of broad demand.

### 17.1 Stage A — confirm the problem and the data path

**Interviews:** Begin with approximately 12–15 students, 5–8 parents, and 4–6 counselors. Include students with different majors, workloads, transfer timing, and levels of family involvement. Do not let a single family's experience be the only evidence.

Ask participants to reconstruct a recent planning decision:

- What were they trying to decide?
- Which sources and tools did they use?
- Where did information conflict or become unclear?
- What did they do when a course was full or unavailable?
- Which alternatives did they abandon, and why?
- What would they need to trust a recommendation?
- Would parent sharing help, and what should remain private?
- Which optional support services, if any, did they actually use?

Avoid leading with a feature tour or asking only whether the idea "sounds useful." Record actual workarounds, errors, delay, and repeated tasks.

In parallel, obtain authoritative answers about data access and permitted use. A strong interview response does not remove this dependency.

**Decision gate:** Continue if several independent participants demonstrate a recurring, costly next-semester decision problem and there is either a credible authorized data path or a clearly bounded synthetic research path. Revise the concept if existing tools already solve their actual task well.

### 17.2 Stage B — test the decision experience

Build a clickable prototype using synthetic cases. Run approximately 8–12 task-based sessions:

1. Enter a simplified course history.
2. Select multiple campus-major targets.
3. Compare two next-semester options.
4. Identify the most important unresolved issue.
5. Open a source.
6. Explain the recommendation in the participant's own words.
7. Share a redacted summary or prepare a counselor question.

Compare against the participant's existing workflow where practical. Measure completion, time, source comprehension, and confusion between progress and admission likelihood.

**Suggested gate:** At least 8 of 10 participants can identify a reasonable next step and its key caveat without coaching. Any repeated interpretation of a progress score as admission odds is a design failure requiring revision, even if participants like the interface.

Do not ask participants to enroll in an actual course based on synthetic or unvalidated recommendations.

### 17.3 Stage C — concierge pilot with authorized information

After the data gate is satisfied, pilot with approximately 20–30 students in the selected college/major/year scope. Obtain consent and use a counselor-reviewed process. Keep a written record of what is automated, manually verified, or unresolved.

Provide:

- A source-linked target comparison.
- Two feasible next-semester scenarios.
- An uncertainty/risk summary.
- A student-approved shareable plan.
- A follow-up during the next relevant planning event.

Observe what students actually change, what questions they still ask, and whether the output saves counselor time. Do not substitute self-reported satisfaction for academic correctness.

**Suggested evidence targets:**

- Zero unresolved critical false "satisfied" outcomes in the reviewed launch corpus.
- Every displayed academic recommendation has the required source/version context.
- Most participants can identify at least one specific improvement over their existing process.
- At least half voluntarily return or request an update during the next relevant planning window.
- Counselors judge the output useful as a discussion aid and can readily audit it.

Zero observed critical errors in a small pilot does not prove zero future risk. Maintain regression testing, monitoring, correction handling, and scope restrictions.

### 17.4 Stage D — validate distribution and optional revenue

Test two acquisition channels separately, such as counselor introductions and useful source-backed content. Evaluate activation and retention, not just waitlist size.

Only after partner approval, test one or two optional support modules. Measure qualified exposure, clicks, approved conversions, cancellations, realized revenue, and whether users still understand commercial neutrality.

Ask students whether the resource was useful and appropriately timed. Remove placements that reduce trust, even if they attract clicks.

Small samples may show whether tracking works but will rarely establish stable revenue per student. Keep revenue hypotheses provisional until enough eligible traffic and payout cycles exist.

### 17.5 Validation outputs

Produce an interview synthesis, task-session findings, competitor task comparison, data-access decision log, counselor-reviewed test corpus, pilot outcomes, funnel economics, and a written go/pivot/no-go recommendation. Record disconfirming evidence as prominently as positive comments.

## 18. Success metrics and guardrails

### 18.1 Primary product outcome

**Supported students who finish a source-backed next-semester decision during a planning cycle.**

A completed decision means the student has selected or explicitly deferred a scenario, reviewed material unresolved issues, and saved/exported the result. It does not mean the student has been admitted, registered successfully, or had credit officially evaluated.

### 18.2 Metric definitions

| Area | Metric | Why it matters |
|---|---|---|
| Activation | Percentage of supported starters who enter enough courses, choose targets, and view a valid first plan | Shows whether the initial experience reaches real value |
| Decision usefulness | Percentage who can explain their next step and the main caveat in task testing | Tests understanding rather than surface satisfaction |
| Academic quality | Critical errors, false "satisfied" outcomes, unresolved rule exceptions, and time to correction | Prevents harmful confidence |
| Evidence | Share of supported academic claims with a usable source, year, and verification status | Measures auditability |
| Freshness | Age of each active source and number of plans affected by stale or changed data | Makes maintenance visible |
| Retention | Return at the next relevant registration/application planning event | Better aligned to the seasonal workflow than daily use |
| Actionability | Scenario saves, counselor-question exports, and verified course-schedule visits | Indicates useful downstream action |
| Sharing | Student-initiated shares, recipient use, and successful revocations | Tests collaboration without treating surveillance as engagement |
| Counselor value | Review time, correction volume, and willingness to continue a pilot | Tests the institutional workflow |
| Revenue | Approved net commission per activated student and per eligible exposure | Avoids equating clicks with revenue |
| Sustainability | Contribution per active student, support minutes, and data cost per covered pathway | Tests the cost of trustworthy delivery |
| Equity/access | Completion and usability across device, accessibility, and student-constraint groups | Finds who the default workflow excludes |

Define critical academic errors in advance—for example, marking an unsatisfied mandatory course group as complete or recommending an infeasible sequence without a warning. Cosmetic wording errors belong in a different severity class.

### 18.3 Guardrails

- Never optimize affiliate click-through at the expense of academic relevance.
- Do not increase recommendation confidence merely to improve activation.
- Do not hide unresolved requirements to improve completion statistics.
- Separate self-reported planned courses from completed, verified coursework.
- Do not reward excessive units as "efficiency" when a smaller feasible plan meets the student's goals.
- Evaluate cohorts by planning season; avoid pressuring students into unnecessary daily engagement.

## 19. Phased roadmap

Time ranges are indicative work estimates, not delivery promises. External data approval, specialist availability, and academic complexity may dominate the calendar. Each phase is gated by evidence, not the expiration of a deadline.

| Phase | Indicative scope | Deliverable | Exit condition |
|---|---|---|---|
| **0 — Feasibility and discovery** | First 2–4 weeks of active work | Student/counselor interviews, competitor task audit, written ASSIST inquiry, permitted-use matrix, initial cost model | Clear target problem and documented data path or a synthetic-only research decision |
| **1 — Prototype** | Next 2–3 weeks | Homepage, onboarding, multi-target comparison, next-semester scenarios, source/unknown states using synthetic data | Users understand the next action and limitations; critical UX confusion resolved |
| **2 — Narrow validated pilot** | Approximately 4–8 weeks after adequate access | Authorized data for a few pathways, deterministic rule evaluation, explainable next-course suggestions, export/sharing, basic risk flags | Reviewed quality corpus and useful real-student pilot results |
| **3 — Focused public beta** | Following 1–2 planning cycles | Reliable accounts, scoped onboarding, source updates, correction operations, optional approved affiliates | Sustainable support, event-based retention, and measured revenue funnel |
| **4 — Decision depth and collaboration** | After beta evidence | Richer scenarios, carefully validated cross-college options, consented parent view, counselor pilot | Evidence that added complexity improves outcomes and can be maintained |
| **5 — Institutional scale and expansion** | Conditional | Counselor subscriptions, expanded majors/colleges and CSU coverage, licensed schedule integrations | Repeatable economics, data rights, reliability, and institutional demand |
| **6 — Broader geography or marketplace** | Optional long term | Additional transfer systems and relevant services | A proven California workflow and an independent evidence/licensing case for each expansion |

Do not make an AI chat interface a prerequisite for the core planner. A reliable form-based workflow with clear explanations is a valid early product. Add conversational input when it demonstrably reduces friction without weakening auditability.

Cross-college course discovery can start with official schedule links and manual verification labels. Live inventory, seat alerts, or automated registration require separate authorized data and integration work; they are not assumed consequences of ASSIST access.

## 20. Risks, mitigations, and open decisions

### 20.1 Risk register

| Risk | Why it matters | Mitigation or trigger |
|---|---|---|
| **ASSIST access unavailable or uneconomic** | Could prevent the core product from operating as proposed | Treat as a business gate; pursue approved arrangements; use synthetic research only while unresolved; do not scrape |
| **Academic misinterpretation** | Wrong planning advice can cost time, money, and transfer opportunities | Narrow coverage, deterministic evaluation, source versions, specialist review, unknown states, and incident response |
| **Requirements or agreements change** | Previously useful plans can become stale | Version all inputs; detect changes; identify affected plans; require reassessment rather than silently replacing evidence |
| **Competitors close the gap** | Comparison, AI, and basic scenarios are already available | Benchmark actual tasks; focus on verified next-semester decisions and practical execution; avoid a feature-count strategy |
| **Availability data is weak** | A recommended course may not be offered or enrollable | Separate articulation from term offerings and seats; use official links and timestamps; avoid false live claims |
| **Overloaded or inequitable recommendations** | A high-coverage schedule may be unrealistic for a working student | Hard workload and availability constraints; student-controlled priorities; explain tradeoffs and permit deferral |
| **Score is mistaken for admission odds** | Can create misleading certainty | Use explicit labels; keep eligibility, coverage, confidence, and admission distinct; test comprehension; omit the score if necessary |
| **Affiliate revenue is too small** | Free student use may not cover source and review costs | Track realized contribution; limit scope; explore proven institutional demand; do not compensate through manipulative offers |
| **Commercial conflict harms trust** | Academic guidance loses credibility if it appears pay-to-play | Separate academic ranking from offers; disclose compensation; include free resources; audit recommendations |
| **Privacy or sharing failure** | Transcripts, grades, goals, and family relationships are sensitive | Data minimization, access controls, revocation, safe exports, retention limits, and specialist privacy/security review |
| **AI fabricates academic facts** | Fluent errors can appear authoritative | Grounded responses, source checks, deterministic calculations, abstention, and regression evaluation |
| **Counselor adoption is slow** | Procurement and review needs may exceed assumptions | Co-design a small workflow; measure time saved; defer institutional sales forecasts |
| **Seasonality and attrition** | Students need help at specific moments, not continuously | Event-based retention and cohort economics; avoid assuming recurring annual commissions |
| **Founder bandwidth** | Data stewardship and support can outweigh software work | Start with few pathways, document operations, budget human review, and set explicit expansion gates |

Disclaimers are necessary context, not a substitute for correct functionality or appropriate professional review.

### 20.2 Privacy and governance design questions

Before launch, obtain qualified guidance on applicable privacy, educational-record, consumer-protection, accessibility, and advertising obligations. This brief sets product safeguards; it does not determine which laws apply to a particular operating model.

Resolve the minimum account information, whether transcript upload is necessary, retention/deletion schedules, age-related requirements, student consent for sharing, institutional access boundaries, analytics consent, and vendor handling of academic data.

Default sharing should be read-only, scoped, and revocable. A parent does not receive automatic access merely because they pay for a service. Counselor roster access requires a defined authorization model; knowing a student's email address is not sufficient.

Do not use private student records for model training or broad product research without a separately established, appropriate basis and clear permission where required.

### 20.3 Open decisions

1. Which initial community colleges and major create the best combination of real demand, available data, and manageable rule complexity?
2. Should the first live version be strictly UC-focused, or include a small CSU comparison only where independently validated?
3. Can authorized ASSIST data support automated derived recommendations, storage, screenshots, exports, and commercial use?
4. What are access fees, permitted refresh cadence, and obligations when a license ends?
5. Who owns academic review and signs off on release coverage?
6. Does a numeric Transfer Efficiency Score help users, or is a transparent comparison checklist clearer?
7. Which workload, commute, online/in-person, and timing constraints must be hard constraints in the first optimizer?
8. Is account creation necessary before value is shown, or can a local/anonymous demonstration work?
9. What is the minimum useful student-controlled parent sharing feature?
10. Which affiliate offers will actually approve this business and audience?
11. What degree of paid or institutional monetization remains consistent with free essential planning?
12. What evidence would justify stopping, narrowing, or changing the concept?

## 21. Concrete next steps and implementation backlog

### 21.1 First ten actions

1. **Confirm this brief as the working baseline.** Mark retained ideas, provisional ideas, and explicit exclusions. Keep the origin story separate from assumptions about all students.
2. **Prepare and send the ASSIST inquiry.** Request a written answer on independent commercial eligibility, timing, fees, scope, and derived-use rights. Sending it is a future owner action, not something completed by this document.
3. **Choose a provisional pilot slice.** Shortlist 2–3 community colleges, one major family, and 3–5 campus-major targets; finalize only after data and review feasibility.
4. **Recruit discovery participants.** Start with students, parents, and counselors; protect the privacy of early design partners and avoid recruiting only friends who will affirm the idea.
5. **Run a competitor task audit.** Attempt the same representative planning task in each relevant product. Record what works, what is missing, and the date.
6. **Build synthetic planning cases.** Include simple completion, grouped alternatives, partial sequences, conflicting goals, unavailable courses, and unsupported data.
7. **Create a clickable prototype.** Focus on target comparison, next-semester decisions, sources, unknowns, and sharing; do not start with a large affiliate directory.
8. **Set up the quality and decision logs.** Define critical errors, academic-review ownership, source freshness rules, and a release checklist.
9. **Verify the first commercial offers.** Start with Wyzant and Grammarly, then a supplemental-learning program if useful; document actual contract terms before modeling revenue.
10. **Review go/no-go evidence.** Decide whether to proceed to a narrow authorized pilot, continue synthetic validation, change scope, or pause the business.

### 21.2 Draft ASSIST inquiry

**Subject:** Authorized data access inquiry — independent California transfer-planning product

Hello ASSIST team,

I am evaluating an independent planning tool for California community-college students comparing UC transfer pathways. The concept grew from firsthand experience using ASSIST. It would explain official requirements, compare next-semester scenarios, and link students back to the applicable official sources.

We do not intend to scrape ASSIST or bypass access restrictions. Before building a production integration, could you clarify:

- Whether an independent commercial developer can apply for authorized articulation-data access, and the expected timing.
- Which datasets, agreement years, rule structures, and updates would be available.
- Licensing, fees, application requirements, and any institutional sponsorship requirements.
- Whether storage, normalization, derived recommendations, student exports, and source-linked explanations are permitted.
- Whether a limited pilot, sandbox, or licensed sample dataset is available.
- Attribution, security, retention, and termination requirements.
- The appropriate next contact or application process.

Thank you.

Use the contact information currently published by ASSIST when sending. Do not include any student's transcript or other personal academic records in an initial inquiry. [ASSIST resource site](https://resource.assist.org/)

### 21.3 Initial build backlog

This is a proposed sequence for the later implementation task. No site or production system has been built as part of this brief.

| Backlog item | Acceptance evidence | Dependency |
|---|---|---|
| Define supported-pathway registry | College, campus, major, academic year, coverage status, and reviewer visible | Scope and rights |
| Define canonical course and requirement schemas | Examples handle AND/OR groups, sequences, units, and versioned identifiers | Authorized sample or synthetic specification |
| Implement deterministic evaluation | Reviewed fixtures pass; unsupported facts remain unknown | Schema and domain review |
| Implement target comparison | Same course history evaluated separately per valid target/year | Rule evaluator |
| Implement next-semester ranking | Hard constraints respected; explanations identify marginal benefits and tradeoffs | Valid prerequisites and student constraints |
| Implement scenario copies and comparison | Baseline preserved; changed inputs and outcomes clearly shown | Saved plans |
| Implement evidence and uncertainty UI | User can inspect source/version for supported claims and understand gaps | Provenance model |
| Implement risk classification | Academic risks distinct from missing-data warnings; no admission prediction | Valid rules and sources |
| Implement export and consented sharing | Scope preview, recipient permissions, revocation, and safe defaults tested | Account/access model |
| Add official schedule navigation | No unsupported enrollment or live-seat claims | Verified source links |
| Add analytics and corrections | No unnecessary academic data in events; incident triage documented | Privacy design |
| Add optional partner module | Approved contract, disclosure, consent handling, neutrality tests | Commercial and privacy review |
| Prepare pilot operations | Reviewer, support route, rollback, and coverage limits documented | Quality gate |

### 21.4 Initial decision rules

- **Go:** authorized usable data, meaningful task improvement, auditable correctness, and a plausible cost path.
- **Narrow:** users value the workflow but coverage, availability, or family/counselor complexity is too broad.
- **Pivot:** demand is mainly for a counselor-preparation tool, a manual planning service, or another workflow with a valid authorized-data model.
- **Pause:** no acceptable data rights, unresolved material academic errors, or a cost structure with no credible funding path.

Do not substitute an unofficial extraction process for an unmet permission gate.

## 22. Source notes and decision history

### 22.1 Provenance and reading guidance

The starting material is an earlier exploratory discussion, not a separate validated market study. It explored affiliate-supported businesses before focusing on a transfer-planning problem encountered firsthand.

The current brief consolidates that reasoning and adds implementation-oriented structure. It does not claim the original conversation already settled every requirement. The score formula, testing thresholds, feature priorities, data schemas, acceptance criteria, and phase estimates are proposed specifications for discussion.

External statements were checked on September 11, 2026. Dates on a source describe that source, not a guarantee that access or an offer remains available on launch day. Prefer the provider's applicable current written agreement over a marketing page or this brief.

### 22.2 Primary reference index

**Official planning and academic data**

- [ASSIST resource site](https://resource.assist.org/) — official context and links.
- [ASSIST Data](https://resource.assist.org/data) — current access status at the research date; updated August 19, 2026.
- [ASSIST Data Sharing](https://resource.assist.org/Policies/Data-Sharing) — licensing policy.
- [ASSIST Terms](https://resource.assist.org/Development/Terms) — permitted-use boundaries.
- [ASSIST FAQ](https://resource.assist.org/FAQ) — interpretation, schedules, and service scope.
- [ASSIST March 18, 2025 data statement](https://resource.assist.org/Portals/0/Statement%20on%20ASSIST%20Data%20Requests_2025-3-18_docx%20%281%29.pdf) — historical roadmap; do not treat its forecast as present access approval.
- [ASSIST API and data-extract specifications, version 3](https://resource.assist.org/Portals/0/ASSIST%20Data%20Extract%20%26%20API%20Specifications%20V3_docx.pdf) — technical context, not a granted license.
- [Winter 2026 ASSISTance newsletter](https://resource.assist.org/Portals/0/ASSISTance%20Newsletters%20and%20Coverpages/Winter%202026_ASSISTance%20Newsletter.pdf) — usage and product-development context.
- [UC Transfer Admission Planner](https://uctap.universityofcalifornia.edu/students/) and [UC counselor tools](https://uctap.universityofcalifornia.edu/counselors/reports/) — official UC workflows.
- [CSU transfer resources](https://www.calstate.edu/apply/transfer), [major requirements and ADT progress](https://help.liaisonedu.com/CSU_Transfer_Planner_Student_Help_Center/Viewing_Your_Transfer_Plan/Major_Requirements_and_ADT_Progress), and [transfer timeline calculator](https://help.liaisonedu.com/CSU_Transfer_Planner_Student_Help_Center/Viewing_Your_Transfer_Plan/Transfer_Timeline_Calculator) — official CSU planning capabilities.

**Independent competitors**

- [TransferPlanner.app](https://www.transferplanner.app/) — direct multi-target planning competitor.
- [TransferAI](https://aitransfer.app/) — agreement explorer and AI-oriented planning interface.
- [Plan My Transfer](https://www.planmytransfer.com/) and [terms](https://www.planmytransfer.com/terms) — broader California planning product.
- [Plan My Transfer founder's May 2026 post](https://www.reddit.com/r/TransferStudents/comments/1t9um61/i_spent_the_last_few_years_building_a_free_ccc_to/) — self-reported features and adoption; not independently audited.
- [Transferology](https://www.transferology.com/), [CollegeSource product overview](https://collegesource.com/transfer-tools/transferology/), and [Transferology FAQ](https://transferology-support.collegesource.com/article/3182-frequently-asked-questions) — national transfer-matching and institutional context.

Partner-program sources are linked beside the corresponding claims in Section 14. Their inclusion is not an endorsement, secured relationship, or statement that every listed product is suitable for a particular student.

### 22.3 Decisions retained from the conversation

- Start from a real family/student problem, not merely from an affiliate category.
- California community-college transfer is the initial focus; the originating need is UC planning.
- Keep core student planning free.
- Help students decide what to do next across multiple transfer options.
- Treat AI as the interface and explanatory layer, not the authority.
- Make official evidence, uncertainty, and counselor review part of the product.
- Explore parent and counselor collaboration without removing student control.
- Investigate legitimate ASSIST data access; do not scrape.

### 22.4 Ideas deliberately kept provisional

- The exact name, pilot colleges, major, target campuses, and launch coverage.
- The numeric Transfer Efficiency Score and its weights.
- Optimizer sophistication and availability integrations.
- Timing and pricing of counselor/family offerings.
- Affiliate conversion rates, average payout, and lifetime revenue.
- Whether a small free planner can become a sustainable standalone business.
- Any nationwide expansion.

### 22.5 Corrections and cautions carried forward

The early concept was promising but the competitive overlap is substantial. Basic AI guidance, scenarios, comparison, alerts, and counselor tools cannot be presented as uniquely owned features. The opportunity is a better integrated and trustworthy decision workflow, demonstrated through task testing.

Public ASSIST API documentation is not the same as independent-developer access. Older access forecasts must not be presented as a current approval.

A consumer housing referral reward is not a publisher contract; a custom partnership page is not a confirmed commission; a supplemental online course is not automatically transferable credit.

Finally, the illustrative affiliate model produces modest revenue per annual active student. Build decisions should use actual approved offers, observed cohorts, data costs, and student value—not the most optimistic numbers from an exploratory conversation.

---

**Working product thesis:** A trusted, free planning companion that helps a California community-college student answer, "What should I do next to maximize my transfer options?" through clear, feasible, source-backed decisions.
