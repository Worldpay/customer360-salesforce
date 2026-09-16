import { LightningElement, api, wire } from 'lwc';
import getMetricTile from '@salesforce/apex/C360MetricController.getMetricTile';

export default class C360ConfigurableKpiTile extends LightningElement {
    @api metricKey = 'total_accounts';

    tile;
    error;
    wiredResult;

    @wire(getMetricTile, { metricKey: '$metricKey' })
    wiredMetric(result) {
        this.wiredResult = result;
        const { data, error } = result;
        if (data) {
            this.tile = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.tile = undefined;
            console.error('Error loading metric tile', error);
        }
    }

    get isLoading() {
        return !this.wiredResult?.data && !this.wiredResult?.error;
    }

    get tileLabel() {
        return this.tile?.label ?? '';
    }

    get tileValue() {
        return this.tile?.value ?? '';
    }

    get tileDetail() {
        return this.tile?.detail ?? '';
    }

    get tileVariant() {
        return this.tile?.variant === 'attention' ? 'attention' : undefined;
    }
}
