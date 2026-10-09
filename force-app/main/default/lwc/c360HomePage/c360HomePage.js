import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { HOME_PAGE } from 'c/c360MockData';

export default class C360HomePage extends LightningElement {
    @api accountIds;
    page = HOME_PAGE;
    filter = 'all';

    get filters() {
        return (this.page.filters || []).map((item) => ({
            ...item,
            filterClass: item.id === this.filter ? 'home-filter is-selected' : 'home-filter'
        }));
    }

    get accounts() {
        const allowed = this.accountIds;
        return (this.page.accounts || [])
            .filter((account) => !allowed || !allowed.length || allowed.includes(account.id))
            .filter((account) => this.filter === 'all' || this.riskKey(account.risk) === this.filter)
            .map((account) => ({
                ...account,
                riskClass: `home-risk is-${this.riskKey(account.risk)}`,
                deltaClass: `is-${account.deltaDir}`,
                actionButtons: (account.actions || []).map((label) => ({
                    key: `${account.id}-${label}`,
                    label
                }))
            }));
    }

    get signals() {
        return (this.page.signals || []).map((signal) => ({
            ...signal,
            levelClass: `is-${this.riskKey(signal.level)}`,
            view: signal.opens || ''
        }));
    }

    get leads() {
        return (this.page.leads || []).map((lead) => ({
            ...lead,
            view: lead.opens || ''
        }));
    }

    riskKey(value) {
        return String(value || '')
            .toLowerCase()
            .replace(/\s+/g, '-');
    }

    handleFilter(event) {
        this.filter = event.currentTarget.dataset.filter;
    }

    handleInert(event) {
        event.stopPropagation();
        this.toast(event.currentTarget.textContent.trim());
    }

    handleGo(event) {
        event.stopPropagation();
        const view = event.currentTarget.dataset.view;
        if (!view) {
            if (event.currentTarget.tagName === 'BUTTON') this.toast(event.currentTarget.textContent.trim());
            return;
        }
        this.dispatchEvent(
            new CustomEvent('navigate', {
                detail: {
                    view,
                    accountId: event.currentTarget.dataset.accountId,
                    accountName: event.currentTarget.dataset.accountName
                }
            })
        );
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
