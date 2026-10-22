# Alerts v3 (HTML module: `c360-alerts-v3`)

## Requirement

Isolated All Churn Alerts screen from Figma frame `alerts-centre` (`624:33053`). It is not part of `c360Dashboard`, `c360Customer360Shell`, or the shell child `alerts-centre`.

The parent is the shell: light sidebar and the Enterprise Account Hub bar. Alerts is the only view. Other nav items highlight and leave the page in place. Buttons toast “Preview only”. Account name and Action do not open the churn page.

The fake browser chrome in the Figma frame is not part of the component. The profile photo is initials.

## Children

1. `page-header` — breadcrumbs, back link, title, updated time, Export.
2. `alert-filters` — search, Priority, Status, Save Filters. Search and Status filter the five rows. Priority and Save Filters toast only.
3. `alert-table` — summary strip, nine columns, and the alert-logic note. The last column header is Status in the frame; its control is Action.

Mock: [`data.js`](data.js). Schema: [`schema/c360-alerts-v3.csv`](schema/c360-alerts-v3.csv).

## Schema

Columns match the churn schema. `Table Name` and `Source Field Name` are blank where a source is required. `N/A - static value` is chrome. Table rows are mapped once; the mock holds every visible row.

## LWC

`c360AlertsV3` is exposed on App Page and Home Page. It composes `c360AlertsV3PageHeader`, `c360AlertsV3AlertFilters`, and `c360AlertsV3AlertTable`. Mock data is `ALERTS_V3` in `c360MockData`. Source table and field names are still blank in the schema, so nothing is wired to Data Cloud.

## Preview

[`preview.html`](preview.html)
