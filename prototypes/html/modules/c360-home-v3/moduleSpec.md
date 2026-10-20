# Home v3 (HTML module: `c360-home-v3`)

## Requirement

Isolated portfolio home from Figma frame `rm-enterprise-account-hub-portfolio-summary` (`670:3992`). It is not part of `c360Dashboard`, `c360Customer360Shell`, or `c360HomeV2`.

The parent is the shell: sidebar and the welcome row. Home is the only view. Other nav items highlight and leave the page in place. Buttons toast “Preview only”. Nothing creates an Opportunity.

The fake browser chrome in the Figma frame is not part of the component.

## Children

1. `kpi-row` — Cross-Sell Lead ACV, Total Accounts, At-Risk Accounts, Cross-Sell Leads.
2. `portfolio-briefing` — intelligence briefing and the churn alert bar.
3. `revenue-overview` — headline and six month bars. Bar heights are the Figma pixel heights (79, 69, 89, 98, 113, 138).
4. `todays-focus` — checking a task updates the remaining count. Add, delete, and more toast only.
5. `portfolio-accounts` — eight visible rows. Filters and search run on those rows. Page 2 has no further rows in the frame.
6. `churn-signals` — three active signal cards.
7. `cross-sell-leads` — three recommendation cards.
8. `recommended-actions` — pathway table and legend.

Mock: [`data.js`](data.js). Schema: [`schema/c360-home-v3.csv`](schema/c360-home-v3.csv).

## Schema

Columns match the churn schema. `Table Name` and `Source Field Name` are blank where a source is required. `N/A - static value` is chrome. Repeating table and card rows are mapped once; the mock holds every visible row.

The third cross-sell card (Meridian Corp, Revenue Boost, $14K, $20K) is taken from the frame screenshot. The Figma read limit was reached before that card’s text nodes could be fetched on their own.

## LWC

`c360HomeV3` is exposed on App Page and Home Page. It composes `c360HomeV3KpiRow`, `c360HomeV3PortfolioBriefing`, `c360HomeV3RevenueOverview`, `c360HomeV3TodaysFocus`, `c360HomeV3PortfolioAccounts`, `c360HomeV3ChurnSignals`, `c360HomeV3CrossSellLeads`, and `c360HomeV3RecommendedActions`. Mock data is `HOME_V3` in `c360MockData`. Source table and field names are still blank in the schema, so nothing is wired to Data Cloud.

## Preview

[`preview.html`](preview.html)
