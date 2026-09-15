import { LightningElement, api } from 'lwc';
import { ACCOUNTS } from 'c/c360MockDataEx05';

const MODES = {
    churn: {
        key: 'churn',
        label: 'Churn focus',
        subtitle: 'Top accounts by predicted change in transaction count',
        sort: (a, b) => a.predictedTxnChangeSort - b.predictedTxnChangeSort,
        leadField: 'predictedTxnChange'
    },
    crosssell: {
        key: 'crosssell',
        label: 'Cross-sell focus',
        subtitle: 'Top accounts by cross-sell opportunity (estimated net benefit)',
        sort: (a, b) => b.topCrossSellNetBenefitSort - a.topCrossSellNetBenefitSort,
        leadField: 'topCrossSellNetBenefit'
    }
};

export default class C360TopAccountsEx05 extends LightningElement {
    @api heroMode = 'churn';

    _internalMode = 'churn';

    connectedCallback() {
        this._internalMode = this.heroMode || 'churn';
    }

    get subtitle() {
        const mode = MODES[this._internalMode] || MODES.churn;
        return mode.subtitle;
    }

    get isChurnMode() {
        return this._internalMode === 'churn';
    }

    get churnActive() {
        return this._internalMode === 'churn';
    }

    get crossSellActive() {
        return this._internalMode === 'crosssell';
    }

    get churnBtnClass() {
        return this._internalMode === 'churn' ? 'active' : '';
    }

    get crossSellBtnClass() {
        return this._internalMode === 'crosssell' ? 'active' : '';
    }

    get rankedCards() {
        const mode = MODES[this._internalMode] || MODES.churn;
        const list = [...ACCOUNTS].sort(mode.sort).slice(0, 3);
        return list.map((account, index) => {
            const txnNegative = account.predictedTxnChangeSort < 0;
            return {
                ...account,
                rank: index + 1,
                metaLine: `${account.industry} · ${account.revenue || account.volume}`,
                txnMetricClass: txnNegative ? 'negative' : 'up',
                churnLeadClass: mode.leadField === 'predictedTxnChange' ? 'model-field lead' : 'model-field',
                crossSellLeadClass: mode.leadField === 'topCrossSellNetBenefit' ? 'model-field lead' : 'model-field',
                healthPillClass: account.healthClass
            };
        });
    }

    handleModeClick(event) {
        const mode = event.currentTarget.dataset.mode;
        if (!mode || mode === this._internalMode) {
            return;
        }
        this._internalMode = mode;
        this.dispatchEvent(new CustomEvent('heromodechange', {
            detail: { heroMode: mode },
            bubbles: true,
            composed: true
        }));
    }

    handleOpenAccount(event) {
        const accountName = event.currentTarget.dataset.account;
        this.dispatchEvent(new CustomEvent('accountopen', {
            detail: { accountName, sourceView: 'overview', shiftKey: event.shiftKey },
            bubbles: true,
            composed: true
        }));
    }
}
