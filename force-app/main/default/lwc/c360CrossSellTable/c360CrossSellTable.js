import { LightningElement, api, wire } from 'lwc';
import getCrossSellAccounts from '@salesforce/apex/C360CrossSellController.getCrossSellAccounts';

const PREVIEW_ROW_COUNT = 5;

export default class C360CrossSellTable extends LightningElement {
    @api title = 'Open cross-sell opportunities';
    @api subtitle = 'Across your portfolio';

    allRows = [];
    showAllRows = false;
    error;
    wiredResult;

    @wire(getCrossSellAccounts)
    wiredAccounts(result) {
        this.wiredResult = result;
        const { data, error } = result;
        if (data) {
            this.allRows = data.map((row) => ({
                ...row,
                propensityPillClass: row.propensityClass
            }));
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.allRows = [];
            console.error('Error loading cross-sell data', error);
        }
    }

    get isLoading() {
        return !this.wiredResult?.data && !this.wiredResult?.error;
    }

    get rows() {
        if (this.showAllRows || this.allRows.length <= PREVIEW_ROW_COUNT) {
            return this.allRows;
        }
        return this.allRows.slice(0, PREVIEW_ROW_COUNT);
    }

    get showTableExpand() {
        return this.allRows.length > PREVIEW_ROW_COUNT && !this.showAllRows;
    }

    get showTableCollapse() {
        return this.allRows.length > PREVIEW_ROW_COUNT && this.showAllRows;
    }

    get expandButtonLabel() {
        return `Show all ${this.allRows.length} results`;
    }

    handleShowAllRows() {
        this.showAllRows = true;
    }

    handleShowPreviewRows() {
        this.showAllRows = false;
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
