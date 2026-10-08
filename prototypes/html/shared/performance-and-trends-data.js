/**
 * Expanded Performance & Trends (illustrative only).
 * Labels and controls match the frame. Chart series and period cells are placeholders
 * until the Figma body can be read again. Approval, margin, and chargeback end on the
 * same figures as the metric tiles.
 */
window.PERFORMANCE_AND_TRENDS = {
  title: 'Performance & Trends',
  subtitle: 'Acme Corporation • Enterprise Processing Volume Metrics',
  ranges: [
    { id: '12', label: 'Last 12 Months', selected: true },
    { id: '6', label: 'Last 6 Months', selected: false },
    { id: '3', label: 'Last 3 Months', selected: false },
    { id: 'custom', label: 'Custom Range', selected: false }
  ],
  periods: ['30d', '60d', '90d', '12m'],
  charts: [
    { id: 'auth', title: 'Auth Rate Trend', latest: '96.8%', points: [28, 36, 34, 42, 48, 46, 55, 62] },
    { id: 'approval', title: 'Approval Rate Trend', latest: '94.2%', points: [40, 44, 42, 50, 56, 54, 60, 68] },
    { id: 'margin', title: 'Net Margin Trend', latest: '18.4 bps', points: [70, 64, 60, 52, 48, 40, 36, 30] },
    { id: 'chargeback', title: 'Chargeback Trend', latest: '0.31%', points: [58, 54, 50, 46, 42, 38, 34, 28] }
  ],
  rows: [
    { metric: 'Auth Rate', cells: ['97.4%', '97.1%', '96.9%', '96.8%'] },
    { metric: 'Approval Rate', cells: ['93.1%', '93.6%', '93.9%', '94.2%'] },
    { metric: 'Net Margin', cells: ['20.6 bps', '19.8 bps', '19.2 bps', '18.4 bps'] },
    { metric: 'Chargeback Rate', cells: ['0.42%', '0.38%', '0.34%', '0.31%'] }
  ],
  scenarioTitle: 'Scenario model',
  scenarioActions: [
    { id: 'reset', label: 'Reset', variant: 'text' },
    { id: 'run', label: 'Run model', variant: 'primary' }
  ]
};
