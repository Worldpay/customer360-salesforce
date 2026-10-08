/** Mock DTOs for Churn Alerts v2 (mirrors prototypes/html/shared churn-alerts-v2 modules). */

export const CHURN_ALERTS_V2 = {
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
    backLabel: 'Back to Alert Centre',
    accountName: 'Acme Corporation',
    accountLine: 'Salesforce Account ID: #SF-89210 • Enterprise Segment • Assigned RM: You',
    lastSynced: 'Last Synced: 28 Aug 2026',
    actions: [
        { id: 'refresh', label: 'Refresh Data', variant: 'text' },
        { id: 'export', label: 'Export Report', variant: 'primary' },
        { id: 'feedback', label: 'Feedback', variant: 'accent' }
    ]
};

export const IDENTIFIED_RISK_SIGNALS = {
    title: 'Identified Risk Signals',
    badge: '3 SIGNALS'
};
