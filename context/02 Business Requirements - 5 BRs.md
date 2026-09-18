# C360 Phase 2 - Draft Business Requirements

**Last updated:** 2026-08-14
**Status:** Draft - issued 13 Aug 2026 · final list due 31 Aug 2026
**Prepared for:** McKinsey / QB

An early indication of the C360 Phase 2 UX/UI requirements to inform QuantumBlack's future development. This is a working draft, **not a committed scope**.

> **Provenance.** Consolidated from client sessions (05/08 Dylan-Steve working session, 06/08 RM user testing, 07/08 internal demo) and prior RM interviews. Priority weighting and registry mappings per the C360 requirements registry. Cam's PowerPoint-export requirement is a firm business requirement, **not yet Ann/Vicky sign-off**. Salesforce feasibility is unconfirmed pending the technical spike (w/c 17 Aug). Values shown as `TBC` are placeholders to be quantified.

## Priority weighting

| Badge | Meaning |
|-------|---------|
| **P0 - Firm** | Firm requirement (Cam) or Ann/Vicky sign-off item |
| **P1 - Owner** | Owner vision (Steve, day-to-day owner) |
| **P2 - RM need** | Validated RM need (user testing / interviews) |
| **P3 - Structural** | Structural / architecture decision |

---

## BR-001 - Consolidated account view homepage for RMs

**Priority:** P1 (Owner) · **Registry:** R01 - homepage + panels

**Requirement:** Relationship Managers must be able to see the current commercial state of any account they own - health, churn risk, cross-sell opportunities, open actions, and key stakeholders - without moving between systems to assemble it.

**Rationale:** RMs currently maintain action logs in Excel and coordinate through Outlook and Teams, and cross-sell preparation ahead of QBRs takes hours of manual collation across disconnected systems. Fragmentation costs an estimated `TBC` hours per RM per month and creates inconsistent account narratives across the team.

**Acceptance criteria:**
1. An RM can retrieve, in a single view, all C360-derived indicators for an owned account without a second system login.
2. The view is the entry point to detailed analysis; drill-down is one action away.
3. New indicator types can be added without redesigning the view.
4. An RM can prepare for a QBR using this view plus its drill-downs alone - measured against the current baseline of `TBC` hours.

---

## BR-002 - Initiating and tracking next steps (commercial pathways)

**Priority:** P2 (RM need) · **Registry:** R06 action-log · R12 manager view

**Requirement:** An RM must be able to initiate a defined commercial pathway from the account view and see the current status and expected completion date of every pathway in progress on their accounts.

**Rationale:** Pathways convert an alert into revenue, but there is currently no workflow, SLA or timeline visibility across dependent functions. RMs chase progress outside Salesforce, which breaks the audit trail and leaves managers unable to see where commercial actions are stalled.

**Acceptance criteria:**
1. Each surfaced churn or cross-sell driver maps to at least one available pathway.
2. Initiating a pathway creates a tracked record without the RM leaving the account view.
3. Each in-progress pathway shows current stage, owning function, and target date.
4. All stage transitions are captured in the system record - no status change depends on email or Teams.
5. A manager can see all in-progress pathways across their team.

---

## BR-003 - Actionable signals delivered to the RM

**Priority:** P2 (RM need) · **Registry:** R03 multi-product · R05 explainability · R08 alerting

**Requirement:** An RM must receive commercial signals - churn risk flags and cross-sell opportunities - in their primary working system, and must be able to record that a signal has been actioned or dismissed.

**Rationale:** RMs currently learn about account deterioration reactively, sometimes months after the underlying change. Cross-sell opportunities identified centrally do not reliably reach the RM who owns the relationship.

**Acceptance criteria:**
1. Churn flags and cross-sell opportunities are delivered without the RM navigating to a separate tool.
2. Each signal states the driver, the affected account, and the recommended pathway.
3. Each signal links directly to its supporting detail.
4. An RM can mark a signal actioned or dismissed; state persists and is visible to their manager.
5. Volume stays within a threshold that preserves attention - working assumption **2-3 churn signals per RM per month**; cross-sell volume `TBC`.
6. Cross-sell signals are suppressed where the relevant product is already in use.

---

## BR-004 - Time-sensitive alerting

**Priority:** P2 (RM need) · **Registry:** R08 proactive alerting

**Requirement:** Where a change in account behaviour requires action within the same working day, an RM must be notified within `TBC` hours of detection, distinct from and more prominent than routine monthly signals.

**Rationale:** Proactive volume alerts have already demonstrated value - RMs have acted on transaction anomalies they would otherwise have discovered months later. Incident and volume changes move intraday; pricing and churn signals move monthly. Treating both at the same cadence either buries the urgent or creates noise from the routine.

**Acceptance criteria:**
1. Signal types are classified by required response time: intraday, daily, or monthly.
2. Intraday signals are visually and behaviourally distinguishable from monthly ones.
3. Transaction summary signals are delivered daily against a rolling window of `TBC` days.
4. An RM can see, at a glance, whether anything requires action today.
5. The view surfaces a small set of high-level indicators, not model output.

---

## BR-005 - Export of account analysis to client-ready collateral

**Priority:** P0 (Firm) · **Registry:** R04 - PowerPoint export (firm req)

**Requirement:** An RM must be able to export account analysis - dashboards, reporting, ROI calculations, etc. - into an editable presentation format suitable for use in a client meeting, without manually rebuilding charts.

**Rationale:** C360's purpose is to generate collateral for merchant conversations, and export to PowerPoint has been requested repeatedly across pipeline reviews, QPRs, and ROI discussions. RMs currently recreate exhibits by hand, and the benchmark cited internally is a one-click path from data to finished deck.

**Acceptance criteria:**
1. An RM can export a defined set of artefacts for a single account in a single action.
2. Output is editable, not a flat image, and carries correct branding.
3. Output is client-safe and credible - no internal-only fields (model scores, internal risk classifications) are included.
4. Export completes in under `TBC` seconds.
5. Export is available for the artefact set defined in scope.

---

## Open dependency

The **technical spike / guardrails connect** that informs the build of these requirements is **to be scheduled w/c 17 August**. Requirements above may change once Salesforce feasibility is confirmed. All `TBC` values to be quantified before the final list on **31 Aug 2026**.
