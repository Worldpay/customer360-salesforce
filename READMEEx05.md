# Customer 360 — Experiment 05

**Active experiment** — aligned to [`C360 Prototype v5`](../../../04.%20HTML%20prototypes/C360%20Prototype%20v5.html). Duplicated from [`Experiment 4.1`](../Experiment%204.1/) with LWC modules mirroring the v5 IA (inline account churn/cross-sell deep-dives, no pathways, simplified cross-sell). Experiment 4.1 remains the prior working copy.

Template-aligned, **LWC-only org overlay** build.

## Naming convention (Experiment 05)

All deployable artefacts use the `Ex05` suffix to avoid collisions with other experiments or org components:

- LWC bundles: `c360DashboardEx05`, `c360KpiTileEx05`, …
- Manifest: `manifest/packageLwcEx05.xml`
- Docs: `planSummaryEx05.md`, `orgWiringRunbookEx05.md`, `handoffChecklistEx05.md`
- SFDX project: `c360LwcExperimentEx05`

## What this is

- **Monolithic hub:** `c360DashboardEx05` (Overview, Alert Centre, Churn, Cross-Sell — account links navigate to Record Page)
- **Canonical HTML prototype:** [`04. HTML prototypes/C360 Prototype v5.html`](../../../04.%20HTML%20prototypes/C360%20Prototype%20v5.html) — full interactive reference (not duplicated under Experiment 05)
- **Schema v3 account detail (Record Page):** `c360AccountDetailEx05` — churn / cross-sell deep-dive (preview: [`prototypes/html/modules/account-detail/preview.html`](prototypes/html/modules/account-detail/preview.html))
- **Wireframe screens:** `c360AlertCentreEx05`, `c360AlertDetailEx05`
- **Record Page bootstrap:** `c360AccountEx05` (delegates to `c360AccountDetailEx05`)
- **Shared children:** `c360KpiTileEx05`, `c360SignalListEx05`
- **Mock data:** `c360MockDataEx05` + `c360AccountDetailDataEx05` (`ACCOUNT_DETAIL`, `getAccountDetail()`)

## What this is NOT

Do **not** deploy from this folder:

- `applications/` — use org Lightning App
- `flexipages/` — swap component in existing App Builder pages
- `tabs/` — org tabs already configured
- `classes/` — merge stubs into existing Apex (see `classesStubsEx05/`)

## Quick deploy (LWC only)

```bash
cd "08. Experiments/Experiment 05"
sf project deploy start --manifest manifest/packageLwcEx05.xml
```

Then follow [orgWiringRunbookEx05.md](orgWiringRunbookEx05.md) to wire `c360DashboardEx05` on the existing App Page.

## Modular prototypes (HTML)

Browser-previewable HTML modules live under [`prototypes/html/`](prototypes/html/). No Salesforce CLI required — double-click any `preview.html` to open in Chrome or Edge.

**Start here:** [`prototypes/html/assembly/overview-page.html`](prototypes/html/assembly/overview-page.html) — full Overview page composed from modules.

### Folder conventions

```
prototypes/
├── moduleRegistryEx05.md     # HTML → LWC status tracker
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
| P0 | kpi-strip, needs-action, portfolio-health, signal-list | See [moduleRegistryEx05.md](prototypes/moduleRegistryEx05.md) |
| P1 | accounts-table, material-banner, alert-centre | |
| P2 | cross-sell-table, churn-table, pathways-table | |

Mock data in `prototypes/html/shared/mock-data.js` mirrors `c360MockDataEx05.js`; `account-detail-data.js` mirrors schema v3 `ACCOUNT_DETAIL`.

**Account detail module (Record Page):** [`prototypes/html/modules/account-detail/preview.html`](prototypes/html/modules/account-detail/preview.html) — mirrors `c360AccountDetailEx05` (not embedded in hub).

## Authority hierarchy

1. `07. Knowledge for C360/salesforce-hard-constraints.md`
2. `07. Knowledge for C360/requirements-registry.md`
3. `10. Wireframe/` → IA and screen inventory
4. `09. Design system/` → visual tokens (supersedes prototype CSS)
5. `06. Output templates/` → LWC code patterns
6. `C360 Prototype v5` → content fallback

## Key trade-offs documented

| Topic | Exp 04 choice | Alternative |
|-------|---------------|-------------|
| Hub architecture | Monolithic `c360DashboardEx05` | Exp 01 decomposed `c360App` |
| Account drill-down | NavigationMixin → Record Page | Inline hub view (v5 prototype only; hub LWCs use Record Page) |
| Alert Centre | Embedded in dashboard nav | Separate App Page tab |
| Data | Mock in `c360MockDataEx05.js` | `@wire` to org Apex |
| apiVersion | 62.0 | Template 67.0 |

## Bundle inventory

| LWC | Exposed | App Builder label | Targets |
|-----|---------|-------------------|---------|
| `c360DashboardEx05` | Yes | C360 Dashboard (ex_04) | App Page, Home Page |
| `c360MaterialBannerEx05` | Yes | C360 Material Banner (ex_04) | App Page, Home Page |
| `c360KpiStripEx05` | Yes | C360 KPI Strip (ex_04) | App Page, Home Page |
| `c360NeedsActionEx05` | Yes | C360 Needs Action (ex_04) | App Page, Home Page |
| `c360PortfolioHealthEx05` | Yes | C360 Portfolio Health (ex_04) | App Page, Home Page |
| `c360MySignalsEx05` | Yes | C360 My Signals (ex_04) | App Page, Home Page |
| `c360AccountsTableEx05` | Yes | C360 Accounts Table (ex_04) | App Page, Home Page |
| `c360AlertCentreEx05` | Yes | C360 Alert Centre (ex_04) | App Page, Home Page |
| `c360CrossSellTableEx05` | Yes | C360 Cross-Sell Table (ex_04) | App Page, Home Page |
| `c360ChurnTableEx05` | Yes | C360 Churn Table (ex_04) | App Page, Home Page |
| `c360AlertDetailEx05` | Yes | C360 Alert Detail (ex_04) | App Page, Home Page |
| `c360AccountEx05` | Yes | C360 Account (ex_04) | Account Record Page |
| `c360AccountDetailEx05` | No | — | Child only (Record Page via `c360AccountEx05`) |
| `c360KpiTileEx05` | No | — | Child only (used by KPI strip) |
| `c360SignalListEx05` | No | — | Child only (used by My Signals) |
| `c360MockDataEx05` | No | — | Shared module |
| `c360AccountDetailDataEx05` | No | — | Shared module (Record Page) |
| ~~`c360PathwaysTableEx05`~~ | — | Deprecated | Removed from hub IA |
| ~~`c360ExportModalEx05`~~ | — | Deprecated | Removed from hub prototype |

## Full plan and gap analysis

See [planSummaryEx05.md](planSummaryEx05.md) for assumptions, open questions (by topic), and design-input gap analysis.

## Relationship to Experiment 01

| | Experiment 01 | Experiment 02 | **Experiment 05** |
|---|---|---|---|
| Hub | `c360App` + view LWCs | `c360Dashboard` monolith | **Same as Exp 02 (renamed `Ex05`)** |
| Metadata | Includes app/flexipage/tab | LWC only | **LWC only** |
| Status | Complete reference | Complete baseline | **Active — next experiment** |

**Only one hub component should be active on the org flexipage.**
