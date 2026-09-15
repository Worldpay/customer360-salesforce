# Experiment 05 — Handoff checklist

## Pre-deploy (client)

- [ ] Phase 0c complete: org baseline retrieved and documented
- [ ] Hub strategy agreed: replace `c360App` vs evolve in place
- [ ] Pilot scope confirmed: Option A / B / C (default: **C Hybrid**)
- [ ] apiVersion confirmed (default: **66.0**)
- [ ] Hub sidebar shows **logged-in user** (not hard-coded RM name)
- [ ] Cross-sell tab loads rows via **C360CrossSellController.getCrossSellAccounts** (run `scripts/retrieveC360CrossSellController.ps1` if Apex placeholder)
- [ ] Component name collision check (`c360DashboardEx05`, `c360KpiTileEx05`, etc.)
- [ ] CI/CD configured for **LWC-only** deploy (flexipages excluded)

## Deploy

- [ ] `sf project deploy start --manifest manifest/packageLwcEx05.xml`
- [ ] Deploy succeeds with **no** app/flexipage/tab/Apex in package
- [ ] All 8 LWC bundles present in org

## Post-deploy wiring (client admin)

- [ ] App Page flexipage updated: `c360DashboardEx05` on existing page ([orgWiringRunbookEx05.md](orgWiringRunbookEx05.md))
- [ ] Account Record flexipage updated: `c360AccountEx05` (if in scope)
- [ ] Profile / permission set access verified
- [ ] Only **one** hub component active (deprecate `c360App` if replaced)

## Functional smoke test (sandbox)

- [ ] Overview: 6 KPI tiles, material changes banner, extended portfolio table
- [ ] Alert Centre: filters, table, cross-sell panel, navigate to detail
- [ ] Alert Detail: trajectory, drivers, outcome form, action buttons
- [ ] Cross-Sell / Churn / Pathways tabs render
- [ ] Signals: Action and Dismiss with parent toast
- [ ] Account: inline view; Shift+click opens Record Page
- [ ] Export modal: opens and shows preview toast
- [ ] Mobile: responsive layout at 850px and 520px breakpoints

## Apex integration (when wired)

- [ ] Methods merged into existing controllers (not stub overwrite)
- [ ] `@wire` loading / error / empty states verified
- [ ] Governor limits acceptable on portfolio load
- [ ] Test coverage meets client CI policy

## Design regression (against wireframes)

- [ ] Enterprise Account Hub KPI set matches pilot agreement
- [ ] Alert Centre columns and status workflow
- [ ] Alert Detail explainability and manager visibility copy
- [ ] SLDS 2 token alignment spot-check (colours, spacing, elevation)

## Documentation

- [ ] [planSummaryEx05.md](planSummaryEx05.md) open questions resolved or tracked
- [ ] Org baseline values filled in runbook tables
- [ ] Requirements registry Draft items confirmed before production sign-off

## Out of scope (explicit)

- [ ] McKinsey production deploy (constraint #5 — client deploys)
- [ ] Custom objects / Flows for alert automation (production phase)
- [ ] Live PowerPoint generation (R04 backend spike)
