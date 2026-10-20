import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { HOME_V3 } from 'c/c360MockData';

export default class C360HomeV3TodaysFocus extends LightningElement {
    page = HOME_V3.focus;
    completed = {};

    get remainingLabel() {
        const count = this.page.tasks.filter((_, index) => !this.completed[String(index)]).length;
        return `${count} ${this.page.remainingLabel}`;
    }

    get tasks() {
        return this.page.tasks.map((task, index) => {
            const id = String(index);
            const done = Boolean(this.completed[id]);
            return {
                ...task,
                id,
                done,
                rowClass: done ? 'task is-done' : 'task',
                hasPriority: Boolean(task.priority)
            };
        });
    }

    handleToggle(event) {
        const id = event.currentTarget.dataset.task;
        this.completed = { ...this.completed, [id]: event.target.checked };
    }

    handleChrome(event) {
        event.stopPropagation();
        this.dispatchEvent(
            new ShowToastEvent({
                title: event.currentTarget.dataset.label,
                message: 'Preview only',
                variant: 'info'
            })
        );
    }
}
