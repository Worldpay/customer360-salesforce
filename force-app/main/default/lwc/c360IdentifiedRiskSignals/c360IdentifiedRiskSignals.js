import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { IDENTIFIED_RISK_SIGNALS } from 'c/c360MockData';

export default class C360IdentifiedRiskSignals extends LightningElement {
    signals = IDENTIFIED_RISK_SIGNALS;

    handleToggle() {
        this.dispatchEvent(
            new CustomEvent('togglesignals', {
                bubbles: true,
                composed: true
            })
        );
        this.dispatchEvent(
            new ShowToastEvent({
                title: this.signals.title,
                message: 'Preview only',
                variant: 'info'
            })
        );
    }
}
