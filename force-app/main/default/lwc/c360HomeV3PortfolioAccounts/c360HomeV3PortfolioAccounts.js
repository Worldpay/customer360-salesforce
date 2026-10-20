import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { HOME_V3 } from 'c/c360MockData';

export default class C360HomeV3PortfolioAccounts extends LightningElement {
    portfolio = HOME_V3.portfolio;
    filterId = 'all';
    query = '';

    get filters() {
        return this.portfolio.filters.map((item) => ({
            ...item,
            filterClass: item.id === this.filterId ? 'filter is-active' : 'filter'
        }));
    }

    get columns() {
        return this.portfolio.columns.map((label) => ({ key: label, label }));
    }

    get rows() {
        const query = this.query.trim().toLowerCase();
        return this.portfolio.rows
            .filter((row) => {
                const risk = row.risk.toLowerCase().replace(' ', '-');
                const text = `${row.name} ${row.id}`.toLowerCase();
                return (this.filterId === 'all' || risk === this.filterId) && text.includes(query);
            })
            .map((row) => ({
                ...row,
                scoreClass: `score tone-${row.scoreTone}`,
                riskClass: `risk tone-${row.scoreTone}`,
                changeClass: `change-${row.changeTone}`
            }));
    }

    get hasRows() {
        return this.rows.length > 0;
    }

    get showingLabel() {
        if (this.query.trim() || this.filterId !== 'all') {
            return `Showing ${this.rows.length} of 11 accounts`;
        }
        return this.portfolio.showingTemplate;
    }

    handleFilter(event) {
        this.filterId = event.currentTarget.dataset.filter;
    }

    handleSearch(event) {
        this.query = event.target.value;
    }

    handleChrome(event) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: event.currentTarget.dataset.label,
                message: 'Preview only',
                variant: 'info'
            })
        );
    }
}
