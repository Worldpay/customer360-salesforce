import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { HOME_V3 } from 'c/c360MockData';

export default class C360HomeV3 extends LightningElement {
    page = HOME_V3;
    activeNav = 'home';

    get navigation() {
        return this.page.nav.map((item) => ({
            ...item,
            itemClass: item.id === this.activeNav ? 'nav-item is-active' : 'nav-item',
            isHome: item.icon === 'home',
            isBell: item.icon === 'bell',
            isLayers: item.icon === 'layers',
            isChart: item.icon === 'chart',
            isUsers: item.icon === 'users',
            isFile: item.icon === 'file',
            isGear: item.icon === 'gear'
        }));
    }

    handleNav(event) {
        const id = event.currentTarget.dataset.nav;
        this.activeNav = id;
        if (id !== 'home') {
            this.toast(event.currentTarget.dataset.label);
        }
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
