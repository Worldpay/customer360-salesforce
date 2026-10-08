# c360ChurnAlertsV2 (HTML module: `churn-alerts-v2`)

## Requirement

Parent for Churn Alerts v2. It owns the Customer 360 sidebar, the Enterprise Account Hub bar, the breadcrumb, Back to Alert Centre, and the account header (Refresh Data, Export Report, Feedback). It is not part of `c360Dashboard` and is not included in `scripts/build360HtmlPrototype.py`.

Header actions toast only. No navigation and no live data in the preview.

## Children

1. `churn-alert-notification` — reused from the churn alert screen
2. `churn-metric-tiles` — reused
3. `churn-current-status` — reused
4. `identified-risk-signals` — collapsed row only

Nothing below Identified Risk Signals is in this parent yet.

## Mock DTO

`CHURN_ALERTS_V2` in [`../../shared/churn-alerts-v2-data.js`](../../shared/churn-alerts-v2-data.js). Children keep their own mock files.

## LWC target

`c360ChurnAlertsV2` composes `c360ChurnAlertNotification`, `c360ChurnMetricTiles`, `c360ChurnCurrentStatus`, and `c360IdentifiedRiskSignals` on mock data.
