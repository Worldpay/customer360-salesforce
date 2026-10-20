import { LightningElement } from 'lwc';
import { HOME_V3 } from 'c/c360MockData';

export default class C360HomeV3KpiRow extends LightningElement {
    get cards() {
        return HOME_V3.kpis.map((kpi, index) => ({
            ...kpi,
            key: String(index),
            hasChip: Boolean(kpi.chip),
            chipClass: `kpi-chip kpi-chip-${kpi.chipTone || 'green'}`,
            showUp: kpi.chipPrefix === 'up',
            hasNote: Boolean(kpi.note),
            noteClass: `kpi-note kpi-note-${kpi.noteTone || 'green'}`,
            isDollar: kpi.icon === 'dollar',
            isUsers: kpi.icon === 'users',
            isUserPlus: kpi.icon === 'user-plus',
            isRepeat: kpi.icon === 'repeat'
        }));
    }
}
