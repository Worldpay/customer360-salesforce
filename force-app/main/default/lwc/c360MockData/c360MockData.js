/** Shared mock DTOs for Customer 360 sandbox UAT (aligned to C360 Prototype v5). */

import { ACCOUNT_DETAIL, normalizeDriverDrilldown, CHURN_SCORE_LABEL } from './c360AccountDetailData';

export { ACCOUNT_DETAIL, CHURN_SCORE_LABEL };
export {
    REVENUE_BOOST_BUSINESS_CASE,
    getRevenueBoostAccount,
    getRevenueBoostCase,
    computeRevenueBoostBusinessCase,
    rbFmtMoney,
    rbFmtPct
} from './c360RevenueBoostBusinessCaseData';

export const BASE_PRICE_PER_TXN = 0.05;

export const DECLINE_CHART_COLORS = ['#0176d3', '#ba0517', '#dd7a01', '#2e844a', '#706e6b'];

export function fmtMoney(n) {
    if (n >= 1000000) return '$' + (n / 1000000).toFixed(2) + 'M';
    if (n >= 1000) return '$' + Math.round(n / 1000) + 'K';
    return '$' + n;
}

export function getAccountDetail(name) {
    const detail = ACCOUNT_DETAIL[name] || ACCOUNT_DETAIL['Pets at Home'];
    const seed = parseInt(detail.accountId, 10) * 100 || 1000;
    return {
        ...detail,
        driverDrilldown: normalizeDriverDrilldown(detail, seed)
    };
}

export function getAccountInitials(name) {
    const parts = (name || '').split(' ');
    return ((parts[0]?.charAt(0) || '') + (parts[1]?.charAt(0) || '')).toUpperCase();
}

export function accountsWithDetail() {
    return ACCOUNTS.filter((account) => ACCOUNT_DETAIL[account.name]);
}

export const PATHWAYS = [
    { id: 'pets-boost', account: 'Pets at Home', name: 'Revenue Boost pitch', stage: 'Solutioning', owner: 'Implementation Manager', date: '12 Sep', status: 'On track', statusClass: 'good', scope: 'me' },
    { id: 'pets-review', account: 'Pets at Home', name: 'Pricing and performance review', stage: 'CDD review', owner: 'CDD / Legal', date: '20 Sep', status: 'At risk', statusClass: 'watch', scope: 'me' },
    { id: 'willow-review', account: 'Willow Travel', name: 'Pricing review', stage: 'Discovery', owner: 'Relationship Manager', date: '28 Sep', status: 'On track', statusClass: 'good', scope: 'me' }
];

export const ACCOUNTS = [
    { id: 'willow', name: 'Willow Travel', industry: 'Travel', volume: 'GBP 188m', revenue: 'GBP 188m', health: 'At risk', healthClass: 'risk', risk: 'High', riskClass: 'risk', crossSell: 'FX Optimisation Engine', pathways: 1, healthIndex: 54.1, healthDelta: '-5.8', lastActivity: '2 days ago', predictedTxnChange: '-18% vs LY', predictedTxnChangeSort: -18, topCrossSellProduct: 'FX Optimisation Engine', topCrossSellNetBenefit: 'GBP 0.6m', topCrossSellNetBenefitSort: 600000 },
    { id: 'pets', name: 'Pets at Home', industry: 'Retail', volume: 'GBP 312m', revenue: 'GBP 312m', health: 'Watch', healthClass: 'watch', risk: 'Medium', riskClass: 'watch', crossSell: 'Revenue Boost', pathways: 2, healthIndex: 68.2, healthDelta: '-2.1', lastActivity: 'Today', predictedTxnChange: '-9% vs LY', predictedTxnChangeSort: -9, topCrossSellProduct: 'Revenue Boost', topCrossSellNetBenefit: 'GBP 1.4m', topCrossSellNetBenefitSort: 1400000 },
    { id: 'deep-blue', name: 'Deep Blue Retail', industry: 'Retail', volume: 'GBP 256m', revenue: 'GBP 256m', health: 'Watch', healthClass: 'watch', risk: 'Medium', riskClass: 'watch', crossSell: 'FraudSight', pathways: 1, healthIndex: 61.7, healthDelta: '-1.4', lastActivity: 'Yesterday', predictedTxnChange: '-5% vs LY', predictedTxnChangeSort: -5, topCrossSellProduct: 'FraudSight', topCrossSellNetBenefit: 'GBP 0.4m', topCrossSellNetBenefitSort: 400000 },
    { id: 'acme', name: 'Acme Corporation', industry: 'Enterprise', volume: 'GBP 420m', revenue: 'GBP 420m', health: 'Watch', healthClass: 'watch', risk: 'High', riskClass: 'risk', crossSell: 'Smart Routing', pathways: 3, healthIndex: 58.3, healthDelta: '-4.2', lastActivity: '3 days ago', predictedTxnChange: '-4% vs LY', predictedTxnChangeSort: -4, topCrossSellProduct: 'Smart Routing', topCrossSellNetBenefit: 'GBP 2.1m', topCrossSellNetBenefitSort: 2100000 },
    { id: 'intech', name: 'InTech Solutions', industry: 'Technology', volume: 'USD 290m', revenue: 'USD 290m', health: 'Healthy', healthClass: 'good', risk: 'Low', riskClass: 'good', crossSell: 'Tokenisation', pathways: 1, healthIndex: 76.1, healthDelta: '-0.8', lastActivity: 'Today', predictedTxnChange: '-2% vs LY', predictedTxnChangeSort: -2, topCrossSellProduct: 'Tokenisation', topCrossSellNetBenefit: 'USD 1.4m', topCrossSellNetBenefitSort: 1400000 },
    { id: 'northwind', name: 'Northwind Foods', industry: 'Grocery', volume: 'GBP 141m', revenue: 'GBP 141m', health: 'Healthy', healthClass: 'good', risk: 'Low', riskClass: 'good', crossSell: 'Revenue Boost', pathways: 1, healthIndex: 82.4, healthDelta: '+1.2', lastActivity: '4 days ago', predictedTxnChange: '+1% vs LY', predictedTxnChangeSort: 1, topCrossSellProduct: 'Revenue Boost', topCrossSellNetBenefit: 'GBP 0.7m', topCrossSellNetBenefitSort: 700000 },
    { id: 'aurora', name: 'Aurora Gaming', industry: 'Gaming', volume: 'GBP 204m', revenue: 'GBP 204m', health: 'Healthy', healthClass: 'good', risk: 'Low', riskClass: 'good', crossSell: 'FX', pathways: 2, healthIndex: 79.8, healthDelta: '+0.6', lastActivity: 'Today', predictedTxnChange: '+2% vs LY', predictedTxnChangeSort: 2, topCrossSellProduct: 'FX', topCrossSellNetBenefit: 'GBP 0.9m', topCrossSellNetBenefitSort: 900000 },
    { id: 'harbor', name: 'Harbor Logistics', industry: 'Logistics', volume: 'GBP 97m', revenue: 'GBP 97m', health: 'At risk', healthClass: 'risk', risk: 'High', riskClass: 'risk', crossSell: 'Instant Payout APIs', pathways: 1, healthIndex: 49.6, healthDelta: '-12.0', lastActivity: '6 days ago', predictedTxnChange: '-12% vs LY', predictedTxnChangeSort: -12, topCrossSellProduct: 'Instant Payout APIs', topCrossSellNetBenefit: 'GBP 0.3m', topCrossSellNetBenefitSort: 300000 },
    { id: 'summit', name: 'Summit Hotels', industry: 'Hospitality', volume: 'EUR 165m', revenue: 'EUR 165m', health: 'Watch', healthClass: 'watch', risk: 'Medium', riskClass: 'watch', crossSell: 'FX', pathways: 1, healthIndex: 71.3, healthDelta: '-3.0', lastActivity: 'Yesterday', predictedTxnChange: '-3% vs LY', predictedTxnChangeSort: -3, topCrossSellProduct: 'FX', topCrossSellNetBenefit: 'EUR 0.5m', topCrossSellNetBenefitSort: 500000 },
    { id: 'vertex', name: 'Vertex Media', industry: 'Media', volume: 'GBP 118m', revenue: 'GBP 118m', health: 'Healthy', healthClass: 'good', risk: 'Low', riskClass: 'good', crossSell: 'Tokenisation', pathways: 1, healthIndex: 84.2, healthDelta: '+3.0', lastActivity: 'Today', predictedTxnChange: '+3% vs LY', predictedTxnChangeSort: 3, topCrossSellProduct: 'Tokenisation', topCrossSellNetBenefit: 'GBP 0.5m', topCrossSellNetBenefitSort: 500000 }
];

export const PORTFOLIO_HEALTH_FILTERS = ['All', 'Healthy', 'Watch', 'At risk'];

export const SIGNALS = [
    { id: 'pets-boost', category: 'Cross-sell', badgeClass: 'badge cross-sell', title: 'Pets at Home - Revenue Boost and MAU candidate', description: 'High 05-decline volume and ageing card data suitable for Managed Account Updater.', signalStatus: 'open' },
    { id: 'willow-risk', category: 'Churn', badgeClass: 'badge churn', title: 'Willow Travel - Volume compression -18% / 60 days', description: 'Brazil market under plan; contract renewal window approaching.', signalStatus: 'open' },
    { id: 'northwind-boost', category: 'Cross-sell', badgeClass: 'badge cross-sell', title: 'Northwind Foods - Revenue Boost', description: 'Non-MIT scheme fees rising on recurring transactions.', signalStatus: 'open' },
    { id: 'deep-blue-risk', category: 'Churn', badgeClass: 'badge churn', title: 'Deep Blue Retail - Auth-rate decline and servicing tickets up', description: 'Auth rate down 4.1 percentage points over three days; three open tickets.', signalStatus: 'open' },
    { id: 'aurora-fx', category: 'Cross-sell', badgeClass: 'badge fx', title: 'Aurora Gaming - FX opportunity', description: 'Settlement across six currencies with material FX exposure.', signalStatus: 'open' }
];

export const ALERTS = [
    { id: 'alert-acme', account: 'Acme Corporation', score: -32, alertDate: '26 Aug 2026', suppression: 'None', rmNotification: 'Email sent', status: 'New' },
    { id: 'alert-intech', account: 'InTech Solutions', score: -28, alertDate: '25 Aug 2026', suppression: 'None', rmNotification: 'Email sent', status: 'In Review' },
    { id: 'alert-willow', account: 'Willow Travel', score: -22, alertDate: '24 Aug 2026', suppression: 'Active (12d left)', rmNotification: 'Not notified', status: 'Suppressed' },
    { id: 'alert-pets', account: 'Pets at Home', score: -19, alertDate: '23 Aug 2026', suppression: 'None', rmNotification: 'Pending', status: 'Action Scheduled' }
];

export const ALERT_INTEL = {
    'Acme Corporation': { product: 'Smart Routing', pipeline: 'GBP 2.1m', confidence: 78 },
    'InTech Solutions': { product: 'Tokenisation', pipeline: 'USD 1.4m', confidence: 65 },
    'Willow Travel': { product: 'FX Optimisation Engine', pipeline: 'GBP 0.6m', confidence: 58 },
    'Pets at Home': { product: 'Revenue Boost', pipeline: 'GBP 1.4m', confidence: 82 }
};

export const ALERT_DETAIL_BY_ID = {
    'alert-acme': {
        id: 'alert-acme',
        account: 'Acme Corporation',
        score: -32,
        arr: 'GBP 14.2m',
        merchantCount: 42,
        trajectory: [12, 8, 4, -2, -8, -18],
        drivers: [
            { label: 'Volume compression - UK gateway', impact: '+38%', width: '88%' },
            { label: 'Auth-rate decline on 05 code', impact: '+24%', width: '62%' },
            { label: 'Competitor pricing signal', impact: '-8%', width: '28%' }
        ],
        crossSell: { pipeline: 'GBP 2.1m', confidence: 78, products: ['Smart Routing', 'FX Optimisation Engine'] }
    },
    'alert-intech': {
        id: 'alert-intech',
        account: 'InTech Solutions',
        score: -28,
        arr: 'USD 9.8m',
        merchantCount: 28,
        trajectory: [6, 2, -1, -6, -12, -22],
        drivers: [
            { label: 'Settlement delay complaints', impact: '+31%', width: '76%' },
            { label: 'FX exposure unmanaged', impact: '+18%', width: '48%' }
        ],
        crossSell: { pipeline: 'USD 1.4m', confidence: 65, products: ['Tokenisation', 'Instant Payout APIs'] }
    }
};

export const MOCK_ACCOUNT_IDS = {
    'Pets at Home': '001MOCK000000001',
    'Willow Travel': '001MOCK000000002',
    'Deep Blue Retail': '001MOCK000000003',
    'Acme Corporation': '001MOCK000000004',
    'InTech Solutions': '001MOCK000000005',
    'Northwind Foods': '001MOCK000000006',
    'Aurora Gaming': '001MOCK000000007',
    'Harbor Logistics': '001MOCK000000008',
    'Summit Hotels': '001MOCK000000009',
    'Vertex Media': '001MOCK000000010'
};

export const KPI_TILES = [
    { label: 'Total accounts', value: '42', detail: 'Enterprise and eCommerce', attention: false },
    { label: 'Composite health index', value: '72.4', detail: '+0.6 vs last month', attention: false },
    { label: 'Signals to action', value: '5', detail: '2 churn | 3 cross-sell', attention: true },
    { label: 'At-risk accounts', value: '3', detail: 'Watch list expanded', attention: false },
    { label: 'Revenue at risk', value: 'GBP 2.8m', detail: 'Pilot portfolio', attention: false }
];

export const NEEDS_ACTION_ITEMS = [
    { id: 'na-1', severity: 'now', severityLabel: 'Intraday', heading: 'Pets at Home - volume down 24% today', body: 'Possible incident or traffic shift. Brazil and UK gateways affected.', meta: 'Detected 08:12 | MID-level drop across 4 MIDs', accountName: 'Pets at Home', sourceView: 'accounts', buttonLabel: 'Review', primary: true },
    { id: 'na-2', severity: 'day', severityLabel: 'Daily', heading: 'Deep Blue Retail - 3-day auth-rate decline', body: 'Concentrated on 05 do-not-honour decline code.', meta: 'Rolling 3-day window', accountName: 'Deep Blue Retail', sourceView: 'churn', buttonLabel: 'Open', primary: false },
    { id: 'na-3', severity: 'month', severityLabel: 'Monthly', heading: 'Willow Travel - compression risk rising to High', body: 'Volume down 18% over 60 days; Brazil market under plan.', meta: 'Monthly churn model refresh', accountName: 'Willow Travel', sourceView: 'churn', buttonLabel: 'Open', primary: false }
];

export const PORTFOLIO_HEALTH = {
    healthy: 31,
    watch: 8,
    atRisk: 3,
    pipeline: [
        { name: 'Revenue Boost', detail: '6 live opportunities', width: '72%', value: 'GBP 4.1m' },
        { name: 'FX', detail: '3 live opportunities', width: '40%', value: 'GBP 2.3m' }
    ]
};

export const MATERIAL_BANNER = {
    message: 'Material changes: 3 accounts moved to At risk this week | Revenue at risk GBP 2.8m'
};

export const CROSS_SELL_ROWS = [
    { account: 'Pets at Home', product: 'Revenue Boost', propensity: 'High', propensityClass: 'risk', uplift: 'GBP 1.4m', driver: 'High 05-decline volume' },
    { account: 'Northwind Foods', product: 'Revenue Boost', propensity: 'Medium', propensityClass: 'watch', uplift: 'GBP 0.7m', driver: 'Non-MIT scheme fees' },
    { account: 'Aurora Gaming', product: 'FX', propensity: 'Medium', propensityClass: 'watch', uplift: 'GBP 0.9m', driver: '6-currency settlement' }
];

export const CHURN_ROWS = [
    { account: 'Willow Travel', risk: 'High', riskClass: 'risk', txnChange: '-18% vs LY', driver: 'Brazil market under plan' },
    { account: 'Pets at Home', risk: 'Medium', riskClass: 'watch', txnChange: '-9% vs LY', driver: 'Brazil compression' },
    { account: 'Deep Blue Retail', risk: 'Medium', riskClass: 'watch', txnChange: '-5% vs LY', driver: '05-decline and servicing' }
];
