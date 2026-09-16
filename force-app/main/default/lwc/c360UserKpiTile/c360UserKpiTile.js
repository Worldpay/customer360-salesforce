import { LightningElement, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getMetricTile from '@salesforce/apex/C360MetricController.getMetricTile';
import getMetricOptions from '@salesforce/apex/C360MetricController.getMetricOptions';
import getUserHomeMetricKey from '@salesforce/apex/C360MetricController.getUserHomeMetricKey';
import saveUserHomeMetricKey from '@salesforce/apex/C360MetricController.saveUserHomeMetricKey';

export default class C360UserKpiTile extends LightningElement {
    selectedKey;
    preferenceLoaded = false;
    metricOptions = [];
    tile;
    error;
    wiredTileResult;

    @wire(getMetricOptions)
    wiredOptions({ data, error }) {
        if (data) {
            this.metricOptions = data.map((row) => ({
                label: row.label,
                value: row.value
            }));
        } else if (error) {
            console.error('Error loading metric options', error);
        }
    }

    connectedCallback() {
        getUserHomeMetricKey()
            .then((key) => {
                this.selectedKey = key;
                this.preferenceLoaded = true;
            })
            .catch((err) => {
                console.error('Error loading user metric preference', err);
                this.selectedKey = 'total_accounts';
                this.preferenceLoaded = true;
            });
    }

    get metricKeyForWire() {
        return this.preferenceLoaded ? this.selectedKey : undefined;
    }

    get comboboxDisabled() {
        return !this.preferenceLoaded || this.metricOptions.length === 0;
    }

    get comboboxValue() {
        return this.selectedKey;
    }

    @wire(getMetricTile, { metricKey: '$metricKeyForWire' })
    wiredMetric(result) {
        this.wiredTileResult = result;
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
        return !this.preferenceLoaded
            || (!this.wiredTileResult?.data && !this.wiredTileResult?.error && this.metricKeyForWire);
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

    handleMetricChange(event) {
        const key = event.detail.value;
        if (!key || key === this.selectedKey) {
            return;
        }
        const previous = this.selectedKey;
        this.selectedKey = key;
        saveUserHomeMetricKey({ metricKey: key })
            .catch((err) => {
                this.selectedKey = previous;
                console.error('Error saving metric preference', err);
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Could not save metric',
                    message: 'Your selection was not saved. Try again.',
                    variant: 'error'
                }));
            });
    }
}
