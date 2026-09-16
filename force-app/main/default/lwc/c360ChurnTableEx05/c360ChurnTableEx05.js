import { LightningElement, api } from 'lwc';
import { CHURN_ROWS } from 'c/c360MockDataEx05';

const LOAD_DELAY_MS = 800;
const PREVIEW_ROW_COUNT = 5;

export default class C360ChurnTableEx05 extends LightningElement {
    @api title = 'Accounts by churn risk';
    @api loadDelayMs = LOAD_DELAY_MS;

    isLoading = true;
    allTableRows = [];
    showAllRows = false;

    connectedCallback() {
        const delay = Number(this.loadDelayMs) || LOAD_DELAY_MS;
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        setTimeout(() => {
            this.allTableRows = CHURN_ROWS.map((row) => ({
                ...row,
                riskPillClass: row.riskClass
            }));
            this.isLoading = false;
        }, delay);
    }

    get tableRows() {
        if (this.showAllRows || this.allTableRows.length <= PREVIEW_ROW_COUNT) {
            return this.allTableRows;
        }
        return this.allTableRows.slice(0, PREVIEW_ROW_COUNT);
    }

    get showTableExpand() {
        return this.allTableRows.length > PREVIEW_ROW_COUNT && !this.showAllRows;
    }

    get showTableCollapse() {
        return this.allTableRows.length > PREVIEW_ROW_COUNT && this.showAllRows;
    }

    get expandButtonLabel() {
        return `Show all ${this.allTableRows.length} results`;
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
            detail: { accountName, sourceView: 'churn', shiftKey: event.shiftKey },
            bubbles: true,
            composed: true
        }));
    }
}
