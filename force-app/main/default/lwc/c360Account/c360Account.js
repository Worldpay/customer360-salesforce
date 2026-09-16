import { LightningElement, api } from 'lwc';
import { ACCOUNTS, MOCK_ACCOUNT_IDS } from 'c/c360MockData';

const ID_TO_NAME = Object.fromEntries(
    Object.entries(MOCK_ACCOUNT_IDS).map(([name, id]) => [id, name])
);

export default class C360Account extends LightningElement {
    @api recordId;
    /** When provided, suppresses future Apex wire (leadSpotlight pattern). */
    @api prefetchedData;
    /** Initial account sub-tab when opened from churn / cross-sell hub views. */
    @api sourceView = 'accounts';

    get account() {
        if (this.prefetchedData) {
            return this.prefetchedData;
        }
        const accountName = ID_TO_NAME[this.recordId] || 'Pets at Home';
        return ACCOUNTS.find((item) => item.name === accountName) || ACCOUNTS[0];
    }

}
