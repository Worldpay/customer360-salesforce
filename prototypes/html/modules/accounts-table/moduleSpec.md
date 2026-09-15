# c360AccountsTableEx05

## Requirement
R01 — portfolio accounts table (Overview top movers · Accounts Hub full portfolio)

## App Builder
- Region: Main
- Design attributes: title (string), subtitle (string), variant (`overview` | `portfolio`), healthFilter (portfolio only)

## @api (LWC)
- accounts: object[]
- provenance: string
- variant: string (`overview` default | `portfolio`)
- healthFilter: string (`All` | `Healthy` | `Watch` | `At risk`)
- maxRows: number (overview only)

## Events (bubbling)
- accountopen: { accountName: string, sourceView: 'accounts' }
- healthfilterchange: { filter: string } — portfolio variant

## Mock DTO
`ACCOUNTS` in `shared/mock-data.js` (Overview) · `shared/accounts-hub-mock-data.js` (Hub)

## HTML fragment root
- Overview: `<section class="c360-module c360-accounts-table" data-module="accounts-table">`
- Hub: `fragment-hub.html` wrapper `data-module="accounts-table-hub"`
