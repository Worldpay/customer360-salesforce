/** Mock DTO for the Churn metric tiles (illustrative only). */
window.CHURN_METRIC_TILES = [
  {
    id: 'churn-score',
    label: 'Churn Score',
    badge: 'Attn Req',
    badgeTone: 'danger',
    value: '-31%',
    caption: 'Trend: -2% vs last quarter',
    trend: '-2.1 pts',
    trendTone: 'negative',
    trendDirection: 'down'
  },
  {
    id: 'churn-risk',
    label: 'Churn Risk',
    badge: 'Warning',
    badgeTone: 'danger',
    value: 'Critical',
    valueTone: 'negative',
    caption: 'Was Low last quarter',
    trend: 'Increased from Low',
    trendTone: 'negative',
    trendDirection: 'up'
  },
  {
    id: 'monthly-volume',
    label: 'Monthly Volume',
    badge: 'Good',
    badgeTone: 'positive',
    value: '$2.4M',
    caption: 'Current monthly volume',
    trend: '+12% MoM',
    trendTone: 'positive',
    trendDirection: 'up'
  },
  {
    id: 'approval-rate',
    label: 'Approval Rate',
    badge: 'Stable',
    badgeTone: 'positive',
    value: '94.2%',
    caption: 'Current approval rate',
    trend: '+1.3pp',
    trendTone: 'positive',
    trendDirection: 'up'
  },
  {
    id: 'net-margin',
    label: 'Net Margin',
    badge: 'Compressed',
    badgeTone: 'danger',
    value: '18.4 bps',
    caption: 'Current net margin',
    trend: '-2.1 bps',
    trendTone: 'negative',
    trendDirection: 'down'
  },
  {
    id: 'chargeback-rate',
    label: 'Chargeback Rate',
    badge: 'Healthy',
    badgeTone: 'positive',
    value: '0.31%',
    caption: 'Current chargeback rate',
    trend: 'Below threshold',
    trendTone: 'neutral'
  }
];
