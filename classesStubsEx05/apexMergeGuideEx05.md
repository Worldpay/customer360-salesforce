# Apex merge guide (reference only — do not deploy wholesale)

Experiment 05 ships **no Apex classes** in the default deploy package. Use this folder as a reference when merging methods into **existing org controllers** after Phase 0c retrieve.

## Steps

1. Retrieve org Apex: `sf project retrieve start -m ApexClass:C360PortfolioController` (or actual class name).
2. Compare method signatures with stubs below.
3. Add missing `@AuraEnabled` methods to the org class — never replace the entire file.
4. Grant profile / permission set access to the class.
5. Update LWC `@salesforce/apex/` imports to match org class and method names.

## Stub methods (from Experiment 01 reference)

| Method | Purpose | LWC consumer |
|--------|---------|--------------|
| `getPortfolioSummary()` | Hub KPIs | `c360DashboardEx05` |
| `getAccounts(pageSize)` | Portfolio table | `c360DashboardEx05` |
| `getSignals()` | Signal list | `c360DashboardEx05` |
| `getPathways(scope)` | Pathways table | `c360DashboardEx05` |
| `getAlerts(statusFilter)` | Alert Centre | `c360AlertCentreEx05` |
| `getAlertDetail(alertId)` | Alert Detail | `c360AlertDetailEx05` |
| `getAccountSpotlight(recordId)` | Account sidebar | `c360AccountEx05` |
| `generateDeck(accountId, options)` | PPT export | `c360ExportModalEx05` |

Copy full stub implementations from `08. Experiments/01/force-app/main/default/classes/` when drafting merges.

## Wire pattern

Follow `06. Output templates/Spotlight/leadSpotlight.js`:

- `@wire` with `isLoading` / `hasError` / `hasData` getters
- `@api prefetchedData` to suppress duplicate wires in parent/child compositions
- `with sharing` and page size cap ≤ 50 (constraint #4)
