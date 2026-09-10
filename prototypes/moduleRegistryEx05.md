# moduleRegistryEx05

Inventory of HTML prototype modules and their LWC conversion status for Experiment 05.

**Last updated:** 2026-09-09 (Experiment 05 — mirrors hub HTML prototype; Pathways/ExportModal bundles not deployed)

## LWC scope (aligned to hub HTML prototype)

### Hub — 13 exposed UI bundles (+ 2 child-only)

| LWC | Role |
|-----|------|
| `c360DashboardEx05` | Monolithic hub orchestrator (Overview, Alert Centre, Churn, Cross-Sell) |
| `c360MaterialBannerEx05` | Material changes banner |
| `c360KpiStripEx05` | KPI row |
| `c360KpiTileEx05` | KPI tile (child of strip / dashboard) |
| `c360NeedsActionEx05` | Needs action today panel |
| `c360PortfolioHealthEx05` | Portfolio health panel |
| `c360MySignalsEx05` | My signals panel |
| `c360SignalListEx05` | Signal row list (child of My Signals) |
| `c360AccountsTableEx05` | My accounts table |
| `c360AlertCentreEx05` | Alert Centre list |
| `c360AlertDetailEx05` | Alert detail view |
| `c360ChurnTableEx05` | Churn portfolio table |
| `c360CrossSellTableEx05` | Cross-sell portfolio table |

**Hub navigation:** account links use `NavigationMixin` → Account Record Page (no inline account view in hub HTML).

### Account Record Page — 2 bundles

| LWC | Role |
|-----|------|
| `c360AccountEx05` | Record Page bootstrap |
| `c360AccountDetailEx05` | Schema v3 churn / cross-sell deep-dive (preview: [`account-detail/preview.html`](html/modules/account-detail/preview.html)) |

### Shared modules (not exposed)

| LWC | Role |
|-----|------|
| `c360MockDataEx05` | Hub mock DTOs |
| `c360AccountDetailDataEx05` | `ACCOUNT_DETAIL` for Record Page |

### Deprecated / out of hub scope

| LWC | Notes |
|-----|-------|
| `c360PathwaysTableEx05` | Removed from hub IA (bundle deleted from Experiment 05) |
| `c360ExportModalEx05` | Removed from hub prototype (bundle deleted from Experiment 05) |

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
| `kpi-strip` | P0 | done | done | | `c360KpiStripEx05` | done |
| `needs-action` | P0 | done | done | | `c360NeedsActionEx05` | done |
| `portfolio-health` | P0 | done | done | | `c360PortfolioHealthEx05` | done |
| `signal-list` | P0 | done | done | | `c360MySignalsEx05` | |
| `accounts-table` | P1 | done | done | | `c360AccountsTableEx05` | done |
| `material-banner` | P1 | done | done | | `c360MaterialBannerEx05` | done |
| `alert-centre` | P1 | done | done | | `c360AlertCentreEx05` | done |
| `cross-sell-table` | P2 | done | done | | `c360CrossSellTableEx05` | done |
| `churn-table` | P2 | done | done | | `c360ChurnTableEx05` | done |
| `pathways-table` | P2 | done | done | | `c360PathwaysTableEx05` | **deprecated** |
| **`account-detail`** | **P0** | **done** | **done** | | **`c360AccountDetailEx05`** | **Record Page only** |

## Preview paths

Open in a browser (double-click, no Salesforce CLI):

| Module | Preview file |
|--------|--------------|
| Overview (assembly) | [`html/assembly/overview-page.html`](html/assembly/overview-page.html) |
| **Account detail (schema v3)** | [`html/modules/account-detail/preview.html`](html/modules/account-detail/preview.html) |
| KPI strip | [`html/modules/kpi-strip/preview.html`](html/modules/kpi-strip/preview.html) |
| Needs action | [`html/modules/needs-action/preview.html`](html/modules/needs-action/preview.html) |
| Portfolio health | [`html/modules/portfolio-health/preview.html`](html/modules/portfolio-health/preview.html) |
| Signal list | [`html/modules/signal-list/preview.html`](html/modules/signal-list/preview.html) |
| Accounts table | [`html/modules/accounts-table/preview.html`](html/modules/accounts-table/preview.html) |
| Material banner | [`html/modules/material-banner/preview.html`](html/modules/material-banner/preview.html) |
| Alert centre | [`html/modules/alert-centre/preview.html`](html/modules/alert-centre/preview.html) |
| Cross-sell table | [`html/modules/cross-sell-table/preview.html`](html/modules/cross-sell-table/preview.html) |
| Churn table | [`html/modules/churn-table/preview.html`](html/modules/churn-table/preview.html) |
| Pathways table | [`html/modules/pathways-table/preview.html`](html/modules/pathways-table/preview.html) |

Canonical reference: [`04. HTML prototypes/C360 Prototype v5.html`](../../../04.%20HTML%20prototypes/C360%20Prototype%20v5.html) — Experiment 05 uses per-module HTML previews under `prototypes/html/modules/` only (no full-page copy in this folder).

## Shared assets

- [`html/shared/tokens.css`](html/shared/tokens.css) — design tokens
- [`html/shared/shell.css`](html/shared/shell.css) — global header and nav
- [`html/shared/module-base.css`](html/shared/module-base.css) — panel primitives
- [`html/shared/mock-data.js`](html/shared/mock-data.js) — hub mock DTOs (mirrors `c360MockDataEx05.js`)
- [`html/shared/account-detail-data.js`](html/shared/account-detail-data.js) — schema v3 `ACCOUNT_DETAIL` (mirrors `c360AccountDetailDataEx05.js`)
- [`html/shared/shell.js`](html/shared/shell.js) — toast, account navigation with `data-open-account-source`

## Hub → account navigation

Hub account links navigate to the **Account Record Page** (`c360AccountEx05` → `c360AccountDetailEx05`). Entry-context tab routing (`data-open-account-source`) is a Record Page concern, not the hub prototype.

## Next steps

1. UAT account detail on Record Page preview (churn drill-down, cross-sell sliders, decline chart)
2. Compose modules on flexipage via App Builder (see [orgWiringRunbookEx05.md](../orgWiringRunbookEx05.md) Step 2b)
3. Wire mock data to Apex per `classesStubsEx05/apexMergeGuideEx05.md`
