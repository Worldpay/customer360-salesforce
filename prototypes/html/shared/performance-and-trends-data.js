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
    {
      id: 'volume',
      title: 'Processing Volume',
      caption: 'Monthly total volume in GBP (Millions)',
      latest: '£2.4M CURRENT',
      note: 'Peak: £2.6M (Dec)',
      points: [30, 34, 28, 40, 48, 44, 52, 50, 58, 62, 60, 56]
    },
    {
      id: 'approval',
      title: 'Approval Rate Trend',
      caption: 'Successful authorizations vs total attempts',
      latest: '94.2%',
      note: '+1.3% vs Avg',
      points: [22, 28, 36, 48, 46, 58, 62]
    },
    {
      id: 'margin',
      title: 'Net Margin (bps)',
      caption: 'Rolling average overlay demonstrating compression',
      latest: '18.4 BPS ATTN',
      note: 'Below target since Jun 2026',
      points: [70, 66, 60, 54, 48, 42, 38, 34, 30]
    },
    {
      id: 'chargeback',
      title: 'Chargeback Rate',
      caption: 'Maintained below the critical scheme threshold of 0.5%',
      latest: '0.31% HEALTHY',
      note: 'THRESHOLD: 0.40%',
      points: [62, 54, 46, 36, 22, 18, 28]
    }
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
