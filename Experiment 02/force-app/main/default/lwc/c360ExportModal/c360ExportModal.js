import { LightningElement, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const DEFAULT_OPTIONS = [
    { id: 'o1', label: 'Account overview', desc: 'Health, volume trend, key facts', checked: true },
    { id: 'o2', label: 'Churn risk summary', desc: 'Risk level and top drivers (plain-language)', checked: true },
    { id: 'o3', label: 'Cross-sell business case', desc: 'Revenue Boost opportunity and rationale', checked: true },
    { id: 'o4', label: 'ROI calculation', desc: 'Estimated uplift and assumptions', checked: false }
];

export default class C360ExportModal extends LightningElement {
    @api accountName = 'Pets at Home';
    @track options = DEFAULT_OPTIONS.map((option) => ({ ...option }));

    handleClose() {
        this.dispatchEvent(new CustomEvent('close'));
    }

    handleBackdropClick(event) {
        if (event.target.classList.contains('mask')) {
            this.handleClose();
        }
    }

    handleCheckboxChange(event) {
        const id = event.target.dataset.id;
        this.options = this.options.map((option) =>
            option.id === id ? { ...option, checked: event.target.checked } : option
        );
    }

    handleGenerate() {
        this.dispatchEvent(new ShowToastEvent({
            title: 'Export (preview)',
            message: 'Generating Global Payments-branded deck for ' + this.accountName + '…',
            variant: 'info',
            mode: 'sticky'
        }));
        this.dispatchEvent(new CustomEvent('export', { detail: { accountName: this.accountName } }));
        this.handleClose();
    }
}
