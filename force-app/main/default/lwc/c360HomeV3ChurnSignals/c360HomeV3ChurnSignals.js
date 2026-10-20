import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { HOME_V3 } from 'c/c360MockData';

export default class C360HomeV3ChurnSignals extends LightningElement {
    signals = HOME_V3.signals;

    get cards() {
        return this.signals.cards.map((card) => ({
            ...card,
            severityClass: `pill pill-${card.tone}`,
            stateClass: `pill pill-${card.state.toLowerCase()}`
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
