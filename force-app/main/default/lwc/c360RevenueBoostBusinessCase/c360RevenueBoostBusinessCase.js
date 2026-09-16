import { LightningElement, api } from 'lwc';
import {
    REVENUE_BOOST_BUSINESS_CASE,
    getRevenueBoostAccount,
    getRevenueBoostCase,
    computeRevenueBoostBusinessCase,
    rbFmtPct
} from 'c/c360MockData';

export default class C360RevenueBoostBusinessCase extends LightningElement {
    @api title = 'Revenue Boost';

    accountKey = 'pets';
    mid = '1';
    pricePerTxn = 0.05;
    tokenUtilisation = 0.45;
    declineCollapsed = false;

    get accountOptions() {
        return REVENUE_BOOST_BUSINESS_CASE.accounts.map((a) => ({
            label: `${a.label} (${a.accountId})`,
            value: a.key
        }));
    }

    get midOptions() {
        const account = getRevenueBoostAccount(this.accountKey);
        if (!account) {
            return [];
        }
        return account.mids.map((m) => ({
            label: m.label,
            value: m.mid
        }));
    }

    get caseData() {
        return getRevenueBoostCase(this.accountKey, this.mid);
    }

    get computed() {
        return computeRevenueBoostBusinessCase(this.caseData, this.pricePerTxn, this.tokenUtilisation);
    }

    get recommendedLabel() {
        const rec = this.caseData?.recommendedTokenUtilisation ?? 0.6;
        return rbFmtPct(rec, 0);
    }

    get utilDiffersFromRecommended() {
        const rec = this.caseData?.recommendedTokenUtilisation ?? 0.6;
        return Math.abs(this.tokenUtilisation - rec) > 0.001;
    }

    get recommendedClass() {
        return this.utilDiffersFromRecommended ? 'rb-recommended warn-user' : 'rb-recommended';
    }

    get summaryRows() {
        const c = this.computed;
        if (!c) {
            return [];
        }
        return [
            { key: 'txn', lbl: '# Tokenised transactions', val: c.tokenisedTransactionsLabel, note: 'Estimated number of transactions to tokenize', tot: false },
            { key: 'rate', lbl: 'Tokenisation rate', val: c.tokenisationRateLabel, note: 'Share of in-scope volume tokenised', tot: false },
            { key: 'tokens', lbl: '# Tokens', val: c.numTokensLabel, note: 'Active tokens in vault', tot: false },
            { key: 'rev', lbl: 'Revenue', val: c.revenueLabel, note: 'In-scope annual processing revenue', tot: false },
            { key: 'trev', lbl: 'Tokenised revenue (est.)', val: c.tokenisedRevenueEstLabel, note: 'Revenue on tokenised transactions', tot: false },
            { key: 'fee', lbl: 'RB fee (est.)', val: c.rbFeeEstLabel, note: 'Annual product fee at current price per txn', tot: false },
            { key: 'net', lbl: 'Net benefit', val: c.netBenefitLabel, note: 'Auth uplift + decline recovery − RB fee', tot: true }
        ].map((row) => ({
            ...row,
            rowClass: row.tot ? 'rb-summary-row tot' : 'rb-summary-row'
        }));
    }

    get auth() {
        return this.computed?.auth || {};
    }

    get declineRows() {
        return this.computed?.declineRows || [];
    }

    get declineGrandTotal() {
        return this.computed?.declineGrandTotal || {};
    }

    get declineToggleLabel() {
        return this.declineCollapsed ? 'Show' : 'Hide';
    }

    get declineBodyClass() {
        return this.declineCollapsed ? 'rb-decline-body hide' : 'rb-decline-body';
    }

    handleAccountChange(event) {
        this.accountKey = event.detail.value;
        const account = getRevenueBoostAccount(this.accountKey);
        this.mid = account?.mids?.[0]?.mid || '1';
        this.applyCaseDefaults();
    }

    handleMidChange(event) {
        this.mid = event.detail.value;
        this.applyCaseDefaults();
    }

    handlePriceChange(event) {
        this.pricePerTxn = parseFloat(event.target.value, 10) || 0;
    }

    handleUtilChange(event) {
        const val = parseFloat(event.target.value, 10) || 0;
        this.tokenUtilisation = Math.min(1, Math.max(0, val));
    }

    handleDeclineToggle() {
        this.declineCollapsed = !this.declineCollapsed;
    }

    applyCaseDefaults() {
        const caseData = this.caseData;
        if (!caseData) {
            return;
        }
        this.pricePerTxn = caseData.defaults.pricePerTxn;
        this.tokenUtilisation = caseData.defaults.tokenUtilisation;
    }
}
