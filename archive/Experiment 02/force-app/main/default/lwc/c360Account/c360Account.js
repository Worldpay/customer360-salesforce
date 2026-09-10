import { LightningElement, api } from 'lwc';
import { ACCOUNTS, PATHWAYS } from 'c/c360MockData';

const TABS = [
    { key: 'overview', label: 'Overview', icon: 'utility:home' },
    { key: 'churn', label: 'Churn risk', icon: 'utility:trend' },
    { key: 'crosssell', label: 'Cross-sell', icon: 'utility:add' },
    { key: 'pathways', label: 'Pathways', icon: 'utility:forward' },
    { key: 'contacts', label: 'Contacts', icon: 'utility:groups' }
];

export default class C360Account extends LightningElement {
    @api recordId;
    /** When provided, suppresses future Apex wire (leadSpotlight pattern). */
    @api prefetchedData;

    selectedTab = 'overview';
    isLoading = false;
    hasError = false;

    get account() {
        if (this.prefetchedData) {
            return this.prefetchedData;
        }
        return ACCOUNTS[0];
    }

    get accountPathways() {
        return PATHWAYS.filter((pathway) => pathway.account === this.account.name);
    }

    get allTabs() {
        return TABS.map((tab) => ({
            ...tab,
            class: tab.key === this.selectedTab ? 'tab active' : 'tab'
        }));
    }

    get showOverview() { return this.selectedTab === 'overview'; }
    get showChurn() { return this.selectedTab === 'churn'; }
    get showCrosssell() { return this.selectedTab === 'crosssell'; }
    get showPathways() { return this.selectedTab === 'pathways'; }
    get showContacts() { return this.selectedTab === 'contacts'; }
    get hasData() { return !this.isLoading && !this.hasError; }
    get accountInitials() {
        return this.account.name.split(' ').map((part) => part.charAt(0)).join('').slice(0, 2);
    }
    get selectedTabLabel() {
        const tab = TABS.find((item) => item.key === this.selectedTab);
        return tab ? tab.label : this.selectedTab;
    }

    handleTabClick(event) {
        this.selectedTab = event.currentTarget.dataset.tab;
    }

    handleExport() {
        this.dispatchEvent(new CustomEvent('exportaccount', {
            detail: { accountName: this.account.name },
            bubbles: true,
            composed: true
        }));
    }
}
