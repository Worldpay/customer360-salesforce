import { LightningElement, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { getRecord } from 'lightning/uiRecordApi';
import USER_ID from '@salesforce/user/Id';
import NAME_FIELD from '@salesforce/schema/User.Name';
import TITLE_FIELD from '@salesforce/schema/User.Title';
import { ACCOUNTS, SIGNALS, MOCK_ACCOUNT_IDS, KPI_TILES } from 'c/c360MockData';

function sourceToTab(source) {
    if (source === 'crosssell') return 'cx';
    return 'ch';
}

function accountTabToNavView(tabKey) {
    if (tabKey === 'cx') return 'crosssell';
    if (tabKey === 'ch') return 'churn';
    return 'overview';
}

export default class C360Dashboard extends NavigationMixin(LightningElement) {
    activeView = 'overview';
    selectedAlertId = 'alert-acme';
    selectedAccount = ACCOUNTS[0];
    accountSourceView = 'accounts';
    accountSubTab = 'ch';
    accountsSubView = 'portfolio';
    healthFilter = 'All';
    toastMessage = '';
    signals = SIGNALS.map((signal) => ({ ...signal }));

    userName = '';
    userTitle = '';
    userInitials = '';

    get navHighlight() {
        if (this.activeView === 'account') {
            if (this.accountSourceView === 'churn') return 'churn';
            if (this.accountSourceView === 'crosssell') return 'crosssell';
            if (this.accountSourceView === 'accounts') return 'allaccounts';
            return accountTabToNavView(this.accountSubTab);
        }
        if (this.activeView === 'alertdetail') return 'alertcentre';
        if (this.activeView === 'allaccounts') {
            if (this.accountsSubView === 'churn') return 'churn';
            if (this.accountsSubView === 'crosssell') return 'crosssell';
            return 'allaccounts';
        }
        return this.activeView;
    }

    get navItems() {
        const openAlerts = 3;
        const navHighlight = this.navHighlight;
        return [
            { value: 'overview', label: 'Home', count: null, disabled: false, placeholder: false },
            { value: 'alertcentre', label: 'Alert Centre', count: openAlerts, disabled: false, placeholder: false },
            { value: 'analytics', label: 'Analytics', count: null, disabled: true, placeholder: true },
            { value: 'customers', label: 'Customers', count: null, disabled: true, placeholder: true },
            { value: 'allaccounts', label: 'All accounts', count: null, disabled: false, placeholder: false },
            { value: 'churn', label: 'Churn', count: null, disabled: false, placeholder: false },
            { value: 'crosssell', label: 'Cross-sell', count: null, disabled: false, placeholder: false },
            { value: 'reports', label: 'Reports', count: null, disabled: true, placeholder: true },
            { value: 'settings', label: 'Settings', count: null, disabled: true, placeholder: true }
        ].map((item) => ({
            ...item,
            className: [
                'side-nav-item',
                item.placeholder ? 'side-nav-placeholder' : '',
                item.value === navHighlight ? 'active' : ''
            ].filter(Boolean).join(' ')
        }));
    }

    get isOverview() { return this.activeView === 'overview'; }
    get isAlertCentre() { return this.activeView === 'alertcentre'; }
    get isAlertDetail() { return this.activeView === 'alertdetail'; }
    get isAllAccounts() { return this.activeView === 'allaccounts'; }
    get isAccountsPortfolio() { return this.isAllAccounts && this.accountsSubView === 'portfolio'; }
    get isAccountsChurn() { return this.isAllAccounts && this.accountsSubView === 'churn'; }
    get isAccountsCrossSell() { return this.isAllAccounts && this.accountsSubView === 'crosssell'; }
    get isAccount() { return this.activeView === 'account'; }

    get openSignalCount() {
        return this.signals.filter((signal) => signal.signalStatus === 'open').length;
    }

    get openSignalSummary() {
        const churn = this.signals.filter((signal) => signal.signalStatus === 'open' && signal.category === 'Churn').length;
        return `${churn} churn | ${this.openSignalCount - churn} cross-sell`;
    }

    get kpiTiles() {
        return KPI_TILES.map((tile) => {
            if (tile.label !== 'Signals to action') {
                return { ...tile };
            }
            return {
                ...tile,
                value: String(this.openSignalCount),
                detail: this.openSignalSummary,
                attention: true
            };
        });
    }

    handleNavigate(event) {
        const view = event.currentTarget?.dataset?.view;
        if (!view || event.currentTarget?.disabled) {
            return;
        }
        if (view === 'allaccounts') {
            this.goToAllAccountsPortfolio(true);
            return;
        }
        if (view === 'churn') {
            this.accountsSubView = 'churn';
            this.activeView = 'allaccounts';
            return;
        }
        if (view === 'crosssell') {
            this.accountsSubView = 'crosssell';
            this.activeView = 'allaccounts';
            return;
        }
        this.activeView = view;
    }

    goToAllAccountsPortfolio(resetFilter) {
        if (resetFilter) {
            this.healthFilter = 'All';
        }
        this.accountsSubView = 'portfolio';
        this.activeView = 'allaccounts';
    }

    handlePortfolioHealthFilter(event) {
        this.healthFilter = event.detail?.health || 'All';
        this.accountsSubView = 'portfolio';
        this.activeView = 'allaccounts';
    }

    handleHealthFilterChange(event) {
        this.healthFilter = event.detail?.filter || 'All';
    }

    handleGoAllAccounts() {
        this.goToAllAccountsPortfolio(true);
    }

    handleOpenAccount(event) {
        const detail = event.detail || {};
        const accountName = detail.accountName || event.currentTarget?.dataset?.account;
        if (!accountName) {
            return;
        }
        const sourceView = detail.sourceView || event.currentTarget?.dataset?.source || 'accounts';
        const shiftKey = event.shiftKey || detail.shiftKey;
        const recordId = detail.recordId || MOCK_ACCOUNT_IDS[accountName];

        if (shiftKey && recordId) {
            this[NavigationMixin.Navigate]({
                type: 'standard__recordPage',
                attributes: { recordId, objectApiName: 'Account', actionName: 'view' }
            });
            this.toastMessage = `NavigationMixin → Record Page <b>${recordId}</b> (preview).`;
            return;
        }

        const account = ACCOUNTS.find((item) => item.name === accountName) || ACCOUNTS[0];
        this.selectedAccount = account;
        this.accountSourceView = sourceView;
        this.accountSubTab = sourceToTab(sourceView);
        this.activeView = 'account';
    }

    handleAccountNavigate(event) {
        const view = event.detail?.view || 'overview';
        if (view === 'allaccounts' || view === 'churn' || view === 'crosssell' || view === 'accounts') {
            if (this.accountSourceView === 'churn') this.accountsSubView = 'churn';
            else if (this.accountSourceView === 'crosssell') this.accountsSubView = 'crosssell';
            else this.accountsSubView = 'portfolio';
            this.activeView = 'allaccounts';
            return;
        }
        this.activeView = view;
    }

    handleAccountSubTab(event) {
        this.accountSubTab = event.detail?.tab || 'ch';
    }

    handleSignalAction(event) {
        this.updateSignal(event.detail, 'actioned');
        this.toastMessage = 'Signal actioned — row marked as complete.';
    }

    handleSignalDismiss(event) {
        this.updateSignal(event.detail, 'dismissed');
        this.toastMessage = 'Signal dismissed — row greyed out.';
    }

    handleAlertSelect(event) {
        this.selectedAlertId = event.detail;
        this.activeView = 'alertdetail';
    }

    handleAlertBack() {
        this.activeView = 'alertcentre';
    }

    handleAlertAction(event) {
        const { action } = event.detail;
        this.toastMessage = `Alert ${action} recorded (preview). Manager visibility updated.`;
    }

    handleExportPdf() {
        this.toastMessage = 'Export PDF — deferred to Record Page / reporting (preview).';
    }

    handleAccountExport() {
        this.toastMessage = `Generating Global Payments-branded deck for <b>${this.selectedAccount.name}</b>…`;
    }

    dismissToast() {
        this.toastMessage = '';
    }

    updateSignal(signalId, status) {
        this.signals = this.signals.map((signal) => signal.id === signalId
            ? { ...signal, signalStatus: status }
            : signal);
    }

    @wire(getRecord, {
        recordId: USER_ID,
        fields: [NAME_FIELD, TITLE_FIELD]
    })
    wiredUser({ error, data }) {
        if (data) {
            this.userName = data.fields.Name.value;
            this.userTitle = data.fields.Title?.value || '';

            this.userInitials = this.userName
                .split(' ')
                .map((word) => word.charAt(0))
                .join('')
                .substring(0, 2)
                .toUpperCase();
        } else if (error) {
            console.error('Error loading user details', error);
        }
    }
}
