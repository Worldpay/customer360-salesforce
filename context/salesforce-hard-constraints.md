# Salesforce Hard Constraints (Tier 0 - Unbreakable)

**Last updated:** 2026-08-13
**Owner of truth:** Charlie (Salesforce feasibility), with Jordan confirming.

## How to use this file

This is the **top of the knowledge hierarchy**. Everything else - requirements, design, delivery - must respect what is recorded here. A "hard constraint" is something Charlie or Jordan has confirmed the Salesforce platform (or the WorldPay org / FIS governance) genuinely cannot do, or can only do a specific way. It is not a preference.

Rules for maintaining it:

- **Only unbreakable rules go here.** If Charlie says "I'd prefer X" or "X would be nicer", that is a preference - it belongs in `requirements-registry.md` tagged `[SF preference - not confirmed constraint]`, not here.
- Every entry carries a **status**: `Confirmed` (Charlie/Jordan validated), `Direction` (agreed intent, not yet feasibility-tested), or `Claimed - verify` (asserted but not yet checked).
- When a constraint is confirmed or overturned, update the row and note it in the wiki log.
- This file is structured for **handoff beyond Cursor** - a Salesforce developer should be able to read it cold.

## Confirmed direction and patterns (from client sessions, pending formal feasibility sign-off)

| # | Constraint / rule | Why it matters for the UI | Source | Status |
|---|-------------------|---------------------------|--------|--------|
| 1 | Hosted on Salesforce; access from elsewhere via a deep link into Salesforce | Settles the "where does it live" debate - build for Salesforce, satisfy Mark's remote-access ask with a link | [Client meeting] Dylan/Steve 05-06/08 | Direction |
| 2 | Built with Lightning Web Components (LWC) on the Salesforce Lightning Design System | Prototype and final code must map to LWC; design language is Lightning | [Client meeting] Dylan/Steve 05-06/08 | Direction |
| 3 | Data connection via **Data 360 / Data Cloud** to Snowflake; reuse the lead-scoring schema/connector pattern John already bought | The UI reads from Snowflake through Data 360, not a bespoke pipe; there is a working precedent to learn from | [Client meeting] Dylan/Steve; [Client meeting] 2026-07-02 architecture note | Direction (pattern proven for lead scoring) |
| 4 | Cannot surface very large row counts in the Salesforce UI - data sits in the back end, only the needed subset is presented | Rules out "scroll through everything" designs; UI must query/aggregate. Tested against ~1bn rows in Data 360 / Snowflake | [Client meeting] Dylan/Steve 05-06/08 | Confirmed (volume tested) |
| 5 | LLM-generated Apex is experimental; the **client owns testing, UAT and deployment** | McKinsey/QB hands over HTML + Apex; it is not deployed directly - it runs through the client's test/UAT/deploy/defect-triage pipeline | [Client meeting] Dylan/Steve 05-06/08 | Process constraint |
| 6 | The code-generation tool/approach is **FIS-approved** for continued use | Governance green light for the LLM-to-Salesforce approach | [Client meeting] Dylan/Steve (Charlie asserted) | Claimed - verify |

## Distinguishing hard rules from preferences

Per the brief, keep these separate:

- **Hard rule (goes here):** "Salesforce cannot do X" - unbreakable.
- **Preference (goes to `requirements-registry.md`):** "Charlie would rather we did Y" - taken into account, not binding.

Known **preference** currently in play (recorded here only as a pointer, not as a constraint):

- Whether to expose **Tableau** as the one-click-out detailed view or keep detail in-app. This is an open UX/preference question, not a platform limit. Tracked in the registry as P4.

## Placeholders for Charlie / Jordan to fill

These are the areas where we need confirmed platform limits before or during the build. Left as open sections so a Salesforce developer can complete them at handoff:

- **LWC limits:** component nesting, rendering limits, supported base components for the homepage/notification block and modular panels.
- **Governor limits:** query/DML/heap limits relevant to surfacing Data 360 / Snowflake subsets.
- **Custom object structures:** what custom objects/fields C360 needs; what already exists from lead scoring.
- **Reporting / API limits:** constraints behind the "better, manipulable reporting" requirement (Salesforce reporting is currently inaccurate and permission-gated per RMs).
- **PowerPoint export feasibility path:** how a one-click QBR/deck export can actually be implemented in/around Salesforce (Cam's firm requirement) - native, app-exchange, or external service.
- **Modularity / extensibility:** whether the homepage-to-use-case-to-subcomponent structure can be added to over time as claimed (business requirement + feasibility question for Charlie/Jordan).

## Open feasibility questions carried from requirements

- Modular homepage that new use-case blocks can be added to later - business requirement **and** a Salesforce-feasibility question (Charlie/Jordan). Status: not yet confirmed.
- One-click PowerPoint/QBR export - firm requirement; feasibility path not yet defined.
- Proactive alerting (volume drops, external events) - feasibility and data-source path TBC.
