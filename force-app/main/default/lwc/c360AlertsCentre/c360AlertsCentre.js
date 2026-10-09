import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { ALERTS_CENTRE } from 'c/c360MockData';

export default class C360AlertsCentre extends LightningElement {
    @api accountIds;
    page = ALERTS_CENTRE;

    get crumbLine() {
        return (this.page.crumbs || []).join(' › ');
    }

    get backLabel() {
        return `‹ ${this.page.backLabel}`;
    }

    get rows() {
        const allowed = this.accountIds;
        return (this.page.rows || []).filter((row) => !allowed || !allowed.length || allowed.includes(row.id));
    }

    handleInert(event) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: event.currentTarget.textContent.trim(),
                message: 'Preview only',
                variant: 'info'
            })
        );
    }

    handleBack() {
        this.dispatchEvent(new CustomEvent('navigate', { detail: { view: 'home' } }));
    }

    handleOpen(event) {
        this.dispatchEvent(
            new CustomEvent('navigate', {
                detail: {
                    view: 'churn',
                    accountId: event.currentTarget.dataset.accountId,
                    accountName: event.currentTarget.dataset.accountName
                }
            })
        );
    }
}
