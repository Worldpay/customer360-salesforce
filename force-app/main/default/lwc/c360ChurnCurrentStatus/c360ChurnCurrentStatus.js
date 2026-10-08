import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { CHURN_CURRENT_STATUS } from 'c/c360MockData';

export default class C360ChurnCurrentStatus extends LightningElement {
    status = CHURN_CURRENT_STATUS;

    get actions() {
        return this.status.actions.map((action) => ({
            ...action,
            actionClass: action.variant === 'danger' ? 'ccs-action danger' : 'ccs-action text'
        }));
    }

    handleAction(event) {
        const id = event.currentTarget.dataset.id;
        const label = event.currentTarget.textContent;
        this.dispatchEvent(
            new CustomEvent('statusaction', {
                detail: { id },
                bubbles: true,
                composed: true
            })
        );
        this.dispatchEvent(
            new ShowToastEvent({
                title: label,
                message: 'Preview only',
                variant: 'info'
            })
        );
    }
}
