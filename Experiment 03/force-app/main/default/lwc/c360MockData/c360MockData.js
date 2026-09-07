/** Shared mock DTOs for Experiment 02 sandbox UAT (replace via Apex wire in production). */

export const ACCOUNTS = [
    { id: 'pets', name: 'Pets at Home', industry: 'Retail', volume: 'GBP 312m', health: 'Watch', healthClass: 'watch', risk: 'Medium', riskClass: 'watch', crossSell: 'Revenue Boost', pathways: 2, healthIndex: 68.2, healthDelta: '-2.1' },
    { id: 'willow', name: 'Willow Travel', industry: 'Travel', volume: 'GBP 188m', health: 'At risk', healthClass: 'risk', risk: 'High', riskClass: 'risk', crossSell: '-', pathways: 1, healthIndex: 54.1, healthDelta: '-5.8' },
    { id: 'deep-blue', name: 'Deep Blue Retail', industry: 'Retail', volume: 'GBP 256m', health: 'Watch', healthClass: 'watch', risk: 'Medium', riskClass: 'watch', crossSell: '-', pathways: 1, healthIndex: 61.7, healthDelta: '-1.4' },
    { id: 'northwind', name: 'Northwind Foods', industry: 'Grocery', volume: 'GBP 141m', health: 'Healthy', healthClass: 'good', risk: 'Low', riskClass: 'good', crossSell: 'Revenue Boost', pathways: 1, healthIndex: 82.4, healthDelta: '+1.2' },
    { id: 'aurora', name: 'Aurora Gaming', industry: 'Gaming', volume: 'GBP 204m', health: 'Healthy', healthClass: 'good', risk: 'Low', riskClass: 'good', crossSell: 'FX', pathways: 2, healthIndex: 79.8, healthDelta: '+0.6' },
    { id: 'acme', name: 'Acme Corporation', industry: 'Enterprise', volume: 'GBP 420m', health: 'Watch', healthClass: 'watch', risk: 'High', riskClass: 'risk', crossSell: 'Smart Routing', pathways: 3, healthIndex: 58.3, healthDelta: '-4.2' },
    { id: 'intech', name: 'InTech Solutions', industry: 'Technology', volume: 'USD 290m', health: 'Healthy', healthClass: 'good', risk: 'Low', riskClass: 'good', crossSell: 'Tokenisation', pathways: 1, healthIndex: 76.1, healthDelta: '-0.8' }
];

export const PATHWAYS = [
    { id: 'pets-boost', account: 'Pets at Home', name: 'Revenue Boost pitch', stage: 'Solutioning', owner: 'Implementation Manager', date: '12 Sep', status: 'On track', statusClass: 'good', scope: 'me' },
    { id: 'pets-review', account: 'Pets at Home', name: 'Pricing and performance review', stage: 'CDD review', owner: 'CDD / Legal', date: '20 Sep', status: 'At risk', statusClass: 'watch', scope: 'me' },
    { id: 'willow-review', account: 'Willow Travel', name: 'Pricing review', stage: 'Discovery', owner: 'Relationship Manager', date: '28 Sep', status: 'On track', statusClass: 'good', scope: 'me' },
    { id: 'aurora-fx', account: 'Aurora Gaming', name: 'FX solution review', stage: 'Solutioning', owner: 'Solution Consultant', date: '03 Oct', status: 'On track', statusClass: 'good', scope: 'me' },
    { id: 'meridian-boost', account: 'Meridian Retail', name: 'Revenue Boost pitch', stage: 'Proposal', owner: 'Implementation Manager', date: '18 Sep', status: 'On track', statusClass: 'good', scope: 'team' },
    { id: 'orbit-service', account: 'Orbit Digital', name: 'Service escalation', stage: 'In progress', owner: 'Service', date: '05 Sep', status: 'Overdue', statusClass: 'risk', scope: 'team' }
];

export const SIGNALS = [
    { id: 'pets-boost', category: 'Cross-sell', badgeClass: 'badge cross-sell', title: 'Pets at Home - Revenue Boost and MAU candidate', description: 'High 05-decline volume and ageing card data suitable for Managed Account Updater.', pathway: 'Revenue Boost pitch', isOpen: true },
    { id: 'willow-risk', category: 'Churn', badgeClass: 'badge churn', title: 'Willow Travel - Volume compression -18% / 60 days', description: 'Brazil market under plan; contract renewal window approaching.', pathway: 'Pricing and performance review', isOpen: true },
    { id: 'northwind-boost', category: 'Cross-sell', badgeClass: 'badge cross-sell', title: 'Northwind Foods - Revenue Boost', description: 'Non-MIT scheme fees rising on recurring transactions.', pathway: 'Revenue Boost pitch', isOpen: true },
    { id: 'deep-blue-risk', category: 'Churn', badgeClass: 'badge churn', title: 'Deep Blue Retail - Auth-rate decline and servicing tickets up', description: 'Auth rate down 4.1 percentage points over three days; three open tickets.', pathway: 'Service escalation', isOpen: true },
    { id: 'aurora-fx', category: 'Cross-sell', badgeClass: 'badge fx', title: 'Aurora Gaming - FX opportunity', description: 'Settlement across six currencies with material FX exposure.', pathway: 'FX solution review', isOpen: true }
];

export const ALERTS = [
    { id: 'alert-acme', account: 'Acme Corporation', score: -32, threshold: -25, alertDate: '26 Aug 2026', suppression: 'None', rmTask: 'Review churn drivers', email: 'Sent', status: 'New', severity: 'CRITICAL', revenueAtRisk: 'GBP 1.2m' },
    { id: 'alert-intech', account: 'InTech Solutions', score: -28, threshold: -25, alertDate: '25 Aug 2026', suppression: 'None', rmTask: 'Schedule call', email: 'Sent', status: 'In Review', severity: 'HIGH', revenueAtRisk: 'USD 890k' },
    { id: 'alert-willow', account: 'Willow Travel', score: -22, threshold: -25, alertDate: '24 Aug 2026', suppression: 'Active (12d left)', rmTask: 'Deferred', email: '—', status: 'Suppressed', severity: 'MEDIUM', revenueAtRisk: 'GBP 640k' },
    { id: 'alert-pets', account: 'Pets at Home', score: -19, threshold: -25, alertDate: '23 Aug 2026', suppression: 'None', rmTask: 'Cross-sell review', email: '—', status: 'Action Scheduled', severity: 'LOW', revenueAtRisk: 'GBP 410k' }
];

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
    'InTech Solutions': '001MOCK000000005'
};
