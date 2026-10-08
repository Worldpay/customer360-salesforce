import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { ENTERPRISE_ACCOUNT_HUB_CHURN } from 'c/c360MockData';

export default class C360EnterpriseAccountHubChurn extends LightningElement {
    page = ENTERPRISE_ACCOUNT_HUB_CHURN;

    get crumbLine() {
        return (this.page.crumbs || []).join(' › ');
    }

    get backLabel() {
        return `‹ ${this.page.backLabel}`;
    }

    get actions() {
        return this.page.actions.map((action) => ({
            ...action,
            actionClass: `eah-action ${action.variant}`
        }));
    }

    handleChrome(event) {
        this.toast(event.currentTarget.textContent.trim());
    }

    toast(title) {
        this.dispatchEvent(
            new ShowToastEvent({
                title,
                message: 'Preview only',
                variant: 'info'
            })
        );
    }
}
