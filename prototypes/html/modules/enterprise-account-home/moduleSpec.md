# c360EnterpriseAccountHome (HTML module: `enterprise-account-home`)

## Requirement

Parent for Enterprise Account Home. It owns the Customer 360 sidebar, the Enterprise Account Hub bar, the breadcrumb, Back to Customers, and the account header. It is not part of `c360Dashboard` and is not included in `scripts/build360HtmlPrototype.py`.

Header actions toast only. No navigation and no live data in the preview.

Customer Context, Holistic Relationship View, Payment Architecture Visibility, and the page footer are not part of this parent.

## Children

1. `churn-alert-notification` — reused
2. `churn-metric-tiles` — reused
3. `churn-current-status` — reused
4. `identified-risk-signals` — reused, collapsed
5. `identified-expansion-opportunities` — collapsed row only
6. `performance-and-trends` — expanded

## Mock DTO

`ENTERPRISE_ACCOUNT_HOME` in [`../../shared/enterprise-account-home-data.js`](../../shared/enterprise-account-home-data.js). Children keep their own mock files.

## LWC target

`c360EnterpriseAccountHome` composes the reused churn children, `c360IdentifiedExpansionOpportunities`, and `c360PerformanceAndTrends` on mock data.
