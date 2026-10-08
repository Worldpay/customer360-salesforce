import { LightningElement } from 'lwc';
import { CHURN_METRIC_TILES } from 'c/c360MockData';

export default class C360ChurnMetricTiles extends LightningElement {
    get tiles() {
        return CHURN_METRIC_TILES.map((tile) => ({
            ...tile,
            badgeClass: `cmt-badge tone-${tile.badgeTone || 'neutral'}`,
            valueClass: `cmt-value${tile.valueTone ? ` tone-${tile.valueTone}` : ''}`,
            trendClass: `cmt-trend tone-${tile.trendTone || 'neutral'}`,
            trendMark: tile.trendDirection === 'down' ? '▼' : tile.trendDirection === 'up' ? '▲' : '',
            showTrend: Boolean(tile.trend)
        }));
    }
}
