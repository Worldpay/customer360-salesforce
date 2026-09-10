# Org wiring runbook — Experiment 05

Use this runbook after deploying the LWC package to a sandbox. Replace placeholder names with values from **Phase 0c org baseline retrieve**.

## Prerequisites

- [ ] Salesforce CLI authenticated to target sandbox
- [ ] LWC package deployed: `sf project deploy start --manifest manifest/packageLwcEx05.xml`
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
| Org apiVersion | e.g. `62.0` |
| Namespace prefix | e.g. _(none)_ |

## Step 2 — Wire hub component (App Page)

1. Setup → **Lightning App Builder**
2. Open the **existing** App Page flexipage (not a new page)
3. Select the current hub component region (likely `c360App`)
4. Remove or replace with **`c360DashboardEx05`**
5. Save and **Activate** (if prompted)
6. Verify the page is still assigned to the Customer 360 app tab

**Pitfall:** Deploy succeeds but UI unchanged if this step is skipped.

### Step 2b — Modular Overview (App Builder composition)

Use this instead of (or alongside) the monolithic `c360DashboardEx05` when building a composable Overview page from draggable tiles.

1. Setup → **Lightning App Builder** → open or create the Customer 360 App Page
2. Choose a layout with a **main region** (and optional sidebar for two-column panels)
3. Drag components from the custom palette in this order:

| Region | Component (palette label) |
|--------|---------------------------|
| Top | **C360 Material Banner (ex_04)** |
| Main | **C360 KPI Strip (ex_04)** |
| Main (column 1) | **C360 Needs Action (ex_04)** |
| Main (column 2) or sidebar | **C360 Portfolio Health (ex_04)** |
| Main | **C360 My Signals (ex_04)** |
| Main | **C360 Accounts Table (ex_04)** |

4. For dedicated views, add separate App Pages or tabs with:
   - **C360 Alert Centre (ex_04)**
   - **C360 Cross-Sell Table (ex_04)**
   - **C360 Churn Table (ex_04)**
   - **C360 Pathways Table (ex_04)**

5. Save and **Activate**

**Note:** Only one hub strategy should be active per App Page — do not place both `c360DashboardEx05` and modular tiles on the same page.

## Step 3 — Wire Account spotlight (Record Page)

1. Setup → **Lightning App Builder**
2. Open the **existing** Account Record flexipage
3. Add **`c360AccountEx05`** to the main region (or replace legacy component)
4. Save
5. Setup → **Lightning Record Pages** → confirm assignment for relevant Account record types

**Optional:** `c360AlertCentreEx05` / `c360AlertDetailEx05` can be added as separate App Pages if pilot requires standalone routes (not needed when embedded in `c360DashboardEx05`).

## Step 4 — Profile and permission access

- [ ] Profiles / permission sets grant access to deployed LWC bundles (automatic for exposed components)
- [ ] When Apex is wired: grant **Apex class** access
- [ ] **FLS** on fields referenced by `@wire` and `getRecord`

## Step 5 — Apex merge (when ready)

1. Retrieve existing controller(s) — do not overwrite
2. Follow [classesStubsEx05/apexMergeGuideEx05.md](classesStubsEx05/apexMergeGuideEx05.md)
3. Update `@salesforce/apex/` imports in:
   - `c360DashboardEx05.js`
   - `c360AlertCentreEx05.js`
   - `c360AlertDetailEx05.js`
   - `c360AccountEx05.js`
4. Deploy **merged Apex only** via separate approved changeset — not via default Exp 04 package

## Step 6 — Verification

| Check | Expected |
|-------|----------|
| App tab loads | `c360DashboardEx05` renders with 5 nav tabs |
| Overview KPIs | 6 tiles including Health Index and Revenue at Risk |
| Alert Centre | Filterable table; Open → Alert Detail |
| Signals | Action/Dismiss updates count and shows toast |
| Account link | Click → inline account; Shift+click → Record Page |
| Export | PowerPoint modal opens from account view |
| Record Page | `c360AccountEx05` sidebar tabs render on Account |

## Rollback

1. App Builder → restore previous component (`c360App` or prior version)
2. Optionally deploy previous LWC version from git tag

## Hub strategy decision

| Strategy | When to use |
|----------|-------------|
| **Replace** with `c360DashboardEx05` | Org has minimal `c360App` customisation |
| **Evolve** existing `c360App` | Org has significant `c360App` changes — port patterns instead of swap |

Document the chosen strategy in `docs/org-baseline/README.md` after Phase 0c.
