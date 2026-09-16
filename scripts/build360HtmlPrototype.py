#!/usr/bin/env python3
"""Assemble unified Customer 360 HTML prototype (Overview + Accounts Hub + All accounts IA)."""

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PROTO = ROOT / "prototypes" / "html"
OUT_MAIN = ROOT / "360 HTML prototype.html"
OUT_HUB = ROOT / "360 Accounts Hub prototype.html"

CSS_FILES = [
    PROTO / "shared" / "tokens.css",
    PROTO / "shared" / "module-base.css",
    PROTO / "shared" / "table-loading.css",
    ROOT / "force-app" / "main" / "default" / "lwc" / "c360DashboardEx05" / "c360DashboardEx05.css",
    ROOT / "force-app" / "main" / "default" / "lwc" / "c360AlertDetailEx05" / "c360AlertDetailEx05.css",
    PROTO / "modules" / "top-accounts" / "fragment.css",
    PROTO / "modules" / "material-banner" / "fragment.css",
    PROTO / "modules" / "kpi-strip" / "fragment.css",
    PROTO / "modules" / "needs-action" / "fragment.css",
    PROTO / "modules" / "portfolio-health" / "fragment.css",
    PROTO / "modules" / "signal-list" / "fragment.css",
    PROTO / "modules" / "accounts-table" / "fragment.css",
    PROTO / "modules" / "alert-centre" / "fragment.css",
    PROTO / "modules" / "churn-table" / "fragment.css",
    PROTO / "modules" / "cross-sell-table" / "fragment.css",
    PROTO / "modules" / "account-detail" / "fragment.css",
]

EXTRA_CSS = """
.view { display: none; }
.view.active { display: block; }
.accounts-sub-panel { display: none; }
.accounts-sub-panel.active { display: block; }
.home-priority-zone { margin-bottom: 8px; }
.home-priority-zone .hero-tiles-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-bottom: 0;
}
@media (max-width: 900px) {
  .home-priority-zone .hero-tiles-grid { grid-template-columns: 1fr; }
}
.home-health-kpi-row {
  display: grid;
  grid-template-columns: minmax(280px, 380px) minmax(0, 1fr);
  gap: 20px;
  align-items: start;
  margin-bottom: 16px;
}
@media (max-width: 960px) {
  .home-health-kpi-row { grid-template-columns: 1fr; }
}
.home-health-kpi-row .home-portfolio-health {
  margin-top: 0;
  margin-bottom: 0;
}
.home-health-kpi-row .c360-portfolio-health .health-row {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}
.home-health-kpi-row .c360-portfolio-health .health-row .mtile,
.home-health-kpi-row .c360-portfolio-health .health-row .mtile--link {
  flex: unset;
  width: auto;
}
@media (max-width: 520px) {
  .home-health-kpi-row .c360-portfolio-health .health-row {
    grid-template-columns: 1fr;
  }
}
.home-health-kpi-row .kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(148px, 1fr));
  gap: 12px;
  margin: 0;
}
.home-operations-snapshot {
  margin-top: 28px;
  padding-top: 24px;
  border-top: 1px solid var(--bd);
}
.home-operations-snapshot .snapshot-title {
  margin: 0 0 16px;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--muted);
}
.accounts-subnav {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 16px;
}
.accounts-subnav button {
  border: 1px solid var(--bd);
  background: var(--card);
  border-radius: var(--radius);
  padding: 8px 14px;
  font-size: 13px;
  font-weight: 600;
  color: var(--muted);
  cursor: pointer;
}
.accounts-subnav button.active {
  background: var(--navy);
  border-color: var(--navy);
  color: #fff;
}
.c360-alert-centre .alert-heading .pilot-badge {
  display: inline-block;
  margin-top: 0;
  padding: 2px 10px;
  border-radius: 10px;
  background: transparent;
  color: var(--wp);
  border: 1px solid var(--wp);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: normal;
}
.c360-account-detail .acct-layout {
  display: grid;
  grid-template-columns: 200px minmax(0, 1fr);
  gap: 16px;
  margin-top: 16px;
  align-items: start;
}
.c360-account-detail .acct-side {
  background: var(--card);
  border: 1px solid var(--bd);
  border-radius: var(--radius);
  padding: 16px;
  box-shadow: var(--shadow);
}
.c360-account-detail .acct-side-h h2 { margin: 0; font-size: 16px; color: var(--navy); }
.c360-account-detail .acct-side-h p { margin: 4px 0 0; font-size: 12px; color: var(--muted); }
.c360-account-detail .acct-side-nav { display: flex; flex-direction: column; gap: 4px; margin-top: 12px; }
.c360-account-detail .acct-side-nav .subtab {
  text-align: left;
  border-bottom: 0;
  border-radius: var(--radius);
}
.c360-account-detail .acct-side-nav .subtab.active {
  background: var(--sf-blue-l);
  border-bottom: 0;
}
.alert-detail .bar-track {
  height: 0.5rem;
  overflow: hidden;
  border-radius: 1rem;
  background: #e5e5e5;
}
#toast.toast-proto {
  opacity: 0;
  pointer-events: none;
  transition: 0.25s;
}
#toast.toast-proto.show {
  opacity: 1;
  pointer-events: auto;
}
.accounts-hub-cta {
  margin: 0 0 16px;
  padding-top: 12px;
  border-top: 1px solid var(--bd);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
}
@media (max-width: 900px) {
  .c360-account-detail .acct-layout { grid-template-columns: 1fr; }
}
"""

OVERVIEW_MOCK_VARS = """
var SIGNALS = [
  { id: 'pets-boost', category: 'Cross-sell', badgeClass: 'badge cross-sell', title: 'Pets at Home - Revenue Boost and MAU candidate', description: 'High 05-decline volume and ageing card data suitable for Managed Account Updater.', signalStatus: 'open' },
  { id: 'willow-risk', category: 'Churn', badgeClass: 'badge churn', title: 'Willow Travel - Volume compression -18% / 60 days', description: 'Brazil market under plan; contract renewal window approaching.', signalStatus: 'open' },
  { id: 'northwind-boost', category: 'Cross-sell', badgeClass: 'badge cross-sell', title: 'Northwind Foods - Revenue Boost', description: 'Non-MIT scheme fees rising on recurring transactions.', signalStatus: 'open' },
  { id: 'deep-blue-risk', category: 'Churn', badgeClass: 'badge churn', title: 'Deep Blue Retail - Auth-rate decline and servicing tickets up', description: 'Auth rate down 4.1 percentage points over three days; three open tickets.', signalStatus: 'open' },
  { id: 'aurora-fx', category: 'Cross-sell', badgeClass: 'badge fx', title: 'Aurora Gaming - FX opportunity', description: 'Settlement across six currencies with material FX exposure.', signalStatus: 'open' }
];

var KPI_TILES = [
  { label: 'Total accounts', value: '42', detail: 'Enterprise and eCommerce', attention: false },
  { label: 'Composite health index', value: '72.4', detail: '+0.6 vs last month', attention: false },
  { label: 'Signals to action', value: '5', detail: '2 churn | 3 cross-sell', attention: true, dynamic: true },
  { label: 'At-risk accounts', value: '3', detail: 'Watch list expanded', attention: false },
  { label: 'Revenue at risk', value: 'GBP 2.8m', detail: 'Pilot portfolio', attention: false }
];

var NEEDS_ACTION_ITEMS = [
  { id: 'na-1', severity: 'now', severityLabel: 'Intraday', heading: 'Pets at Home - volume down 24% today', body: 'Possible incident or traffic shift. Brazil and UK gateways affected.', meta: 'Detected 08:12 | MID-level drop across 4 MIDs', accountName: 'Pets at Home', buttonLabel: 'Review', primary: true },
  { id: 'na-2', severity: 'day', severityLabel: 'Daily', heading: 'Deep Blue Retail - 3-day auth-rate decline', body: 'Concentrated on 05 do-not-honour decline code.', meta: 'Rolling 3-day window', accountName: 'Deep Blue Retail', buttonLabel: 'Open', primary: false },
  { id: 'na-3', severity: 'month', severityLabel: 'Monthly', heading: 'Willow Travel - compression risk rising to High', body: 'Volume down 18% over 60 days; Brazil market under plan.', meta: 'Monthly churn model refresh', accountName: 'Willow Travel', buttonLabel: 'Open', primary: false }
];

var MATERIAL_BANNER = {
  message: 'Material changes: 3 accounts moved to At risk this week | Revenue at risk GBP 2.8m'
};
"""

MOCK_EXTRA = """
var PATHWAYS = [
  { id: 'pets-boost', account: 'Pets at Home', name: 'Revenue Boost pitch', stage: 'Solutioning', owner: 'Implementation Manager', date: '12 Sep', status: 'On track', statusClass: 'good', scope: 'me' },
  { id: 'pets-review', account: 'Pets at Home', name: 'Pricing and performance review', stage: 'CDD review', owner: 'CDD / Legal', date: '20 Sep', status: 'At risk', statusClass: 'watch', scope: 'me' },
  { id: 'willow-review', account: 'Willow Travel', name: 'Pricing review', stage: 'Discovery', owner: 'Relationship Manager', date: '28 Sep', status: 'On track', statusClass: 'good', scope: 'me' }
];

var DECLINE_CHART_COLORS = ['#0176d3', '#ba0517', '#dd7a01', '#2e844a', '#706e6b'];

function fmtMoney(n) {
  if (n >= 1000000) return '$' + (n / 1000000).toFixed(2) + 'M';
  if (n >= 1000) return '$' + Math.round(n / 1000) + 'K';
  return '$' + n;
}

var ALERT_DETAIL_BY_ID = {
  'alert-acme': {
    id: 'alert-acme', account: 'Acme Corporation', score: -32, arr: 'GBP 14.2m', merchantCount: 42,
    trajectory: [12, 8, 4, -2, -8, -18],
    drivers: [
      { label: 'Volume compression - UK gateway', impact: '+38%', width: '88%' },
      { label: 'Auth-rate decline on 05 code', impact: '+24%', width: '62%' },
      { label: 'Competitor pricing signal', impact: '-8%', width: '28%' }
    ],
    crossSell: { pipeline: 'GBP 2.1m', confidence: 78, products: ['Smart Routing', 'FX Optimisation Engine'] }
  },
  'alert-intech': {
    id: 'alert-intech', account: 'InTech Solutions', score: -28, arr: 'USD 9.8m', merchantCount: 28,
    trajectory: [6, 2, -1, -6, -12, -22],
    drivers: [
      { label: 'Settlement delay complaints', impact: '+31%', width: '76%' },
      { label: 'FX exposure unmanaged', impact: '+18%', width: '48%' }
    ],
    crossSell: { pipeline: 'USD 1.4m', confidence: 65, products: ['Tokenisation', 'Instant Payout APIs'] }
  },
  'alert-willow': {
    id: 'alert-willow', account: 'Willow Travel', score: -22, arr: 'GBP 6.1m', merchantCount: 12,
    trajectory: [4, 0, -4, -10, -16, -22],
    drivers: [{ label: 'Brazil volume compression', impact: '+42%', width: '90%' }],
    crossSell: { pipeline: 'GBP 0.6m', confidence: 58, products: ['FX Optimisation Engine'] }
  },
  'alert-pets': {
    id: 'alert-pets', account: 'Pets at Home', score: -19, arr: 'GBP 11.3m', merchantCount: 18,
    trajectory: [8, 6, 2, -2, -6, -12],
    drivers: [{ label: 'Intraday volume drop', impact: '+35%', width: '80%' }],
    crossSell: { pipeline: 'GBP 1.4m', confidence: 82, products: ['Revenue Boost', 'Managed Account Updater'] }
  }
};

ALERTS.forEach(function (a) {
  if (a.threshold === undefined) a.threshold = -25;
  if (a.rmTask === undefined) a.rmTask = a.rmNotification || 'Task created';
});

ACCOUNTS.forEach(function (a) {
  if (a.pathways === undefined) a.pathways = 1;
});

KPI_TILES.forEach(function (t) {
  if (t.label === 'Signals to action') t.dynamic = true;
});
"""

BODY_HTML = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title}</title>
  <style>
{css}
  </style>
</head>
<body>
  <div class="protobar">{protobar}</div>
  <div class="app-shell">
    <aside class="app-sidebar" aria-label="Customer 360 navigation">
      <div class="sidebar-brand">
        <span class="cube" aria-hidden="true"></span>
        <div><strong>Customer 360</strong><span class="pilot-badge">PILOT</span></div>
      </div>
      <nav class="side-nav" id="side-nav">
        <button type="button" class="side-nav-item active" data-nav-view="overview">Home</button>
        <button type="button" class="side-nav-item" data-nav-view="alertcentre">Alert Centre <span class="side-count">3</span></button>
        <button type="button" class="side-nav-item side-nav-placeholder" disabled>Analytics</button>
        <button type="button" class="side-nav-item side-nav-placeholder" disabled>Customers</button>
        <button type="button" class="side-nav-item" data-nav-view="allaccounts">All accounts</button>
        <button type="button" class="side-nav-item" data-nav-view="churn">Churn</button>
        <button type="button" class="side-nav-item" data-nav-view="crosssell">Cross-sell</button>
        <button type="button" class="side-nav-item side-nav-placeholder" disabled>Reports</button>
        <button type="button" class="side-nav-item side-nav-placeholder" disabled>Settings</button>
      </nav>
      <div class="sidebar-user">
        <span class="avatar" title="Sarah Jenkins">SJ</span>
        <div><strong>Sarah Jenkins</strong><span>RM — Enterprise</span></div>
      </div>
    </aside>
    <div class="app-main">
      <header class="global-header">
        <div class="search-wrap">
          <span aria-hidden="true">&#128269;</span>
          <input type="search" placeholder="Search customers, alerts, accounts..." aria-label="Search">
        </div>
      </header>
      <main class="page-content">
        <div class="view active" data-view-panel="overview">
          <section class="page-heading">
            <div>
              <h1>Enterprise Account Hub</h1>
              <p>Tuesday, 26 August 2026 | 42 accounts | Here's what needs your attention today.</p>
            </div>
            <button type="button" class="button" id="export-pdf-btn">Export PDF</button>
          </section>
          <div class="home-priority-zone">
            {top_accounts}
            <div class="accounts-hub-cta">
              <p style="margin:0;font-size:13px;color:var(--muted);">View all accounts with health, model outputs, and product facts.</p>
              <button type="button" class="button primary" id="go-accounts-table">Open full accounts table</button>
            </div>
            <div class="home-health-kpi-row">
              <div class="home-portfolio-health">{portfolio_health}</div>
              <div class="home-kpi-strip" aria-label="Portfolio KPIs">
                <div class="kpi-grid" id="kpi-grid"></div>
              </div>
            </div>
          </div>
          <div class="home-operations-snapshot">
            <h2 class="snapshot-title">Operations snapshot</h2>
            <div class="material-banner"><span aria-hidden="true">&#8599;</span><span id="material-banner-text"></span></div>
            <section class="c360-module c360-needs-action card alerts" style="margin-top:16px;">
              <div class="card-h"><span class="ico" style="background:var(--red);">&#9888;</span><h2>Needs action today</h2><span class="sub">Intraday · Daily · Monthly</span></div>
              <div id="needs-action-list"></div>
            </section>
            <article class="panel section-panel">
              <div class="panel-header"><h2>My signals</h2><span id="sig-count">5 open</span></div>
              <div id="signals"></div>
            </article>
          </div>
        </div>

        <div class="view" data-view-panel="alertcentre">{alert_centre}</div>
        <div class="view" data-view-panel="alertdetail"><div id="alert-detail-root" class="alert-detail"></div></div>

        <div class="view" data-view-panel="allaccounts">
          <div class="accounts-sub-panel active" data-accounts-sub-panel="portfolio">
            <section class="page-heading">
              <div>
                <h1>All accounts</h1>
                <p><span id="accounts-full-count">10 accounts</span> · filter by portfolio health</p>
              </div>
            </section>
            {accounts_table_hub}
          </div>
          <div class="accounts-sub-panel" data-accounts-sub-panel="churn">
            <section class="page-heading"><div><h1>Churn</h1><p>Predicted volume compression and retraction, 3-6 months ahead</p></div></section>
            {churn_table}
          </div>
          <div class="accounts-sub-panel" data-accounts-sub-panel="crosssell">
            <section class="page-heading"><div><h1>Cross-Sell</h1><p>Revenue Boost is the priority product for this phase</p></div></section>
            {cross_sell_table}
          </div>
        </div>

        <div class="view" data-view-panel="account">{account_detail}</div>
      </main>
    </div>
  </div>
  <div id="toast" class="toast toast-proto" role="status"></div>
  <script>
{table_loading_js}
{table_expand_js}
{mock_data}
{overview_mock_vars}
{mock_extra}
{account_detail_data}
{module_js}
{spa_app}
  </script>
</body>
</html>
"""


def clean_fragment(text: str) -> str:
    marker = "<html xmlns:mso"
    if marker in text:
        text = text.split(marker)[0]
    return text.strip()


def read_css() -> str:
    chunks = []
    for path in CSS_FILES:
        raw = path.read_text(encoding="utf-8")
        raw = raw.replace(":host", "body")
        raw = raw.replace(".dashboard, body", "body")
        chunks.append(f"/* {path.name} */\n{raw}")
    chunks.append(EXTRA_CSS)
    return "\n".join(chunks)


def read_body_fragments() -> dict:
    names = ["alert-centre", "portfolio-health", "churn-table", "cross-sell-table", "account-detail"]
    out = {}
    for name in names:
        path = PROTO / "modules" / name / "fragment.html"
        out[name] = clean_fragment(path.read_text(encoding="utf-8"))
    out["top-accounts"] = clean_fragment(
        (PROTO / "modules" / "top-accounts" / "fragment.html").read_text(encoding="utf-8")
    )
    out["accounts-table-hub"] = clean_fragment(
        (PROTO / "modules" / "accounts-table" / "fragment-hub.html").read_text(encoding="utf-8")
    )
    return out


def read_module_js() -> str:
    paths = [
        PROTO / "modules" / "top-accounts" / "fragment.js",
        PROTO / "modules" / "portfolio-health" / "fragment.js",
        PROTO / "modules" / "accounts-table" / "fragment-hub.js",
    ]
    return "\n".join(p.read_text(encoding="utf-8") for p in paths)


def assemble(out_path: Path, title: str, protobar: str) -> None:
    frags = read_body_fragments()
    html = BODY_HTML.format(
        title=title,
        protobar=protobar,
        css=read_css(),
        alert_centre=frags["alert-centre"],
        top_accounts=frags["top-accounts"],
        portfolio_health=frags["portfolio-health"],
        accounts_table_hub=frags["accounts-table-hub"],
        churn_table=frags["churn-table"],
        cross_sell_table=frags["cross-sell-table"],
        account_detail=frags["account-detail"],
        table_loading_js=(PROTO / "shared" / "table-loading.js").read_text(encoding="utf-8"),
        table_expand_js=(PROTO / "shared" / "table-expand.js").read_text(encoding="utf-8"),
        mock_data=(PROTO / "shared" / "accounts-hub-mock-data.js").read_text(encoding="utf-8"),
        overview_mock_vars=OVERVIEW_MOCK_VARS.strip(),
        mock_extra=MOCK_EXTRA.strip(),
        account_detail_data=(PROTO / "shared" / "account-detail-data.js").read_text(encoding="utf-8"),
        module_js=read_module_js(),
        spa_app=(PROTO / "assembly" / "c360-unified-spa-app.js").read_text(encoding="utf-8"),
    )
    out_path.write_text(html, encoding="utf-8", newline="\n")
    print(f"Wrote {out_path} ({len(html):,} bytes)")


def main() -> None:
    assemble(
        OUT_MAIN,
        "Customer 360 — HTML prototype",
        "Customer 360 HTML prototype — double-click to open · illustrative data only · no Salesforce required",
    )
    assemble(
        OUT_HUB,
        "Customer 360 — Accounts Hub prototype",
        "Customer 360 Accounts Hub — double-click to open · illustrative data only · no Salesforce required",
    )


if __name__ == "__main__":
    main()
