import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { HOME_V2 } from 'c/c360MockData';

export default class C360HomeV2PriorityOpportunities extends LightningElement {
    page = HOME_V2.opportunities;

    get columns() {
        return this.page.columns.map((label) => ({ key: label, label }));
    }

    get rows() {
        return this.page.rows.map((row) => ({
            ...row,
            avatarClass: `avatar avatar-${row.tone} avatar-medium`,
            stageClass: `stage stage-${String(row.stage).toLowerCase()}`,
            confidenceStyle: `width: ${Number(row.confidence)}%`,
            confidenceLabel: `${row.confidence}%`,
            moreLabel: `Actions for ${row.companyName}`
        }));
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
