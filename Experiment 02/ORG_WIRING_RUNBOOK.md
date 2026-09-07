# Org wiring runbook — Experiment 02

Use this runbook after deploying the LWC package to a sandbox. Replace placeholder names with values from **Phase 0c org baseline retrieve**.

## Prerequisites

- [ ] Salesforce CLI authenticated to target sandbox
- [ ] LWC package deployed: `sf project deploy start --manifest manifest/package-lwc.xml`
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
4. Remove or replace with **`c360Dashboard`**
5. Save and **Activate** (if prompted)
6. Verify the page is still assigned to the Customer 360 app tab

**Pitfall:** Deploy succeeds but UI unchanged if this step is skipped.

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
2. Follow [classes-stubs/APEX_MERGE_GUIDE.md](classes-stubs/APEX_MERGE_GUIDE.md)
3. Update `@salesforce/apex/` imports in:
   - `c360Dashboard.js`
   - `c360AlertCentre.js`
   - `c360AlertDetail.js`
   - `c360Account.js`
4. Deploy **merged Apex only** via separate approved changeset — not via default Exp 02 package

## Step 6 — Verification

| Check | Expected |
|-------|----------|
| App tab loads | `c360Dashboard` renders with 5 nav tabs |
| Overview KPIs | 6 tiles including Health Index and Revenue at Risk |
| Alert Centre | Filterable table; Open → Alert Detail |
| Signals | Action/Dismiss updates count and shows toast |
| Account link | Click → inline account; Shift+click → Record Page |
| Export | PowerPoint modal opens from account view |
| Record Page | `c360Account` sidebar tabs render on Account |

## Rollback

1. App Builder → restore previous component (`c360App` or prior version)
2. Optionally deploy previous LWC version from git tag

## Hub strategy decision

| Strategy | When to use |
|----------|-------------|
| **Replace** with `c360Dashboard` | Org has minimal `c360App` customisation |
| **Evolve** existing `c360App` | Org has significant `c360App` changes — port patterns instead of swap |

Document the chosen strategy in `docs/org-baseline/README.md` after Phase 0c.
