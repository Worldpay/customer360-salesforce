window.HOME_PAGE = {
  greeting: 'Good morning, Sarah',
  alertPill: '1 Priority Alert',
  subtitle: 'You have 1 high-priority alerts due this week.',
  updated: 'Updated 12m Ago',
  range: 'Last 30 Days',
  tools: ['Export PDF', 'Portfolio Analysis'],
  kpis: [
    { label: 'Total Accounts', value: '47', tag: 'ACTIVE' },
    { label: 'At-Risk Accounts', value: '12', tag: 'ATTN REQ', note: '2 new' },
    { label: 'Churn Alerts', value: '4', tag: 'ATTN REQ' },
    { label: 'Recommended Cross-Sell Leads', value: '11' },
    { label: 'Recommended Cross-Sell Lead ACV', value: '$2.4M' }
  ],
  filters: [
    { id: 'all', label: 'All', count: 11 },
    { id: 'critical', label: 'Critical', count: 3 },
    { id: 'at-risk', label: 'At Risk', count: 3 },
    { id: 'healthy', label: 'Healthy', count: 5 }
  ],
  searchPlaceholder: 'Filter by Account Name or ID...',
  pageLabel: 'Showing 1–8 of 11 accounts',
  accounts: [
    { id: 'SF-89210', name: 'Acme Corporation', score: '−31%', delta: '↓ −18', deltaDir: 'down', risk: 'CRITICAL', signal: 'ACTIVE — Auth rate −31%', leads: '2', acv: '$200K', actions: ['View', 'Action'] },
    { id: 'SF-10002', name: 'InTech Solutions', score: '−42%', delta: '↓ −15', deltaDir: 'down', risk: 'CRITICAL', signal: 'ACTIVE — Volume drop −42%', leads: '1', acv: '$180K', actions: ['View', 'Action'] },
    { id: 'SF-10003', name: 'Globex Ltd', score: '−28%', delta: '↓ −5', deltaDir: 'down', risk: 'CRITICAL', signal: 'PENDING', leads: '0', acv: '0', actions: ['View', 'Action'] },
    { id: 'SF-10004', name: 'Summit Ventures', score: '64%', delta: '↓ −8', deltaDir: 'down', risk: 'AT RISK', signal: 'MONITORING', leads: '0', acv: '0', actions: ['View', 'Action'] },
    { id: 'SF-10005', name: 'Atlas Financial', score: '50%', delta: '↓ −3', deltaDir: 'down', risk: 'AT RISK', signal: '—', leads: '1', acv: '$180K', actions: ['View', 'Action'] },
    { id: 'SF-10006', name: 'Helios Industries', score: '32%', delta: '↑ +2', deltaDir: 'up', risk: 'AT RISK', signal: '—', leads: '2', acv: '$320K', actions: ['View'] },
    { id: 'SF-10007', name: 'Meridian Corp', score: '82%', delta: '↑ +4', deltaDir: 'up', risk: 'HEALTHY', signal: '—', leads: '3', acv: '$370K', actions: ['View'] },
    { id: 'SF-10008', name: 'Apex Global Group', score: '85%', delta: '↑ +1', deltaDir: 'up', risk: 'HEALTHY', signal: '—', leads: '2', acv: '$220K', actions: ['View'] }
  ],
  signalsTitle: 'Active Churn Risk Signals',
  signalsBadge: '4 Active',
  signalsLink: 'View All Signals',
  signals: [
    { id: 'SF-89210', name: 'Acme Corporation', level: 'CRITICAL', state: 'NEW', title: 'Authorization Rate Drop', body: 'Signal: auth rate dropped 31% below baseline (< −25% threshold) over 7-day rolling window', impact: 'Impact: $145K monthly revenue at risk', date: '26 Aug 2026', opens: 'churn' },
    { id: 'SF-10002', name: 'InTech Solutions', level: 'HIGH', state: 'DEFERRED', title: 'Volume Anomaly Detected', body: 'Volume dropped 42% vs 30-day baseline', impact: 'Impact: $89K', date: '24 Aug 2026' },
    { id: 'SF-10003', name: 'Globex Ltd', level: 'LOW', state: 'PENDING', title: 'Early Warning', body: 'Volume variance pending confirmation', impact: 'Impact: $178K monthly revenue', date: '25 Aug 2026' }
  ],
  leadsTitle: 'Recommended Cross-Sell Leads',
  leadsLink: 'View All Recommended Leads',
  leads: [
    { id: 'SF-89210', name: 'Acme Corporation', product: 'Revenue Boost', acv: '$16K', roi: '$25K', opens: 'cross-sell' },
    { id: 'SF-10011', name: 'Summit Nutritions', product: 'FX Optimisation', acv: '$16K', roi: '$22K' },
    { id: 'SF-10007', name: 'Meridian Corp', product: 'Revenue Boost', acv: '$14K', roi: '$20K' }
  ]
};
