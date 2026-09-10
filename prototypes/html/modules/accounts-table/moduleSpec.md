# c360AccountsTableEx05

## Requirement
R01 — portfolio accounts table (top movers)

## App Builder
- Region: Main
- Design attributes: title (string), subtitle (string)

## @api (LWC)
- accounts: object[]
- provenance: string

## Events (bubbling)
- accountopen: { accountName: string, sourceView: 'accounts' }

## Mock DTO
`ACCOUNTS` in `shared/mock-data.js`

## HTML fragment root
`<section class="c360-module c360-accounts-table" data-module="accounts-table">`
