# Customer 360 — Salesforce LWC overlay

Template-aligned, **LWC-only org overlay** for the Customer 360 hub and related screens. IA aligns with [`C360 Prototype v5`](../../../04.%20HTML%20prototypes/C360%20Prototype%20v5.html) (inline account churn/cross-sell deep-dives on the Record Page; no pathways module in the hub).

## Naming convention

- LWC bundles: `c360Dashboard`, `c360KpiTile`, …
- Manifest: `manifest/packageLwc.xml`
- Docs: `planSummary.md`, `orgWiringRunbook.md`, `handoffChecklist.md`
- SFDX project: `customer360-salesforce`

## What this is

- **Monolithic hub:** `c360Dashboard` (Home with top accounts + portfolio health first, Alert Centre, **All accounts** with portfolio / churn / cross-sell sub-tabs)
- **Unified HTML prototype:** [`360 HTML prototype.html`](360%20HTML%20prototype.html) — rebuild with `python scripts/build360HtmlPrototype.py` (also writes `360 Accounts Hub prototype.html` alias)
- **Canonical HTML reference:** [`04. HTML prototypes/C360 Prototype v5.html`](../../../04.%20HTML%20prototypes/C360%20Prototype%20v5.html) — v5 IA source (per-module previews under `prototypes/html/`)
- **Schema v3 account detail (Record Page):** `c360AccountDetail` — churn / cross-sell deep-dive (preview: [`prototypes/html/modules/account-detail/preview.html`](prototypes/html/modules/account-detail/preview.html))
- **Wireframe screens:** `c360AlertCentre`, `c360AlertDetail`
- **Record Page bootstrap:** `c360Account` (delegates to `c360AccountDetail`)
- **Shared children:** `c360KpiTile`, `c360SignalList`
- **Configurable KPI (Phase 1):** Hub embeds `c360UserKpiTile` (runtime metric combobox + per-user `C360_User_Preferences__c`); optional App Builder `c360ConfigurableKpiTile` via `C360MetricKeyPicklist` → `C360_Metric_Definition__mdt` / `C360MetricController`
- **Mock data:** `c360MockData` + `c360AccountDetailData` (`ACCOUNT_DETAIL`, `getAccountDetail()`)

## What this is NOT

Do **not** deploy from this folder:

- `applications/` — use org Lightning App
- `flexipages/` — swap component in existing App Builder pages
- `tabs/` — org tabs already configured
- `classes/` — merge stubs into existing Apex (see `classesStubs/`)

## Quick deploy (LWC only)

```bash
sf project deploy start --manifest manifest/packageLwc.xml
```

Then follow [orgWiringRunbook.md](orgWiringRunbook.md) to wire `c360Dashboard` on the existing App Page.

After renaming bundles (dropping any prior `Ex05` suffix), **re-place** hub and child components in App Builder so flexipages reference the current API names.

## Modular prototypes (HTML)

Browser-previewable HTML modules live under [`prototypes/html/`](prototypes/html/). No Salesforce CLI required — double-click any `preview.html` to open in Chrome or Edge.

**Start here:** open [`360 HTML prototype.html`](360%20HTML%20prototype.html) after running `python scripts/build360HtmlPrototype.py`, or [`prototypes/html/assembly/overview-page.html`](prototypes/html/assembly/overview-page.html) for modular Overview only.

### Folder conventions

```
prototypes/
├── moduleRegistry.md     # HTML → LWC status tracker
└── html/
    ├── shared/                  # tokens, shell, mock data
    ├── modules/<name>/          # moduleSpec.md, fragment.*, preview.html
    └── assembly/                # overview-page.html
```

Each module folder contains:

- `moduleSpec.md` — LWC conversion contract (`@api`, events, mock DTO)
- `fragment.html` — panel markup only (canonical for LWC conversion)
- `fragment.css` / `fragment.js` — scoped styles and interactions
- `preview.html` — self-contained browser preview with shell chrome

### Module list

| Priority | Module | Preview |
|----------|--------|---------|
| P0 | kpi-strip, needs-action, portfolio-health, signal-list | See [moduleRegistry.md](prototypes/moduleRegistry.md) |
| P1 | accounts-table, material-banner, alert-centre | |
| P2 | cross-sell-table, churn-table, pathways-table | |

Mock data in `prototypes/html/shared/mock-data.js` mirrors `c360MockData.js`; `account-detail-data.js` mirrors schema v3 `ACCOUNT_DETAIL`.

**Account detail module (Record Page):** [`prototypes/html/modules/account-detail/preview.html`](prototypes/html/modules/account-detail/preview.html) — mirrors `c360AccountDetail` (not embedded in hub).

## Authority hierarchy

1. `07. Knowledge for C360/salesforce-hard-constraints.md`
2. `07. Knowledge for C360/requirements-registry.md`
3. `10. Wireframe/` → IA and screen inventory
4. `09. Design system/` → visual tokens (supersedes prototype CSS)
5. `06. Output templates/` → LWC code patterns
6. `C360 Prototype v5` → content fallback

## Key trade-offs documented

| Topic | Choice | Alternative |
|-------|--------|-------------|
| Hub architecture | Monolithic `c360Dashboard` | Decomposed multi-view hub |
| Account drill-down | NavigationMixin → Record Page | Inline hub view (v5 prototype only; hub LWCs use Record Page) |
| Alert Centre | Embedded in dashboard nav | Separate App Page tab |
| Data | Mock in `c360MockData.js`; hub user via `getRecord`; cross-sell via `C360CrossSellController` | Full `@wire` to org Apex |
| apiVersion | 66.0 | Template 67.0 |

## Bundle inventory

| LWC | Exposed | App Builder label | Targets |
|-----|---------|-------------------|---------|
| `c360Dashboard` | Yes | Customer 360 Dashboard | App Page, Home Page |
| `c360MaterialBanner` | Yes | C360 Material Banner | App Page, Home Page |
| `c360KpiStrip` | Yes | C360 KPI Strip | App Page, Home Page |
| `c360ConfigurableKpiTile` | Yes | C360 KPI Tile (configurable) | App Page, Home Page |
| `c360UserKpiTile` | No (hub child) | User-pickable KPI tile | Inside `c360Dashboard` Home |
| `c360NeedsAction` | Yes | C360 Needs Action | App Page, Home Page |
| `c360PortfolioHealth` | Yes | C360 Portfolio Health | App Page, Home Page |
| `c360MySignals` | Yes | C360 My Signals | App Page, Home Page |
| `c360AccountsTable` | Yes | C360 Accounts Table | App Page, Home Page |
| `c360AlertCentre` | Yes | C360 Alert Centre | App Page, Home Page |
| `c360CrossSellTable` | Yes | C360 Cross-Sell Table | App Page, Home Page |
| `c360RevenueBoostBusinessCase` | Yes | C360 Revenue Boost Business Case | App Page, Home Page, Account Record Page |
| `c360ChurnTable` | Yes | C360 Churn Table | App Page, Home Page |
| `c360AlertDetail` | Yes | C360 Alert Detail | App Page, Home Page |
| `c360Account` | Yes | C360 Account Spotlight | Account Record Page |
| `c360AccountDetail` | No | — | Child only (Record Page via `c360Account`) |
| `c360KpiTile` | No | — | Child only (used by KPI strip) |
| `c360SignalList` | No | — | Child only (used by My Signals) |
| `c360MockData` | No | — | Shared module |
| `c360AccountDetailData` | No | — | Shared module (Record Page) |
| ~~`c360PathwaysTable`~~ | — | Deprecated | Removed from hub IA |
| ~~`c360ExportModal`~~ | — | Deprecated | Removed from hub prototype |

## Development process (Cursor)

See [docs/cursorDevelopmentScope.md](docs/cursorDevelopmentScope.md) for step-by-step repo setup with Cursor (or similar AI tools), data schema handoff, and Customer 360 as the reference example.

## Full plan and gap analysis

See [planSummary.md](planSummary.md) for assumptions, open questions (by topic), and design-input gap analysis.

**Only one hub component should be active on the org flexipage.**
