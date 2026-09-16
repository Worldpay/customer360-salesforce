/**
 * Mock DTO for revenue-boost-business-case HTML module (illustrative only).
 * Keys: accountKey|mid
 */
window.REVENUE_BOOST_BUSINESS_CASE = {
  accounts: [
    {
      key: 'pets',
      label: 'Pets at Home',
      accountId: '1001842',
      mids: [
        { mid: '1', label: 'MID 1 — UK eCommerce' },
        { mid: '456', label: 'MID 456 — Stores' }
      ]
    },
    {
      key: 'northwind',
      label: 'Northwind Foods',
      accountId: '1002910',
      mids: [{ mid: '1', label: 'MID 1 — Grocery CNP' }]
    }
  ],
  cases: {
    'pets|1': {
      recommendedTokenUtilisation: 0.6,
      defaults: { pricePerTxn: 0.05, tokenUtilisation: 0.45 },
      base: {
        inScopeTransactions: 88153,
        inScopeAuths: 2145020,
        baseApprovalRate: 0.918,
        upliftRatePoints: 0.0185,
        avgTxnValue: 42.5,
        tokenPool: 88153,
        annualRevenue: 3746500,
        authUpliftRevenue: 268207,
        declineRecoveryBase: 8200
      },
      declineRows: [
        {
          reason: '835 — Decline vv2 failure',
          eligibleCount: 8420,
          eligibleAmount: 358200,
          cureRate: 0.12
        },
        {
          reason: '54 — Expired card',
          eligibleCount: 6210,
          eligibleAmount: 264500,
          cureRate: 0.1
        },
        {
          reason: '05 — Do not honour',
          eligibleCount: 4890,
          eligibleAmount: 198400,
          cureRate: 0.08
        },
        {
          reason: '51 — Insufficient funds',
          eligibleCount: 3100,
          eligibleAmount: 131200,
          cureRate: 0.05
        }
      ]
    },
    'pets|456': {
      recommendedTokenUtilisation: 0.55,
      defaults: { pricePerTxn: 0.04, tokenUtilisation: 0.38 },
      base: {
        inScopeTransactions: 52000,
        inScopeAuths: 1240000,
        baseApprovalRate: 0.905,
        upliftRatePoints: 0.014,
        avgTxnValue: 38.2,
        tokenPool: 52000,
        annualRevenue: 1986400,
        authUpliftRevenue: 198000,
        declineRecoveryBase: 5100
      },
      declineRows: [
        {
          reason: '54 — Expired card',
          eligibleCount: 4200,
          eligibleAmount: 160400,
          cureRate: 0.11
        },
        {
          reason: '05 — Do not honour',
          eligibleCount: 2800,
          eligibleAmount: 106800,
          cureRate: 0.07
        }
      ]
    },
    'northwind|1': {
      recommendedTokenUtilisation: 0.6,
      defaults: { pricePerTxn: 0.05, tokenUtilisation: 0.5 },
      base: {
        inScopeTransactions: 64000,
        inScopeAuths: 1536000,
        baseApprovalRate: 0.924,
        upliftRatePoints: 0.016,
        avgTxnValue: 36.8,
        tokenPool: 64000,
        annualRevenue: 2355200,
        authUpliftRevenue: 265000,
        declineRecoveryBase: 6400
      },
      declineRows: [
        {
          reason: '05 — Do not honour',
          eligibleCount: 5100,
          eligibleAmount: 187800,
          cureRate: 0.09
        },
        {
          reason: 'N7 — CVV mismatch',
          eligibleCount: 2200,
          eligibleAmount: 81200,
          cureRate: 0.06
        }
      ]
    }
  }
};
