import { LightningElement, api, wire } from 'lwc';
import getCrossSellAccounts from '@salesforce/apex/C360CrossSellController.getCrossSellAccounts';

export default class C360CrossSellTableEx05 extends LightningElement {
    @api title = 'Open cross-sell opportunities';
    @api subtitle = 'Across your portfolio';

    rows = [];
    error;
    wiredResult;

    @wire(getCrossSellAccounts)
    wiredAccounts(result) {
        this.wiredResult = result;
        const { data, error } = result;
        if (data) {
            this.rows = data.map((row) => ({
                ...row,
                propensityPillClass: row.propensityClass
            }));
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.rows = [];
            console.error('Error loading cross-sell data', error);
        }
    }

    get isLoading() {
        return !this.wiredResult?.data && !this.wiredResult?.error;
    }

    handleOpenAccount(event) {
        const accountName = event.currentTarget.dataset.account;
        this.dispatchEvent(new CustomEvent('accountopen', {
            detail: { accountName, sourceView: 'crosssell', shiftKey: event.shiftKey },
            bubbles: true,
            composed: true
        }));
    }
}
