import { LightningElement, api } from 'lwc';
import { MATERIAL_BANNER } from 'c/c360MockData';

export default class C360MaterialBanner extends LightningElement {
    @api message = MATERIAL_BANNER.message;
}
