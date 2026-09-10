import { LightningElement, api } from 'lwc';

export default class C360KpiTileEx05 extends LightningElement {
    @api label;
    @api value;
    @api detail;
    @api variant;

    get valueClass() {
        return this.variant === 'attention' ? 'k-val attention' : 'k-val';
    }
}
