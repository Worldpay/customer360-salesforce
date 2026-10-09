import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import {
    CUSTOMER_360_SHELL,
    HOME_PAGE,
    ALERTS_CENTRE,
    ENTERPRISE_ACCOUNT_HOME,
    REVENUE_BOOST_SUMMARY
} from 'c/c360MockData';

export default class C360Customer360Shell extends LightningElement {
    shell = CUSTOMER_360_SHELL;
    home = HOME_PAGE;
    alerts = ALERTS_CENTRE;
    churnChrome = ENTERPRISE_ACCOUNT_HOME;
    crossSellChrome = REVENUE_BOOST_SUMMARY;
    view = 'home';
    accountId = '';
    accountName = '';

    get homeAccountIds() {
        return (this.home.accounts || []).map((account) => account.id);
    }

    get alertAccountIds() {
        return (this.alerts.rows || []).map((row) => row.id);
    }

    get isHome() {
        return this.view === 'home';
    }

    get isAlerts() {
        return this.view === 'alerts';
    }

    get isChurn() {
        return this.view === 'churn';
    }

    get isCrossSell() {
        return this.view === 'cross-sell';
    }

    get isAnalytics() {
        return this.view === 'analytics';
    }

    get isCustomers() {
        return this.view === 'customers';
    }

    get showChurnInsights() {
        return (this.shell.insightAccounts.churn || []).includes(this.accountId);
    }

    get showCrossSellInsights() {
        return (this.shell.insightAccounts['cross-sell'] || []).includes(this.accountId);
    }

    get selectedName() {
        return this.accountName || this.nameFor(this.accountId);
    }

    get churnCrumbs() {
        return `Home › Customers › ${this.selectedName}`;
    }

    get churnBack() {
        return '‹ Back to Customers';
    }

    get churnMeta() {
        return `Salesforce Account ID: #${this.accountId} • Enterprise Segment • Assigned RM: You`;
    }

    get churnActions() {
        return (this.churnChrome.actions || []).map((action) => ({
            ...action,
            actionClass: `ehome-action ${action.variant}`
        }));
    }

    get crossSellCrumbs() {
        return `Home › Customers › ${this.selectedName} › Cross-Sell Leads › Revenue Boost Opportunity`;
    }

    get crossSellBack() {
        return `‹ ${this.crossSellChrome.backLabel}`;
    }

    get crossSellMeta() {
        return `Salesforce Account ID: #${this.accountId} · Enterprise Segment · Assigned RM: You`;
    }

    get navItems() {
        const active = this.highlightId;
        return (this.shell.nav || []).map((item) => {
            const target = item.view === 'crossSellNav' ? this.shell.crossSellNav : item.view ? { view: item.view } : null;
            return {
                ...item,
                targetView: target ? target.view : '',
                targetAccountId: target && target.accountId ? target.accountId : '',
                itemClass: item.id === active ? 'hub-nav-item active' : 'hub-nav-item',
                ariaCurrent: item.id === active ? 'page' : null,
                isHome: item.id === 'home',
                isAlertCentre: item.id === 'alert-centre',
                isCrossSell: item.id === 'cross-sell',
                isAnalytics: item.id === 'analytics',
                isCustomers: item.id === 'customers',
                isReports: item.id === 'reports',
                isSettings: item.id === 'settings'
            };
        });
    }

    get highlightId() {
        if (this.view === 'churn' || this.view === 'cross-sell') return 'customers';
        if (this.view === 'alerts') return 'alert-centre';
        if (this.view === 'analytics') return 'analytics';
        if (this.view === 'customers') return 'customers';
        return 'home';
    }

    nameFor(id) {
        const lists = [...(this.home.accounts || []), ...(this.home.signals || []), ...(this.home.leads || []), ...(this.alerts.rows || [])];
        const found = lists.find((row) => row.id === id);
        return found ? found.name : 'Account';
    }

    handleNav(event) {
        const view = event.currentTarget.dataset.view;
        if (!view) {
            this.toast(event.currentTarget.textContent.trim());
            return;
        }
        this.open(view, event.currentTarget.dataset.accountId, '');
    }

    handleNavigate(event) {
        this.open(event.detail.view, event.detail.accountId, event.detail.accountName);
    }

    handleHome() {
        this.view = 'home';
    }

    handleChrome(event) {
        this.toast(event.currentTarget.dataset.label || event.currentTarget.textContent.trim());
    }

    open(view, accountId, accountName) {
        this.view = view;
        if (accountId) {
            this.accountId = accountId;
            this.accountName = accountName || this.nameFor(accountId);
        }
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
