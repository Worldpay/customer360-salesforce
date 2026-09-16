import { LightningElement, api } from 'lwc';
import { KPI_TILES } from 'c/c360MockData';

export default class C360KpiStrip extends LightningElement {
    @api tiles;
    /** When true, tiles wrap in a denser grid (Home row beside portfolio health). */
    @api compact = false;

    get gridClass() {
        return this.compact ? 'kpi-grid kpi-grid--compact' : 'kpi-grid';
    }

    get displayTiles() {
        const source = this.tiles?.length ? this.tiles : KPI_TILES;
        return source.map((tile) => ({
            ...tile,
            variant: tile.attention ? 'attention' : undefined
        }));
    }
}
