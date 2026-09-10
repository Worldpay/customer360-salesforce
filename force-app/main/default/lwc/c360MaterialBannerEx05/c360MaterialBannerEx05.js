import { LightningElement, api } from 'lwc';
import { MATERIAL_BANNER } from 'c/c360MockDataEx05';

export default class C360MaterialBannerEx05 extends LightningElement {
    @api message = MATERIAL_BANNER.message;
}
