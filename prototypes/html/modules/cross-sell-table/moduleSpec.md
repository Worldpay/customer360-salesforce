# c360CrossSellTable

## Requirement
R04 — portfolio cross-sell opportunities table

## App Builder
- Region: Main
- Design attributes: title (string)

## @api (LWC)
- rows: object[]

## Events (bubbling)
- accountopen: { accountName: string, sourceView: 'crosssell' }

## Mock DTO
`CROSS_SELL_ROWS` in `shared/mock-data.js`

## HTML fragment root
`<section class="c360-module c360-cross-sell-table" data-module="cross-sell-table">`
