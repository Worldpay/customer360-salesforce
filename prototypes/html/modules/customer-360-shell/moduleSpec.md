# Customer 360 shell (HTML module: `customer-360-shell`)

## Requirement

One preview shell for Home, Alerts Centre, the churn account page, and the cross-sell account page. The sidebar and Enterprise Account Hub bar stay put. The main region swaps.

The preview address bar uses `/` (Home), `/alerts`, `/analytics`, `/customers`, `/crosssell?id={AccountId}`, and `/churn?id={AccountId}`. `serve.py` serves the shell for those paths so a refresh keeps the page. Reports and Settings have no path in the rules, so they toast and stay put.

Home receives the account collection on `data-account-ids`. Alerts Centre receives its row account ids the same way. Churn and cross-sell children receive `data-account-id`. Insight mocks exist for `SF-89210` only.

## Navigation

| Control | Result |
|---------|--------|
| Home | Home view |
| Alert Centre | Alerts Centre view |
| Cross-Sell | Whatever `crossSellNav` says in [`customer-360-shell-data.js`](../../shared/customer-360-shell-data.js). Default is the cross-sell account view for `SF-89210` |
| Analytics, Customers, Reports, Settings | Stay visible. Toast only |
| Acme card in Active Churn Risk Signals, and its Action | Churn view for that AccountId |
| Acme card in Recommended Cross-Sell Leads, and Learn More | Cross-sell view for that AccountId |
| Alerts Centre account name and Action | Churn view for that row’s AccountId |
| Portfolio View and Action, banner View, View All Signals, View All Recommended Leads | Stay visible. Toast only |

On an account view the sidebar highlights Customers.

## Children

Home and Alerts Centre are filled by their own modules. The churn view reuses the existing churn, risk, expansion, and performance fragments. The cross-sell view reuses Revenue Boost Summary and adds `cross-sell-detail`.

## LWC

`c360Customer360Shell` composes `c360HomePage`, `c360AlertsCentre`, the existing churn and Revenue Boost children, and `c360CrossSellDetail`. Salesforce URL parameters are not set yet. The HTML preview keeps `/`, `/alerts`, `/analytics`, `/customers`, `/churn?id=`, and `/crosssell?id=`.
