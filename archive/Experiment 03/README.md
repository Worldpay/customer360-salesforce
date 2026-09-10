# Customer 360 — Experiment 03 (full greenfield package)

**Self-contained SFDX deploy** — includes Lightning App, FlexiPages, tabs, Apex controllers, static resources, and all LWCs from Experiment 02. Does **not** assume an existing org configuration.

## vs Experiment 01 and 02

| | Exp 01 | Exp 02 | **Exp 03** |
|---|--------|--------|------------|
| **LWC architecture** | Decomposed (`c360App` + views) | Monolithic `c360Dashboard` | Same as Exp 02 |
| **Wireframe screens** | No | Alert Centre + Detail | Yes |
| **App / flexipages / tabs** | Yes (`c360App` on home) | **Excluded** (org overlay) | **Yes** (`c360Dashboard` on home) |
| **Apex** | Basic stubs | Merge guide only | **Extended stubs** (alerts + spotlight) |
| **Deploy target** | Greenfield sandbox | Existing org LWC overlay | **Greenfield / scratch org** |

Use **Experiment 03** when deploying to a **new or empty sandbox** with no pre-existing C360 metadata.

Use **Experiment 02** when the org already has app, flexipages, and Apex configured.

## Package contents

```
08. Experiments/Experiment 03/
├── README.md
├── HANDOFF_CHECKLIST.md
├── sfdx-project.json
├── manifest/package.xml
└── force-app/main/default/
    ├── applications/Customer_360.app-meta.xml
    ├── flexipages/
    │   ├── C360_Home.flexipage-meta.xml          → c360Dashboard
    │   ├── C360_Account.flexipage-meta.xml       → c360Account
    │   └── C360_Alert_Centre.flexipage-meta.xml  → c360AlertCentre
    ├── tabs/
    │   ├── C360_Home.tab-meta.xml
    │   └── C360_Alert_Centre.tab-meta.xml
    ├── classes/
    │   ├── C360PortfolioController.cls
    │   └── C360ExportController.cls
    ├── staticresources/c360Shared.css
    └── lwc/  (8 bundles — copied from Experiment 02)
```

## LWC bundles

| Bundle | Hosted on |
|--------|-----------|
| `c360Dashboard` | `C360_Home` App Page (primary hub) |
| `c360AlertCentre` | Embedded in dashboard nav + standalone `C360_Alert_Centre` tab |
| `c360AlertDetail` | Embedded in dashboard (via Alert Centre navigation) |
| `c360Account` | `C360_Account` Account Record Page |
| `c360KpiTile`, `c360SignalList`, `c360ExportModal`, `c360MockData` | Child / shared modules |

LWCs currently run on **mock data** in `c360MockData.js`. Apex stubs are deployed and ready for `@wire` integration.

## Deploy

```bash
cd "08. Experiments/Experiment 03"
sf project deploy start --manifest manifest/package.xml
```

Or deploy the full source tree:

```bash
sf project deploy start --source-dir force-app/main/default
```

## Post-deploy setup

1. **Assign the Customer 360 Lightning App** to pilot users (App Launcher).
2. **Activate Record Page:** Setup → Lightning Record Pages → `C360 Account` → Activation → assign to Account object (org default or per record type).
3. **Profile access:** Grant access to Apex classes `C360PortfolioController` and `C360ExportController`.
4. Run the smoke test in [`HANDOFF_CHECKLIST.md`](HANDOFF_CHECKLIST.md).

## Authority hierarchy

Same as Experiment 02 — wireframes + design system + output templates. See [`../Experiment 02/PLAN_SUMMARY.md`](../Experiment%2002/PLAN_SUMMARY.md) for gap analysis and assumptions.

## Design notes

- **Branding:** Global Payments Customer 360
- **apiVersion:** 62.0
- **Account navigation:** Inline view in dashboard; Shift+click account links open Salesforce Record Page (`c360Account` flexipage)
- **Alert Centre:** Available both inside dashboard nav and as a dedicated app tab

## Not in this build

- Live Data 360 / Snowflake connection (Apex returns mock JSON)
- Real `.pptx` generation (export toast stub only)
- Production deploy by McKinsey (constraint #5 — client-owned)
