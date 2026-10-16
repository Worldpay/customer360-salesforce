# Home v2 (HTML module: `c360-home-v2`)

## Requirement

Isolated home screen from the Customer360 v2 design. It is not part of `c360Dashboard` or `c360Customer360Shell`, and it is not in the hub assembly.

The parent is the shell: sidebar, empty insight card, top bar, greeting row, and Ask Customer360. Home is the only view. Other nav items highlight and leave the page in place.

## Children

1. `intelligence-banner` — dismissible insight. Body is a template plus `accountName` and `closeProbabilityDeltaPct`.
2. `metric-strip` — four tiles. Tile 4 is team activity.
3. `revenue-overview` — headline reuses `revenueForecastAmount` and `revenueForecastChangePct`. Chart is 14 relative bars with labels Jan–Jul.
4. `todays-focus` — task check-off updates the remaining count. Completion is screen state.
5. `priority-opportunities` — repeating opportunity rows.

Mock: [`data.js`](data.js). Schema: [`schema/c360-home-v2.csv`](schema/c360-home-v2.csv).

## Schema

Columns match the churn schema. `Source Field Name` is the right-hand Field Name column: the warehouse or Salesforce field. `Table Name` and `Source Field Name` are blank where a source is required. `N/A - static value` is chrome. `Derived: ...` is a rule, not a column. The preview shows the fixed mock copy, including `Thursday, May 16` and `Good morning, Jordan`, so the screen stays on the signed-off design while the schema records that those two are derived in production.

## LWC

`c360HomeV2` is exposed on App Page and Home Page. It composes `c360HomeV2Intelligence`, `c360HomeV2MetricStrip`, `c360HomeV2RevenueOverview`, `c360HomeV2TodaysFocus`, and `c360HomeV2PriorityOpportunities`. Mock data is `HOME_V2` in `c360MockData`. Source table and field names are still blank in the schema, so nothing is wired to Data Cloud.

## Preview

[`preview.html`](preview.html)
