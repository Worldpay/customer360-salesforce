/** Mock DTOs for Enterprise Account Home (mirrors prototypes/html/shared enterprise-account-home modules). */

export const ENTERPRISE_ACCOUNT_HOME = {
    brand: 'Customer 360',
    navDate: 'Tuesday, 26 August 2026',
    nav: [
        { id: 'home', label: 'Home' },
        { id: 'alert-centre', label: 'Alert Centre' },
        { id: 'cross-sell', label: 'Cross-Sell' },
        { id: 'analytics', label: 'Analytics' },
        { id: 'customers', label: 'Customers', active: true },
        { id: 'reports', label: 'Reports' },
        { id: 'settings', label: 'Settings' }
    ],
    product: 'Enterprise Account Hub',
    searchPlaceholder: 'Search portfolios, alerts...',
    userName: 'Sarah Jenkins',
    userRole: 'RM — Enterprise',
    userInitials: 'SJ',
    crumbs: ['Home', 'Customers', 'Acme Corporation'],
    backLabel: 'Back to Customers',
    accountName: 'Acme Corporation',
    accountLine: 'Salesforce Account ID: #SF-89210 • Enterprise Segment • Assigned RM: You',
    lastSynced: 'Last Synced: 28 Aug 2026',
    actions: [
        { id: 'refresh', label: 'Refresh Data', variant: 'text' },
        { id: 'export', label: 'Export Report', variant: 'primary' },
        { id: 'feedback', label: 'Feedback', variant: 'accent' }
    ]
};

export const IDENTIFIED_EXPANSION_OPPORTUNITIES = {
    title: 'Identified Expansion Opportunities',
    badge: '3 OPPORTUNITIES'
};

export const PERFORMANCE_AND_TRENDS = {
    title: 'Performance & Trends',
    subtitle: 'Acme Corporation • Enterprise Processing Volume Metrics',
    ranges: [
        { id: '12', label: 'Last 12 Months' },
        { id: '6', label: 'Last 6 Months' },
        { id: '3', label: 'Last 3 Months' },
        { id: 'custom', label: 'Custom Range' }
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
