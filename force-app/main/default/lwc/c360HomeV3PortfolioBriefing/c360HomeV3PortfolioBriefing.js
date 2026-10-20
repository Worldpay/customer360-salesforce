import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { HOME_V3 } from 'c/c360MockData';

export default class C360HomeV3PortfolioBriefing extends LightningElement {
    briefing = HOME_V3.briefing;
    churnAlert = HOME_V3.churnAlert;

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
