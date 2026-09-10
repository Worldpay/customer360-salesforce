# Experiment 03 — Handoff checklist (full greenfield deploy)

## Pre-deploy

- [ ] Target org is sandbox / scratch org (no conflicting `Customer_360` app or `c360*` LWCs)
- [ ] Salesforce CLI authenticated: `sf org login web`
- [ ] User has permission to deploy metadata and assign Lightning apps

## Deploy

- [ ] `sf project deploy start --manifest manifest/package.xml` succeeds
- [ ] No deploy errors for LWCs, Apex, app, flexipages, tabs, static resource

## Metadata verification (Setup)

- [ ] **Lightning App** `Customer 360` exists with tabs: Accounts, Customer 360, Alert Centre
- [ ] **FlexiPage** `C360 Home` hosts `c360Dashboard`
- [ ] **FlexiPage** `C360 Account` hosts `c360Account` (Record Page)
- [ ] **FlexiPage** `C360 Alert Centre` hosts `c360AlertCentre`
- [ ] **Apex classes** `C360PortfolioController`, `C360ExportController` deployed
- [ ] **Static resource** `c360Shared` deployed

## Access configuration

- [ ] Pilot profiles / permission sets granted **Customer 360** app visibility
- [ ] Apex class access granted for both controllers
- [ ] `C360 Account` Record Page activated and assigned to Account

## Functional smoke test

### Customer 360 tab (`c360Dashboard`)

- [ ] Enterprise Account Hub loads with 6 KPI tiles and material changes banner
- [ ] Nav: Overview, Alert Centre, Cross-Sell, Churn, Pathways
- [ ] Signals: Action / Dismiss updates count and shows toast
- [ ] Account link opens inline view; Shift+click opens Account Record Page
- [ ] Export PowerPoint modal opens from account view

### Alert Centre tab (standalone `c360AlertCentre`)

- [ ] Filterable alert table renders
- [ ] Cross-sell intelligence panel visible

### Alert Centre (within dashboard)

- [ ] Open alert navigates to Alert Detail view
- [ ] Back navigation returns to Alert Centre
- [ ] Alert actions show preview toast

### Account Record Page (`c360Account`)

- [ ] Sidebar tabs render (Overview, Churn, Cross-sell, Pathways, Contacts)
- [ ] Export button dispatches event

## Apex stubs (optional wire test)

- [ ] `C360PortfolioController.getPortfolioSummary` returns JSON in Anonymous Apex
- [ ] `C360PortfolioController.getAlerts('All')` returns alert list
- [ ] `C360ExportController.generateDeck` returns preview message

## Regression

- [ ] Mobile layout acceptable at 850px / 520px breakpoints
- [ ] No console errors on page load

## Known limitations

- LWCs use `c360MockData.js` — Apex stubs not yet wired from UI
- Export generates toast only — no `.pptx` file
- Requirements registry items remain **Draft** until client sign-off
