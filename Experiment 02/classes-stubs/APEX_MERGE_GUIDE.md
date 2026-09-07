# Apex merge guide (reference only — do not deploy wholesale)

Experiment 02 ships **no Apex classes** in the default deploy package. Use this folder as a reference when merging methods into **existing org controllers** after Phase 0c retrieve.

## Steps

1. Retrieve org Apex: `sf project retrieve start -m ApexClass:C360PortfolioController` (or actual class name).
2. Compare method signatures with stubs below.
3. Add missing `@AuraEnabled` methods to the org class — never replace the entire file.
4. Grant profile / permission set access to the class.
5. Update LWC `@salesforce/apex/` imports to match org class and method names.

## Stub methods (from Experiment 01 reference)

| Method | Purpose | LWC consumer |
|--------|---------|--------------|
| `getPortfolioSummary()` | Hub KPIs | `c360Dashboard` |
| `getAccounts(pageSize)` | Portfolio table | `c360Dashboard` |
| `getSignals()` | Signal list | `c360Dashboard` |
| `getPathways(scope)` | Pathways table | `c360Dashboard` |
| `getAlerts(statusFilter)` | Alert Centre | `c360AlertCentre` |
| `getAlertDetail(alertId)` | Alert Detail | `c360AlertDetail` |
| `getAccountSpotlight(recordId)` | Account sidebar | `c360Account` |
| `generateDeck(accountId, options)` | PPT export | `c360ExportModal` |

Copy full stub implementations from `08. Experiments/01/force-app/main/default/classes/` when drafting merges.

## Wire pattern

Follow `06. Output templates/Spotlight/leadSpotlight.js`:

- `@wire` with `isLoading` / `hasError` / `hasData` getters
- `@api prefetchedData` to suppress duplicate wires in parent/child compositions
- `with sharing` and page size cap ≤ 50 (constraint #4)
