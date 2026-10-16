import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { HOME_V2 } from 'c/c360MockData';

export default class C360HomeV2Intelligence extends LightningElement {
    page = HOME_V2.intelligence;
    dismissed = false;

    get body() {
        return this.page.bodyTemplate
            .replace('{accountName}', this.page.accountName)
            .replace('{closeProbabilityDeltaPct}', this.page.closeProbabilityDeltaPct);
    }

    handleDismiss() {
        this.dismissed = true;
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
