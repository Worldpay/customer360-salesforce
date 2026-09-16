# Design to Salesforce with Cursor (and similar AI tools)

**How to set up your own repo** · **Customer 360 as the worked example**

---

## Overview — the whole journey

This document helps you turn **design files** (wireframes, design system, requirements) into **working Salesforce screens**. Most of the **file writing** happens in **Cursor** (or a similar AI IDE), but people still **approve** layout, scope, deploys, and anything that touches real data.

The journey has four parts:

1. **Set up** — Create the repo, wireframes in Cursor, and a list of UI panels to build.
2. **Build in Cursor** — Browser HTML previews, a data field list (schema), and Salesforce LWCs that use **sample data**.
3. **Deploy in Salesforce** — Hand LWCs via Git, prove the UI in sandbox on **sample data**, then **connect live data** section by section once the schema is signed and data tables exist.
4. **Sustain** — Reviews, fixes, and iterations over time.

**Programme journey** (paste into Confluence as a **code** or **preformatted** block so spacing is preserved):

```text
  Set up          Build in Cursor       Sandbox on          Connect live         Continued
  (Steps 1-4)     (Steps 5-7)           sample data         data               development
                  HTML, schema, LWC       (Step 8)            (Step 9)           (Step 10)
      |                 |                     |                   |                  |
      v                 v                     v                   v                  v
  +--------+    +----------------+    +----------------+    +-------------+    +-----------+
  | Repo,  | -> | moduleSpec,    | -> | Deploy LWCs,   | -> | Per UI      | -> | PR review,|
  | registry|   | previews, DTO  |    | mock smoke UAT |    | section:    |    | registry  |
  | rules  |    | inventory, LWC |    | stakeholder OK |    | Apex/wire   |    | in sync   |
  +--------+    +----------------+    +----------------+    +-------------+    +-----------+
```

Step-by-step tasks are in **STEPS** below. The two tables summarise timing and approvals for the whole programme.

### Inputs, outputs, steps, and duration


| Phase                      | Steps | Duration                                                                                 | Inputs                                                                                                                                                                               | Outputs                                                                                                                                                                                                                                                                          |
| -------------------------- | ----- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Set up**                 | 1–4   | **1 day** with Build (steps 1–7 combined)                                                | - Empty or new git repo - Wireframes, design system, requirements - Optional LWC templates                                                                                           | - `sfdx-project.json` and LWC folder - `prototypes/` tree - `.cursor/rules` - **Module registry** (tracker for each UI panel, HTML/LWC status, Salesforce component name) - README **authority rules** (which source wins when wireframe, prototype, and design system conflict) |
| **Build in Cursor**        | 5–7   | Same **1 day** as Set up                                                                 | - Agreed module registry - Design files in workspace - `mock-data.js` (or stub)                                                                                                      | - `moduleSpec` + `preview.html` per panel - **Data schema** spreadsheet or CSV from step 6a (field names, types, screens, components) - LWC bundles on **sample data**                                                                                                           |
| **Align data sources**     | 6b    | May vary depending on cleanliness of data — expected anywhere from **1 day to 1+ weeks** | - Data schema from 6a (**Data source** column often TBD until engineers fill it)                                                                                                     | - Spreadsheet with **Data source** filled (system, object, field per row) - Agreed join keys (e.g. Salesforce Account Id)                                                                                                                                                        |
| **Sandbox on sample data** | 8     | **1 day**                                                                                | - LWCs in **git** - Manifest - Runbook - Sandbox access                                                                                                                              | - Components on pages - Smoke tests passed on **mock** data                                                                                                                                                                                                                      |
| **Connect live data**      | 9     | **TBD** (per UI section)                                                                 | - Signed data schema - Warehouse/mart landed in org via **warehouse → Salesforce sync** (Apex-queryable objects, not live warehouse calls from LWC) - UI accepted on mock in sandbox | - Each section on live values - Apex where needed - Mock imports removed per bundle                                                                                                                                                                                              |
| **Continued development**  | 10    | Ongoing                                                                                  | - PRs - CI - Change requests                                                                                                                                                         | - Reviewed merges - Module registry and docs in sync                                                                                                                                                                                                                             |


Complete **sandbox on sample data** (step 8) before **connect live data** (step 9). Live cutover needs **align data sources** (6b) and **warehouse → Salesforce sync**.

### Roles and stage gates

People approve anything that affects the **client org**, **production data**, or **signed-off scope**. The **AI agent** drafts files in git (**Plan** = align without edits; **Agent** = code); a human reviews every merge.


| Phase                      | Cursor user                                                                   | Salesforce developer                                                     | AI agent                                               | Stage gate (approval to proceed)                                                                                   |
| -------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| **Set up**                 | - Folders, workspace, module registry, authority rules - Plan for module list | - LWC-only deploy boundary - apiVersion - `.forceignore`                 | - Drafts rules and registry - No org deploy            | - Authority rules written - **Registry agreed** (ordered module list, P0/P1/P2 priorities, pilot scope signed off) |
| **Build in Cursor**        | - Agent per module - Browser UAT - Schema generation (6a)                     | - Reviews `meta.xml`, naming, hub composition                            | - moduleSpec, HTML, LWC, schema CSV                    | - Key panels **passed browser review** - Data schema exists (**Data source** may still be TBD)                     |
| **Align data sources**     | - Sends schema - Updates mock when UI changes                                 | - Joins workshop - Maps fields to org objects                            | —                                                      | - **Data / integration engineers:** every required P0 field has **Data source**; none left TBD                     |
| **Sandbox on sample data** | - Push git - Bundle-to-screen map - apiVersion - No SharePoint-only handoff   | - VS Code deploy - App Builder - Smoke tests                             | —                                                      | - Stakeholders sign off **full UI journey on mock** in sandbox                                                     |
| **Connect live data**      | - Schema/mock alignment - Optional Agent drafts from snippets                 | - Trace UI → LWC - **getRecord** or Apex - RM scope - Deploy per section | - Drafts JS/Apex/wire from HTML or mock-import snippet | - **Per section:** live data matches data schema and expectations in sandbox                                       |
| **Continued development**  | - Small Agent fixes - Optional Bugbot / security review                       | - Merge approval - Production deploys                                    | - Review helpers only - No unsupervised org changes    | - **Named approver** on every change to shared branch or org                                                       |


---

# STEPS TO FOLLOW

## Set up

**Duration:** Part of **1 day** combined with Build (creating Salesforce-deployable code). 

**Phase checkpoint:** The team has **agreed the module list and priorities** and **which design document wins** when sources conflict. Plan mode can `@` mention a wireframe and `tokens.css` and list modules.

### Step 1 — Create the git repo and Salesforce project shell

1. Create a new git repository (or clone your programme repo).
2. Add a Salesforce DX layout so LWCs have a deploy target:

```
your-repo/
  sfdx-project.json          # sourceApiVersion, packageDirectories → force-app
  manifest/
    package-lwc.xml          # LWC-only manifest for deploy
  .forceignore               # exclude flexipages, apps, tabs, Apex if client-owned
  force-app/
    main/default/lwc/        # empty at first; one subfolder per component later
  README.md                  # authority rules + quick start (Step 3)
```

1. Install **Salesforce CLI** if needed for **Deploy in Salesforce** (Step 8). Steps 1–7 do not require it.

**Customer 360 (Customer 360):** The delivery repo uses project name `customer360-salesforce`, deploys LWCs only via `manifest/packageLwc.xml`, and pins **apiVersion 66.0** to match the client org. The `.forceignore` file deliberately excludes Lightning apps, flexipages, tabs, and Apex so a pilot deploy cannot overwrite metadata the client already owns.

---

### Step 2 — Add the HTML prototype tree

Create the modular prototype structure **before** writing LWCs. Every UI panel gets its own folder.

```
prototypes/
  moduleRegistry.md          # YOU maintain this — source of truth for progress
  html/
    shared/
      tokens.css             # design tokens (from design system)
      shell.css
      shell.js               # chrome, toasts, nav helpers
      module-base.css        # shared panel primitives
      mock-data.js           # sample DTOs for hub screens
    modules/
      {module-name}/         # e.g. kpi-strip, alert-centre
        moduleSpec.md        # contract: fields, events, boundaries
        fragment.html
        fragment.css
        fragment.js
        preview.html         # opens in browser without Salesforce
    assembly/
      overview-page.html     # composes modules for full-page UAT
scripts/
  generateDataSchema.py      # optional; see Step 6 (Customer 360: generateDtoInventory.py)
docs/
  cursorDevelopmentScope.md           # this playbook
  cursorDevelopmentScopeC360CaseStudy.md  # full C360 worked example
.cursor/
  rules/
    your-scope.mdc           # what the AI should / should not touch
```

**Checkpoint:** Open `prototypes/html/shared/tokens.css` and one empty `moduleSpec.md` template. Registry has at least one row.

**Customer 360:** Progress is tracked in `prototypes/moduleRegistry.md`. Shared hub DTOs live under `prototypes/html/shared/` (including `mock-data.js` and hub-specific `accounts-hub-mock-data.js`). Full-page browser UAT uses modular `overview-page.html` and the assembled `**360 HTML prototype.html`** (rebuild with `scripts/build360HtmlPrototype.py`).

---

### Step 3 — Configure Cursor (or your AI IDE)

### 3a. Workspace

1. Open **the repo root** as the project.
2. **Add design inputs** to the workspace (File → Add Folder to Workspace), so the agent can read them:
  - Requirements / knowledge pack  
  - Wireframes  
  - Design system (PNGs, token docs)  
  - Reference HTML prototype (if any)  
  - Salesforce output templates (LWC patterns)

Design folders often live **outside** the git repo; multi-root workspace is normal.

### 3b. Authority rules (put in README and prompts)

When wireframe, prototype, and design system disagree, the team must agree **one winner per topic** (authority rules) before Cursor generates lots of UI. Example:


| Conflict about             | Wins                |
| -------------------------- | ------------------- |
| Screens and navigation     | Wireframe           |
| Colour, type, spacing      | Design system       |
| LWC structure              | Output templates    |
| Copy when wireframe silent | Reference prototype |
| Hard constraints           | Requirements doc    |


### 3c. Cursor rules file (`.cursor/rules/your-scope.mdc`)

Minimum content to add:

- Active code paths: `prototypes/`, `force-app/main/default/lwc/`.
- Do not use `archive/` or legacy experiment folders unless the user names a path.
- Require `moduleSpec.md` before creating or converting an LWC.
- Update `prototypes/moduleRegistry.md` when adding or completing a module.

**Prompt (Agent):** *Read prototypes/ and force-app/. Draft a .cursor/rules file that enforces moduleSpec-before-LWC and module registry updates.*

### 3d. Modes


| Mode      | Use for                                                |
| --------- | ------------------------------------------------------ |
| **Plan**  | Scope, gap analysis, workshop prep — **no file edits** |
| **Agent** | moduleSpec, fragments, LWCs, scripts                   |
| **Ask**   | Explanations only                                      |


**Checkpoint:** In Cursor, `@` mention a wireframe PDF and `prototypes/html/shared/tokens.css`; ask Plan mode to list P0 modules — confirm it sees both.

**Customer 360 (Customer 360):** The workspace is multi-root: repo plus sibling folders for knowledge, wireframes, design system, output templates, and prototype v5. Authority order is documented in **README.md**. `.cursor/rules/archive-scope.mdc` keeps the agent on `prototypes/` and `force-app/.../lwc/` and out of archived experiment trees unless you name a path.

---

### Step 4 — Align scope and fill the module registry

#### STEPS:

1. In **Plan** mode, attach wireframes and requirements. Ask Cursor to list UI panels as modules with P0/P1/P2 and note any conflicts between sources.
2. Create **prototypes/moduleRegistry.md** with columns: module name, priority, spec done, HTML done, LWC bundle name, notes.
3. Write down what **gets added into Salesforce** (usually new components on existing pages), what the client configures in App Builder, and what is out of scope.

**Checkpoint:** Everyone agrees on the **ordered module list** and what is in the pilot (**registry agreed**).

**Customer 360:** The team signed **Option C (Hybrid)** — monolithic hub `c360Dashboard` with Alert Centre/Detail, Home (top accounts + portfolio health), and **All accounts** (portfolio, churn, and cross-sell as sub-tabs), plus schema v3 account detail on the record page. New LWCs land on existing flexipages only (no new app in the package). Roughly fifteen `*` bundles are in scope; trade-offs and open IA questions sit in **planSummary.md**.

---

## Build in Cursor

**Duration:** Same **1 day** window as Set up. See overview tables.

### Step 5 — Build HTML prototypes (one module per agent task)

**STEPS (repeat per module):**

1. **moduleSpec.md** — fields, mock row shape, events, DOM scope, planned LWC name.
2. **fragment.html / .css / .js** — panel only; use `tokens.css` and `module-base.css`.
3. **preview.html** — load shared shell + `mock-data.js`.
4. Update registry: HTML = done or feedback.
5. When P0 modules are ready, wire **assembly/overview-page.html**.

**Prompts (Agent):**

- *Draft moduleSpec for* `{module}` *from wireframe* `{screen}`*. Wireframe wins labels; design system wins tokens.*
- *Implement fragment.* from moduleSpec; no duplicate token values outside tokens.css.*
- *Create preview.html for* `{module}` *with shared shell and mock-data.js.*

**Anti-patterns:** Single HTML file for the whole app; skip moduleSpec; copy from archived repos.

**Checkpoint:** Stakeholders review in browser; registry shows HTML done for P0.

**Customer 360:** Each registry row was built as moduleSpec → fragment → preview, with wireframe and design-system PNGs driving labels and tokens and prototype v5 filling gaps. Hub account links are wired for **Account record** navigation, not an inline account SPA. P0 hub modules reached browser sign-off; **account-detail** is validated on its record-page preview, not inside the hub assembly.

---

### Step 6 — Data schema: generate in Cursor and align sources (handoff)

Prepare the contract for live data **during Build**. You **connect live data** after the UI is proven in Salesforce on sample data (see **Connect live data** in the phases table).

### 6a. Generate the schema (Cursor + mock data)

#### **STEPS** 

1. Keep **one mock module** in repo (`prototypes/html/shared/mock-data.js` and/or LWC `mockData.js`) using **field names you want in production**.
2. Ensure every **moduleSpec** property appears in mock data.
3. Use Cursor to produce or extend a **schema artefact** (spreadsheet or CSV), with columns at minimum:

  | Column        | Purpose                                                                |
  | ------------- | ---------------------------------------------------------------------- |
  | DTO object    | Logical entity (e.g. PortfolioAccount, AlertRow)                       |
  | Field name    | Same as mock / LWC                                                     |
  | Type          | string, number, boolean, date, array, object                           |
  | Requirement   | Required / optional / display-only                                     |
  | Page / screen | Where shown                                                            |
  | Component     | Module or LWC name                                                     |
  | Section title | Panel heading                                                          |
  | Data source   | **TBD** until step 6b (engineers fill system, object, and field in 6b) |

4. Optionally maintain **scripts/generateDataSchema.py** that regenerates xlsx/csv from mock definitions so the UI contract does not drift.

**Prompts:**

- *From all moduleSpecs and mock-data.js, produce a CSV data schema with the columns above; flag duplicate field names.*
- *Add mock rows for* `{screen}` *consistent with wireframe columns.*

**Checkpoint:** Schema file exists; **Data source** may still be TBD or draft.

### 6b. Align data sources (engineers + delivery)

#### **STEPS**

Cursor does not know your warehouse or CRM layout. People fill that in:

1. **Cursor user** sends the schema spreadsheet to data and integration engineers.
2. Engineers **fill the Data source column** (which system and table or object each field comes from) and agree **how rows link** (use Salesforce **Account Id**, not display name).
3. Hold a short workshop until every **must-have field** on P0 screens has a source.

**Checkpoint:** The spreadsheet is dated; no required P0 field is still marked TBD for source.

**Customer 360:** Cursor generated **c360LwcDtoInventory** (xlsx/csv) from mock modules and moduleSpecs using **scripts/generateDtoInventory.py**, with exports such as `ACCOUNTS`, `SIGNALS`, and `ALERTS` aligned to future Apex shapes. Data owners are still filling **Data source** (CRM vs Snowflake mart vs calculated) in workshop; live `@wire` and Apex replace mocks in **Step 9**, which remains in progress for most panels.

---

### Step 7 — Convert HTML to LWCs

**STEPS (per module, after HTML checkpoint):**

1. Create bundle under `force-app/main/default/lwc/{BundleName}/` — `.html`, `.js`, `.css`, `.js-meta.xml`.
2. Port **fragment** markup and styles; map **moduleSpec** events to `@api` and `CustomEvent`.
3. Import mock data from a shared module until **Step 9 (Connect data)** replaces it per screen.
4. Update registry: LWC = done.
5. Compose parent hub component last (dashboard pattern).


| HTML         | LWC                                            |
| ------------ | ---------------------------------------------- |
| fragment.*   | One bundle per registry row                    |
| mock-data.js | Shared mock module in force-app                |
| Hub links    | NavigationMixin to record page (if applicable) |


**Prompts:**

- *Convert prototypes/html/modules/{module}/fragment.* to LWC {BundleName}; field names must match data schema.*
- *Parent dashboard composes only children listed in moduleRegistry.*

**Salesforce-ready (static pilot):** Installable LWCs, correct `targets` in meta.xml, mock data — live analytics in **Step 9**.

**Customer 360 (Customer 360):** `c360Dashboard` composes child bundles last and switches views for Home, Alert Centre, and All accounts. Shared sample data lives in `c360MockData`; the record page uses `c360Account` → `c360AccountDetail`. Account links use **NavigationMixin** to the Account record page. See the HTML→LWC map in `[cursorDevelopmentScopeC360CaseStudy.md](cursorDevelopmentScopeC360CaseStudy.md)`.

---

## Deploy in Salesforce (Steps 8–9)

Cursor delivers LWCs on mock data; the **Salesforce developer** deploys and then **works through the live UI one section at a time**, tracing each block to its LWC and swapping mock imports for platform APIs or Apex that reads **synced warehouse objects** per the schema. See overview tables (**Sandbox on sample data** and **Connect live data** rows).

**Handoff tip:** Prefer **git clone / pull** for the `force-app/.../lwc` tree. Copying LWCs through **SharePoint** has corrupted HTML closing tags and added stray metadata lines — use git for source of truth.

### Step 8 — Deploy with mock data

**Duration:** **1 day**

**STEPS:**

1. **Hand off via git** — Salesforce developer pulls the repo (or deploys from CI). Avoid re-packaging only the LWC folder through SharePoint.
2. Deploy LWC-only package:
  `sf project deploy start --manifest manifest/package-lwc.xml`  
   (Customer 360: `manifest/packageLwc.xml`).  
   For early validation, deploy **one or two** components first and confirm they appear on the target page before the full manifest.
3. In **App Builder**, place components on **existing** app and record pages (see runbook). During pilot, **update the existing  components** in the org rather than creating duplicate bundle names, unless you need a rollback copy.
4. Run smoke tests from your handoff checklist (navigation, tabs, record page, responsive breakpoints).

**Checkpoint:** Sandbox shows the full UI journey with **mock/sample** data. Stakeholders agree layout and flows before you replace data in Step 9.

**Customer 360 (Customer 360):** Follow **orgWiringRunbook.md** and **handoffChecklist.md**: place `c360Dashboard` on the hub App Page and `c360Account` on Account Record, deploy with `packageLwc.xml`, and smoke-test Home, Alert Centre, All accounts sub-tabs, signals, and record navigation on mock data before Step 9.

---

### Step 9 — Connect data

**Duration:** **TBD** — usually **one UI section or table at a time**, after synced objects exist in sandbox.

**Prerequisites (all must be true):**

1. **Step 8** complete — UI accepted on mock in Salesforce.
2. **Step 6b** complete — schema lists **which object and column** each UI field comes from (e.g. former Tableau sources documented on the inventory).
3. **Warehouse → Salesforce** — analytics land in org objects the Apex can query (not queried directly from Snowflake in LWC).

**End-to-end data path** (Confluence-safe; use a **code** block when pasting):

```text
  Data schema spreadsheet (field names, Data source column signed in 6b)
              |
              v
  Warehouse / mart  ----scheduled sync---->  Objects in Salesforce org
  (e.g. Snowflake)                         (queryable by Apex, not by LWC)
              |
              v
  Apex @AuraEnabled: SOQL synced object, filter to RM-owned Account Ids, map to row DTO
              |
              v
  LWC: drop mock import; @wire or imperative call; bind same template variables
              |
              v
  Sandbox UI — compare to schema and sign off section before next panel
```

**STEPS (repeat per UI section — e.g. hub header, cross-sell table):**

1. **Find the owning LWC** — In the running sandbox page, identify the UI block you are changing. Open the parent (e.g. dashboard) markup to see which child component renders it, then open that bundle’s `html`, `js`, and `css`.
2. **Classify the change:**
  - **A — Salesforce platform only (no custom Apex)** — Example: logged-in **user name**, **initials**, **job title** on the hub header were hard-coded in HTML. Replace with JS properties and load them via standard LWC APIs such as `@wire(getRecord)` on the User (or equivalent). Map fields into the template variables.
  - **B — Warehouse / mart table (custom Apex)** — Example: **cross-sell table** rows came from `import ... from 'c360MockData'` and a `rows` variable. Write an **Apex class** with an `@AuraEnabled` method that **SOQLs the synced object** named in the schema, **restricts to accounts the running user owns** (e.g. a set of Account Ids), and **maps columns** to the row shape the table already expects. In the LWC JS, **remove the mock import**, call the Apex method (imperative or `@wire`), and in the callback assign the result to `rows` (same mapping logic as before, different source).
3. **Use AI carefully** — In VS Code (or Cursor), you can paste the **few lines of HTML or the mock-import block** and ask the agent to produce the JS + Apex sketch; the developer still reviews governor limits, sharing, and tests.
4. **Deploy and verify** — Deploy the Apex class and updated LWC; refresh the page; compare values to the schema and to known accounts in sandbox.
5. **Sign off** — Record that section as live before moving to the next tab or table.

**What the AI can draft (review every merge):** User-context wiring from a template snippet; Apex query skeleton from schema row ranges; row mapper from SOQL result to existing `rows` columns; diff of Apex JSON vs schema **Field name** column.

**What people must own:** Sync pipelines and object freshness; final schema **Data source**; Apex security and RM scoping; production deploy approval per section.

**Prompts:**

- *This hub header HTML uses hard-coded name and title. Replace with variables filled from the logged-in User via getRecord.*
- *This LWC imports mock cross-sell rows. Per schema rows X–Y, draft Apex getCrossSellAccounts filtered to my owned Account Ids and LWC code that sets rows from the response.*
- *Compare Apex JSON for getCrossSellAccounts to schema column Field name; list mismatches.*

**Customer 360 (Customer 360):** After the September 2026 working session, **c360LwcDtoInventory** documents mart/Tableau lineage while sync into sandbox objects continues. **Proven in sandbox:** hub user name and title via **pattern A** (`getRecord` on User, no Apex) and the cross-sell table via **pattern B** (`c360CrossSellTable` + `getCrossSellAccounts`, RM-scoped Account Ids). KPIs, alerts, churn, portfolio tables, and record detail still follow the same per-section loop; merge client Apex using **classesStubs/apexMergeGuide.md**. Session notes and UI→mock join table: `[cursorDevelopmentScopeC360CaseStudy.md](cursorDevelopmentScopeC360CaseStudy.md)`.

---

## Continued development (Step 10)

See overview tables (**Continued development** row). **Checkpoint:** a named person approves every change that reaches the shared branch or org.

### Step 10 — Quality and conventions


| Activity         | Cursor help              |
| ---------------- | ------------------------ |
| Find mock usage  | explore subagent         |
| Pre-merge review | Bugbot (explicit ask)    |
| Apex security    | security-review subagent |
| Large PRs        | split-to-prs skill       |
| Team rules       | create-rule skill        |


Always **human-merge** after review.

**Customer 360:** Ongoing work is tracked in **planSummary.md** (org baseline, remaining Step 9 panels, hub vs legacy `c360App`, export scope). Use the same review helpers as any programme; see `[cursorDevelopmentScopeC360CaseStudy.md](cursorDevelopmentScopeC360CaseStudy.md)` for programme status and repo file index.

---

# Appendix — Prompt library (copy and adapt)

Replace `{module}`, `{BundleName}`, `{programme}`.

**Setup:** *Scaffold prototypes/html and moduleRegistry.md for {programme} with modules A, B, C.*

**Scope (Plan):** *Summarise what gets added into Salesforce vs App Builder vs out of scope.*

**HTML:** *Write moduleSpec for {module}; implement fragment and preview.*

**Schema:** *Produce data schema CSV from mock-data.js and all moduleSpecs; Data source = TBD.*

**Handoff:** *Summarise schema for engineer workshop: group by DTO object and flag TBD sources.*

**LWC:** *Convert {module} to {BundleName}; names match schema.*

**Connect data (Step 9):** *Replace mock import in {BundleName} with Apex per schema rows X–Y; filter to owned Account Ids; map to existing rows variable.*

**Connect data — platform only:** *From this HTML snippet, wire logged-in user display name and title without custom Apex.*

---

# Appendix — Glossary


| Term                         | Meaning                                                                                                                                           |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| LWC                          | Salesforce Lightning Web Component                                                                                                                |
| moduleSpec                   | Per-panel contract (fields, events, mock shape) written before LWC conversion                                                                     |
| Mock data                    | Sample in-repo DTOs until live APIs exist                                                                                                         |
| Module registry              | Tracker (e.g. `prototypes/moduleRegistry.md`) for each UI panel: priority, spec/HTML/LWC status, Salesforce bundle name                           |
| Authority rules              | Agreed rule for which source wins when wireframe, prototype, and design system conflict (e.g. wireframe for navigation, design system for colour) |
| Data schema                  | Spreadsheet or CSV of fields (name, type, screen, component); created in Build (6a) and drives live data cutover                                  |
| Data source                  | Column on the data schema: which system, object, and field supply each value (engineers complete in step 6b)                                      |
| Warehouse → Salesforce sync  | Pipeline that lands mart/analytics data in org objects so Apex can query them (not queried from the warehouse inside LWC)                         |
| Registry agreed              | Team has signed off the ordered module list, P0/P1/P2 priorities, and what is in the pilot                                                        |
| Data / integration engineers | Own the **Data source** column and warehouse → Salesforce sync (not the Cursor user)                                                              |
| Named approver               | Person who must approve merges and changes that reach the shared branch or org                                                                    |
| Continued development        | Ongoing phase (step 10): PR review, small fixes, keeping registry and docs in sync                                                                |
| Cursor user                  | Person driving Cursor: HTML, LWCs, schema file, prompts                                                                                           |
| Salesforce developer         | Deploy, App Builder, Apex, `@wire`, live data cutover                                                                                             |
| Deploy in Salesforce         | Step 8 mock deploy via git; Step 9 section-by-section — platform APIs or Apex on synced objects                                                   |
| Step 9 pattern A             | User/record context via standard LWC wire (e.g. `getRecord`) — no custom Apex                                                                     |
| Step 9 pattern B             | Table/metrics from mart — Apex SOQL on synced object, RM scope, LWC replaces mock import                                                          |


---

