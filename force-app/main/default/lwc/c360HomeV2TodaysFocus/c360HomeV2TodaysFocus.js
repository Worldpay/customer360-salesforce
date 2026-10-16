import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { HOME_V2 } from 'c/c360MockData';

export default class C360HomeV2TodaysFocus extends LightningElement {
    page = HOME_V2.focus;
    completed = {};

    get remainingLabel() {
        const count = this.page.tasks.filter((task) => !this.completed[task.id]).length;
        return this.page.remainingTemplate.replace('{count}', String(count));
    }

    get tasks() {
        return this.page.tasks.map((task) => {
            const done = Boolean(this.completed[task.id]);
            return {
                ...task,
                rowClass: done ? 'task task-complete' : 'task',
                timeClass: task.priority ? 'task-time task-time-priority' : 'task-time',
                checkLabel: `${done ? 'Reopen' : 'Complete'} ${task.title}`,
                moreLabel: `More options for ${task.title}`,
                done
            };
        });
    }

    handleToggle(event) {
        const id = event.currentTarget.dataset.task;
        this.completed = { ...this.completed, [id]: !this.completed[id] };
    }

    handleChrome(event) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: event.currentTarget.dataset.label || 'Task options',
                message: 'Preview only',
                variant: 'info'
            })
        );
    }
}
