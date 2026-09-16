# Case study: Customer 360 Customer 360

This document is the **full** worked example for the playbook in [`cursorDevelopmentScope.md`](cursorDevelopmentScope.md). You do not need the C360 repo to run the steps on a new programme.

**Customer 360 Customer 360** is the programme where the playbook was proved. The sections below mirror **Set up → Build in Cursor → Deploy in Salesforce (mock, then connect data) → Continued development**.

---

## Summary

C360 is a **Salesforce LWC experience** for relationship managers: portfolio **Home** (top accounts and portfolio health first, then an operations snapshot), **Alert Centre** (list + detail), **All accounts** (portfolio, churn, and cross-sell as sub-tabs), and a schema v3 **Account** deep-dive on the record page. **What gets added into Salesforce** is new components on **existing** app and account pages (LWC-only deploy), with **sample data** in the bundles until live APIs are wired. Pilot shape: **Option C (Hybrid)** — wireframe-led alerts plus prototype-style hub navigation consolidated under **All accounts** for portfolio views.

| Playbook phase | Typical duration (C360) | Who leads | C360 outcome (headline) |
| -------------- | ----------------------- | --------- | ----------------------- |
| **Set up** (1–4) | **1 day** with Build (pilot elapsed longer) | Cursor user + Agent drafts | - Repo `customer360-salesforce`<br>- Prototype tree and **archive-scope** rule<br>- **moduleRegistry.md**, Option C IA |
| **Build in Cursor** (5–7) | **1 day** with Set up | Agent writes files; human UAT | - HTML + unified **`360 HTML prototype.html`**<br>- **c360LwcDtoInventory** started<br>- ~15 `*` LWCs on mock |
| **Deploy in Salesforce** (8–9) | **8:** **1 day** · **9:** **TBD** (per section) | Salesforce developer in VS Code (+ Agent on snippets) | - **8:** git handoff, `packageLwc.xml`, smoke on mock<br>- **9:** user header + cross-sell table pattern proven; rest of panels in same loop |
| **Continued development** (10) | Ongoing | Named approver on merges | - PR review<br>- Open items in **planSummary.md** |

---

## Set up (Steps 1–4)

### Step 1 — Repo and Salesforce shell

- **SFDX project:** `sfdx-project.json` — `sourceApiVersion` **62.0** (templates originally used 67.0; org aligned to 62.0).
- **Deploy surface:** `force-app/main/default/lwc/` only for active work; manifest **manifest/packageLwc.xml**.
- **`.forceignore`:** excludes Lightning apps, flexipages, tabs, and Apex classes so CI/deploy cannot overwrite client-owned metadata.
- **Naming:** all bundles and docs use `` suffix (`c360Dashboard`, `planSummary.md`, etc.) to avoid collisions with earlier experiments or org components.
- **CLI:** used at deploy time; HTML previews need no Salesforce CLI.

### Step 2 — HTML prototype tree

- **Registry:** `prototypes/moduleRegistry.md` — columns for spec / HTML / UAT / LWC target / deployed.
- **Shared assets:** `prototypes/html/shared/tokens.css` (SLDS 2–aligned tokens), `shell.css`, `shell.js`, `module-base.css`, `mock-data.js` (hub DTOs), `accounts-hub-mock-data.js`, `account-detail-data.js` (record page), `table-loading.css` / `table-loading.js`.
- **Modules:** one folder per panel under `prototypes/html/modules/` — e.g. `top-accounts`, `kpi-strip`, `needs-action`, `portfolio-health`, `signal-list`, `accounts-table`, `material-banner`, `alert-centre`, `cross-sell-table`, `churn-table`, `account-detail` (each with `moduleSpec.md`, `fragment.*`, `preview.html`).
- **Assembly:** `prototypes/html/assembly/overview-page.html` (modular Overview); **`scripts/build360HtmlPrototype.py`** writes **`360 HTML prototype.html`** (unified SPA: `c360-unified-spa-app.js`).
- **Canonical reference (outside repo):** `04. HTML prototypes/C360 Prototype v5.html` — full interactive IA;  does not duplicate the whole file, only modular previews.
- **Deprecated in hub IA:** `pathways-table` HTML remains in places but **pathways** and **export modal** LWCs were removed from  hub scope.

### Step 3 — Cursor workspace and rules

- **Workspace:** git repo root plus sibling folders — `07. Knowledge for C360/`, `09. Design system/`, `10. Wireframe/`, `06. Output templates/`, prototype v5 — so `@` and indexing see wireframes and tokens.
- **Authority (documented in README):** knowledge constraints → wireframe IA → design system visuals → output templates for LWC shape → prototype v5 for copy when wireframe is silent.
- **Rule file:** `.cursor/rules/archive-scope.mdc` — active code is `force-app/.../lwc/` and `prototypes/`; `archive/` (old Experiment 02/03 trees) is out of scope unless explicitly requested.
- **Modes used:** **Plan** for Option C reconciliation and gap tables; **Agent** for per-module HTML and LWC work.

### Step 4 — Scope and module registry

- **Pilot decision:** **Option C (Hybrid)** — monolithic hub `c360Dashboard` + embedded Alert Centre/Detail + wireframe KPI extensions (six headline KPIs, material changes banner, extended portfolio columns).
- **IA trade-offs recorded in planSummary.md:** e.g. **All accounts** side nav with churn/cross-sell as sub-tabs (not separate top-level nav); **seven-item** nav with Analytics / Customers / Reports / Settings as **disabled placeholders**; RM persona on hub copy.
- **What gets added into Salesforce (agreed):** new LWCs on existing flexipages — **not** a new app or tabs in the package.
- **Registry priorities:** P0 kpi-strip, needs-action, top-accounts, portfolio-health, signal-list, account-detail; P1 accounts-table, material-banner, alert-centre; P2 cross-sell-table, churn-table (pathways P2 but deprecated for deploy).

---

## Build in Cursor (Steps 5–7)

### Step 5 — HTML prototypes

- Built **moduleSpec → fragment → preview** for each registry row; browser UAT on `preview.html`, **overview-page.html**, and rebuilt **`360 HTML prototype.html`**.
- **Design alignment:** wireframe Enterprise Account Hub and Alert Centre/Detail PDFs plus design system PNGs fed into tokens and column sets; prototype v5 used for interactions and sample account names (e.g. Pets at Home) where wireframes were silent.
- **Hub navigation behaviour in HTML/shell:** account links intended to open **Account record** context (`data-open-account-source` pattern); not an inline full account SPA inside the hub in  LWCs.
- **Checkpoint reached:** spec and HTML marked **done** in registry for hub modules; account-detail preview mirrors record-page churn/cross-sell UI (not embedded in hub assembly).

### Step 6 — Data schema

- **6a — Generated in Cursor:** mock shapes in `prototypes/html/shared/mock-data.js`, `accounts-hub-mock-data.js`, and `c360MockData.js` / `c360AccountDetailData.js` (exports such as `ACCOUNTS`, `SIGNALS`, `ALERTS`, `ALERT_DETAIL_BY_ID`, `ALERT_INTEL`, `ACCOUNT_DETAIL`); field names chosen for future Apex parity.
- **Script:** `scripts/generateDtoInventory.py` → **c360LwcDtoInventory.xlsx** and **.csv** (columns: DTO object, field name, type, requirement, page, component, section title, data source).
- **6b — Engineer alignment (in progress):** spreadsheet handed off; data owners map **Data source** (CRM vs Snowflake mart vs calculated) and join keys; workshop-style review — not fully automated in Cursor.
- **Live wire deferred to Step 9**; provenance footer copy (e.g. Snowflake → Salesforce, ~15 min) may appear in UI before pipeline exists.

### Step 7 — LWC conversion

- **Hub orchestrator:** `c360Dashboard` composes Home, Alert Centre, Alert Detail, and **All accounts** (portfolio / churn / cross-sell sub-tabs); shared mock via `c360MockData`.
- **Exposed hub bundles (examples):** `c360TopAccounts`, `c360MaterialBanner`, `c360KpiStrip`, `c360KpiTile` (child), `c360NeedsAction`, `c360PortfolioHealth`, `c360MySignals`, `c360SignalList` (child), `c360AccountsTable`, `c360AlertCentre`, `c360AlertDetail`, `c360ChurnTable`, `c360CrossSellTable`.
- **Record page:** `c360Account` bootstrap → child `c360AccountDetail` (not exposed standalone).
- **Patterns:** fragment HTML/CSS ported per module; child tiles/lists use `@api` and events; hub uses **NavigationMixin** to Account record; **apiVersion 62.0** in meta.xml; monolithic hub vs earlier decomposed `c360App` experiment documented in README.
- **Salesforce-ready (static):** UI complete on mock data; DTO inventory supports backend contract talks; live analytics in **Step 9 Connect data**.

| HTML module | LWC bundle | Notes |
| ----------- | ---------- | ----- |
| kpi-strip | c360KpiStrip + c360KpiTile | Child tiles |
| top-accounts | c360TopAccounts | Home hero |
| needs-action | c360NeedsAction | P0 |
| portfolio-health | c360PortfolioHealth | P0; interactive on Home |
| signal-list | c360MySignals + c360SignalList | Child list |
| accounts-table | c360AccountsTable | Overview + portfolio variant |
| material-banner | c360MaterialBanner | P1 |
| alert-centre | c360AlertCentre | Wireframe-led |
| cross-sell-table | c360CrossSellTable | P2 |
| churn-table | c360ChurnTable | P2 |
| account-detail | c360AccountDetail | Record page only |

---

## Deploy in Salesforce (Steps 8–9)

*Aligned with **C360 UI/UX working session** (15 September 2026).*

### Step 8 — Deploy with mock data

**People (not the agent) own:** deploy permissions, App Builder placement, and smoke-test sign-off.

- **Handoff:** LWC sources in **git** (developer opens repo in **VS Code**). Avoid shipping bundles only via SharePoint — that path corrupted HTML tags and added junk lines in files.
- **Command:** `sf project deploy start --manifest manifest/packageLwc.xml` (pilot: deploy **one or two** components first to confirm they render on the page).
- **Org wiring:** **orgWiringRunbook.md** — hub **App Page** (`c360Dashboard`); `c360Account` on **Account Record**; profiles and permission sets.
- **Component strategy:** Update **existing ** components in the org during pilot rather than duplicating bundle names, unless rollback requires a copy.
- **Checklist:** **handoffChecklist.md** (reconcile with **moduleRegistry.md** where outdated).
- **Smoke (mock):** Home priority zone; Alert Centre; **All accounts** sub-tabs; signals; account → record page; table loading UX; breakpoints ~850px / ~520px.

### Step 9 — Connect data

**People (not the agent) own:** Snowflake → Salesforce sync, schema **Data source** sign-off, Apex, RM scoping, and per-section UI verification.

**Prerequisite chain (C360):**

1. **c360LwcDtoInventory** from Cursor + **generateDtoInventory.py** — engineers document former Tableau/mart **table and column** per field.
2. **Sync** — analytics objects populated in sandbox (not queried from Snowflake inside LWC).
3. **Section-by-section cutover** in Salesforce UI (see playbook Step 9 in `cursorDevelopmentScope.md`).

**Worked examples from the session:**

| UI block | LWC / area | Pattern | What changed |
| -------- | ---------- | ------- | ------------ |
| Hub user name, initials, job title | Dashboard header | **A — Platform** | - Hard-coded strings → JS properties<br>- `getRecord` on User — **no Apex** |
| Cross-sell table | `c360CrossSellTable` | **B — Apex** | - Mock import removed<br>- `getCrossSellAccounts` SOQL on synced object<br>- RM filter on owned Account Ids |

**In progress / remaining:** KPI strip, alerts, churn, portfolio table, signals, account record — same **trace UI → bundle → A or B → deploy → verify** loop; governor and sharing tests; **classesStubs/apexMergeGuide.md** for client Apex merge.

---

## Continued development (Step 10)

- **Done:** HTML/LWC build, LWC-only handoff docs, mock-driven sandbox UI after Step 8.
- **Open:** Org baseline **0c**; full Step 9 connect data; Account spotlight Phase 6; single hub vs `c360App`; requirements registry; R04 export scope.

---

## Design inputs and diagrams

**Inputs (typically outside git repo)**

| Folder | Used for |
| ------ | -------- |
| 07. Knowledge for C360 | Constraints, requirements registry, design-rules |
| 10. Wireframe | Enterprise Account Hub, Alert Centre, Alert Detail IA |
| 09. Design system | SLDS 2 tokens, typography, elevation |
| 06. Output templates | Monolithic dashboard template, `@wire` patterns |
| 04. HTML prototypes | C360 Prototype v5 — content and interaction fallback |

**[Flow diagram — recreate in Confluence or draw.io if needed.]** Design inputs → `prototypes/html` and mock data → LWCs → App Builder → merged Apex.

### Assumptions still open

Existing C360 Lightning app and flexipages; one hub component; mock joins by **account name** until **Account Id** in production; LWC-only CI; alert automation and custom objects TBD; **planSummary.md** holds full open-question list.

### Intended production data flow

Snowflake / Data 360 → scheduled sync (~15 min) → summary objects in org → **C360PortfolioController** (or client equivalent) joins CRM + summaries → LWCs. One pre-aggregated DTO per screen where possible; RM scoping on server; alert outcome forms as separate write path. Field-level joins should follow **c360LwcDtoInventory** after engineer alignment, not mock name keys.

| UI surface | Mock today | Target join |
| ---------- | ---------- | ----------- |
| Portfolio table | ACCOUNTS[] | Account.Id + RM scope |
| Signals | SIGNALS by id | AccountId + type |
| Alert Centre | ALERTS | Alert entity, RM filter |
| Alert detail | ALERT_DETAIL_BY_ID | Alert id → drivers, trajectory |
| Cross-sell on alert | ALERT_INTEL by name | Alert → account → propensity |
| Account record | ACCOUNT_DETAIL by name | recordId → account mart |
| KPI strip | Derived counts | Single PortfolioSummary call |

---

## Repo index (quick lookup)

README.md · planSummary.md · prototypes/moduleRegistry.md · handoffChecklist.md · orgWiringRunbook.md · classesStubs/apexMergeGuide.md · docs/org-baseline/README.md · scripts/generateDtoInventory.py · scripts/build360HtmlPrototype.py · c360LwcDtoInventory.xlsx
