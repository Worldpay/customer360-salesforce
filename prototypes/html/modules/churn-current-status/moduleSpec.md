# c360ChurnCurrentStatus (HTML module: `churn-current-status`)

## Requirement

Child of `enterprise-account-hub-churn`. Current status, trigger date, and actions: Mark Resolved, Defer Signal, Dismiss Signal, Escalate to Manager. Actions fire `statusaction` and do not change records in the preview.

## Mock DTO

`CHURN_CURRENT_STATUS` in [`../../shared/churn-current-status-data.js`](../../shared/churn-current-status-data.js).

## HTML fragment root

`<section class="c360-module c360-churn-current-status" data-module="churn-current-status">`

## LWC target

`c360ChurnCurrentStatus` — built on mock data. Child of `c360EnterpriseAccountHubChurn`.
