import { LightningElement, api } from 'lwc';
import { NEEDS_ACTION_ITEMS } from 'c/c360MockData';

export default class C360NeedsAction extends LightningElement {
    @api title = 'Needs action today';
    @api subtitle = 'Intraday | Daily | Monthly';
    @api items;

    get displayItems() {
        const source = this.items?.length ? this.items : NEEDS_ACTION_ITEMS;
        return source.map((item) => ({
            ...item,
            severityClass: `severity ${item.severity}`,
            buttonClass: item.primary ? 'button accent' : 'button'
        }));
    }

    handleReview(event) {
        const { account, source } = event.currentTarget.dataset;
        this.dispatchEvent(new CustomEvent('accountopen', {
            detail: {
                accountName: account,
                sourceView: source || 'accounts',
                shiftKey: event.shiftKey
            },
            bubbles: true,
            composed: true
        }));
    }
}
