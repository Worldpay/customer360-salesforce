import { LightningElement, api } from 'lwc';
import { ACCOUNTS } from 'c/c360MockDataEx05';

export default class C360AccountsTableEx05 extends LightningElement {
    @api title = 'My accounts';
    @api subtitle = 'Top movers';
    @api maxRows = 7;
    @api provenance = 'Snowflake → Analytics Engine → Salesforce | 15-min refresh';

    get rows() {
        const limit = Number(this.maxRows) || 7;
        const source = ACCOUNTS.slice(0, limit);
        return source.map((account) => ({
            ...account,
            healthPillClass: account.healthClass,
            riskPillClass: account.riskClass,
            deltaClass: account.healthDelta.startsWith('-') ? 'negative' : 'up'
        }));
    }

    handleOpenAccount(event) {
        const accountName = event.currentTarget.dataset.account;
        this.dispatchEvent(new CustomEvent('accountopen', {
            detail: { accountName, sourceView: 'accounts', shiftKey: event.shiftKey },
            bubbles: true,
            composed: true
        }));
    }
}
