import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { ALERTS_V3 } from 'c/c360MockData';

export default class C360AlertsV3AlertTable extends LightningElement {
    page = ALERTS_V3;

    @api query = '';
    @api statusFilter = 'All';

    get columns() {
        return this.page.columns.map((label, index) => ({ key: `${label}-${index}`, label }));
    }

    get rows() {
        const query = (this.query || '').trim().toLowerCase();
        return this.page.rows
            .filter((row) => {
                const text = `${row.name} ${row.id}`.toLowerCase();
                const statusOk = this.statusFilter === 'All' || row.status === this.statusFilter;
                return statusOk && text.includes(query);
            })
            .map((row) => ({
                ...row,
                scoreClass: `score score-${row.scoreTone}`,
                badgeClass: `badge badge-${row.statusTone}`
            }));
    }

    get hasRows() {
        return this.rows.length > 0;
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
