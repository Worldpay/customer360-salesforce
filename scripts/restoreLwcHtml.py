"""Restore LWC HTML from agent transcript Write calls and strip MSO pollution."""

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LWC = ROOT / "force-app" / "main" / "default" / "lwc"
TRANSCRIPT = Path(
    r"C:\Users\Jemima Bradley\.cursor\projects\c-Users-Jemima-Bradley-OneDrive-McKinsey-Company-Worldpay-AI-Enabled-Sales-Excellence-C360-Handover\agent-transcripts\5817e6bf-c056-4385-9fb9-c3a2e02df12d\5817e6bf-c056-4385-9fb9-c3a2e02df12d.jsonl"
)

MSO_PATTERN = re.compile(r"<html xmlns:mso.*?(?:</head>|$)", re.DOTALL)

SUFFIXES = {
    "c360AccountsTableEx05.html": """
                </tbody>
            </table>
        </div>
        <p class="provenance">{provenance}</p>
    </article>
</template>
""",
    "c360ChurnTableEx05.html": """
                </tbody>
            </table>
        </div>
    </article>
</template>
""",
    "c360CrossSellTableEx05.html": """
                </tbody>
            </table>
        </div>
    </article>
</template>
""",
    "c360PortfolioHealthEx05.html": """
        </div>
    </article>
</template>
""",
    "c360KpiStripEx05.html": """
        </div>
    </section>
</template>
""",
    "c360NeedsActionEx05.html": """
        </div>
    </article>
</template>
""",
    "c360SignalListEx05.html": """
                <template lwc:else>
                    <div class="signal-actions row-actions">
                        <button class="button" data-id={signal.id} onclick={handleAction}>Action</button>
                        <button class="button" data-id={signal.id} onclick={handleDismiss}>Dismiss</button>
                    </div>
                </template>
            </div>
        </template>
        <template lwc:if={noSignals}>
            <p class="empty">No signals in queue.</p>
        </template>
    </div>
</template>
""",
}

ALERT_CENTRE = """<template>
    <section class="alert-centre">
        <section class="page-heading">
            <div>
                <h1>Alert Centre</h1>
                <p>Churn alerts for pilot RM group | RM notification on material score movement</p>
            </div>
            <span class="pilot-badge">PILOT</span>
        </section>

        <div class="filters">
            <template for:each={statusOptions} for:item="option">
                <button key={option.value} class={option.className} data-status={option.value} onclick={handleFilter}>{option.value}</button>
            </template>
        </div>

        <div class="two-column">
            <article class="panel">
                <div class="panel-header">
                    <lightning-icon icon-name="utility:warning" size="x-small"></lightning-icon>
                    <h2>Active alerts</h2>
                    <span>{filteredAlerts.length} shown</span>
                </div>
                <div class="table-scroll">
                    <table>
                        <thead>
                            <tr>
                                <th>Account</th>
                                <th>Score</th>
                                <th>Alert date</th>
                                <th>Suppression</th>
                                <th>RM notification</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <template for:each={filteredAlerts} for:item="alert">
                                <tr key={alert.id}>
                                    <td>{alert.account}</td>
                                    <td>{alert.score}%</td>
                                    <td>{alert.alertDate}</td>
                                    <td>{alert.suppression}</td>
                                    <td>{alert.rmNotification}</td>
                                    <td>{alert.status}</td>
                                    <td><button class="button" data-id={alert.id} onclick={handleOpenAlert}>Open</button></td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
                <p class="footnote">1-month suppression per merchant after Defer. Status workflow: New → In Review → Action Scheduled → Suppressed.</p>
            </article>

            <article class="panel">
                <div class="panel-header">
                    <lightning-icon icon-name="utility:add" size="x-small"></lightning-icon>
                    <h2>Cross-selling intelligence</h2>
                </div>
                <div class="panel-body intel">
                    <p><strong>Pipeline value:</strong> {intelPipelineLabel}</p>
                    <p><strong>Average confidence:</strong> {intelAverageConfidence}</p>
                    <ul>
                        <template for:each={intelRows} for:item="row">
                            <li key={row.key}>{row.label}</li>
                        </template>
                    </ul>
                </div>
            </article>
        </div>
    </section>
</template>
"""

ALERT_DETAIL = """<template>
    <section class="alert-detail">
        <button class="crumb" onclick={handleBack}>Alert Centre</button>
        <section class="page-heading">
            <div>
                <h1>Alert detail — {detail.account}</h1>
                <p>Score {detail.score}% | ARR {detail.arr} | {detail.merchantCount} merchants</p>
            </div>
            <div class="actions">
                <button class="button" data-action="resolve" onclick={handleAction}>Mark resolved</button>
                <button class="button" data-action="defer" onclick={handleAction}>Defer signal</button>
                <button class="button" data-action="dismiss" onclick={handleAction}>Dismiss</button>
                <button class="button primary" data-action="escalate" onclick={handleAction}>Escalate to manager</button>
            </div>
        </section>

        <div class="two-column">
            <article class="panel">
                <div class="panel-header"><h2>6-month score trajectory</h2></div>
                <div class="chart">
                    <template for:each={trajectoryBars} for:item="bar">
                        <i key={bar.key} class={bar.className} style={bar.style}></i>
                    </template>
                </div>
            </article>
            <article class="panel">
                <div class="panel-header"><h2>Top drivers</h2></div>
                <div class="panel-body">
                    <template for:each={drivers} for:item="driver">
                        <div key={driver.label} class="driver">
                            <span>{driver.label}</span>
                            <div class="bar-track"><i style={driver.widthStyle}></i></div>
                            <strong>{driver.impact}</strong>
                        </div>
                    </template>
                </div>
            </article>
        </div>

        <article class="panel section-panel">
            <div class="panel-header"><h2>Cross-sell intelligence</h2></div>
            <div class="panel-body">
                <p><strong>Pipeline:</strong> {detail.crossSellIntel.pipeline}</p>
                <p><strong>Confidence:</strong> {detail.crossSellIntel.confidence}%</p>
                <ul>
                    <template for:each={detail.crossSellIntel.products} for:item="product">
                        <li key={product}>{product}</li>
                    </template>
                </ul>
            </div>
        </article>

        <article class="panel section-panel">
            <div class="panel-header"><h2>Record outcome</h2></div>
            <div class="panel-body form-grid">
                <label>Interaction date<input type="date"></label>
                <label>Interaction type
                    <select>
                        <template for:each={interactionOptions} for:item="opt">
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        </template>
                    </select>
                </label>
                <label>Outcome
                    <select>
                        <template for:each={outcomeOptions} for:item="opt">
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        </template>
                    </select>
                </label>
                <label>Follow-up actions<textarea rows="3" placeholder="Notes for manager visibility"></textarea></label>
            </div>
        </article>
    </section>
</template>
"""

DASHBOARD = """<template>
    <div class="protobar">
        Wireframe IA (side nav) + design system tokens — schema v3 account deep-dives — <b>illustrative data only</b>
    </div>
    <div class="app-shell">
        <aside class="app-sidebar" aria-label="Customer 360 navigation">
            <div class="sidebar-brand">
                <span class="cube" aria-hidden="true"></span>
                <div>
                    <strong>Customer 360</strong>
                    <span class="pilot-badge">PILOT</span>
                </div>
            </div>
            <nav class="side-nav">
                <template for:each={navItems} for:item="item">
                    <button
                        key={item.value}
                        type="button"
                        class={item.className}
                        data-view={item.value}
                        disabled={item.disabled}
                        onclick={handleNavigate}
                    >
                        {item.label}
                        <template lwc:if={item.count}>
                            <span class="side-count">{item.count}</span>
                        </template>
                    </button>
                </template>
            </nav>
            <div class="sidebar-user">
                <span class="avatar" title="Sarah Jenkins">SJ</span>
                <div>
                    <strong>Sarah Jenkins</strong>
                    <span>RM — Enterprise</span>
                </div>
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
                <template lwc:if={isOverview}>
                    <section class="page-heading">
                        <div>
                            <h1>Enterprise Account Hub</h1>
                            <p>Tuesday, 26 August 2026 | 42 accounts | Here's what needs your attention today.</p>
                        </div>
                        <button class="button" onclick={handleExportPdf}>Export PDF</button>
                    </section>
                    <div class="material-banner">
                        <span aria-hidden="true">&#8599;</span>
                        <span>Material changes: 3 accounts moved to At risk this week | Revenue at risk GBP 2.8m</span>
                    </div>
                    <div class="kpi-grid">
                        <c-c360-kpi-tile-ex05 label="Total accounts" value="42" detail="Enterprise and eCommerce"></c-c360-kpi-tile-ex05>
                        <c-c360-kpi-tile-ex05 label="Composite health index" value="72.4" detail="+0.6 vs last month"></c-c360-kpi-tile-ex05>
                        <c-c360-kpi-tile-ex05 label="Signals to action" value={openSignalCount} detail={openSignalSummary} variant="attention"></c-c360-kpi-tile-ex05>
                        <c-c360-kpi-tile-ex05 label="At-risk accounts" value="3" detail="Watch list expanded"></c-c360-kpi-tile-ex05>
                        <c-c360-kpi-tile-ex05 label="Revenue at risk" value="GBP 2.8m" detail="Pilot portfolio"></c-c360-kpi-tile-ex05>
                    </div>
                    <div class="two-column">
                        <c-c360-needs-action-ex05 onaccountopen={handleOpenAccount}></c-c360-needs-action-ex05>
                        <c-c360-portfolio-health-ex05></c-c360-portfolio-health-ex05>
                    </div>
                    <article class="panel section-panel">
                        <div class="panel-header">
                            <lightning-icon icon-name="utility:priority" size="x-small"></lightning-icon>
                            <h2>My signals</h2>
                            <span>{openSignalCount} open</span>
                        </div>
                        <c-c360-signal-list-ex05 signals={signals} onsignalaction={handleSignalAction} onsignaldismiss={handleSignalDismiss}></c-c360-signal-list-ex05>
                    </article>
                    <c-c360-accounts-table-ex05 max-rows="7" onaccountopen={handleOpenAccount}></c-c360-accounts-table-ex05>
                </template>

                <template lwc:if={isAlertCentre}>
                    <c-c360-alert-centre-ex05 onalertselect={handleAlertSelect}></c-c360-alert-centre-ex05>
                </template>

                <template lwc:if={isAlertDetail}>
                    <c-c360-alert-detail-ex05 alert-id={selectedAlertId} onback={handleAlertBack} onalertaction={handleAlertAction}></c-c360-alert-detail-ex05>
                </template>

                <template lwc:if={isChurn}>
                    <section class="page-heading">
                        <div><h1>Churn</h1><p>Predicted volume compression and retraction, 3-6 months ahead</p></div>
                    </section>
                    <c-c360-churn-table-ex05 onaccountopen={handleOpenAccount}></c-c360-churn-table-ex05>
                </template>

                <template lwc:if={isCrossSell}>
                    <section class="page-heading">
                        <div><h1>Cross-Sell</h1><p>Revenue Boost is the priority product for this phase</p></div>
                    </section>
                    <c-c360-cross-sell-table-ex05 onaccountopen={handleOpenAccount}></c-c360-cross-sell-table-ex05>
                </template>

                <template lwc:if={isAccount}>
                    <c-c360-account-detail-ex05
                        account={selectedAccount}
                        source-view={accountSourceView}
                        onnavigate={handleAccountNavigate}
                        onexport={handleAccountExport}
                        onaccountsubtab={handleAccountSubTab}
                    ></c-c360-account-detail-ex05>
                </template>
            </main>
        </div>
    </div>

    <template lwc:if={toastMessage}>
        <button class="toast" type="button" onclick={dismissToast}>{toastMessage}</button>
    </template>
</template>
"""


def strip_mso(text: str) -> str:
    while True:
        cleaned = MSO_PATTERN.sub("", text)
        if cleaned == text:
            break
        text = cleaned
    return text.rstrip()


def restore_from_transcript(name: str) -> str | None:
    if not TRANSCRIPT.exists():
        return None
    with TRANSCRIPT.open(encoding="utf-8") as handle:
        for line in handle:
            if name not in line or '"Write"' not in line:
                continue
            obj = json.loads(line)
            for part in obj.get("message", {}).get("content", []):
                if part.get("name") != "Write":
                    continue
                path = part.get("input", {}).get("path", "")
                if name in path.replace("\\", "/"):
                    return part["input"]["contents"]
    return None


TAB_BUTTON_OLD = (
    '<button key={tab.key} class={tab.className} type="button" '
    'data-tab={tab.key} onclick={handleTabClick}>{tab.label}</button>'
)
TAB_BUTTON_NEW = (
    '<button key={tab.key} class={tab.className} type="button" '
    'data-tab={tab.key} onclick={handleTabClick}>\n'
    '                            <span class="tab-ico">{tab.icon}</span> {tab.label}\n'
    "                        </button>"
)


def patch_account_detail(contents: str) -> str:
    contents = strip_mso(contents)
    contents = contents.replace(TAB_BUTTON_OLD, TAB_BUTTON_NEW)
    return contents.replace(
        '<article class="panel section-gap">',
        '<article class="panel section-gap driver-drill-panel">',
        1,
    )


def main() -> None:
    overrides = {
        "c360DashboardEx05.html": DASHBOARD,
        "c360AlertCentreEx05.html": ALERT_CENTRE,
        "c360AlertDetailEx05.html": ALERT_DETAIL,
    }

    account_detail = restore_from_transcript("c360AccountDetailEx05.html")
    if account_detail:
        overrides["c360AccountDetailEx05.html"] = patch_account_detail(account_detail)

    for html_path in LWC.rglob("*.html"):
        name = html_path.name
        if name in overrides:
            html_path.write_text(overrides[name].strip() + "\n", encoding="utf-8")
            print("override", name)
            continue

        raw = html_path.read_text(encoding="utf-8")
        cleaned = strip_mso(raw)
        needs_suffix = name in SUFFIXES and (
            not cleaned.rstrip().endswith("</template>")
            or (name == "c360SignalListEx05.html" and "handleDismiss" not in cleaned)
            or (name == "c360NeedsActionEx05.html" and cleaned.count("</article>") < 1)
        )
        if needs_suffix:
            cleaned = cleaned.rstrip() + SUFFIXES[name]
        html_path.write_text(cleaned.strip() + "\n", encoding="utf-8")
        print("fixed", name)

    # OneDrive may append MSO metadata immediately after write — strip again.
    for html_path in LWC.rglob("*.html"):
        raw = html_path.read_text(encoding="utf-8")
        cleaned = strip_mso(raw)
        if cleaned != raw:
            html_path.write_text(cleaned.strip() + "\n", encoding="utf-8")
            print("stripped", html_path.name)


if __name__ == "__main__":
    main()
