import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { ALERTS_V3 } from 'c/c360MockData';

export default class C360AlertsV3PageHeader extends LightningElement {
    page = ALERTS_V3;

    get crumbs() {
        return this.page.crumbs.map((label, index) => ({
            label,
            key: label,
            showSeparator: index === 0
        }));
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
