import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { ACCOUNTS, PATHWAYS, SIGNALS, MOCK_ACCOUNT_IDS } from 'c/c360MockData';

export default class C360Dashboard extends NavigationMixin(LightningElement) {
    activeView = 'overview';
    selectedAccount = ACCOUNTS[0];
    selectedAlertId = 'alert-acme';
    pathwayScope = 'me';
    toastMessage = '';
    showExportModal = false;
    signals = SIGNALS.map((signal) => ({ ...signal }));

    get navItems() {
        const openAlerts = 3;
        return [
            { value: 'overview', label: 'Overview' },
            { value: 'alertcentre', label: 'Alert Centre', count: openAlerts },
            { value: 'crosssell', label: 'Cross-Sell' },
            { value: 'churn', label: 'Churn' },
            { value: 'pathways', label: 'Pathways', count: 7 }
        ].map((item) => ({ ...item, className: item.value === this.activeView ? 'nav-item active' : 'nav-item' }));
    }

    get isOverview() { return this.activeView === 'overview'; }
    get isAlertCentre() { return this.activeView === 'alertcentre'; }
    get isAlertDetail() { return this.activeView === 'alertdetail'; }
    get isCrossSell() { return this.activeView === 'crosssell'; }
    get isChurn() { return this.activeView === 'churn'; }
    get isPathways() { return this.activeView === 'pathways'; }
    get isAccount() { return this.activeView === 'account'; }
    get accounts() { return ACCOUNTS; }
    get openSignalCount() { return this.signals.filter((signal) => signal.isOpen).length; }
    get openSignalSummary() {
        const churn = this.signals.filter((signal) => signal.isOpen && signal.category === 'Churn').length;
        return `${churn} churn | ${this.openSignalCount - churn} cross-sell`;
    }
    get scopeLabel() { return this.pathwayScope === 'me' ? 'My accounts' : 'My team'; }
    get myScopeClass() { return this.pathwayScope === 'me' ? 'scope-button active' : 'scope-button'; }
    get teamScopeClass() { return this.pathwayScope === 'team' ? 'scope-button active' : 'scope-button'; }
    get visiblePathways() { return PATHWAYS.filter((pathway) => pathway.scope === this.pathwayScope); }
    get accountInitials() {
        return this.selectedAccount.name.split(' ').map((part) => part.charAt(0)).join('').slice(0, 2);
    }
    get selectedAccountPathways() {
        return PATHWAYS.filter((pathway) => pathway.account === this.selectedAccount.name);
    }

    handleNavigate(event) {
        this.activeView = event.currentTarget.dataset.view;
    }

    handleOpenAccount(event) {
        const accountName = event.currentTarget.dataset.account;
        const useRecordPage = event.shiftKey;
        if (useRecordPage) {
            const recordId = MOCK_ACCOUNT_IDS[accountName];
            if (recordId) {
                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: { recordId, objectApiName: 'Account', actionName: 'view' }
                });
                return;
            }
        }
        this.selectedAccount = ACCOUNTS.find((account) => account.name === accountName) || ACCOUNTS[0];
        this.activeView = 'account';
    }

    handleSignalAction(event) {
        this.updateSignal(event.detail, 'Actioned');
        this.toastMessage = 'Signal actioned — pathway created and visible to your manager.';
    }

    handleSignalDismiss(event) {
        this.updateSignal(event.detail, 'Dismissed');
        this.toastMessage = 'Signal dismissed.';
    }

    handleScope(event) {
        this.pathwayScope = event.currentTarget.dataset.scope;
    }

    handleInitiate(event) {
        this.toastMessage = `Pathway initiated: ${event.currentTarget.dataset.pathway}.`;
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

    handleOpenExport() {
        this.showExportModal = true;
    }

    handleCloseExport() {
        this.showExportModal = false;
    }

    dismissToast() {
        this.toastMessage = '';
    }

    updateSignal(signalId, status) {
        this.signals = this.signals.map((signal) => signal.id === signalId
            ? { ...signal, isOpen: false, status, statusClass: `status ${status.toLowerCase()}` }
            : signal);
    }
}
