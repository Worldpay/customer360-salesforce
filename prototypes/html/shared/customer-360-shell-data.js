/* Customer 360 shell chrome. URL paths are not decided yet.
   Cross-Sell in the sidebar has no AccountId of its own: change crossSellNav. */
window.CUSTOMER_360_SHELL = {
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
