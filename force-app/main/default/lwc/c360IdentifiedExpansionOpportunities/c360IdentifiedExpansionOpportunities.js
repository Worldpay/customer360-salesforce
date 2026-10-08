import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { IDENTIFIED_EXPANSION_OPPORTUNITIES } from 'c/c360MockData';

export default class C360IdentifiedExpansionOpportunities extends LightningElement {
    opportunities = IDENTIFIED_EXPANSION_OPPORTUNITIES;

    handleToggle() {
        this.dispatchEvent(
            new CustomEvent('toggleopportunities', {
                bubbles: true,
                composed: true
            })
        );
        this.dispatchEvent(
            new ShowToastEvent({
                title: this.opportunities.title,
                message: 'Preview only',
                variant: 'info'
            })
        );
    }
}
