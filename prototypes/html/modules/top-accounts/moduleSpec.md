# c360TopAccounts

## Requirement
R01 — Accounts Hub home hero: top 3 accounts by churn or cross-sell ranking

## App Builder
- Region: Main (Accounts Hub home)
- Design attributes: title (string), defaultHeroMode (`churn` | `crosssell`)

## @api (LWC)
- accounts: object[] (portfolio account DTOs with model fields)
- heroMode: string (`churn` | `crosssell`)

## Events (bubbling)
- heromodechange: { heroMode: string }
- accountopen: { accountName: string, sourceView: 'overview' }

## Mock DTO
`ACCOUNTS` in `shared/accounts-hub-mock-data.js` (HTML hub) · extended `ACCOUNTS` in `c360MockData` (LWC)

## HTML fragment root
`<section class="c360-module c360-top-accounts" data-module="top-accounts">`

## Composition
Future Accounts Hub home flexipage: `c360TopAccounts` + `c360PortfolioHealth` (interactive) — wire `portfoliohealthfilter` to `c360AccountsTable` variant `portfolio`.
