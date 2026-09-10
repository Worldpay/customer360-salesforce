import { LightningElement, api } from 'lwc';
import { CHURN_ROWS } from 'c/c360MockDataEx05';

export default class C360ChurnTableEx05 extends LightningElement {
    @api title = 'Accounts by churn risk';

    get rows() {
        return CHURN_ROWS.map((row) => ({
            ...row,
            riskPillClass: row.riskClass
        }));
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
