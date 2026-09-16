# c360PathwaysTable (deprecated)

## Requirement
R02 / BR-002 — in-progress pathways table with scope toggle

## App Builder
- Region: Main
- Design attributes: title (string), defaultScope (string)

## @api (LWC)
- pathways: object[]
- scope: string = "me"

## Events (bubbling)
- scopechange: { scope: string }

## Mock DTO
`PATHWAYS` — `{ id, account, name, stage, owner, date, status, statusClass, scope }`

## HTML fragment root
`<section class="c360-module c360-pathways-table" data-module="pathways-table">`
