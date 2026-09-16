import { LightningElement, api } from 'lwc';
import { SIGNALS } from 'c/c360MockData';

export default class C360MySignals extends LightningElement {
    @api title = 'My signals';
    signals = SIGNALS.map((signal) => ({ ...signal }));

    get openSignalCount() {
        return this.signals.filter((signal) => signal.signalStatus === 'open').length;
    }

    get openCountLabel() {
        return `${this.openSignalCount} open`;
    }

    handleSignalAction(event) {
        this.updateSignal(event.detail, 'actioned');
        this.showToast('Signal actioned — row marked as complete.');
    }

    handleSignalDismiss(event) {
        this.updateSignal(event.detail, 'dismissed');
        this.showToast('Signal dismissed — row greyed out.');
    }

    updateSignal(signalId, status) {
        this.signals = this.signals.map((signal) => (
            signal.id === signalId ? { ...signal, signalStatus: status } : signal
        ));
    }

    showToast(message) {
        this.dispatchEvent(new CustomEvent('showtoast', {
            detail: { message },
            bubbles: true,
            composed: true
        }));
    }
}
