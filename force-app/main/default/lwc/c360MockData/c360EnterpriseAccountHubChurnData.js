/** Mock DTOs for the churn alert screen (mirrors prototypes/html/shared churn modules). */

export const ENTERPRISE_ACCOUNT_HUB_CHURN = {
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

export const CHURN_ALERT_NOTIFICATION = {
    title: 'NEW CHURN ALERT GENERATED',
    message: 'Transaction volume decline threshold (-25%) breached.',
    timestamp: '24 July 2026 • 09:14 GMT',
    priority: 'HIGH PRIORITY',
    viewLabel: 'View'
};

export const CHURN_METRIC_TILES = [
    {
        id: 'churn-score',
        label: 'Churn Score',
        badge: 'Attn Req',
        badgeTone: 'danger',
        value: '-31%',
        caption: 'Trend: -2% vs last quarter',
        trend: '-2.1 pts',
        trendTone: 'negative',
        trendDirection: 'down'
    },
    {
        id: 'churn-risk',
        label: 'Churn Risk',
        badge: 'Warning',
        badgeTone: 'danger',
        value: 'Critical',
        valueTone: 'negative',
        caption: 'Was Low last quarter',
        trend: 'Increased from Low',
        trendTone: 'negative',
        trendDirection: 'up'
    },
    {
        id: 'monthly-volume',
        label: 'Monthly Volume',
        badge: 'Good',
        badgeTone: 'positive',
        value: '$2.4M',
        caption: 'Current monthly volume',
        trend: '+12% MoM',
        trendTone: 'positive',
        trendDirection: 'up'
    },
    {
        id: 'approval-rate',
        label: 'Approval Rate',
        badge: 'Stable',
        badgeTone: 'positive',
        value: '94.2%',
        caption: 'Current approval rate',
        trend: '+1.3pp',
        trendTone: 'positive',
        trendDirection: 'up'
    },
    {
        id: 'net-margin',
        label: 'Net Margin',
        badge: 'Compressed',
        badgeTone: 'danger',
        value: '18.4 bps',
        caption: 'Current net margin',
        trend: '-2.1 bps',
        trendTone: 'negative',
        trendDirection: 'down'
    },
    {
        id: 'chargeback-rate',
        label: 'Chargeback Rate',
        badge: 'Healthy',
        badgeTone: 'positive',
        value: '0.31%',
        caption: 'Current chargeback rate',
        trend: 'Below threshold',
        trendTone: 'neutral'
    }
];

export const CHURN_CURRENT_STATUS = {
    statusLabel: 'Current Status:',
    status: 'Actioned',
    triggered: 'Originally triggered: 28 Aug 2026',
    actions: [
        { id: 'resolve', label: 'Mark Resolved', variant: 'text' },
        { id: 'defer', label: 'Defer Signal', variant: 'text' },
        { id: 'dismiss', label: 'Dismiss Signal', variant: 'text' },
        { id: 'escalate', label: 'Escalate to Manager', variant: 'danger' }
    ],
    visibility: 'Visible to: Regional Director, Head of RM'
};
