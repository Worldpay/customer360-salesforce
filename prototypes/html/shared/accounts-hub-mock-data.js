/** Mock portfolio table for Accounts Hub HTML prototype (illustrative DTOs). */

var ACCOUNTS = [
  {
    id: 'willow',
    name: 'Willow Travel',
    industry: 'Travel',
    revenue: 'GBP 188m',
    healthIndex: 54.1,
    health: 'At risk',
    healthClass: 'risk',
    lastActivity: '2 days ago',
    predictedTxnChange: '-18% vs LY',
    predictedTxnChangeSort: -18,
    topCrossSellProduct: 'FX Optimisation Engine',
    topCrossSellNetBenefit: 'GBP 0.6m',
    topCrossSellNetBenefitSort: 600000,
    risk: 'High',
    riskClass: 'risk'
  },
  {
    id: 'pets',
    name: 'Pets at Home',
    industry: 'Retail',
    revenue: 'GBP 312m',
    healthIndex: 68.2,
    health: 'Watch',
    healthClass: 'watch',
    lastActivity: 'Today',
    predictedTxnChange: '-9% vs LY',
    predictedTxnChangeSort: -9,
    topCrossSellProduct: 'Revenue Boost',
    topCrossSellNetBenefit: 'GBP 1.4m',
    topCrossSellNetBenefitSort: 1400000,
    risk: 'Medium',
    riskClass: 'watch'
  },
  {
    id: 'deep-blue',
    name: 'Deep Blue Retail',
    industry: 'Retail',
    revenue: 'GBP 256m',
    healthIndex: 61.7,
    health: 'Watch',
    healthClass: 'watch',
    lastActivity: 'Yesterday',
    predictedTxnChange: '-5% vs LY',
    predictedTxnChangeSort: -5,
    topCrossSellProduct: 'FraudSight',
    topCrossSellNetBenefit: 'GBP 0.4m',
    topCrossSellNetBenefitSort: 400000,
    risk: 'Medium',
    riskClass: 'watch'
  },
  {
    id: 'acme',
    name: 'Acme Corporation',
    industry: 'Enterprise',
    revenue: 'GBP 420m',
    healthIndex: 58.3,
    health: 'Watch',
    healthClass: 'watch',
    lastActivity: '3 days ago',
    predictedTxnChange: '-4% vs LY',
    predictedTxnChangeSort: -4,
    topCrossSellProduct: 'Smart Routing',
    topCrossSellNetBenefit: 'GBP 2.1m',
    topCrossSellNetBenefitSort: 2100000,
    risk: 'High',
    riskClass: 'risk'
  },
  {
    id: 'intech',
    name: 'InTech Solutions',
    industry: 'Technology',
    revenue: 'USD 290m',
    healthIndex: 76.1,
    health: 'Healthy',
    healthClass: 'good',
    lastActivity: 'Today',
    predictedTxnChange: '-2% vs LY',
    predictedTxnChangeSort: -2,
    topCrossSellProduct: 'Tokenisation',
    topCrossSellNetBenefit: 'USD 1.4m',
    topCrossSellNetBenefitSort: 1400000,
    risk: 'Low',
    riskClass: 'good'
  },
  {
    id: 'northwind',
    name: 'Northwind Foods',
    industry: 'Grocery',
    revenue: 'GBP 141m',
    healthIndex: 82.4,
    health: 'Healthy',
    healthClass: 'good',
    lastActivity: '4 days ago',
    predictedTxnChange: '+1% vs LY',
    predictedTxnChangeSort: 1,
    topCrossSellProduct: 'Revenue Boost',
    topCrossSellNetBenefit: 'GBP 0.7m',
    topCrossSellNetBenefitSort: 700000,
    risk: 'Low',
    riskClass: 'good'
  },
  {
    id: 'aurora',
    name: 'Aurora Gaming',
    industry: 'Gaming',
    revenue: 'GBP 204m',
    healthIndex: 79.8,
    health: 'Healthy',
    healthClass: 'good',
    lastActivity: 'Today',
    predictedTxnChange: '+2% vs LY',
    predictedTxnChangeSort: 2,
    topCrossSellProduct: 'FX',
    topCrossSellNetBenefit: 'GBP 0.9m',
    topCrossSellNetBenefitSort: 900000,
    risk: 'Low',
    riskClass: 'good'
  },
  {
    id: 'harbor',
    name: 'Harbor Logistics',
    industry: 'Logistics',
    revenue: 'GBP 97m',
    healthIndex: 49.6,
    health: 'At risk',
    healthClass: 'risk',
    lastActivity: '6 days ago',
    predictedTxnChange: '-12% vs LY',
    predictedTxnChangeSort: -12,
    topCrossSellProduct: 'Instant Payout APIs',
    topCrossSellNetBenefit: 'GBP 0.3m',
    topCrossSellNetBenefitSort: 300000,
    risk: 'High',
    riskClass: 'risk'
  },
  {
    id: 'summit',
    name: 'Summit Hotels',
    industry: 'Hospitality',
    revenue: 'EUR 165m',
    healthIndex: 71.3,
    health: 'Watch',
    healthClass: 'watch',
    lastActivity: 'Yesterday',
    predictedTxnChange: '-3% vs LY',
    predictedTxnChangeSort: -3,
    topCrossSellProduct: 'FX',
    topCrossSellNetBenefit: 'EUR 0.5m',
    topCrossSellNetBenefitSort: 500000,
    risk: 'Medium',
    riskClass: 'watch'
  },
  {
    id: 'vertex',
    name: 'Vertex Media',
    industry: 'Media',
    revenue: 'GBP 118m',
    healthIndex: 84.2,
    health: 'Healthy',
    healthClass: 'good',
    lastActivity: 'Today',
    predictedTxnChange: '+3% vs LY',
    predictedTxnChangeSort: 3,
    topCrossSellProduct: 'Tokenisation',
    topCrossSellNetBenefit: 'GBP 0.5m',
    topCrossSellNetBenefitSort: 500000,
    risk: 'Low',
    riskClass: 'good'
  }
];

var PORTFOLIO_HEALTH_FILTERS = ['All', 'Healthy', 'Watch', 'At risk'];

var CROSS_SELL_ROWS = [
  { account: 'Pets at Home', product: 'Revenue Boost', propensity: 'High', propensityClass: 'risk', uplift: 'GBP 1.4m', driver: 'High 05-decline volume' },
  { account: 'Acme Corporation', product: 'Smart Routing', propensity: 'High', propensityClass: 'risk', uplift: 'GBP 2.1m', driver: 'Auth-rate volatility' },
  { account: 'Northwind Foods', product: 'Revenue Boost', propensity: 'Medium', propensityClass: 'watch', uplift: 'GBP 0.7m', driver: 'Non-MIT scheme fees' },
  { account: 'Aurora Gaming', product: 'FX', propensity: 'Medium', propensityClass: 'watch', uplift: 'GBP 0.9m', driver: '6-currency settlement' },
  { account: 'InTech Solutions', product: 'Tokenisation', propensity: 'Medium', propensityClass: 'watch', uplift: 'USD 1.4m', driver: 'Card-on-file expansion' }
];

var CHURN_ROWS = [
  { account: 'Willow Travel', risk: 'High', riskClass: 'risk', txnChange: '-18% vs LY', driver: 'Brazil market under plan', pathway: 'Retention review' },
  { account: 'Harbor Logistics', risk: 'High', riskClass: 'risk', txnChange: '-12% vs LY', driver: 'Carrier contract loss', pathway: 'Executive escalation' },
  { account: 'Pets at Home', risk: 'Medium', riskClass: 'watch', txnChange: '-9% vs LY', driver: 'Brazil compression', pathway: 'Pricing review' },
  { account: 'Deep Blue Retail', risk: 'Medium', riskClass: 'watch', txnChange: '-5% vs LY', driver: '05-decline and servicing', pathway: 'Auth optimisation' },
  { account: 'Acme Corporation', risk: 'High', riskClass: 'risk', txnChange: '-4% vs LY', driver: 'UK gateway compression', pathway: 'Retention review' }
];

var ALERTS = [
  { id: 'alert-acme', account: 'Acme Corporation', score: -32, alertDate: '26 Aug 2026', suppression: 'None', rmNotification: 'Email sent', status: 'New' },
  { id: 'alert-intech', account: 'InTech Solutions', score: -28, alertDate: '25 Aug 2026', suppression: 'None', rmNotification: 'Email sent', status: 'In Review' },
  { id: 'alert-willow', account: 'Willow Travel', score: -22, alertDate: '24 Aug 2026', suppression: 'Active (12d left)', rmNotification: 'Not notified', status: 'Suppressed' },
  { id: 'alert-pets', account: 'Pets at Home', score: -19, alertDate: '23 Aug 2026', suppression: 'None', rmNotification: 'Pending', status: 'Action Scheduled' }
];

var ALERT_STATUS_OPTIONS = ['All', 'New', 'In Review', 'Action Scheduled', 'Suppressed'];

ACCOUNTS.forEach(function (a) {
  if (!a.volume) a.volume = a.revenue;
  if (!a.crossSell) a.crossSell = a.topCrossSellProduct;
  if (a.pathways === undefined) a.pathways = 1;
  if (a.healthDelta === undefined) {
    a.healthDelta = a.predictedTxnChangeSort < 0 ? String(a.predictedTxnChangeSort) : '+' + a.predictedTxnChangeSort;
  }
});

var PORTFOLIO_HEALTH = (function () {
  var healthy = 0;
  var watch = 0;
  var atRisk = 0;
  ACCOUNTS.forEach(function (a) {
    if (a.health === 'Healthy') healthy++;
    else if (a.health === 'Watch') watch++;
    else if (a.health === 'At risk') atRisk++;
  });
  return {
    healthy: healthy,
    watch: watch,
    atRisk: atRisk,
    pipeline: [
      { name: 'Revenue Boost', detail: '6 live opportunities', width: '72%', value: 'GBP 4.1m' },
      { name: 'FX', detail: '3 live opportunities', width: '40%', value: 'GBP 2.3m' },
      { name: 'FraudSight', detail: '1 live opportunity', width: '16%', value: 'GBP 0.6m' }
    ]
  };
})();
