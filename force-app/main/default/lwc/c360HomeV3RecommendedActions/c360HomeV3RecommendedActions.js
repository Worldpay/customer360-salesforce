import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { HOME_V3 } from 'c/c360MockData';

export default class C360HomeV3RecommendedActions extends LightningElement {
    pathways = HOME_V3.pathways;

    get columns() {
        return this.pathways.columns.map((label) => ({ key: label, label }));
    }

    get rows() {
        return this.pathways.rows.map((row, index) => ({
            ...row,
            key: String(index),
            statusClass: `status status-${row.statusTone}`,
            actionClass: row.action === 'Chase' ? 'mini chase' : row.action === 'Escalate' ? 'mini escalate' : 'mini'
        }));
    }

    get legend() {
        return this.pathways.legend.map((item) => ({
            ...item,
            dotClass: `dot dot-${item.tone}`
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
