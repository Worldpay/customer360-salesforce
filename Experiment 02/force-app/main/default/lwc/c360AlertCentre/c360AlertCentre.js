import { LightningElement, api } from 'lwc';
import { ALERTS } from 'c/c360MockData';

export default class C360AlertCentre extends LightningElement {
    @api alerts = ALERTS;
    @api statusFilter = 'All';

    get filteredAlerts() {
        if (this.statusFilter === 'All') {
            return this.alerts;
        }
        return this.alerts.filter((alert) => alert.status === this.statusFilter);
    }

    get statusOptions() {
        const statuses = ['All', ...new Set(this.alerts.map((alert) => alert.status))];
        return statuses.map((status) => ({
            value: status,
            className: status === this.statusFilter ? 'filter active' : 'filter'
        }));
    }

    handleFilter(event) {
        this.statusFilter = event.currentTarget.dataset.status;
    }

    handleOpenAlert(event) {
        this.dispatchEvent(new CustomEvent('alertselect', {
            detail: event.currentTarget.dataset.id,
            bubbles: true,
            composed: true
        }));
    }

    severityClass(severity) {
        const key = (severity || '').toLowerCase();
        return `severity ${key}`;
    }
}
