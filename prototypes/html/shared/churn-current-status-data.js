/** Mock DTO for the Churn current-status bar (illustrative only). */
window.CHURN_CURRENT_STATUS = {
  statusLabel: 'Current Status:',
  status: 'Actioned',
  triggered: 'Originally triggered: 28 Aug 2026',
  actions: [
    { id: 'resolve', label: 'Mark Resolved', variant: 'text' },
    { id: 'defer', label: 'Defer Signal', variant: 'text' },
    { id: 'dismiss', label: 'Dismiss Signal', variant: 'text' },
    { id: 'escalate', label: 'Escalate to Manager', variant: 'danger' }
  ],
  visibility: 'Visible to: Regional Director, Head of RM'
};
