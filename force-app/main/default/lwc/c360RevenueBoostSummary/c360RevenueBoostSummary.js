import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { BUSINESS_CASE_ANNUAL_ESTIMATE, REVENUE_BOOST_SUMMARY } from 'c/c360MockData';

export default class C360RevenueBoostSummary extends LightningElement {
    page = REVENUE_BOOST_SUMMARY;
    tokenUtilisation = BUSINESS_CASE_ANNUAL_ESTIMATE.tokenUtilisation;
    pricePerTransaction = BUSINESS_CASE_ANNUAL_ESTIMATE.pricePerTransaction;

    get crumbLine() {
        return (this.page.crumbs || []).join(' › ');
    }

    get backLabel() {
        return `‹ ${this.page.backLabel}`;
    }

    handleApplyAssumptions(event) {
        this.tokenUtilisation = event.detail.tokenUtilisation;
        this.pricePerTransaction = event.detail.pricePerTransaction;
    }

    handleChrome(event) {
        const label = event.currentTarget.textContent.trim();
        this.dispatchEvent(
            new ShowToastEvent({
                title: label,
                message: 'Preview only',
                variant: 'info'
            })
        );
    }
}
