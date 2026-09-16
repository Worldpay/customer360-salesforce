# c360RevenueBoostBusinessCase (HTML module: `revenue-boost-business-case`)

## Requirement

Parallel **legacy Revenue Boost business-case** screen (filters → manual inputs → annual summary → auth-rate impact → decline breakdown). Restyled with C360 [`tokens.css`](../../shared/tokens.css) and [`module-base.css`](../../shared/module-base.css). **Not** embedded in hub assembly or `account-detail` cross-sell tab.

## Isolation

- Preview only: [`preview.html`](preview.html)
- Mock: [`../../shared/revenue-boost-business-case-data.js`](../../shared/revenue-boost-business-case-data.js)
- **Excluded** from `scripts/build360HtmlPrototype.py` until explicitly requested

## App Builder (future LWC)

- Region: Account Record Page or standalone App Page
- Design attributes: `accountId`, `merchantId` (when live data exists)

## @api (future LWC)

- `accountKey`, `merchantId` — select case slice
- `pricePerTxn`, `tokenUtilisation` — manual inputs (writable)

## Events (future)

- `assumptionchange`: `{ pricePerTxn, tokenUtilisation }`

## Mock DTO

`window.REVENUE_BOOST_BUSINESS_CASE` — keys `accountKey|mid` in `cases`.

| Field | Source |
|-------|--------|
| `base.inScopeTransactions`, auth volumes, rates | Static warehouse snapshot |
| `declineRows[]` | Static per MID |
| Summary rows (tokenised txn, revenue, fees) | **Derived** in `fragment.js` from util × base |
| `netBenefit` | **Derived**: `authUpliftRevenue×scale + declineRecovery − rbFee` |
| Auth uplift counts/rates | **Derived** from `base.inScopeAuths`, approval rate, uplift rate |
| Est. recovered columns | **Derived**: `eligible × cureRate × utilScale` |

## HTML fragment root

`<section class="c360-module c360-revenue-boost-business-case" data-module="revenue-boost-business-case">`

## Sections

1. Global filters — account + MID (`#rb-filters`)
2. Manual inputs — price per txn, token utilisation; recommended rate callout
3. Business case summary — `#rb-summary`
4. Auth rate impact — `#rb-auth-impact`
5. Decline breakdown — `#rb-decline-tbody`, collapse via `#rb-decline-toggle`

## Visual translation (legacy → C360)

| Legacy | C360 |
|--------|------|
| Lavender section bars | `.card` + `.card-h` |
| Blue hero banner | Page title in `preview.html` `.greet` only |
| Net benefit highlight | `.rb-summary-row.tot` (SF blue) |
| Hide on decline table | `.btn.sm.p` in card header |

## LWC target

`c360RevenueBoostBusinessCase` — **done** ([`force-app/main/default/lwc/c360RevenueBoostBusinessCase`](../../../force-app/main/default/lwc/c360RevenueBoostBusinessCase))
