# c360MerchantBusinessCaseHeader (HTML module: `merchant-business-case-header`)

## Requirement

New **Merchant Business Case** header (title, two actions, four metrics). Related to R03 (Revenue Boost pilot). **Not** the legacy `revenue-boost-business-case` screen, and **not** the hub `kpi-strip`.

Wireframe labels win.

## Isolation

- Not embedded in hub assembly, `c360Dashboard`, or `account-detail`
- **Excluded** from `scripts/build360HtmlPrototype.py` until explicitly requested
- Preview: [`preview.html`](preview.html)
- Mock: [`../../shared/merchant-business-case-header-data.js`](../../shared/merchant-business-case-header-data.js)

## App Builder (future LWC)

- Region: Account Record Page or standalone App Page
- Design attributes: none for the pilot (fixed title, actions, and four metrics)

## @api (future LWC)

- `title`: string
- `metrics`: object[] — `{ id, label, value, caption, tone, emphasized, info? }`
- `actions`: object[] — `{ id, label, variant }`

`tone`: `default` | `positive` | `accent`  
`emphasized`: outlined card when true  
`info`: show an info icon beside the label when true  
`variant`: `text` | `primary`

## Events (future)

- `sharewithmerchant` — **Share with merchant** (no payload in the pilot)
- `addtoopportunity` — **Add to opportunity** (no payload in the pilot)

Buttons only until a later live-data step. No navigation and no Opportunity create in this module.

## Mock DTO

`MERCHANT_BUSINESS_CASE_HEADER` in [`../../shared/merchant-business-case-header-data.js`](../../shared/merchant-business-case-header-data.js).

Illustrative demo values from the wireframe:

| id | label | value | caption | tone | emphasized | info |
|----|-------|-------|---------|------|------------|------|
| `merchant-roi` | Merchant ROI | $165K | Net annual merchant return · Illustrative demo | default | true | |
| `estimated-acv` | Estimated ACV | $120K | Annual contract value · Illustrative | positive | false | true |
| `tokenised-txns` | Estimated no. of Tokenised Transactions | 1.2M | Out of 120M Total Transactions | positive | false | |
| `auth-rate` | Optimized Authorization Rate | +3.2 pp | Across tokenised MIDs | accent | true | |

Actions:

| id | label | variant |
|----|-------|---------|
| `share` | Share with merchant | text |
| `add-to-opportunity` | Add to opportunity | primary |

## HTML fragment root

`<section class="c360-module c360-merchant-business-case-header" data-module="merchant-business-case-header">`

## Sections

1. Title row — "Merchant Business Case" plus the two actions, right-aligned
2. Metric row — four tiles; first and fourth outlined; second and third values use the positive tone; fourth value uses the accent tone

Use [`tokens.css`](../../shared/tokens.css) and [`module-base.css`](../../shared/module-base.css). Do not copy token values into the module.

## LWC target

`c360MerchantBusinessCaseHeader` — built on mock data (`c360MockData`). Not composed into `c360Dashboard`. Not deployed.
