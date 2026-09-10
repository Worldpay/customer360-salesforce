import { LightningElement, api } from 'lwc';
import { PORTFOLIO_HEALTH } from 'c/c360MockDataEx05';

export default class C360PortfolioHealthEx05 extends LightningElement {
    @api title = 'Portfolio health';

    get health() {
        return PORTFOLIO_HEALTH;
    }

    get pipelineRows() {
        return PORTFOLIO_HEALTH.pipeline.map((row) => ({
            ...row,
            barStyle: `width:${row.width}`
        }));
    }
}
