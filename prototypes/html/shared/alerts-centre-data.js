window.ALERTS_CENTRE = {
  crumbs: ['Home', 'Alert Centre'],
  backLabel: 'Back to Enterprise Account Hub',
  title: 'All Churn Alerts',
  updated: 'Updated 10m Ago',
  exportLabel: 'Export',
  searchPlaceholder: 'Filter by Account Name or Salesforce ID...',
  summary: '6 Total Alerts · 3 New · 2 In Review · 1 Resolved · Suppressed: 2',
  note: 'Alert logic: IF score < −25% AND RM in pilot group → Alert + Task + Email + 1-month suppression per merchant',
  rows: [
    { id: 'SF-89210', name: 'Acme Corporation', score: '−31% ↓', threshold: '< −25%', date: '28 Aug 2026', suppression: 'Active', task: 'Created', email: 'Sent', status: 'NEW ALERT' },
    { id: 'SF-10003', name: 'Globex Ltd', score: '−28% ↓', threshold: '< −25%', date: '27 Aug 2026', suppression: 'Active', task: 'Created', email: 'Sent', status: 'IN REVIEW' },
    { id: 'SF-10002', name: 'InTech Solutions', score: '−42% ↓', threshold: '< −25%', date: '25 Aug 2026', suppression: 'Active', task: 'Created', email: 'Sent', status: 'ACTION SCHEDULED' },
    { id: 'SF-10009', name: 'Umbrella Corp', score: '−26% ↓', threshold: '< −25%', date: '20 Aug 2026', suppression: 'Re-triggered', task: 'Created', email: 'Sent', status: 'NEW ALERT' },
    { id: 'SF-10010', name: 'Soylent Co', score: '−33% ↓', threshold: '< −25%', date: '15 Aug 2026', suppression: 'Suppressed til 15 Sep', task: '—', email: '—', status: 'SUPPRESSED' }
  ]
};
