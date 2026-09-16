# c360ChurnTable

## Requirement
R05 — portfolio churn risk table

## App Builder
- Region: Main
- Design attributes: title (string)

## @api (LWC)
- rows: object[]

## Events (bubbling)
- accountopen: { accountName: string, sourceView: 'churn' }

## Mock DTO
`CHURN_ROWS` in `shared/mock-data.js`

## HTML fragment root
`<section class="c360-module c360-churn-table" data-module="churn-table">`
