import { LightningElement, api } from 'lwc';

export default class C360SignalList extends LightningElement {
    @api signals = [];

    get openSignals() {
        return (this.signals || []).filter((signal) => signal.isOpen);
    }

    get noOpenSignals() {
        return this.openSignals.length === 0;
    }

    handleAction(event) {
        this.dispatchEvent(new CustomEvent('signalaction', {
            detail: event.currentTarget.dataset.id,
            bubbles: true,
            composed: true
        }));
    }

    handleDismiss(event) {
        this.dispatchEvent(new CustomEvent('signaldismiss', {
            detail: event.currentTarget.dataset.id,
            bubbles: true,
            composed: true
        }));
    }
}
