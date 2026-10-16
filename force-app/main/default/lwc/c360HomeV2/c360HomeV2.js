import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { HOME_V2 } from 'c/c360MockData';

export default class C360HomeV2 extends LightningElement {
    page = HOME_V2;
    activeNav = 'home';

    get navigation() {
        return this.page.navigation.map((item) => ({
            ...item,
            itemClass: item.id === this.activeNav ? 'nav-link nav-link-active' : 'nav-link',
            showCount: item.count != null,
            isHouse: item.icon === 'house',
            isAlert: item.icon === 'alert',
            isRefresh: item.icon === 'refresh',
            isShield: item.icon === 'shield',
            isChart: item.icon === 'chart',
            isFile: item.icon === 'file',
            isSettings: item.icon === 'settings'
        }));
    }

    handleNav(event) {
        this.activeNav = event.currentTarget.dataset.nav;
    }

    handleChrome(event) {
        const label = event.currentTarget.dataset.label || event.currentTarget.textContent.trim();
        this.dispatchEvent(
            new ShowToastEvent({
                title: label,
                message: 'Preview only',
                variant: 'info'
            })
        );
    }
}
