import { LightningElement, api } from 'lwc';
import {
    getAccountDetail,
    fmtMoney,
    BASE_PRICE_PER_TXN,
    DECLINE_CHART_COLORS,
    getAccountInitials,
    CHURN_SCORE_LABEL
} from 'c/c360MockData';

const TABS = [
    { key: 'ch', label: 'Churn risk', icon: '\u2193' },
    { key: 'cx', label: 'Cross-sell', icon: '+' }
];

const DRILL_PREVIEW_COUNT = 5;

function sourceToTab(source) {
    if (source === 'crosssell') return 'cx';
    return 'ch';
}

export default class C360AccountDetail extends LightningElement {
    _account;
    _sourceView = 'accounts';

    activeTab = 'ch';
    crossSellPrice = BASE_PRICE_PER_TXN;
    crossSellAbSplit = 99;
    selectedDriverKey = null;
    showDrillPanel = false;
    showAllDrillRows = false;

    @api
    get account() {
        return this._account;
    }
    set account(value) {
        this._account = value;
        this.closeDrill();
    }

    @api
    get sourceView() {
        return this._sourceView;
    }
    set sourceView(value) {
        this._sourceView = value || 'accounts';
        this.activeTab = sourceToTab(this._sourceView);
    }

    get detail() {
        return getAccountDetail(this.account?.name);
    }

    get crossSell() {
        return this.detail?.crossSell || {};
    }

    get summary() {
        return this.crossSell.summary || {};
    }

    get accountInitials() {
        return getAccountInitials(this.account?.name);
    }

    get healthPillClass() {
        return this.account?.healthClass || 'watch';
    }

    get churnScoreLabel() {
        return CHURN_SCORE_LABEL;
    }

    get metaLine() {
        const d = this.detail;
        const a = this.account;
        return `Enterprise | ${a?.industry || ''} | RM: Sarah Jenkins | Account ID: ${d.accountId} | ${d.merchantCount} MIDs | Market: ${d.market}`;
    }

    get tabs() {
        return TABS.map((tab) => ({
            ...tab,
            className: 'side-tab' + (this.activeTab === tab.key ? ' active' : '')
        }));
    }

    get isChurn() { return this.activeTab === 'ch'; }
    get isCrossSell() { return this.activeTab === 'cx'; }

    get churnMetrics() {
        const d = this.detail;
        return [
            {
                key: 'score',
                value: d.churnScorePct,
                label: CHURN_SCORE_LABEL,
                neg: true
            },
            {
                key: 't3',
                value: d.txnTrend3m,
                label: 'Transaction trend (3 months)',
                neg: String(d.txnTrend3m || '').startsWith('-')
            },
            {
                key: 't6',
                value: d.txnTrend6m,
                label: 'Transaction trend (6 months)',
                neg: String(d.txnTrend6m || '').startsWith('-')
            }
        ];
    }

    get allChurnDriverRows() {
        const d = this.detail;
        const selected = this.selectedDriverKey;
        const rows = [];
        (d.negativeDrivers || []).forEach((driver, index) => {
            rows.push({
                key: 'neg-' + index,
                tagClass: 'tag-neg',
                tagLabel: 'Negative Driver ' + (index + 1),
                name: driver.name,
                value: driver.value,
                rowClass: driver.name === selected ? 'driver-row-selected' : ''
            });
        });
        (d.positiveDrivers || []).forEach((driver, index) => {
            rows.push({
                key: 'pos-' + index,
                tagClass: 'tag-pos',
                tagLabel: 'Positive Driver ' + (index + 1),
                name: driver.name,
                value: driver.value,
                rowClass: driver.name === selected ? 'driver-row-selected' : ''
            });
        });
        return rows;
    }

    get churnDriverRows() {
        return this.allChurnDriverRows;
    }

    get drillTitle() {
        return 'Driver detail — ' + (this.selectedDriverKey || '');
    }

    get allDrillRows() {
        if (!this.selectedDriverKey) {
            return [];
        }
        const rows = this.detail.driverDrilldown?.[this.selectedDriverKey] || [];
        return rows.map((row, index) => ({ ...row, key: 'drill-' + index }));
    }

    get displayDrillRows() {
        const all = this.allDrillRows;
        if (this.showAllDrillRows || all.length <= DRILL_PREVIEW_COUNT) {
            return all;
        }
        return all.slice(0, DRILL_PREVIEW_COUNT);
    }

    get showDrillExpand() {
        return this.allDrillRows.length > DRILL_PREVIEW_COUNT && !this.showAllDrillRows;
    }

    get showDrillCollapse() {
        return this.allDrillRows.length > DRILL_PREVIEW_COUNT && this.showAllDrillRows;
    }

    get drillExpandLabel() {
        return `Show all ${this.allDrillRows.length} results`;
    }

    get hasDrillRows() {
        return this.allDrillRows.length > 0;
    }

    get priceLabel() {
        return this.crossSellPrice.toFixed(2);
    }

    get abLabel() {
        return this.crossSellAbSplit + '%';
    }

    get peerSegmentLabel() {
        return 'vs peer group (' + (this.crossSell.peerSegmentId || '') + ')';
    }

    get roiRows() {
        const s = this.summary;
        const price = this.crossSellPrice;
        const ab = this.crossSellAbSplit / 100;
        const recoverableUplift = Math.round(s.grossUplift * ab);
        const productCost = Math.round((s.inScopeTransactions || 0) * price * ab);
        const schemeBenefit = Math.round((this.crossSell.schemeInterchangeBenefit || 0) * ab);
        const netBenefit = recoverableUplift + schemeBenefit - productCost;

        return {
            inScopeTransactions: (s.inScopeTransactions || 0).toLocaleString(),
            price: price.toFixed(2),
            abSplit: this.crossSellAbSplit + '%',
            grossUplift: '+' + fmtMoney(recoverableUplift),
            productCost: fmtMoney(productCost),
            schemeBenefit: '+' + fmtMoney(schemeBenefit),
            netBenefit: fmtMoney(netBenefit),
            declineCodeList: s.declineCodeList || ''
        };
    }

    get crossSellKpis() {
        const s = this.summary;
        return [
            { key: 'mar', label: 'Merchant approval rate', value: s.merchantApprovalRate, valueClass: 'kv' },
            { key: 'par', label: 'Peer approval rate', value: s.peerApprovalRate, valueClass: 'kv' },
            { key: 'vs', label: 'Merchant vs peer group', value: s.merchantVsPeer, valueClass: 'kv down', last: true }
        ];
    }

    get declineAxisSteps() {
        const codes = this.crossSell.declineCodes || [];
        const totalCount = codes.reduce((sum, d) => sum + (d.countNum || 0), 0);
        const steps = [totalCount, Math.round(totalCount * 0.66), Math.round(totalCount * 0.33), 0];
        return steps.map((value, index) => ({
            key: 'axis-' + index,
            label: value >= 1000 ? Math.round(value / 1000) + 'k' : String(value)
        }));
    }

    get declineSegments() {
        const codes = this.crossSell.declineCodes || [];
        const totalCount = codes.reduce((sum, d) => sum + (d.countNum || 0), 0);
        const stackHeight = 224;
        return codes.map((code, index) => {
            const height = totalCount ? Math.max(32, (code.countNum / totalCount) * stackHeight) : 32;
            const color = code.color || DECLINE_CHART_COLORS[index % DECLINE_CHART_COLORS.length];
            return {
                key: code.code,
                style: `height:${height}px;background:${color}`,
                count: code.count,
                volume: code.volume
            };
        });
    }

    get hasDeclineData() {
        return (this.crossSell.declineCodes || []).length > 0;
    }

    get declineMetrics() {
        const s = this.summary;
        return [
            { key: 'val', label: 'Value of declines', value: s.valueOfDeclines || '—' },
            { key: 'cnt', label: 'Count of declines', value: s.countDeclines || '—' },
            { key: 'mr', label: '% merchant recoverable declines', value: s.recoverableSplitMerchant || '—' },
            { key: 'pr', label: '% peer recoverable declines', value: s.recoverableSplitPeer || '—', last: true }
        ];
    }

    get declineLegend() {
        const codes = this.crossSell.declineCodes || [];
        return codes.map((code, index) => {
            const color = code.color || DECLINE_CHART_COLORS[index % DECLINE_CHART_COLORS.length];
            const curable = code.curable === 'Y' ? ' · RB curable (' + code.curePct + ')' : '';
            return {
                key: code.code,
                swatchStyle: `background:${color}`,
                label: code.code + ' ' + code.name + ' — ' + code.count + ' · ' + code.volume + curable
            };
        });
    }

    handleTabClick(event) {
        this.activeTab = event.currentTarget.dataset.tab;
        this.dispatchEvent(new CustomEvent('accountsubtab', {
            detail: { tab: this.activeTab },
            bubbles: true,
            composed: true
        }));
    }

    handleBack() {
        this.dispatchEvent(new CustomEvent('navigate', {
            detail: { view: 'overview' },
            bubbles: true,
            composed: true
        }));
    }

    handleExport() {
        this.dispatchEvent(new CustomEvent('export', { bubbles: true, composed: true }));
    }

    handleDriverClick(event) {
        this.selectedDriverKey = event.currentTarget.dataset.driver;
        this.activeTab = 'ch';
        this.showAllDrillRows = false;
        this.showDrillPanel = true;
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        requestAnimationFrame(() => {
            const panel = this.template.querySelector('.driver-drill-panel');
            panel?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    handleCloseDrill() {
        this.closeDrill();
    }

    closeDrill() {
        this.selectedDriverKey = null;
        this.showDrillPanel = false;
        this.showAllDrillRows = false;
    }

    handlePriceChange(event) {
        this.crossSellPrice = parseFloat(event.target.value, 10);
    }

    handleAbChange(event) {
        this.crossSellAbSplit = parseInt(event.target.value, 10);
    }

    handleShowAllDrillRows() {
        this.showAllDrillRows = true;
    }

    handleShowPreviewDrillRows() {
        this.showAllDrillRows = false;
    }
}
