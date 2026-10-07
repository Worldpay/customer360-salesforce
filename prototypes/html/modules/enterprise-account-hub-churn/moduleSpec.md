# c360EnterpriseAccountHubChurn (HTML module: `enterprise-account-hub-churn`)

## Requirement

Parent for the Enterprise Account Hub Churn account view. It owns the hub bar, account header, and page actions. It is not part of `c360Dashboard` and is not included in `scripts/build360HtmlPrototype.py`.

## Children

1. `churn-alert-notification` — new churn alert generated
2. `churn-metric-tiles` — churn score, churn risk, and the other metric cards
3. `churn-current-status` — current status and alert actions

Identified Risk Signals, Identified Expansion Opportunities, and Performance & Trends are not children of this parent.

## LWC target

`c360EnterpriseAccountHubChurn` will compose `c360ChurnAlertNotification`, `c360ChurnMetricTiles`, and `c360ChurnCurrentStatus`. HTML preview only until that build starts.
