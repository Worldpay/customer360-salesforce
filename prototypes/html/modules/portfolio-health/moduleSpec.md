# c360PortfolioHealthEx05

## Requirement
R01 — portfolio health snapshot and cross-sell pipeline

## App Builder
- Region: Sidebar (Overview) or Main (Accounts Hub home)
- Design attributes: title (string), interactive (boolean, default false)

## @api (LWC)
- healthy: number
- watch: number
- atRisk: number
- pipeline: object[]
- interactive: boolean (Accounts Hub: clickable health tiles)

## Events (bubbling)
- portfoliohealthfilter: { health: 'Healthy' | 'Watch' | 'At risk' } — when interactive is true

## Mock DTO
`PORTFOLIO_HEALTH` in `shared/mock-data.js` (Overview) · derived from `ACCOUNTS` in `shared/accounts-hub-mock-data.js` (Hub)

## HTML fragment root
`<section class="c360-module c360-portfolio-health" data-module="portfolio-health">`
