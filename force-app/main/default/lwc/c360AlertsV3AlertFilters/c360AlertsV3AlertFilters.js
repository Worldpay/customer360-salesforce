import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { ALERTS_V3 } from 'c/c360MockData';

export default class C360AlertsV3AlertFilters extends LightningElement {
    page = ALERTS_V3;
    query = '';
    status = 'All';

    get statusOptions() {
        return this.page.statuses.map((status) => ({
            value: status,
            label: status === 'All' ? this.page.statusLabel : `Status: ${status}`
        }));
    }

    handleQuery(event) {
        this.query = event.target.value;
        this.emit();
    }

    handleStatus(event) {
        this.status = event.target.value;
        this.emit();
    }

    emit() {
        this.dispatchEvent(
            new CustomEvent('filter', {
                detail: { query: this.query, status: this.status },
                bubbles: true,
                composed: true
            })
        );
    }

    handleChrome(event) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: event.currentTarget.dataset.label,
                message: 'Preview only',
                variant: 'info'
            })
        );
    }
}
