/** Mock DTO for Revenue Boost business case (mirrors prototypes/html/shared/revenue-boost-business-case-data.js). */

export const REVENUE_BOOST_BUSINESS_CASE = {
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
                { reason: '835 — Decline vv2 failure', eligibleCount: 8420, eligibleAmount: 358200, cureRate: 0.12 },
                { reason: '54 — Expired card', eligibleCount: 6210, eligibleAmount: 264500, cureRate: 0.1 },
                { reason: '05 — Do not honour', eligibleCount: 4890, eligibleAmount: 198400, cureRate: 0.08 },
                { reason: '51 — Insufficient funds', eligibleCount: 3100, eligibleAmount: 131200, cureRate: 0.05 }
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
                { reason: '54 — Expired card', eligibleCount: 4200, eligibleAmount: 160400, cureRate: 0.11 },
                { reason: '05 — Do not honour', eligibleCount: 2800, eligibleAmount: 106800, cureRate: 0.07 }
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
                { reason: '05 — Do not honour', eligibleCount: 5100, eligibleAmount: 187800, cureRate: 0.09 },
                { reason: 'N7 — CVV mismatch', eligibleCount: 2200, eligibleAmount: 81200, cureRate: 0.06 }
            ]
        }
    }
};

export function rbFmtMoney(n) {
    return '$' + Math.round(n).toLocaleString();
}

export function rbFmtPct(decimal, digits = 1) {
    return (decimal * 100).toFixed(digits) + '%';
}

export function getRevenueBoostAccount(accountKey) {
    return REVENUE_BOOST_BUSINESS_CASE.accounts.find((a) => a.key === accountKey);
}

export function getRevenueBoostCase(accountKey, mid) {
    return REVENUE_BOOST_BUSINESS_CASE.cases[`${accountKey}|${mid}`] || null;
}

function utilScale(caseData, util) {
    const ref = caseData.defaults?.tokenUtilisation || 0.45;
    return ref > 0 ? util / ref : 1;
}

export function computeRevenueBoostBusinessCase(caseData, pricePerTxn, tokenUtilisation) {
    if (!caseData) {
        return null;
    }
    const base = caseData.base;
    const util = tokenUtilisation;
    const price = pricePerTxn;
    const scale = utilScale(caseData, util);

    const tokenisedTransactions = Math.round(base.inScopeTransactions * util);
    const numTokens = Math.round(base.tokenPool * util);
    const revenue = Math.round(base.annualRevenue * util);
    const tokenisedRevenueEst = Math.round(tokenisedTransactions * base.avgTxnValue);
    const rbFeeEst = Math.round(tokenisedTransactions * price);

    let declineRecovery = 0;
    const declineRows = (caseData.declineRows || []).map((row, index) => {
        const estCount = Math.round(row.eligibleCount * row.cureRate * scale);
        const estAmount = Math.round(row.eligibleAmount * row.cureRate * scale);
        declineRecovery += estAmount;
        return {
            key: `row-${index}`,
            reason: row.reason,
            eligibleCount: row.eligibleCount,
            eligibleCountLabel: row.eligibleCount.toLocaleString(),
            eligibleAmount: row.eligibleAmount,
            eligibleAmountLabel: rbFmtMoney(row.eligibleAmount),
            cureRateLabel: rbFmtPct(row.cureRate, 0),
            estCount,
            estCountLabel: estCount.toLocaleString(),
            estAmount,
            estAmountLabel: rbFmtMoney(estAmount)
        };
    });

    const authUpliftRevenue = Math.round(base.authUpliftRevenue * scale);
    const netBenefit = authUpliftRevenue + declineRecovery - rbFeeEst;

    const totalInScopeAuths = Math.round(base.inScopeAuths * util);
    const approvals = Math.round(totalInScopeAuths * base.baseApprovalRate);
    const upliftCount = Math.round(totalInScopeAuths * base.upliftRatePoints * scale);
    const approvalRate = totalInScopeAuths > 0 ? approvals / totalInScopeAuths : 0;
    const upliftRate = base.upliftRatePoints * scale;

    let totEligibleCount = 0;
    let totEligibleAmount = 0;
    let totRecCount = 0;
    let totRecAmount = 0;
    declineRows.forEach((r) => {
        totEligibleCount += r.eligibleCount;
        totEligibleAmount += r.eligibleAmount;
        totRecCount += r.estCount;
        totRecAmount += r.estAmount;
    });

    return {
        tokenisedTransactions,
        tokenisedTransactionsLabel: tokenisedTransactions.toLocaleString(),
        tokenisationRateLabel: rbFmtPct(util, 1),
        numTokensLabel: numTokens.toLocaleString(),
        revenueLabel: rbFmtMoney(revenue),
        tokenisedRevenueEstLabel: rbFmtMoney(tokenisedRevenueEst),
        rbFeeEstLabel: rbFmtMoney(rbFeeEst),
        netBenefitLabel: rbFmtMoney(netBenefit),
        auth: {
            totalInScopeAuthsLabel: totalInScopeAuths.toLocaleString(),
            approvalsLabel: approvals.toLocaleString(),
            upliftCountLabel: upliftCount.toLocaleString(),
            approvalRateLabel: rbFmtPct(approvalRate, 1),
            upliftRateLabel: rbFmtPct(upliftRate, 2)
        },
        declineRows,
        declineGrandTotal: {
            eligibleCountLabel: totEligibleCount.toLocaleString(),
            eligibleAmountLabel: rbFmtMoney(totEligibleAmount),
            estCountLabel: totRecCount.toLocaleString(),
            estAmountLabel: rbFmtMoney(totRecAmount)
        }
    };
}
