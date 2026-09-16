# c360MySignals

## Requirement
R03 — signals list with action and dismiss (App Builder tile)

## App Builder
- Region: Main
- Design attributes: title (string)

## @api (LWC)
- title: string = "My signals"

## Events (bubbling)
- showtoast: { message: string }

## Child component
- `c360SignalList` (not exposed — list rows only)

## Mock DTO
`SIGNALS` in `c360MockData.js`
