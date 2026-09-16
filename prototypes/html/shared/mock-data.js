/** Shared mock DTOs for HTML prototypes (mirrors c360MockData.js). */

var ACCOUNTS = [
  { id: 'pets', name: 'Pets at Home', industry: 'Retail', volume: 'GBP 312m', health: 'Watch', healthClass: 'watch', risk: 'Medium', riskClass: 'watch', crossSell: 'Revenue Boost', healthIndex: 68.2, healthDelta: '-2.1' },
  { id: 'willow', name: 'Willow Travel', industry: 'Travel', volume: 'GBP 188m', health: 'At risk', healthClass: 'risk', risk: 'High', riskClass: 'risk', crossSell: '-', healthIndex: 54.1, healthDelta: '-5.8' },
  { id: 'deep-blue', name: 'Deep Blue Retail', industry: 'Retail', volume: 'GBP 256m', health: 'Watch', healthClass: 'watch', risk: 'Medium', riskClass: 'watch', crossSell: '-', healthIndex: 61.7, healthDelta: '-1.4' },
  { id: 'northwind', name: 'Northwind Foods', industry: 'Grocery', volume: 'GBP 141m', health: 'Healthy', healthClass: 'good', risk: 'Low', riskClass: 'good', crossSell: 'Revenue Boost', healthIndex: 82.4, healthDelta: '+1.2' },
  { id: 'aurora', name: 'Aurora Gaming', industry: 'Gaming', volume: 'GBP 204m', health: 'Healthy', healthClass: 'good', risk: 'Low', riskClass: 'good', crossSell: 'FX', healthIndex: 79.8, healthDelta: '+0.6' },
  { id: 'acme', name: 'Acme Corporation', industry: 'Enterprise', volume: 'GBP 420m', health: 'Watch', healthClass: 'watch', risk: 'High', riskClass: 'risk', crossSell: 'Smart Routing', healthIndex: 58.3, healthDelta: '-4.2' },
  { id: 'intech', name: 'InTech Solutions', industry: 'Technology', volume: 'USD 290m', health: 'Healthy', healthClass: 'good', risk: 'Low', riskClass: 'good', crossSell: 'Tokenisation', healthIndex: 76.1, healthDelta: '-0.8' }
];

var SIGNALS = [
  { id: 'pets-boost', category: 'Cross-sell', badgeClass: 'badge cross-sell', title: 'Pets at Home - Revenue Boost and MAU candidate', description: 'High 05-decline volume and ageing card data suitable for Managed Account Updater.', signalStatus: 'open' },
  { id: 'willow-risk', category: 'Churn', badgeClass: 'badge churn', title: 'Willow Travel - Volume compression -18% / 60 days', description: 'Brazil market under plan; contract renewal window approaching.', signalStatus: 'open' },
  { id: 'northwind-boost', category: 'Cross-sell', badgeClass: 'badge cross-sell', title: 'Northwind Foods - Revenue Boost', description: 'Non-MIT scheme fees rising on recurring transactions.', signalStatus: 'open' },
  { id: 'deep-blue-risk', category: 'Churn', badgeClass: 'badge churn', title: 'Deep Blue Retail - Auth-rate decline and servicing tickets up', description: 'Auth rate down 4.1 percentage points over three days; three open tickets.', signalStatus: 'open' },
  { id: 'aurora-fx', category: 'Cross-sell', badgeClass: 'badge fx', title: 'Aurora Gaming - FX opportunity', description: 'Settlement across six currencies with material FX exposure.', signalStatus: 'open' }
];

var ALERTS = [
  { id: 'alert-acme', account: 'Acme Corporation', score: -32, alertDate: '26 Aug 2026', suppression: 'None', rmNotification: 'Email sent', status: 'New' },
  { id: 'alert-intech', account: 'InTech Solutions', score: -28, alertDate: '25 Aug 2026', suppression: 'None', rmNotification: 'Email sent', status: 'In Review' },
  { id: 'alert-willow', account: 'Willow Travel', score: -22, alertDate: '24 Aug 2026', suppression: 'Active (12d left)', rmNotification: 'Not notified', status: 'Suppressed' },
  { id: 'alert-pets', account: 'Pets at Home', score: -19, alertDate: '23 Aug 2026', suppression: 'None', rmNotification: 'Pending', status: 'Action Scheduled' }
];

var ALERT_INTEL = {
  'Acme Corporation': { product: 'Smart Routing', pipeline: 'GBP 2.1m', confidence: 78 },
  'InTech Solutions': { product: 'Tokenisation', pipeline: 'USD 1.4m', confidence: 65 },
  'Willow Travel': { product: 'FX Optimisation Engine', pipeline: 'GBP 0.6m', confidence: 58 },
  'Pets at Home': { product: 'Revenue Boost', pipeline: 'GBP 1.4m', confidence: 82 }
};

var KPI_TILES = [
  { label: 'Total accounts', value: '42', detail: 'Enterprise and eCommerce', attention: false },
  { label: 'Composite health index', value: '72.4', detail: '+0.6 vs last month', attention: false },
  { label: 'Signals to action', value: '5', detail: '2 churn | 3 cross-sell', attention: true, dynamic: true },
  { label: 'At-risk accounts', value: '3', detail: 'Watch list expanded', attention: false },
  { label: 'Revenue at risk', value: 'GBP 2.8m', detail: 'Pilot portfolio', attention: false }
];

var NEEDS_ACTION_ITEMS = [
  { id: 'na-1', severity: 'now', severityLabel: 'Intraday', heading: 'Pets at Home - volume down 24% today', body: 'Possible incident or traffic shift. Brazil and UK gateways affected.', meta: 'Detected 08:12 | MID-level drop across 4 MIDs', accountName: 'Pets at Home', buttonLabel: 'Review', primary: true },
  { id: 'na-2', severity: 'day', severityLabel: 'Daily', heading: 'Deep Blue Retail - 3-day auth-rate decline', body: 'Concentrated on 05 do-not-honour decline code.', meta: 'Rolling 3-day window', accountName: 'Deep Blue Retail', buttonLabel: 'Open', primary: false },
  { id: 'na-3', severity: 'month', severityLabel: 'Monthly', heading: 'Willow Travel - compression risk rising to High', body: 'Volume down 18% over 60 days; Brazil market under plan.', meta: 'Monthly churn model refresh', accountName: 'Willow Travel', buttonLabel: 'Open', primary: false }
];

var PORTFOLIO_HEALTH = {
  healthy: 31,
  watch: 8,
  atRisk: 3,
  pipeline: [
    { name: 'Revenue Boost', detail: '6 live opportunities', width: '72%', value: 'GBP 4.1m' },
    { name: 'FX', detail: '3 live opportunities', width: '40%', value: 'GBP 2.3m' },
    { name: 'FraudSight', detail: '1 live opportunity', width: '16%', value: 'GBP 0.6m' }
  ]
};

var MATERIAL_BANNER = {
  message: 'Material changes: 3 accounts moved to At risk this week | Revenue at risk GBP 2.8m'
};

var CROSS_SELL_ROWS = [
  { account: 'Pets at Home', product: 'Revenue Boost', propensity: 'High', propensityClass: 'risk', uplift: 'GBP 1.4m', driver: 'High 05-decline volume' },
  { account: 'Northwind Foods', product: 'Revenue Boost', propensity: 'Medium', propensityClass: 'watch', uplift: 'GBP 0.7m', driver: 'Non-MIT scheme fees' },
  { account: 'Aurora Gaming', product: 'FX', propensity: 'Medium', propensityClass: 'watch', uplift: 'GBP 0.9m', driver: '6-currency settlement' }
];

var CHURN_ROWS = [
  { account: 'Willow Travel', risk: 'High', riskClass: 'risk', txnChange: '-18% vs LY', driver: 'Brazil market under plan' },
  { account: 'Pets at Home', risk: 'Medium', riskClass: 'watch', txnChange: '-9% vs LY', driver: 'Brazil compression' },
  { account: 'Deep Blue Retail', risk: 'Medium', riskClass: 'watch', txnChange: '-5% vs LY', driver: '05-decline and servicing' }
];

var MOCK_ACCOUNT_IDS = {
  'Pets at Home': '001MOCK000000001',
  'Willow Travel': '001MOCK000000002',
  'Deep Blue Retail': '001MOCK000000003',
  'Acme Corporation': '001MOCK000000004',
  'InTech Solutions': '001MOCK000000005',
  'Northwind Foods': '001MOCK000000006'
};

var ALERT_STATUS_OPTIONS = ['All', 'New', 'In Review', 'Action Scheduled', 'Suppressed'];
