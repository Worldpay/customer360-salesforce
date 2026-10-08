import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { CHURN_ALERT_NOTIFICATION } from 'c/c360MockData';

export default class C360ChurnAlertNotification extends LightningElement {
    alert = CHURN_ALERT_NOTIFICATION;

    handleView() {
        this.dispatchEvent(
            new CustomEvent('viewalert', {
                detail: { id: 'churn-alert' },
                bubbles: true,
                composed: true
            })
        );
        this.dispatchEvent(
            new ShowToastEvent({
                title: this.alert.title,
                message: 'Preview only',
                variant: 'info'
            })
        );
    }
}
