# c360AccountDetailEx05

## Requirement
Output schema v3 — account Record Page deep-dive (Churn risk, Cross-sell) aligned to **C360 Prototype v5**

## App Builder
- Region: Account Record Page main region via `c360AccountEx05` (not embedded in hub dashboard)
- Design attributes: none (account + sourceView passed from parent)

## @api (LWC)
- `account` — hub account row from `ACCOUNTS`
- `sourceView` — `accounts` | `churn` | `crosssell` (default tab on open: churn unless crosssell)

## Events (bubbling)
- `navigate` — `{ view: 'overview' }` (breadcrumb back)
- `export` — open PowerPoint export modal

## Mock DTO
- `ACCOUNT_DETAIL`, `getAccountDetail()`, `accountsWithDetail()` in `shared/account-detail-data.js`
- Base lists in `shared/mock-data.js` (`ACCOUNTS`)

## HTML fragment root
`<section class="c360-module c360-account-detail" data-module="account-detail">`

## Sub-behaviours (single LWC, documented for UAT)
| Tab | Key interactions |
|-----|------------------|
| Churn | 3 top metrics (predicted txn change, 3m/6m trends); account-level drivers (negatives first); selected driver row highlighted; clickable drivers → mid-level drill (10 rows, ID/Value; row 1 = selected driver value) |
| Cross-sell | Price + A/B sliders; net benefit includes product cost; scheme & interchange fee benefit; decline chart |

## LWC status
`c360AccountDetailEx05` — **built** (Experiment 05, v5)
