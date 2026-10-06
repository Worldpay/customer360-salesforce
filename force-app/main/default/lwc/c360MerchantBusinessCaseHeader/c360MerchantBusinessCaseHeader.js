import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { MERCHANT_BUSINESS_CASE_HEADER } from 'c/c360MockData';

const ACTION_EVENT = {
    share: 'sharewithmerchant',
    'add-to-opportunity': 'addtoopportunity'
};

export default class C360MerchantBusinessCaseHeader extends LightningElement {
    @api title;
    @api metrics;
    @api actions;
    assumptions = MERCHANT_BUSINESS_CASE_HEADER.assumptions;

    get displayTitle() {
        return this.title || MERCHANT_BUSINESS_CASE_HEADER.title;
    }

    get displayActions() {
        const source = Array.isArray(this.actions) ? this.actions : MERCHANT_BUSINESS_CASE_HEADER.actions;
        return source.map((action) => {
            const variant = action.variant === 'primary' ? 'primary' : 'text';
            return {
                ...action,
                actionClass: variant === 'primary' ? 'mbc-action primary' : 'mbc-action text'
            };
        });
    }

    get displayMetrics() {
        const source = Array.isArray(this.metrics) ? this.metrics : MERCHANT_BUSINESS_CASE_HEADER.metrics;
        return source.map((metric) => {
            const tone = metric.tone || 'default';
            const classes = ['mbc-metric', `tone-${tone}`];
            if (metric.emphasized) {
                classes.push('emphasized');
            }
            return {
                ...metric,
                metricClass: classes.join(' '),
                showInfo: Boolean(metric.info)
            };
        });
    }

    handleAction(event) {
        const id = event.currentTarget.dataset.id;
        const name = ACTION_EVENT[id];
        const label = event.currentTarget.textContent;
        if (name) {
            this.dispatchEvent(new CustomEvent(name, { detail: { id }, bubbles: true, composed: true }));
        }
        this.dispatchEvent(
            new ShowToastEvent({
                title: label,
                message: 'Preview only',
                variant: 'info'
            })
        );
    }

    handleApply() {
        const util = this.template.querySelector('[data-field="token-utilisation"]').value;
        const price = this.template.querySelector('[data-field="price-per-transaction"]').value;
        this.dispatchEvent(
            new CustomEvent('applyassumptions', {
                detail: { tokenUtilisation: util, pricePerTransaction: price },
                bubbles: true,
                composed: true
            })
        );
        this.dispatchEvent(
            new ShowToastEvent({
                title: this.assumptions.applyLabel,
                message: 'Preview only',
                variant: 'info'
            })
        );
    }

    handleInfo(event) {
        const id = event.currentTarget.dataset.id;
        const metric = this.displayMetrics.find((item) => item.id === id);
        if (!metric) {
            return;
        }
        this.dispatchEvent(
            new ShowToastEvent({
                title: metric.label,
                message: metric.caption,
                variant: 'info'
            })
        );
    }
}
