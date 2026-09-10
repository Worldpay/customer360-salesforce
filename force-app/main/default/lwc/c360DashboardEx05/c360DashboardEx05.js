import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { ACCOUNTS, SIGNALS, MOCK_ACCOUNT_IDS } from 'c/c360MockDataEx05';

function sourceToTab(source) {
    if (source === 'crosssell') return 'cx';
    return 'ch';
}

function accountTabToNavView(tabKey) {
    if (tabKey === 'cx') return 'crosssell';
    if (tabKey === 'ch') return 'churn';
    return 'overview';
}

export default class C360DashboardEx05 extends NavigationMixin(LightningElement) {
    activeView = 'overview';
    selectedAlertId = 'alert-acme';
    selectedAccount = ACCOUNTS[0];
    accountSourceView = 'accounts';
    accountSubTab = 'ch';
    toastMessage = '';
    signals = SIGNALS.map((signal) => ({ ...signal }));

    get navItems() {
        const openAlerts = 3;
        const navHighlight = this.activeView === 'account'
            ? accountTabToNavView(this.accountSubTab)
            : this.activeView;
        return [
            { value: 'overview', label: 'Home', count: null, disabled: false, placeholder: false },
            { value: 'alertcentre', label: 'Alert Centre', count: openAlerts, disabled: false, placeholder: false },
            { value: 'analytics', label: 'Analytics', count: null, disabled: true, placeholder: true },
            { value: 'customers', label: 'Customers', count: null, disabled: true, placeholder: true },
            { value: 'churn', label: 'Churn', count: null, disabled: false, placeholder: false },
            { value: 'crosssell', label: 'Cross-Sell', count: null, disabled: false, placeholder: false },
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
    get isCrossSell() { return this.activeView === 'crosssell'; }
    get isChurn() { return this.activeView === 'churn'; }
    get isAccount() { return this.activeView === 'account'; }

    get openSignalCount() {
        return this.signals.filter((signal) => signal.signalStatus === 'open').length;
    }

    get openSignalSummary() {
        const churn = this.signals.filter((signal) => signal.signalStatus === 'open' && signal.category === 'Churn').length;
        return `${churn} churn | ${this.openSignalCount - churn} cross-sell`;
    }

    handleNavigate(event) {
        const view = event.currentTarget?.dataset?.view;
        if (!view || event.currentTarget?.disabled) {
            return;
        }
        this.activeView = view;
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
}
