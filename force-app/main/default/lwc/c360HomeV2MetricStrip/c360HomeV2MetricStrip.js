import { LightningElement } from 'lwc';
import { HOME_V2 } from 'c/c360MockData';

export default class C360HomeV2MetricStrip extends LightningElement {
    activity = HOME_V2.activity;

    get metrics() {
        return HOME_V2.metrics.map((metric) => ({
            ...metric,
            iconClass: `metric-icon metric-icon-${metric.tone}`,
            isDollar: metric.icon === 'dollar',
            isTarget: metric.icon === 'target',
            isChart: metric.icon === 'chart'
        }));
    }

    get people() {
        return this.activity.people.map((person) => ({
            ...person,
            avatarClass: `avatar avatar-${person.tone} avatar-small`
        }));
    }

    get overflowLabel() {
        return `+${this.activity.overflowCount}`;
    }
}
