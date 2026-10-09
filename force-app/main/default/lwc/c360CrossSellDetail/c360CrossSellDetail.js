import { LightningElement, api } from 'lwc';
import { CROSS_SELL_DETAIL } from 'c/c360MockData';

export default class C360CrossSellDetail extends LightningElement {
    @api accountId;
    page = CROSS_SELL_DETAIL;

    get comparisons() {
        return (this.page.comparisons || []).map((item) => ({
            ...item,
            barStyle: `width:${item.width}`
        }));
    }

    get columns() {
        return this.page.columns || [];
    }

    get rows() {
        return (this.page.rows || []).map((row, index) => ({
            key: `${index}-${row[0]}`,
            cells: row.map((value, cellIndex) => ({
                key: `${index}-${cellIndex}`,
                value
            }))
        }));
    }
}
