import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { CHURN_ALERTS_V2 } from 'c/c360MockData';

export default class C360ChurnAlertsV2 extends LightningElement {
    page = CHURN_ALERTS_V2;

    get crumbLine() {
        return (this.page.crumbs || []).join(' › ');
    }

    get backLabel() {
        return `‹ ${this.page.backLabel}`;
    }

    get navItems() {
        return (this.page.nav || []).map((item) => ({
            ...item,
            itemClass: item.active ? 'cav-nav-item active' : 'cav-nav-item',
            ariaCurrent: item.active ? 'page' : null,
            isHome: item.id === 'home',
            isAlertCentre: item.id === 'alert-centre',
            isCrossSell: item.id === 'cross-sell',
            isAnalytics: item.id === 'analytics',
            isCustomers: item.id === 'customers',
            isReports: item.id === 'reports',
            isSettings: item.id === 'settings'
        }));
    }

    get actions() {
        return this.page.actions.map((action) => ({
            ...action,
            actionClass: `cav-action ${action.variant}`
        }));
    }

    handleChrome(event) {
        const label = event.currentTarget.dataset.label || event.currentTarget.textContent.trim();
        this.toast(label);
    }

    toast(title) {
        this.dispatchEvent(
            new ShowToastEvent({
                title,
                message: 'Preview only',
                variant: 'info'
            })
        );
    }
}
