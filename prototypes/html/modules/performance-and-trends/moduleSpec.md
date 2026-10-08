# c360PerformanceAndTrends (HTML module: `performance-and-trends`)

## Requirement

Child of `enterprise-account-home`. Expanded section: title Performance & Trends, subtitle for Acme Corporation, range chips (Last 12 Months selected), four charts (Auth Rate, Approval Rate, Net Margin, Chargeback), a 30d / 60d / 90d / 12m table, and a scenario model with Reset and Run model.

The section stays expanded. Range chips, Reset, and Run model toast only and do not change the figures. Chart series and period cells are illustrative placeholders.

## Mock DTO

`PERFORMANCE_AND_TRENDS` in [`../../shared/performance-and-trends-data.js`](../../shared/performance-and-trends-data.js).

## HTML fragment root

`<section class="c360-module c360-performance-and-trends" data-module="performance-and-trends">`

## LWC target

`c360PerformanceAndTrends` — built on mock data. Child of `c360EnterpriseAccountHome`.
