import { LightningElement, api } from 'lwc';

export default class C360SignalListEx05 extends LightningElement {
    @api signals = [];

    get displaySignals() {
        return (this.signals || []).map((signal) => {
            const done = signal.signalStatus !== 'open';
            const statusLabel = signal.signalStatus === 'actioned'
                ? 'Actioned'
                : (signal.signalStatus === 'dismissed' ? 'Dismissed' : '');
            return {
                ...signal,
                done,
                statusLabel,
                rowClass: done ? 'signal-row done' : 'signal-row'
            };
        });
    }

    get noSignals() {
        return !this.signals || this.signals.length === 0;
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
