import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { ALERTS_V3 } from 'c/c360MockData';

export default class C360AlertsV3 extends LightningElement {
    page = ALERTS_V3;
    activeNav = 'alerts';
    query = '';
    statusFilter = 'All';

    get navigation() {
        return this.page.nav.map((item) => ({
            ...item,
            itemClass: item.id === this.activeNav ? 'nav-item is-active' : 'nav-item',
            isHome: item.icon === 'home',
            isAlert: item.icon === 'alert',
            isSpark: item.icon === 'spark',
            isChart: item.icon === 'chart',
            isUsers: item.icon === 'users',
            isFile: item.icon === 'file',
            isGear: item.icon === 'gear'
        }));
    }

    handleNav(event) {
        const id = event.currentTarget.dataset.nav;
        this.activeNav = id;
        if (id !== 'alerts') {
            this.toast(event.currentTarget.dataset.label);
        }
    }

    handleFilter(event) {
        this.query = event.detail.query;
        this.statusFilter = event.detail.status;
    }

    handleChrome(event) {
        this.toast(event.currentTarget.dataset.label);
    }

    toast(label) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: label || 'Preview',
                message: 'Preview only',
                variant: 'info'
            })
        );
    }
}
