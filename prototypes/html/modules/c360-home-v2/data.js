/* Mock for the c360-home-v2 preview. Logical names match schema/c360-home-v2.csv. */
var C360_HOME_V2 = {
  brandName: "Customer360",
  navSectionLabel: "Workspace",
  navigation: [
    { id: "home", label: "Home", icon: "house" },
    { id: "alerts", label: "Alerts", icon: "alert", count: 4 },
    { id: "cross-sell", label: "Cross-sell", icon: "refresh" },
    { id: "churn", label: "Churn", icon: "shield" },
    { id: "analytics", label: "Analytics", icon: "chart" },
    { id: "reports", label: "Reports", icon: "file" },
    { id: "settings", label: "Settings", icon: "settings" }
  ],
  userName: "Jordan Lee",
  userTeam: "Growth team",
  userInitials: "JL",
  searchPlaceholder: "Search your workspace",
  createLabel: "Create new",
  todayLabel: "Thursday, May 16",
  greeting: "Good morning, Jordan",
  homeSubtitle: "Your team is on track. Here is where to focus today.",
  filterLabel: "Filter",
  periodLabel: "This quarter",
  copilotLabel: "Ask Customer360",
  intelligence: {
    label: "Customer360 intelligence",
    heading: "Three deals need your attention",
    bodyTemplate:
      "{accountName} is ready for a decision. Send the revised proposal today to improve your close probability by {closeProbabilityDeltaPct}.",
    accountName: "Northstar Labs",
    closeProbabilityDeltaPct: "12%",
    actionLabel: "See recommendations",
    dismissLabel: "Dismiss insight"
  },
  metrics: [
    {
      label: "Revenue forecast",
      value: "$284k",
      change: "+18.2%",
      detail: "vs. last month",
      icon: "dollar",
      tone: "violet"
    },
    {
      label: "Qualified pipeline",
      value: "$1.24m",
      change: "+8.4%",
      detail: "32 active deals",
      icon: "target",
      tone: "blue"
    },
    {
      label: "Win rate",
      value: "68%",
      change: "+4.6%",
      detail: "vs. team average",
      icon: "chart",
      tone: "green"
    }
  ],
  activity: {
    label: "Team activities",
    value: "142",
    liveLabel: "Live",
    people: [
      { initials: "JL", tone: "dark" },
      { initials: "AM", tone: "peach" },
      { initials: "RK", tone: "mint" }
    ],
    overflowCount: 5
  },
  revenue: {
    title: "Revenue overview",
    subtitle: "Closed and projected revenue",
    periodLabel: "Last 7 months",
    amount: "$284,320",
    change: "18.2% increase",
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    points: [18, 27, 23, 38, 32, 47, 44, 58, 54, 67, 64, 82, 78, 92]
  },
  focus: {
    title: "Today\u2019s focus",
    remainingTemplate: "{count} tasks remaining",
    addLabel: "Add a task",
    tasks: [
      { id: 1, title: "Send revised proposal to Northstar", time: "10:30 AM", priority: true },
      { id: 2, title: "Review Supernova security notes", time: "1:00 PM", priority: false },
      { id: 3, title: "Prep for Arc Systems discovery", time: "3:30 PM", priority: false }
    ]
  },
  opportunities: {
    title: "Priority opportunities",
    subtitle: "Ranked by momentum and buying signals",
    viewLabel: "View pipeline",
    columns: ["Company", "Stage", "Value", "Close date", "AI confidence"],
    rows: [
      {
        companyName: "Northstar Labs",
        initials: "NL",
        contactName: "Amara Okafor",
        stage: "Proposal",
        amount: "$84,000",
        closeDate: "May 24",
        confidence: 92,
        tone: "lilac"
      },
      {
        companyName: "Supernova",
        initials: "SN",
        contactName: "Liam Carter",
        stage: "Negotiation",
        amount: "$61,500",
        closeDate: "May 28",
        confidence: 87,
        tone: "mint"
      },
      {
        companyName: "Arc Systems",
        initials: "AS",
        contactName: "Sofia Reyes",
        stage: "Discovery",
        amount: "$42,800",
        closeDate: "Jun 04",
        confidence: 74,
        tone: "peach"
      },
      {
        companyName: "Canvas Health",
        initials: "CH",
        contactName: "Noah Williams",
        stage: "Qualified",
        amount: "$36,200",
        closeDate: "Jun 12",
        confidence: 68,
        tone: "sky"
      }
    ]
  }
};
