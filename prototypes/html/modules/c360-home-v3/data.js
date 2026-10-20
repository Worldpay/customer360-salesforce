window.C360_HOME_V3 = {
  brandName: "Customer360",
  userName: "Sarah Jenkins",
  userRole: "RM — Enterprise",
  userInitials: "SJ",
  nav: [
    { id: "home", label: "Home", icon: "home" },
    { id: "alerts", label: "Alerts", icon: "bell" },
    { id: "cross-sell", label: "Cross-Sell", icon: "layers" },
    { id: "analytics", label: "Analytics", icon: "chart" },
    { id: "customers", label: "Customers", icon: "users" },
    { id: "reports", label: "Reports", icon: "file" },
    { id: "settings", label: "Settings", icon: "gear" }
  ],
  greeting: "Welcome back, Sarah Jenkins",
  priorityAlertLabel: "1 Priority Alert",
  subtitle: "Your portfolio at a glance. Preview data for layout comparison.",
  updatedLabel: "Updated 12m Ago",
  periodLabel: "Last 30 Days",
  exportLabel: "Export PDF",
  analysisLabel: "Portfolio Analysis",
  kpis: [
    {
      icon: "dollar",
      label: "Cross-Sell Lead ACV",
      value: "$2.4M",
      chip: "+12.81%",
      chipTone: "green",
      note: "Vs Previous Month",
      noteTone: "green"
    },
    {
      icon: "users",
      label: "Total Accounts",
      value: "47"
    },
    {
      icon: "user-plus",
      label: "At-Risk Accounts",
      value: "12",
      chip: "2 New",
      chipPrefix: "up",
      chipTone: "red",
      note: "Attention",
      noteTone: "red"
    },
    {
      icon: "repeat",
      label: "Cross-Sell Leads",
      value: "11",
      chip: "3 New",
      chipTone: "green"
    }
  ],
  briefing: {
    eyebrow: "CUSTOMER360 INTELLIGENCE",
    title: "Your Portfolio Briefing",
    body: "Preview insights for Stellar Manufacturing: potential close probability improvement of 12%.",
    dismissLabel: "Dismiss",
    reviewLabel: "Review Insight"
  },
  churnAlert: {
    title: "NEW CHURN ALERT GENERATED",
    detail: "Transaction volume decline threshold (-25%) breached.",
    when: "24 July 2026 · 09:14 GMT",
    priority: "High Priority",
    viewLabel: "View"
  },
  revenue: {
    title: "Revenue Overview",
    subtitle: "Preview portfolio performance.",
    periodLabel: "Last 6 Months",
    amount: "$2.4M",
    change: "+12.81% vs Previous Period",
    bars: [
      { label: "Mar", height: 79 },
      { label: "Apr", height: 69 },
      { label: "May", height: 89 },
      { label: "Jun", height: 98 },
      { label: "Jul", height: 113 },
      { label: "Aug", height: 138, current: true }
    ]
  },
  focus: {
    title: "Today’s Focus",
    remainingLabel: "Preview tasks remaining.",
    addLabel: "Add Task",
    tasks: [
      { title: "Review Priority Account Alerts", time: "09:00 AM", priority: "Priority" },
      { title: "Follow up on Revenue Boost Opportunity", time: "09:00 AM" },
      { title: "Prepare Portfolio Review", time: "09:00 AM" }
    ]
  },
  portfolio: {
    title: "Portfolio Accounts",
    searchPlaceholder: "Filter by Account Name or ID...",
    showingTemplate: "Showing 1–8 of 11 accounts",
    filters: [
      { id: "all", label: "All (11)" },
      { id: "critical", label: "Critical (3)" },
      { id: "at-risk", label: "At Risk (3)" },
      { id: "healthy", label: "Healthy (5)" }
    ],
    columns: ["Account Name", "Churn Score", "Δ Change", "Risk Level", "Churn Signal", "Cross-Sell Leads", "Total Lead ACV", "Actions"],
    rows: [
      { id: "SF-89210", name: "Acme Corporation", score: "-31%", scoreTone: "red", change: "↓-18", changeTone: "down", risk: "CRITICAL", signal: "ACTIVE — Auth rate -31%", leads: "2", acv: "$200K", action: true },
      { id: "SF-10002", name: "InTech Solutions", score: "-42%", scoreTone: "red", change: "↓-15", changeTone: "down", risk: "CRITICAL", signal: "ACTIVE — Volume drop -42%", leads: "1", acv: "$180K", action: true },
      { id: "SF-10003", name: "Globex Ltd", score: "-28%", scoreTone: "red", change: "↓-5", changeTone: "down", risk: "CRITICAL", signal: "PENDING", leads: "0", acv: "0", action: true },
      { id: "SF-10004", name: "Summit Ventures", score: "64%", scoreTone: "amber", change: "↓-8", changeTone: "down", risk: "AT RISK", signal: "MONITORING", leads: "0", acv: "0", action: true },
      { id: "SF-10005", name: "Atlas Financial", score: "50%", scoreTone: "amber", change: "↓-3", changeTone: "down", risk: "AT RISK", signal: "—", leads: "1", acv: "$180K", action: true },
      { id: "SF-10006", name: "Helios Industries", score: "32%", scoreTone: "amber", change: "+2", changeTone: "up", risk: "AT RISK", signal: "—", leads: "2", acv: "$320K", action: false },
      { id: "SF-10007", name: "Meridian Corp", score: "82%", scoreTone: "green", change: "+4", changeTone: "up", risk: "HEALTHY", signal: "—", leads: "3", acv: "$370K", action: false },
      { id: "SF-10008", name: "Apex Global Group", score: "85%", scoreTone: "green", change: "+1", changeTone: "up", risk: "HEALTHY", signal: "—", leads: "2", acv: "$220K", action: false }
    ]
  },
  signals: {
    title: "Active Churn Risk Signals",
    badge: "4 Active",
    viewAllLabel: "View All Signals ›",
    cards: [
      { tone: "critical", badge: "CRITICAL", account: "Acme Corporation", accountId: "SF-89210", state: "NEW", title: "Authorization Rate Drop", signal: "Signal: Auth rate dropped 31% below baseline (< -25% threshold) over 7-day rolling window", impact: "Impact: $145K monthly revenue at risk", date: "26 Aug 2026" },
      { tone: "high", badge: "HIGH", account: "InTech Solutions", accountId: "SF-10002", state: "DEFERRED", title: "Volume Anomaly Detected", signal: "Signal: Transaction volume dropped 42% vs 30-day baseline - statistically significant deviation", impact: "Impact: $89K monthly revenue at risk", date: "24 Aug 2026" },
      { tone: "low", badge: "LOW", account: "Globex Ltd", accountId: "SF-10003", state: "PENDING", title: "Early Warning", signal: "Signal: Volume variance pending confirmation - awaiting next billing cycle data", impact: "Impact: $178K monthly revenue", date: "25 Aug 2026" }
    ]
  },
  leads: {
    title: "Recommended Cross-Sell Leads",
    viewAllLabel: "View All Recommended Leads ›",
    cards: [
      { account: "Acme Corporation", accountId: "SF-89210", product: "Revenue Boost", acv: "$18K", roi: "$25K" },
      { account: "Summit Nutritions", accountId: "SF-10011", product: "FX Optimisation", acv: "$16K", roi: "$22K" },
      { account: "Meridian Corp", accountId: "SF-10007", product: "Revenue Boost", acv: "$14K", roi: "$20K" }
    ]
  },
  pathways: {
    title: "Recommended Actions",
    summary: "18 Active | 3 Overdue | 12 On Track | 3 Completed This Month",
    viewAllLabel: "View Full Timeline ›",
    columns: ["Account", "Pathway", "Stage", "Owner", "Target Date", "SLA Status", "Dependencies", "Action"],
    rows: [
      { account: "Acme Corporation", pathway: "Smart Routing Integration", stage: "Implementation", owner: "J. Smith (IM)", date: "15 Sep 2026", status: "OVERDUE (3 days)", statusTone: "overdue", dependency: "API credentials pending", action: "Chase" },
      { account: "Acme Corporation", pathway: "Tokenisation Onboarding", stage: "Technical Review", owner: "A. Kumar (SC)", date: "20 Sep 2026", status: "ON TRACK", statusTone: "track", dependency: "—", action: "View" },
      { account: "InTech Solutions", pathway: "PCI Compliance Renewal", stage: "Documentation", owner: "P. Mehta (CSM)", date: "30 Sep 2026", status: "ON TRACK", statusTone: "track", dependency: "Awaiting merchant sign-off", action: "View" },
      { account: "Summit Ventures", pathway: "Multi-Currency Setup", stage: "Boarding", owner: "L. Chen (IM)", date: "10 Sep 2026", status: "AT RISK", statusTone: "risk", dependency: "Dependent on legal review", action: "Escalate" },
      { account: "Globex Ltd", pathway: "FX Optimisation Engine", stage: "Discovery", owner: "J. Smith (SC)", date: "25 Sep 2026", status: "ON TRACK", statusTone: "track", dependency: "—", action: "View" },
      { account: "Helios Industries", pathway: "Real-time Billing Pilot", stage: "UAT", owner: "M. Chen (IM)", date: "05 Oct 2026", status: "ON TRACK", statusTone: "track", dependency: "—", action: "View" }
    ],
    legend: [
      { tone: "track", label: "On Track" },
      { tone: "risk", label: "At Risk" },
      { tone: "overdue", label: "Overdue" },
      { tone: "done", label: "Completed" }
    ]
  },
  footer: {
    note: "Portfolio data refreshed every 15 minutes. Source: Snowflake → Analytics Engine → Salesforce. Manager visibility enabled.",
    date: "Tuesday, 26 Aug 2026"
  }
};
