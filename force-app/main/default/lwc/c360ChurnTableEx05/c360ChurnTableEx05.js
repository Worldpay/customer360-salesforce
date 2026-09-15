import { LightningElement, api } from 'lwc';
import { CHURN_ROWS } from 'c/c360MockDataEx05';

const LOAD_DELAY_MS = 800;

export default class C360ChurnTableEx05 extends LightningElement {
    @api title = 'Accounts by churn risk';
    @api loadDelayMs = LOAD_DELAY_MS;

    isLoading = true;
    tableRows = [];

    connectedCallback() {
        const delay = Number(this.loadDelayMs) || LOAD_DELAY_MS;
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        setTimeout(() => {
            this.tableRows = CHURN_ROWS.map((row) => ({
                ...row,
                riskPillClass: row.riskClass
            }));
            this.isLoading = false;
        }, delay);
    }

    handleOpenAccount(event) {
        const accountName = event.currentTarget.dataset.account;
        this.dispatchEvent(new CustomEvent('accountopen', {
            detail: { accountName, sourceView: 'churn', shiftKey: event.shiftKey },
            bubbles: true,
            composed: true
        }));
    }
}
