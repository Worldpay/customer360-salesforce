# moduleRegistry

Inventory of HTML prototype modules and their LWC conversion status for Customer 360.

**Last updated:** 2026-09-15 (unified `360 HTML prototype.html` — All accounts nav + sub-tabs; Home priority zone; table loading UX)

**Live data in repo (15 Sep):** `c360Dashboard` sidebar uses `getRecord` (User). `c360CrossSellTable` uses `C360CrossSellController.getCrossSellAccounts` — replace placeholder Apex via `scripts/retrieveC360CrossSellController.ps1` when CLI is available.

## LWC scope (aligned to hub HTML prototype)

### Hub — 13 exposed UI bundles (+ 2 child-only)

| LWC | Role |
|-----|------|
| `c360Dashboard` | Hub shell (Home, Alert Centre, **All accounts** with portfolio / churn / cross-sell sub-tabs) |
| `c360TopAccounts` | Home hero — top accounts by churn or cross-sell |
| `c360MaterialBanner` | Material changes banner |
| `c360KpiStrip` | KPI row |
| `c360KpiTile` | KPI tile (child of strip / dashboard) |
| `c360NeedsAction` | Needs action today panel |
| `c360PortfolioHealth` | Portfolio health panel |
| `c360MySignals` | My signals panel |
| `c360SignalList` | Signal row list (child of My Signals) |
| `c360AccountsTable` | My accounts table |
| `c360AlertCentre` | Alert Centre list |
| `c360AlertDetail` | Alert detail view |
| `c360ChurnTable` | Churn portfolio table |
| `c360CrossSellTable` | Cross-sell portfolio table |

**Hub navigation:** account links use `NavigationMixin` → Account Record Page (no inline account view in hub HTML).

### Account Record Page — 2 bundles

| LWC | Role |
|-----|------|
| `c360Account` | Record Page bootstrap |
| `c360AccountDetail` | Schema v3 churn / cross-sell deep-dive (preview: [`account-detail/preview.html`](html/modules/account-detail/preview.html)) |

### Shared modules (not exposed)

| LWC | Role |
|-----|------|
| `c360MockData` | Hub mock DTOs |
| `c360AccountDetailData` | `ACCOUNT_DETAIL` for Record Page |

### Deprecated / out of hub scope

| LWC | Notes |
|-----|-------|
| `c360PathwaysTable` | Removed from hub IA (bundle deleted from Customer 360) |
| `c360ExportModal` | Removed from hub prototype (bundle deleted from Customer 360) |

## Status legend

| Column | Values |
|--------|--------|
| Spec | `done` = moduleSpec.md written |
| HTML | `done` = fragment + preview complete |
| UAT | Stakeholder browser review (blank until run) |
| LWC | Target bundle name; `pending` until converted |
| Deployed | Sandbox flexipage wired (blank until done) |

## Module inventory

| HTML module | Priority | Spec | HTML | UAT | LWC target | Deployed |
|-------------|----------|------|------|-----|------------|----------|
| `kpi-strip` | P0 | done | done | | `c360KpiStrip` | done |
| `needs-action` | P0 | done | done | | `c360NeedsAction` | done |
| `top-accounts` | P0 | done | done | | `c360TopAccounts` | |
| `portfolio-health` | P0 | done | done | | `c360PortfolioHealth` (hub: `interactive`) | done |
| `signal-list` | P0 | done | done | | `c360MySignals` | |
| `accounts-table` | P1 | done | done | | `c360AccountsTable` (`variant=portfolio` on Hub) | done |
| `material-banner` | P1 | done | done | | `c360MaterialBanner` | done |
| `alert-centre` | P1 | done | done | | `c360AlertCentre` | done |
| `cross-sell-table` | P2 | done | done | | `c360CrossSellTable` | done |
| `churn-table` | P2 | done | done | | `c360ChurnTable` | done |
| `pathways-table` | P2 | done | done | | `c360PathwaysTable` | **deprecated** |
| **`account-detail`** | **P0** | **done** | **done** | | **`c360AccountDetail`** | **Record Page only** |
| **`revenue-boost-business-case`** | **—** | **done** | **done** | | **`c360RevenueBoostBusinessCase`** | **Isolated — App/Record Page** |

**Note:** `revenue-boost-business-case` is a parallel legacy business-case layout; it is **not** included in `build360HtmlPrototype.py` / unified SPA.

## Preview paths

Open in a browser (double-click, no Salesforce CLI):

| Module | Preview file |
|--------|--------------|
| Overview (assembly) | [`html/assembly/overview-page.html`](html/assembly/overview-page.html) |
| **Account detail (schema v3)** | [`html/modules/account-detail/preview.html`](html/modules/account-detail/preview.html) |
| KPI strip | [`html/modules/kpi-strip/preview.html`](html/modules/kpi-strip/preview.html) |
| Needs action | [`html/modules/needs-action/preview.html`](html/modules/needs-action/preview.html) |
| Top accounts (Accounts Hub) | [`html/modules/top-accounts/preview.html`](html/modules/top-accounts/preview.html) |
| Portfolio health | [`html/modules/portfolio-health/preview.html`](html/modules/portfolio-health/preview.html) |
| **Unified C360 SPA** | [`360 HTML prototype.html`](../360%20HTML%20prototype.html) — `python scripts/build360HtmlPrototype.py` (also writes hub alias `360 Accounts Hub prototype.html`) |
| Signal list | [`html/modules/signal-list/preview.html`](html/modules/signal-list/preview.html) |
| Accounts table | [`html/modules/accounts-table/preview.html`](html/modules/accounts-table/preview.html) |
| Material banner | [`html/modules/material-banner/preview.html`](html/modules/material-banner/preview.html) |
| Alert centre | [`html/modules/alert-centre/preview.html`](html/modules/alert-centre/preview.html) |
| Cross-sell table | [`html/modules/cross-sell-table/preview.html`](html/modules/cross-sell-table/preview.html) |
| Churn table | [`html/modules/churn-table/preview.html`](html/modules/churn-table/preview.html) |
| Pathways table | [`html/modules/pathways-table/preview.html`](html/modules/pathways-table/preview.html) |
| **Revenue Boost business case (isolated)** | [`html/modules/revenue-boost-business-case/preview.html`](html/modules/revenue-boost-business-case/preview.html) |

Canonical reference: [`04. HTML prototypes/C360 Prototype v5.html`](../../../04.%20HTML%20prototypes/C360%20Prototype%20v5.html) — Customer 360 uses per-module HTML previews under `prototypes/html/modules/` only (no full-page copy in this folder).

## Shared assets

- [`html/shared/tokens.css`](html/shared/tokens.css) — design tokens
- [`html/shared/shell.css`](html/shared/shell.css) — global header and nav
- [`html/shared/module-base.css`](html/shared/module-base.css) — panel primitives
- [`html/shared/mock-data.js`](html/shared/mock-data.js) — overview mock DTOs (mirrors `c360MockData.js`)
- [`html/shared/accounts-hub-mock-data.js`](html/shared/accounts-hub-mock-data.js) — portfolio `ACCOUNTS` + hub analytics
- [`html/shared/table-loading.css`](html/shared/table-loading.css) / [`table-loading.js`](html/shared/table-loading.js) — multi-row table loading overlay (unified SPA)
- [`html/assembly/c360-unified-spa-app.js`](html/assembly/c360-unified-spa-app.js) — single SPA for unified prototype
- [`html/shared/account-detail-data.js`](html/shared/account-detail-data.js) — schema v3 `ACCOUNT_DETAIL` (mirrors `c360AccountDetailData.js`)
- [`html/shared/revenue-boost-business-case-data.js`](html/shared/revenue-boost-business-case-data.js) — isolated Revenue Boost business-case mock DTO
- [`html/shared/shell.js`](html/shared/shell.js) — toast, account navigation with `data-open-account-source`

## Hub → account navigation

Hub account links navigate to the **Account Record Page** (`c360Account` → `c360AccountDetail`). Entry-context tab routing (`data-open-account-source`) is a Record Page concern, not the hub prototype.

## Next steps

1. UAT account detail on Record Page preview (churn drill-down, cross-sell sliders, decline chart)
2. Compose modules on flexipage via App Builder (see [orgWiringRunbook.md](../orgWiringRunbook.md) Step 2b)
3. Wire mock data to Apex per `classesStubs/apexMergeGuide.md`
