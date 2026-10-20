import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { HOME_V3 } from 'c/c360MockData';

export default class C360HomeV3RevenueOverview extends LightningElement {
    revenue = HOME_V3.revenue;

    get bars() {
        const max = 138;
        return this.revenue.bars.map((bar) => ({
            ...bar,
            barClass: bar.current ? 'bar is-current' : 'bar',
            barStyle: `height:${Math.round((bar.height / max) * 120)}px`
        }));
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
