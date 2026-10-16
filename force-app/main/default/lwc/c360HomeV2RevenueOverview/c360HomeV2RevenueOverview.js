import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { HOME_V2 } from 'c/c360MockData';

export default class C360HomeV2RevenueOverview extends LightningElement {
    page = HOME_V2.revenue;

    get bars() {
        const last = this.page.points.length - 1;
        return this.page.points.map((height, index) => ({
            key: `bar-${index}`,
            barClass: index === last ? 'chart-bar chart-bar-active' : 'chart-bar',
            barStyle: `height: ${Number(height)}%`
        }));
    }

    get labels() {
        return this.page.labels.map((label) => ({ key: label, label }));
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
