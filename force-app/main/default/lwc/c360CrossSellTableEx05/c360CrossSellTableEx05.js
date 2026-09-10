import { LightningElement, api } from 'lwc';
import { CROSS_SELL_ROWS } from 'c/c360MockDataEx05';

export default class C360CrossSellTableEx05 extends LightningElement {
    @api title = 'Open cross-sell opportunities';
    @api subtitle = 'Across your portfolio';

    get rows() {
        return CROSS_SELL_ROWS.map((row) => ({
            ...row,
            propensityPillClass: row.propensityClass
        }));
    }

    handleOpenAccount(event) {
        const accountName = event.currentTarget.dataset.account;
        this.dispatchEvent(new CustomEvent('accountopen', {
            detail: { accountName, sourceView: 'crosssell', shiftKey: event.shiftKey },
            bubbles: true,
            composed: true
        }));
    }
}
