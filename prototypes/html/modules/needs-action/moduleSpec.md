# c360NeedsAction

## Requirement
R01 / R08 — notification block (Needs action today)

## App Builder
- Region: Main
- Design attributes: title (string), maxItems (number)

## @api (LWC)
- title: string = "Needs action today"
- items: object[]

## Events (bubbling)
- accountopen: { accountName: string }
- review: { itemId: string }

## Mock DTO
`NEEDS_ACTION_ITEMS` — `{ id, severity, severityLabel, heading, body, meta, accountName, buttonLabel, buttonClass }`

## HTML fragment root
`<section class="c360-module c360-needs-action" data-module="needs-action">`
