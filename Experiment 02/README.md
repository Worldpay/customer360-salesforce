# Customer 360 — Experiment 02

Template-aligned, **LWC-only org overlay** build. Experiment 01 (`../01/`) remains frozen as the decomposed hybrid reference.

## What this is

- **Monolithic hub:** `c360Dashboard` (Overview, Alert Centre, Cross-Sell, Churn, Pathways, inline Account)
- **Wireframe screens:** `c360AlertCentre`, `c360AlertDetail`
- **Record Page bootstrap:** `c360Account` (leadSpotlight pattern)
- **Shared children:** `c360KpiTile`, `c360SignalList`, `c360ExportModal`
- **Mock data:** `c360MockData` (sandbox UAT until Apex wired)

## What this is NOT

Do **not** deploy from this folder:

- `applications/` — use org Lightning App
- `flexipages/` — swap component in existing App Builder pages
- `tabs/` — org tabs already configured
- `classes/` — merge stubs into existing Apex (see `classes-stubs/`)

## Quick deploy (LWC only)

```bash
cd "08. Experiments/02"
sf project deploy start --manifest manifest/package-lwc.xml
```

Then follow [ORG_WIRING_RUNBOOK.md](ORG_WIRING_RUNBOOK.md) to wire `c360Dashboard` on the existing App Page.

## Authority hierarchy

1. `07. Knowledge for C360/salesforce-hard-constraints.md`
2. `07. Knowledge for C360/requirements-registry.md`
3. `10. Wireframe/` → IA and screen inventory
4. `09. Design system/` → visual tokens (supersedes prototype CSS)
5. `06. Output templates/` → LWC code patterns
6. `04 C360 Prototype` → content fallback

## Key trade-offs documented

| Topic | Exp 02 choice | Alternative |
|-------|---------------|-------------|
| Hub architecture | Monolithic `c360Dashboard` | Exp 01 decomposed `c360App` |
| Account drill-down | Inline view (Shift+click → Record Page) | Always NavigationMixin (R14) |
| Alert Centre | Embedded in dashboard nav | Separate App Page tab |
| Data | Mock in `c360MockData.js` | `@wire` to org Apex |
| apiVersion | 62.0 | Template 67.0 |

## Bundle inventory

| LWC | Exposed | Targets |
|-----|---------|---------|
| `c360Dashboard` | Yes | App Page, Home Page |
| `c360AlertCentre` | Yes | App Page, Home Page |
| `c360AlertDetail` | Yes | App Page, Home Page |
| `c360Account` | Yes | Account Record Page |
| `c360KpiTile` | No | Child only |
| `c360SignalList` | No | Child only |
| `c360ExportModal` | No | Child only |
| `c360MockData` | No | Shared module |

## Full plan and gap analysis

See [PLAN_SUMMARY.md](PLAN_SUMMARY.md) for assumptions, open questions (by topic), and design-input gap analysis.

## Relationship to Experiment 01

| | Experiment 01 | Experiment 02 |
|---|---------------|---------------|
| Hub | `c360App` + view LWCs | `c360Dashboard` monolith |
| Metadata | Includes app/flexipage/tab (illustrative) | LWC only |
| Templates | Pre-template hybrid | `c360Dashboard` + `leadSpotlight` aligned |
| Wireframes | Not covered | Alert Centre + Detail |

**Only one hub component should be active on the org flexipage.**
