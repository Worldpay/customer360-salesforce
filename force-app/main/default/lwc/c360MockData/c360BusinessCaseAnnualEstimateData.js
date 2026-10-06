/** Mock DTO for Business Case annual estimate (mirrors prototypes/html/shared/business-case-annual-estimate-data.js). */

export const BUSINESS_CASE_ANNUAL_ESTIMATE = {
    title: 'Business Case Summary - Annual Estimate',
    scope: 'Single account · All associated MIDs',
    tokenUtilisation: '72',
    pricePerTransaction: '0.1',
    rows: [
        {
            id: 'annual-txns',
            label: '# Annual Revenue Boost Transactions',
            value: '1,200,000',
            basis: 'Estimated annual numbers of optimized transactions',
            tone: 'default',
            highlight: false
        },
        {
            id: 'auth-uplift',
            label: 'Authorization Value Uplift',
            value: '$250,000',
            basis: 'Reduced declines through using Revenue Boost',
            tone: 'positive',
            highlight: false
        },
        {
            id: 'fee-benefit',
            label: 'Scheme & Interchange Fee Benefit',
            value: '$35,000',
            basis: 'Change in scheme and interchange fees through tokenization',
            tone: 'positive',
            highlight: false
        },
        {
            id: 'merchant-cost',
            label: 'Annual Cost to Merchant',
            value: '-$120,000',
            basis: 'Worldpay total cost',
            tone: 'negative',
            highlight: false
        },
        {
            id: 'net-benefit',
            label: 'Annual Net Benefit',
            value: '$165,000',
            basis: 'Authorisation uplift + fee benefit - cost',
            tone: 'accent',
            highlight: true
        }
    ]
};

export const REVENUE_BOOST_SUMMARY = {
    crumbs: ['Home', 'Customers', 'Acme Corporation', 'Cross-Sell Leads', 'Revenue Boost Opportunity'],
    backLabel: 'Back to Customer',
    accountName: 'Acme Corporation',
    badge: 'Revenue Boost opportunity',
    accountLine: 'Salesforce Account ID: #SF-89210 · Enterprise Segment · Assigned RM: You',
    lastSynced: 'Last Synced: 28 Aug 2026',
    exportLabel: 'Export PDF',
    initiateLabel: 'Initiate Opportunity',
    midLabel: 'MID filter',
    midValue: 'All associated MIDs'
};
