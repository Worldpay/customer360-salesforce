import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { PERFORMANCE_AND_TRENDS } from 'c/c360MockData';

export default class C360PerformanceAndTrends extends LightningElement {
    trends = PERFORMANCE_AND_TRENDS;
    selectedRangeId = '12';

    get ranges() {
        return this.trends.ranges.map((range) => ({
            ...range,
            rangeClass: range.id === this.selectedRangeId ? 'pat-range is-selected' : 'pat-range'
        }));
    }

    get periods() {
        return this.trends.periods;
    }

    get charts() {
        return this.trends.charts.map((chart) => ({
            ...chart,
            linePoints: this.linePoints(chart.points)
        }));
    }

    get tableRows() {
        return this.trends.rows.map((row) => ({
            metric: row.metric,
            cells: row.cells.map((value, index) => ({
                key: `${row.metric}-${index}`,
                value
            }))
        }));
    }

    get scenarioActions() {
        return this.trends.scenarioActions.map((action) => ({
            ...action,
            actionClass: `pat-action ${action.variant}`
        }));
    }

    linePoints(points) {
        const values = points || [];
        const max = Math.max(...values);
        const min = Math.min(...values);
        const span = max - min || 1;
        const step = values.length > 1 ? 120 / (values.length - 1) : 0;
        return values
            .map((point, index) => {
                const x = (index * step).toFixed(1);
                const y = (36 - ((point - min) / span) * 28).toFixed(1);
                return `${x},${y}`;
            })
            .join(' ');
    }

    handleRange(event) {
        this.selectedRangeId = event.currentTarget.dataset.range;
        this.toast(event.currentTarget.textContent.trim());
    }

    handleAction(event) {
        const label = event.currentTarget.dataset.label || event.currentTarget.textContent.trim();
        this.dispatchEvent(
            new CustomEvent('performancetrend', {
                bubbles: true,
                composed: true,
                detail: { id: event.currentTarget.dataset.id }
            })
        );
        this.toast(label);
    }

    toast(title) {
        this.dispatchEvent(
            new ShowToastEvent({
                title,
                message: 'Preview only',
                variant: 'info'
            })
        );
    }
}
