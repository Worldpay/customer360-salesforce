# Org wiring runbook — Customer 360

Use this runbook after deploying the LWC package to a sandbox. Replace placeholder names with values from **Phase 0c org baseline retrieve**.

## Prerequisites

- [ ] Salesforce CLI authenticated to target sandbox
- [ ] LWC package deployed: `sf project deploy start --manifest manifest/packageLwc.xml`
- [ ] Org baseline documented in `docs/org-baseline/` (flexipage API names, current component)

## Step 1 — Inventory existing metadata

Retrieve (adjust names after discovery):

```bash
sf project retrieve start -m "FlexiPage:C360_Home" -m "FlexiPage:C360_Account" -m "LightningComponentBundle:c360App"
```

Record:

| Item | Org value (fill in) |
|------|---------------------|
| Lightning App API name | e.g. `Customer_360` |
| App Page flexipage | e.g. `C360_Home` |
| Account Record flexipage | e.g. `C360_Account` |
| Current hub LWC on App Page | e.g. `c360App` |
| Org apiVersion | e.g. `66.0` |
| Namespace prefix | e.g. _(none)_ |

## Step 2 — Wire hub component (App Page)

1. Setup → **Lightning App Builder**
2. Open the **existing** App Page flexipage (not a new page)
3. Select the current hub component region (likely `c360App`)
4. Remove or replace with **`c360Dashboard`**
5. Save and **Activate** (if prompted)
6. Verify the page is still assigned to the Customer 360 app tab

**Pitfall:** Deploy succeeds but UI unchanged if this step is skipped.

### Step 2b — Modular Overview (App Builder composition)

Use this instead of (or alongside) the monolithic `c360Dashboard` when building a composable Overview page from draggable tiles.

1. Setup → **Lightning App Builder** → open or create the Customer 360 App Page
2. Choose a layout with a **main region** (and optional sidebar for two-column panels)
3. Drag components from the custom palette in this order:

| Region | Component (palette label) |
|--------|---------------------------|
| Top | **C360 Material Banner** |
| Main | **C360 KPI Strip** |
| Main (column 1) | **C360 Needs Action** |
| Main (column 2) or sidebar | **C360 Portfolio Health** |
| Main | **C360 My Signals** |
| Main | **C360 Accounts Table** |

4. For dedicated views, add separate App Pages or tabs with:
   - **C360 Alert Centre**
   - **C360 Cross-Sell Table**
   - **C360 Churn Table**
   - **C360 Pathways Table**

5. Save and **Activate**

**Note:** Only one hub strategy should be active per App Page — do not place both `c360Dashboard` and modular tiles on the same page.

### Step 2c — Configurable KPI tiles (Phase 1)

Deploy metric CMDT, hierarchy custom setting, Apex, and LWCs (included in `manifest/packageLwc.xml`, or metrics delta via `manifest/packageMetrics.xml`).

**App Builder:** `c360ConfigurableKpiTile` — drag **C360 KPI Tile (configurable)** onto an App or Home page (one instance per KPI). The **Metric** property uses Apex picklist `C360MetricKeyPicklist` (options from CMDT — no manual `js-meta.xml` value list).

Per-user home metric preference (`Home_Metric_Key__c` on **C360 User Preferences**) remains available for future hub wiring; the hub no longer embeds a user KPI combobox tile.

**Adding a metric:** Deploy a new `C360_Metric_Definition` CMDT record with `Metric_Key__c` + display fields; it appears in App Builder after deploy.

Pilot values mirror `KPI_TILES` in `c360MockData.js` (Setup → Custom Metadata Types → C360 Metric Definition → Manage Records).

**Smoke test:** App Builder tile shows CMDT label/value for selected metric.

## Step 3 — Wire Account spotlight (Record Page)

1. Setup → **Lightning App Builder**
2. Open the **existing** Account Record flexipage
3. Add **`c360Account`** to the main region (or replace legacy component)
4. Save
5. Setup → **Lightning Record Pages** → confirm assignment for relevant Account record types

**Optional:** `c360AlertCentre` / `c360AlertDetail` can be added as separate App Pages if pilot requires standalone routes (not needed when embedded in `c360Dashboard`).

## Step 4 — Profile and permission access

- [ ] Profiles / permission sets grant access to deployed LWC bundles (automatic for exposed components)
- [ ] When Apex is wired: grant **Apex class** access
- [ ] **FLS** on fields referenced by `@wire` and `getRecord`

## Step 5 — Apex merge (when ready)

1. Retrieve existing controller(s) — do not overwrite
2. Follow [classesStubs/apexMergeGuide.md](classesStubs/apexMergeGuide.md)
3. Update `@salesforce/apex/` imports in:
   - `c360Dashboard.js`
   - `c360AlertCentre.js`
   - `c360AlertDetail.js`
   - `c360Account.js`
4. Deploy **merged Apex only** via separate approved changeset — not via default Exp 04 package

## Step 2c — Home + All accounts IA (mock UAT)

Reference: [`360 HTML prototype.html`](360%20HTML%20prototype.html) (build: `python scripts/build360HtmlPrototype.py`).

**Home (`c360Dashboard` overview):** `c360TopAccounts` and interactive **`c360PortfolioHealth`** above the fold; legacy KPI / signals / top-movers table in **Operations snapshot** below. CTA opens **All accounts** → portfolio sub-tab (`healthFilter=All`).

**All accounts / Churn / Cross-sell:** Side nav **All accounts**, **Churn**, and **Cross-sell** (no in-page sub-tabs). **All accounts** → `c360AccountsTable` `variant=portfolio`; **Churn** → `c360ChurnTable`; **Cross-sell** → `c360CrossSellTable`. Listen for **`portfoliohealthfilter`** on Home and set **`healthFilter`** on the portfolio table; sync chip changes via **`healthfilterchange`**.

**Table loading:** Portfolio/churn/overview accounts and Alert Centre use ~800ms mock delay + spinner; cross-sell uses wire pending state.

## Step 6 — Verification

| Check | Expected |
|-------|----------|
| App tab loads | `c360Dashboard` — Home, Alert Centre, **All accounts**, **Churn**, **Cross-sell** in side nav |
| Home priority | Top accounts + portfolio health visible before Operations snapshot |
| All accounts | Side nav opens portfolio table (unfiltered by default); Churn / Cross-sell are separate nav items |
| Overview KPIs | KPI tiles in Operations snapshot |
| Alert Centre | Filterable table with loading UX; Open → Alert Detail |
| Signals | Action/Dismiss updates count and shows toast |
| Account link | Click → inline account; Shift+click → Record Page |
| Export | PowerPoint modal opens from account view |
| Record Page | `c360Account` sidebar tabs render on Account |
| HTML prototype | Side nav has `data-nav-view="allaccounts"` only (no top-level `churn` / `crosssell`) |

## Rollback

1. App Builder → restore previous component (`c360App` or prior version)
2. Optionally deploy previous LWC version from git tag

## Hub strategy decision

| Strategy | When to use |
|----------|-------------|
| **Replace** with `c360Dashboard` | Org has minimal `c360App` customisation |
| **Evolve** existing `c360App` | Org has significant `c360App` changes — port patterns instead of swap |

Document the chosen strategy in `docs/org-baseline/README.md` after Phase 0c.
