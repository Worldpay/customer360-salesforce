import { LightningElement, api } from 'lwc';
import { ALERTS, ALERT_INTEL } from 'c/c360MockDataEx05';

const LOAD_DELAY_MS = 800;
const PREVIEW_ROW_COUNT = 5;

export default class C360AlertCentreEx05 extends LightningElement {
    @api alerts = ALERTS;
    @api statusFilter = 'All';
    @api loadDelayMs = LOAD_DELAY_MS;

    isLoading = true;
    showAllRows = false;

    connectedCallback() {
        const delay = Number(this.loadDelayMs) || LOAD_DELAY_MS;
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        setTimeout(() => {
            this.isLoading = false;
        }, delay);
    }

    get filteredAlerts() {
        if (this.statusFilter === 'All') {
            return this.alerts;
        }
        return this.alerts.filter((alert) => alert.status === this.statusFilter);
    }

    get tableAlerts() {
        const all = this.filteredAlerts.map((alert) => ({
            ...alert,
            threshold: '-25',
            rmTask: alert.rmNotification || '—'
        }));
        if (this.showAllRows || all.length <= PREVIEW_ROW_COUNT) {
            return all;
        }
        return all.slice(0, PREVIEW_ROW_COUNT);
    }

    get showTableExpand() {
        return this.filteredAlerts.length > PREVIEW_ROW_COUNT && !this.showAllRows;
    }

    get showTableCollapse() {
        return this.filteredAlerts.length > PREVIEW_ROW_COUNT && this.showAllRows;
    }

    get expandButtonLabel() {
        return `Show all ${this.filteredAlerts.length} results`;
    }

    handleShowAllRows() {
        this.showAllRows = true;
    }

    handleShowPreviewRows() {
        this.showAllRows = false;
    }

    get filteredAlertCount() {
        return this.filteredAlerts.length;
    }

    get alertCountLabel() {
        return `${this.filteredAlertCount} shown`;
    }

    get statusOptions() {
        const statuses = ['All', ...new Set(this.alerts.map((alert) => alert.status))];
        return statuses.map((status) => ({
            value: status,
            className: status === this.statusFilter ? 'filter active' : 'filter'
        }));
    }

    get intelRows() {
        const rows = [];
        this.filteredAlerts.forEach((alert) => {
            const intel = ALERT_INTEL[alert.account];
            if (!intel) return;
            rows.push({
                key: alert.id,
                label: `${intel.product} — ${alert.account} (${intel.confidence}%)`
            });
        });
        if (!rows.length) {
            rows.push({ key: 'empty', label: 'No cross-sell intelligence for current filter.' });
        }
        return rows;
    }

    get intelPipelineLabel() {
        let total = 0;
        this.filteredAlerts.forEach((alert) => {
            const intel = ALERT_INTEL[alert.account];
            if (!intel?.pipeline) return;
            const match = intel.pipeline.match(/([\d.]+)\s*([mk])/i);
            if (!match) return;
            const value = parseFloat(match[1]);
            total += match[2].toLowerCase() === 'm' ? value : value / 1000;
        });
        if (!total) return '—';
        const scope = this.statusFilter === 'All'
            ? 'across filtered alerts'
            : `for ${this.statusFilter.toLowerCase()} alerts`;
        return `GBP ${total.toFixed(1)}m ${scope}`;
    }

    get intelAverageConfidence() {
        const values = this.filteredAlerts
            .map((alert) => ALERT_INTEL[alert.account]?.confidence)
            .filter((value) => value != null);
        if (!values.length) return '—';
        const avg = Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
        return `${avg}%`;
    }

    handleFilter(event) {
        this.statusFilter = event.currentTarget.dataset.status;
        this.showAllRows = false;
    }

    handleOpenAlert(event) {
        this.dispatchEvent(new CustomEvent('alertselect', {
            detail: event.currentTarget.dataset.id,
            bubbles: true,
            composed: true
        }));
    }
}
