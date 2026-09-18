# Customer 360 — Salesforce LWC overlay

Template-aligned **LWC-first org overlay** for the Enterprise Account Hub: a monolithic hub dashboard, portfolio tables, Alert Centre, Record Page account deep-dives, and an optional isolated Revenue Boost business-case screen. Most UI runs on **mock data** for sandbox UAT; cross-sell table and configurable KPIs can use whitelisted Apex in this repo.

**SFDX project:** `customer360-salesforce` · **API version:** 66.0 (`sfdx-project.json`)

## Repo layout

```
customer360-salesforce/
├── force-app/main/default/lwc/     # Active LWC bundles (c360*)
├── force-app/main/default/classes/ # C360CrossSellController, C360MetricController (deployed)
├── prototypes/
│   ├── moduleRegistry.md           # HTML module → LWC status
│   └── html/                       # Browser previews, shared tokens, assembly
├── context/                        # Requirements & Salesforce constraints (in-repo)
├── docs/                           # Cursor / delivery guides (not deployed)
├── manifest/packageLwc.xml         # Primary LWC + metrics deploy manifest
├── manifest/packageMetrics.xml     # KPI CMDT / metrics-only delta
├── classesStubs/                   # Apex merge notes (not deployed as-is)
├── scripts/                        # build360HtmlPrototype.py, DTO inventory, retrieve helpers
├── archive/                        # Superseded experiments (gitignored; Cursor ignored)
└── design system/                  # Reference zips (not deployed)
```

**Cursor:** `archive/` is in [`.cursorignore`](.cursorignore) and [`.cursor/rules/archive-scope.mdc`](.cursor/rules/archive-scope.mdc) — treat as out of scope unless you name a path inside it.

## Naming convention

- LWC bundles: `c360Dashboard`, `c360KpiTile`, …
- Deploy manifest: [`manifest/packageLwc.xml`](manifest/packageLwc.xml)
- Programme docs: [`planSummary.md`](planSummary.md), [`docs/cursorDevelopmentScope.md`](docs/cursorDevelopmentScope.md)
- HTML tracker: [`prototypes/moduleRegistry.md`](prototypes/moduleRegistry.md)

## What this is

### Hub (`c360Dashboard`)

Single App Page component with side navigation:

| Area | Behaviour |
|------|-----------|
| **Home** | `c360TopAccounts` (churn / cross-sell ranking toggle), accounts CTA, `c360PortfolioHealth` (interactive health filter), `c360KpiStrip`; operations snapshot with material banner, **full-width** `c360NeedsAction`, embedded `c360SignalList` |
| **Alert Centre** | `c360AlertCentre` → `c360AlertDetail` |
| **All accounts** | Sub-views: portfolio (`c360AccountsTable` `variant=portfolio`), churn (`c360ChurnTable`), cross-sell (`c360CrossSellTable`) |

Hub user block uses **`getRecord`** (User). Account links target **Account Record Page** (`c360Account` → `c360AccountDetail`) via navigation events; the hub can also render `c360AccountDetail` inline for prototype flows.

### Record Page

- **`c360Account`** — bootstrap on Account
- **`c360AccountDetail`** — schema v3 **churn** and **cross-sell** tabs (drivers, drill-down, ROI sliders, decline chart)

### Standalone / optional App Builder tiles

Exposed bundles (tables, banners, KPI strip, Alert Centre, etc.) can be placed independently; see bundle table below.

### Isolated module (not in hub assembly)

- **HTML:** [`prototypes/html/modules/revenue-boost-business-case/preview.html`](prototypes/html/modules/revenue-boost-business-case/preview.html)
- **LWC:** `c360RevenueBoostBusinessCase` — legacy business-case IA (filters, manual inputs, summary, auth impact, decline table)

### Shared / child-only

| Module | Role |
|--------|------|
| `c360MockData` | Hub mock DTOs; re-exports account detail + Revenue Boost case data |
| `c360AccountDetailData` | `ACCOUNT_DETAIL` for Record Page |
| `c360KpiTile`, `c360SignalList` | Children of strip / signals panels |
| `c360TopAccounts` | Home hero (also exposed for App Builder) |

### Configurable KPI (Phase 1)

Optional **`c360ConfigurableKpiTile`** on App/Home pages: App Builder **Metric** property via `C360MetricKeyPicklist` → `C360_Metric_Definition__mdt` / `C360MetricController`. The hub Home uses **`c360KpiStrip`** with mock tiles only (no per-user KPI combobox on the dashboard).

### HTML prototypes

Modular previews under [`prototypes/html/`](prototypes/html/) — no Salesforce CLI required.

| Start here | Path |
|------------|------|
| Unified hub SPA (checked in) | [`prototypes/html/360 HTML prototype.html`](prototypes/html/360%20HTML%20prototype.html) |
| Overview assembly only | [`prototypes/html/assembly/overview-page.html`](prototypes/html/assembly/overview-page.html) |
| Per-module UAT | Each `prototypes/html/modules/<name>/preview.html` — see [moduleRegistry.md](prototypes/moduleRegistry.md) |

Rebuild unified HTML from modules + LWC CSS:

```bash
python scripts/build360HtmlPrototype.py
```

By default the script writes `360 HTML prototype.html` and `360 Accounts Hub prototype.html` to the **repo root**; sync or copy into `prototypes/html/` if that is your working copy.

## What this is NOT

Do **not** deploy from this repo (see [`.forceignore`](.forceignore)):

- `applications/`, `flexipages/`, `tabs/` — use the org’s existing Lightning app and pages
- Most `classes/` — merge reference stubs from [`classesStubs/`](classesStubs/) into org-owned Apex except whitelisted C360 controllers in `force-app`

Deprecated / removed from active IA: **`c360PathwaysTable`**, **`c360ExportModal`**, hub **pathways** HTML module (legacy only).

## Quick deploy

```bash
sf project deploy start --manifest manifest/packageLwc.xml
```

Metrics-only delta (CMDT + configurable tile dependencies):

```bash
sf project deploy start --manifest manifest/packageMetrics.xml
```

Wire **`c360Dashboard`** on the hub App Page and **`c360Account`** on Account Record Page in App Builder. Details and smoke tests: [`planSummary.md`](planSummary.md) (links to org wiring notes when present in your branch).

## Authority hierarchy (in this repo)

1. [`context/salesforce-hard-constraints.md`](context/salesforce-hard-constraints.md)
2. [`context/requirements-registry.md`](context/requirements-registry.md)
3. Wireframes / design system assets (client folders or [`design system/`](design%20system/) zips)
4. [`prototypes/html/shared/tokens.css`](prototypes/html/shared/tokens.css) + SLDS patterns in LWC CSS
5. HTML module specs under `prototypes/html/modules/*/moduleSpec.md`
6. Unified HTML prototype — content fallback when specs disagree

## Key trade-offs

| Topic | Choice | Alternative |
|-------|--------|-------------|
| Hub architecture | Monolithic `c360Dashboard` | Decomposed multi-view hub |
| Account deep-dive | Record Page + optional inline detail in hub | Hub-only inline (HTML SPA) |
| Alert Centre | Embedded in dashboard nav | Separate App Page |
| Data | Mock in `c360MockData.js`; User `getRecord`; cross-sell via `C360CrossSellController` | Full `@wire` per panel |
| Revenue Boost business case | Isolated LWC + HTML module | Merged into account cross-sell tab |
| apiVersion | 66.0 | Newer template versions |

## LWC bundle inventory

| LWC | Exposed | App Builder label | Targets |
|-----|---------|-------------------|---------|
| `c360Dashboard` | Yes | Customer 360 Dashboard | App Page, Home Page |
| `c360TopAccounts` | Yes | C360 Top Accounts | App Page, Home Page |
| `c360MaterialBanner` | Yes | C360 Material Banner | App Page, Home Page |
| `c360KpiStrip` | Yes | C360 KPI Strip | App Page, Home Page |
| `c360ConfigurableKpiTile` | Yes | C360 KPI Tile (configurable) | App Page, Home Page |
| `c360NeedsAction` | Yes | C360 Needs Action | App Page, Home Page |
| `c360PortfolioHealth` | Yes | C360 Portfolio Health | App Page, Home Page |
| `c360MySignals` | Yes | C360 My Signals | App Page, Home Page |
| `c360AccountsTable` | Yes | C360 Accounts Table | App Page, Home Page |
| `c360AlertCentre` | Yes | C360 Alert Centre | App Page, Home Page |
| `c360CrossSellTable` | Yes | C360 Cross-Sell Table | App Page, Home Page |
| `c360ChurnTable` | Yes | C360 Churn Table | App Page, Home Page |
| `c360RevenueBoostBusinessCase` | Yes | C360 Revenue Boost Business Case | App Page, Home Page, Account Record Page |
| `c360AlertDetail` | Yes | C360 Alert Detail | App Page, Home Page |
| `c360Account` | Yes | C360 Account Spotlight | Account Record Page |
| `c360AccountDetail` | No | — | Child (`c360Account` / hub) |
| `c360KpiTile` | No | — | Child (KPI strip / configurable tile) |
| `c360SignalList` | No | — | Child (My Signals / dashboard) |
| `c360MockData` | No | — | Shared JS module |

HTML → LWC mapping and preview links: **[`prototypes/moduleRegistry.md`](prototypes/moduleRegistry.md)**.

## Data & schema artefacts

- Field inventory: `c360LwcDtoInventory.csv` / `.xlsx` (generate with `scripts/generateDtoInventory.py`)
- HTML mocks mirror LWC: `prototypes/html/shared/mock-data.js`, `account-detail-data.js`, `revenue-boost-business-case-data.js`

## Development with Cursor

See [`docs/cursorDevelopmentScope.md`](docs/cursorDevelopmentScope.md) for the end-to-end workflow (module registry, HTML previews, LWC, sandbox UAT, live data cutover). Customer 360–specific notes: [`docs/cursorDevelopmentScopeC360CaseStudy.md`](docs/cursorDevelopmentScopeC360CaseStudy.md).

## Programme status

Assumptions, open questions, and gap analysis: [`planSummary.md`](planSummary.md).

**Only one hub component should be active on the org flexipage** (do not stack `c360Dashboard` with duplicate hub tiles on the same page).
