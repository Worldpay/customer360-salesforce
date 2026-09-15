import { LightningElement, api } from 'lwc';
import { ACCOUNTS, PORTFOLIO_HEALTH_FILTERS } from 'c/c360MockDataEx05';

const HEALTH_FILTERS = PORTFOLIO_HEALTH_FILTERS || ['All', 'Healthy', 'Watch', 'At risk'];
const LOAD_DELAY_MS = 800;

export default class C360AccountsTableEx05 extends LightningElement {
    @api title = 'My accounts';
    @api subtitle = 'Top movers';
    @api maxRows = 7;
    @api provenance = 'Snowflake → Analytics Engine → Salesforce | 15-min refresh';
    @api variant = 'overview';
    @api healthFilter = 'All';
    @api loadDelayMs = LOAD_DELAY_MS;

    isLoading = true;

    connectedCallback() {
        const delay = Number(this.loadDelayMs) || LOAD_DELAY_MS;
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        setTimeout(() => {
            this.isLoading = false;
        }, delay);
    }

    get isPortfolio() {
        return this.variant === 'portfolio';
    }

    get portfolioTitle() {
        return this.title || 'Portfolio accounts';
    }

    get accountCountLabel() {
        return `${this.rows.length} accounts`;
    }

    get filterChips() {
        return HEALTH_FILTERS.map((filter) => ({
            filter,
            className: filter === this.healthFilter ? 'filter-chip active' : 'filter-chip'
        }));
    }

    get rows() {
        if (this.isPortfolio) {
            const source = this.healthFilter === 'All'
                ? ACCOUNTS
                : ACCOUNTS.filter((account) => account.health === this.healthFilter);
            return source.map((account) => this.mapPortfolioRow(account));
        }
        const limit = Number(this.maxRows) || 7;
        const source = ACCOUNTS.slice(0, limit);
        return source.map((account) => this.mapOverviewRow(account));
    }

    mapOverviewRow(account) {
        const delta = account.healthDelta || '';
        return {
            ...account,
            healthPillClass: account.healthClass,
            riskPillClass: account.riskClass,
            deltaClass: delta.startsWith('-') ? 'negative' : 'up'
        };
    }

    mapPortfolioRow(account) {
        const txnNegative = account.predictedTxnChangeSort < 0;
        return {
            ...account,
            revenueDisplay: account.revenue || account.volume,
            healthPillClass: account.healthClass,
            txnClass: txnNegative ? 'negative' : 'up'
        };
    }

    handleOpenAccount(event) {
        const accountName = event.currentTarget.dataset.account;
        const sourceView = this.isPortfolio ? 'accounts' : 'accounts';
        this.dispatchEvent(new CustomEvent('accountopen', {
            detail: { accountName, sourceView, shiftKey: event.shiftKey },
            bubbles: true,
            composed: true
        }));
    }

    handleHealthFilter(event) {
        const filter = event.currentTarget.dataset.filter;
        if (!filter || filter === this.healthFilter) {
            return;
        }
        this.healthFilter = filter;
        this.dispatchEvent(new CustomEvent('healthfilterchange', {
            detail: { filter },
            bubbles: true,
            composed: true
        }));
    }
}
