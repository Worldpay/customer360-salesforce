# Salesforce Hard Constraints (Tier 0 - Unbreakable)

**Last updated:** 2026-08-13
**Owner of truth:** Charlie (Salesforce feasibility), with Jordan confirming.

## How to use this file

This is the **top of the knowledge hierarchy**. Everything else - requirements, design, delivery - must respect what is recorded here. A "hard constraint" is something Charlie or Jordan has confirmed the Salesforce platform (or the WorldPay org / FIS governance) genuinely cannot do, or can only do a specific way. It is not a preference.

Rules for maintaining it:

- **Only unbreakable rules go here.** If Charlie says "I'd prefer X" or "X would be nicer", that is a preference - it belongs in `requirements-registry.md` tagged `[SF preference - not confirmed constraint]`, not here.
- When Charlie/Jordan **confirms or overturns** a platform limit, update the numbered list above or the placeholders below and note the change in the programme wiki log.
- This file is structured for **handoff beyond Cursor** - a Salesforce developer should be able to read it cold.

## Constraints taken into build (input from user sessions)

The six rules below were captured as **inputs across multiple client and working sessions** (architecture, feasibility, and delivery). They were brought into **Cursor** (and this repo) so generated prototypes, LWCs, and handoff artefacts stay **compatible with Salesforce** and with the agreed delivery model—not as a formal signed-off feasibility matrix.

1. **Hosted on Salesforce; access from elsewhere via a deep link into Salesforce** — Build for Salesforce as the system of record; remote or off-platform access is satisfied by linking into Salesforce, not by duplicating the app elsewhere.

2. **Built with Lightning Web Components (LWC) on the Salesforce Lightning Design System** — Browser prototypes and production UI should map to LWC; visual language follows Lightning / SLDS.

3. **Data connection via Data 360 / Data Cloud to Snowflake; reuse the lead-scoring schema/connector pattern** — The UI consumes warehouse data through Data 360, not a one-off integration; follow the precedent already used for lead scoring.

4. **Do not surface very large row counts in the Salesforce UI** — Data stays in the back end; the UI shows only queried or aggregated subsets (designs that imply scrolling through full datasets are out of scope).

5. **LLM-generated Apex is experimental; the client owns testing, UAT, and deployment** — Delivery hands over HTML and Apex for the client pipeline; McKinsey/QB does not deploy directly to production without client test/UAT/defect triage.

6. **The code-generation tool/approach is FIS-approved for continued use** — LLM-assisted build (e.g. Cursor) is allowed under client governance for this programme; treat as an input until explicitly reconfirmed with FIS.

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
