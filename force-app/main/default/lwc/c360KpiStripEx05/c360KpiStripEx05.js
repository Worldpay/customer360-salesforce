import { LightningElement, api } from 'lwc';
import { KPI_TILES } from 'c/c360MockDataEx05';

export default class C360KpiStripEx05 extends LightningElement {
    @api tiles;

    get displayTiles() {
        const source = this.tiles?.length ? this.tiles : KPI_TILES;
        return source.map((tile) => ({
            ...tile,
            variant: tile.attention ? 'attention' : undefined
        }));
    }
}
