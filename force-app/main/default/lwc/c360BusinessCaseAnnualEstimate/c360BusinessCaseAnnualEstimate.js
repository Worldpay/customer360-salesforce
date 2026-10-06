import { LightningElement, api } from 'lwc';
import { BUSINESS_CASE_ANNUAL_ESTIMATE } from 'c/c360MockData';

export default class C360BusinessCaseAnnualEstimate extends LightningElement {
    title = BUSINESS_CASE_ANNUAL_ESTIMATE.title;
    @api tokenUtilisation = BUSINESS_CASE_ANNUAL_ESTIMATE.tokenUtilisation;
    @api pricePerTransaction = BUSINESS_CASE_ANNUAL_ESTIMATE.pricePerTransaction;

    get scope() {
        return `${BUSINESS_CASE_ANNUAL_ESTIMATE.scope} · ${this.formatUtil(this.tokenUtilisation)} token utilization · ${this.formatPrice(this.pricePerTransaction)} per optimized transaction`;
    }

    get rows() {
        return BUSINESS_CASE_ANNUAL_ESTIMATE.rows.map((row) => ({
            ...row,
            rowClass: `tone-${row.tone || 'default'}${row.highlight ? ' highlight' : ''}`
        }));
    }

    formatUtil(raw) {
        const text = String(raw == null ? '' : raw).replace('%', '').trim();
        return text ? `${text}%` : '';
    }

    formatPrice(raw) {
        const text = String(raw == null ? '' : raw).replace('$', '').trim();
        const amount = parseFloat(text);
        if (Number.isNaN(amount)) {
            return text ? `$${text}` : '';
        }
        return `$${amount.toFixed(2)}`;
    }
}
