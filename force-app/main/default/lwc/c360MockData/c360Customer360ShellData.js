/** Mock DTOs for the Customer 360 shell. Mirrors prototypes/html/shared customer-360-shell modules. */

export const CUSTOMER_360_SHELL = {
  brand: 'Customer 360',
  navDate: 'Tuesday, 26 August 2026',
  product: 'Enterprise Account Hub',
  searchPlaceholder: 'Search portfolios, alerts...',
  userName: 'Sarah Jenkins',
  userRole: 'RM — Enterprise',
  userInitials: 'SJ',
  crossSellNav: { view: 'cross-sell', accountId: 'SF-89210' },
  insightAccounts: { churn: ['SF-89210'], 'cross-sell': ['SF-89210'] },
  nav: [
    { id: 'home', label: 'Home', view: 'home' },
    { id: 'alert-centre', label: 'Alert Centre', view: 'alerts' },
    { id: 'cross-sell', label: 'Cross-Sell', view: 'crossSellNav' },
    { id: 'analytics', label: 'Analytics', view: 'analytics' },
    { id: 'customers', label: 'Customers', view: 'customers' },
    { id: 'reports', label: 'Reports' },
    { id: 'settings', label: 'Settings' }
  ]
};

export const HOME_PAGE = {
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

export const ALERTS_CENTRE = {
  crumbs: ['Home', 'Alert Centre'],
  backLabel: 'Back to Enterprise Account Hub',
  title: 'All Churn Alerts',
  updated: 'Updated 10m Ago',
  exportLabel: 'Export',
  searchPlaceholder: 'Filter by Account Name or Salesforce ID...',
  summary: '6 Total Alerts · 3 New · 2 In Review · 1 Resolved · Suppressed: 2',
  note: 'Alert logic: IF score < −25% AND RM in pilot group → Alert + Task + Email + 1-month suppression per merchant',
  rows: [
    { id: 'SF-89210', name: 'Acme Corporation', score: '−31% ↓', threshold: '< −25%', date: '28 Aug 2026', suppression: 'Active', task: 'Created', email: 'Sent', status: 'NEW ALERT' },
    { id: 'SF-10003', name: 'Globex Ltd', score: '−28% ↓', threshold: '< −25%', date: '27 Aug 2026', suppression: 'Active', task: 'Created', email: 'Sent', status: 'IN REVIEW' },
    { id: 'SF-10002', name: 'InTech Solutions', score: '−42% ↓', threshold: '< −25%', date: '25 Aug 2026', suppression: 'Active', task: 'Created', email: 'Sent', status: 'ACTION SCHEDULED' },
    { id: 'SF-10009', name: 'Umbrella Corp', score: '−26% ↓', threshold: '< −25%', date: '20 Aug 2026', suppression: 'Re-triggered', task: 'Created', email: 'Sent', status: 'NEW ALERT' },
    { id: 'SF-10010', name: 'Soylent Co', score: '−33% ↓', threshold: '< −25%', date: '15 Aug 2026', suppression: 'Suppressed til 15 Sep', task: '—', email: '—', status: 'SUPPRESSED' }
  ]
};

export const CROSS_SELL_DETAIL = {
  comparisons: [
    { label: 'Current', value: '81.2%', caption: 'Existing performance · Illustrative baseline', width: '81.2%' },
    { label: 'Estimated after Revenue Boost', value: '84.4%', caption: '85% token utilization · +3.2 pp uplift · Illustrative estimate', width: '84.4%' }
  ],
  declineTitle: 'Decline Recovery Opportunity',
  declineBadge: 'APPROVED',
  declineTable: 'Revenue Boost Addressable Decline Code Breakdown',
  declineNote: 'Illustrative dummy data',
  columns: ['Revenue reason / code', 'Eligible decline (#)', 'Eligible decline ($)', '% RB cure rate', 'Token utilization (%)', 'Est. recovered (#)', 'Est. recovered amount ($)'],
  rows: [
    ['Grand Total', '319,395,411', '14,299,408,562', '38%', '72%', '99,440,680', '4,464,605,868'],
    ['835 Decline vv2 failure', '32,662,841', '1,991,948,534', '92%', '72%', '21,920,145', '1,297,532,343'],
    ['79 Lifecycle reasons', '15,036,064', '2,775,855,702', '47%', '72%', '30,400,682', '1,013,623,652'],
    ['54 Expired card', '27,055,637', '1,501,590,211', '59%', '72%', '11,635,484', '668,297,449'],
    ['46 Closed account', '30,865,468', '1,285,981,329', '67%', '72%', '16,007,790', '661,633,784'],
    ['82 Negative CAM, dCVV, iCVV, or CVV', '9,282,081', '4,553,637,860', '7%', '72%', '8,218,792', '387,757,271'],
    ['14 Invalid card number', '13,107,046', '545,252,255', '55%', '72%', '5,628,495', '231,130,377'],
    ['41 Lost card', '8,833,653', '299,919,313', '71%', '72%', '4,283,981', '143,093,546'],
    ['63 Unable to authorise', '6,195,386', '306,839,794', '16%', '72%', '588,978', '28,297,513']
  ]
};
