/** Mock DTO for Merchant Business Case header (mirrors prototypes/html/shared/merchant-business-case-header-data.js). */

export const MERCHANT_BUSINESS_CASE_HEADER = {
    title: 'Merchant Business Case',
    actions: [
        { id: 'share', label: 'Share with merchant', variant: 'text' },
        { id: 'add-to-opportunity', label: 'Add to opportunity', variant: 'primary' }
    ],
    metrics: [
        {
            id: 'merchant-roi',
            label: 'Merchant ROI',
            value: '$165K',
            caption: 'Net annual merchant return · Illustrative demo',
            tone: 'default',
            emphasized: true
        },
        {
            id: 'estimated-acv',
            label: 'Estimated ACV',
            value: '$120K',
            caption: 'Annual contract value · Illustrative',
            tone: 'positive',
            emphasized: true,
            info: true
        },
        {
            id: 'tokenised-txns',
            label: 'Estimated no. of Tokenised Transactions',
            value: '1.2M',
            caption: 'Out of 120M Total Transactions',
            tone: 'positive',
            emphasized: true
        },
        {
            id: 'auth-rate',
            label: 'Optimized Authorization Rate',
            value: '+3.2 pp',
            caption: 'Across 4 associated MIDs',
            tone: 'accent',
            emphasized: true
        }
    ],
    assumptions: {
        tokenUtilisationLabel: 'Token Utilization Rate',
        recommendedLabel: 'Recommended: 69%',
        tokenUtilisation: '72',
        priceLabel: 'Price Per Transaction',
        pricePerTransaction: '0.1',
        currencySymbol: '$',
        applyLabel: 'Apply Assumptions'
    }
};
