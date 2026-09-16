# c360AlertCentre

## Requirement
R02 — Alert Centre with status filters and cross-sell intel panel

## App Builder
- Region: Main (or separate tab)
- Design attributes: title (string)

## @api (LWC)
- alerts: object[]
- statusFilter: string

## Events (bubbling)
- alertselect: { alertId: string }
- filterchange: { status: string }

## Mock DTO
`ALERTS` and `ALERT_STATUS_OPTIONS` in `shared/mock-data.js`

## HTML fragment root
`<section class="c360-module c360-alert-centre" data-module="alert-centre">`
