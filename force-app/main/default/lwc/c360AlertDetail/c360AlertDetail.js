import { LightningElement, api } from 'lwc';
import { ALERT_DETAIL_BY_ID } from 'c/c360MockData';

export default class C360AlertDetail extends LightningElement {
    @api alertId = 'alert-acme';

    get detail() {
        return ALERT_DETAIL_BY_ID[this.alertId] || ALERT_DETAIL_BY_ID['alert-acme'];
    }

    get drivers() {
        return (this.detail.drivers || []).map((driver) => ({
            ...driver,
            widthStyle: `width:${driver.width}`
        }));
    }

    get interactionOptions() {
        return [
            { label: 'Call', value: 'Call' },
            { label: 'Email', value: 'Email' },
            { label: 'Meeting', value: 'Meeting' }
        ];
    }

    get outcomeOptions() {
        return [
            { label: 'Action scheduled', value: 'Action scheduled' },
            { label: 'Deferred', value: 'Deferred' },
            { label: 'Resolved', value: 'Resolved' },
            { label: 'Escalated', value: 'Escalated' }
        ];
    }

    get trajectoryBars() {
        return (this.detail.trajectory || []).map((value, index) => ({
            key: 'bar-' + index,
            style: `height:${Math.max(12, Math.abs(value) * 3 + 20)}%`,
            className: value < 0 ? 'bar negative' : 'bar positive'
        }));
    }

    handleBack() {
        this.dispatchEvent(new CustomEvent('back', { bubbles: true, composed: true }));
    }

    handleAction(event) {
        this.dispatchEvent(new CustomEvent('alertaction', {
            detail: { alertId: this.alertId, action: event.currentTarget.dataset.action },
            bubbles: true,
            composed: true
        }));
    }
}
