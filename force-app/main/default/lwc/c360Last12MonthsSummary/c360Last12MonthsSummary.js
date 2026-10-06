import { LightningElement } from 'lwc';
import { LAST_12_MONTHS_SUMMARY } from 'c/c360MockData';

export default class C360Last12MonthsSummary extends LightningElement {
    title = LAST_12_MONTHS_SUMMARY.title;
    rows = LAST_12_MONTHS_SUMMARY.rows;
}
