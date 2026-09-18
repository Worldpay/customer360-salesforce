# C360 Requirements Registry (Tier 1 - Binding business requirements)

**Last updated:** 2026-08-13

## How to use this file

This is the curated, weighted list of C360 business requirements. It sits **below** `salesforce-hard-constraints.md` (a requirement can never override a hard constraint) and **above** design and delivery. It exists to scope the prototype and the developer quote backlog.

Each requirement carries a **priority weight** reflecting importance and source seniority, its **provenance**, the **session** it came from, a **status**, and a **Salesforce feasibility** flag (owned by Charlie/Jordan).

This is a working draft seeded from `01 Workstream context/C360 Target UI-UX Requirements (2).docx`. It is **not** the final list - Steve is sending ~5 formal business requirements, and Liam has a ~200-line list; both will be merged and deduped here.

## Weighting model

| Priority | Who / what it reflects | Binding? |
|----------|------------------------|----------|
| **P0 - Firm** | Firm requirement (Cam) or Ann/Vicky sign-off item | Yes, once confirmed |
| **P1 - Owner vision** | Steve, day-to-day owner driving requirements | Strong - drives scope |
| **P2 - Validated RM need** | Direct RM input (user testing, RM interviews) | High - RMs are the users |
| **P3 - Structural** | Dylan/Steve working-session structure decisions | Medium - shapes architecture |
| **P4 - Open / TBD** | Needs Steve's top-5 or Charlie feasibility before committing | No - not committed |
| **Parked** | Brain-dump, transcript noise, or out-of-phase scope | No |

Provenance labels follow the project rule: `[Client meeting]`, `[Client interview]`, `[Client material]`, `[Internal PS]`, `[Background/industry]`. Charlie's design opinions are tagged `[SF preference - not confirmed constraint]`.

## Registry

| ID | Requirement | Priority | Provenance | Source session | Status | SF feasibility |
|----|-------------|----------|------------|----------------|--------|----------------|
| R01 | Homepage everyone lands on, showing top alerts/actions on login; branches into ~6 panels (churn, cross-sell, revenue boost, fraud, etc.) | P1 | [Client meeting] | Steve vision; Dylan/Steve 05/08 | Draft - awaiting Steve top-5 | TBC (Charlie/Jordan) |
| R02 | Modular / extensible navigation: homepage -> use-case -> subcomponents, able to add future use cases/blocks | P3 | [Client meeting] | Dylan/Steve 05/08 | Draft | TBC - explicit feasibility question |
| R03 | Multi-product single hub (not per-product logins); Revenue Boost as pilot, then FX, then FraudSight | P3 | [Client meeting] / [Client interview] | RM user testing 06/08; internal demo 07/08 | Draft | TBC |
| R04 | One-click export of insights to PowerPoint / QBR pitch deck | **P0** | [Client meeting] | Cam firm requirement | Draft - firm req, not yet Ann/Vicky signed | TBC - feasibility path undefined |
| R05 | Explainability built into the insight views (why this alert / why this cross-sell) | P2 | [Client interview] | RM user testing 06/08 | Draft | TBC |
| R06 | Project-management / action-log per opportunity: all actions, who each is assigned to (IM, SC, CDD, Legal), what each function needs, SLAs/timelines | P2 | [Client interview] | RM user testing 06/08 (Luke Tilly) | Draft | TBC |
| R07 | Group all stakeholders per opportunity/account in one place | P2 | [Client interview] | RM user testing 06/08 | Draft | TBC |
| R08 | Proactive alerting (e.g. volume-drop alerts, external events such as mergers) to flag issues early | P2 | [Client interview] | RM user testing 06/08 | Draft | TBC - data-source path unclear |
| R09 | Better, manipulable reporting vs Paysian MID/merchant-code limits and Salesforce's inaccurate, permission-gated reports | P2 | [Client interview] | RM user testing 06/08 | Draft | TBC |
| R10 | Prioritise UX/usability over location - must be "worth logging in for" | P2 | [Client meeting] / [Client interview] | Multiple sessions | Draft (principle) | n/a |
| R11 | Consistent Lightning look & feel via a defined style guide (font family, sizing, buttons, colours, notification block); designer delivers the style | P3 | [Client meeting] | Dylan/Steve 05/08 | Draft | Depends on designer (~23 Aug) |
| R12 | Manager-facing views so leaders can see usage/opportunities and drive accountability | P3 | [Client meeting] | Internal demo 07/08 | Draft | TBC |
| R13 | Usage/adoption tracking in Salesforce (report by region/GM), correlated with outcomes to improve usability | P3 | [Client meeting] | Dylan/Steve 05/08; internal demo 07/08 | Draft (possibly later) | TBC |
| R14 | Salesforce-hosted but deep-link accessible from elsewhere (Mark's ask) | P3 | [Client meeting] | Dylan/Steve 05/08 | Draft | See constraint #1 |

## Scope-expansion flags (P4 - do NOT treat as committed)

These surfaced in the 07/08 internal demo as "things we didn't even think of" and were explicitly called out as out of scope now. Log them; do not build them without Steve's go.

| ID | Item | Provenance | Note |
|----|------|------------|------|
| X01 | Paysian integration | [Client meeting] internal demo 07/08 | Newly surfaced; out of scope now |
| X02 | Outlook integration | [Client meeting] internal demo 07/08 | Newly surfaced; out of scope now |
| X03 | Full project-management platform (beyond the per-opportunity action log R06) | [Client meeting] internal demo 07/08 | Newly surfaced; out of scope now |
| X04 | Tableau as the one-click-out detailed view vs a sleek in-app detail view | [SF preference - not confirmed constraint] | Open UX risk: a sleek Salesforce UI dropping into a less-sleek Tableau may underwhelm |

## Preferences (recorded, not binding)

- **Tableau exposure (X04):** Charlie/team preference discussion, not a platform limit. Take into account; decide with Steve.

## Parked / reference only

- **Section 2 "Preparation required"** of the Word doc (buddy the QB dev with Charlie's team; validate AI-generated code deploys into a sandbox) -> moved to `delivery-model.md`.
- **Section 4 full transcripts** -> stay in the `.docx`; can be turned into a structured meeting note later if needed.
- **Revenue Boost sub-product scope** questions (Peter Fidler / Sam Pitt: account updater, network payment tokens, FX, FraudSight) -> product-scope question, not a UI requirement.
- **1bn-row backend volume note** -> captured as hard constraint #4, not a UI requirement.
- **Jamie Land's team / Tableau team scope** -> outside this build.
- **Liam's ~200-line business-requirements list** -> ingest when received; dedupe against R01-R14 and assign IDs.

## Pending inputs (will change this registry)

1. **Steve's ~5 formal business requirements** - expected before Thursday. Merge as P0/P1 and mark `Confirmed` where Steve confirms.
2. **Liam's ~200-line list** - dedupe into the table.
3. **Charlie/Jordan feasibility pass** - fill the SF feasibility column for the top items.
