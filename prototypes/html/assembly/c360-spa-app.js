/* Customer 360 standalone SPA — assembled into 360 HTML prototype.html */
(function () {
  var state = {
    activeView: 'overview',
    selectedAlertId: 'alert-acme',
    selectedAccount: ACCOUNTS[0],
    accountSourceView: 'accounts',
    accountSubTab: 'ch',
    signals: SIGNALS.map(function (s) { return Object.assign({}, s); }),
    alertFilter: 'All',
    crossSellPrice: 0.05,
    crossSellAbSplit: 99,
    selectedDriverKey: null
  };

  var toastEl = document.getElementById('toast');
  var toastTimer;

  window.c360Toast = function (msg) {
    if (!toastEl) return;
    toastEl.innerHTML = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('show'); }, 3200);
  };

  function sourceToTab(source) {
    return source === 'crosssell' ? 'cx' : 'ch';
  }

  function accountTabToNavView(tabKey) {
    if (tabKey === 'cx') return 'crosssell';
    if (tabKey === 'ch') return 'churn';
    return 'overview';
  }

  function navHighlightView() {
    if (state.activeView === 'account') return accountTabToNavView(state.accountSubTab);
    if (state.activeView === 'alertdetail') return 'alertcentre';
    return state.activeView;
  }

  function setView(view) {
    state.activeView = view;
    document.querySelectorAll('[data-view-panel]').forEach(function (el) {
      el.classList.toggle('active', el.getAttribute('data-view-panel') === view);
    });
    var highlight = navHighlightView();
    document.querySelectorAll('[data-nav-view]').forEach(function (btn) {
      var v = btn.getAttribute('data-nav-view');
      btn.classList.toggle('active', v === highlight);
    });
    if (view === 'alertcentre') renderAlertCentre();
    if (view === 'alertdetail') renderAlertDetail();
    if (view === 'account') renderAccountDetail(state.selectedAccount);
  }

  window.C360App = { setView: setView, openAccount: openAccount };

  function openAccount(name, source) {
    var found = ACCOUNTS.find(function (a) { return a.name === name; });
    state.selectedAccount = found || ACCOUNTS[0];
    state.accountSourceView = source || 'accounts';
    state.accountSubTab = sourceToTab(state.accountSourceView);
    state.selectedDriverKey = null;
    setView('account');
    activateAccountTab(state.accountSubTab);
  }

  function openSignalCount() {
    return state.signals.filter(function (s) { return s.signalStatus === 'open'; }).length;
  }

  function openSignalSummary() {
    var open = openSignalCount();
    var churn = state.signals.filter(function (s) { return s.signalStatus === 'open' && s.category === 'Churn'; }).length;
    return churn + ' churn | ' + (open - churn) + ' cross-sell';
  }

  function renderOverview() {
    var banner = document.getElementById('material-banner-text');
    if (banner && MATERIAL_BANNER) banner.textContent = MATERIAL_BANNER.message || MATERIAL_BANNER.text || '';

    var kpiGrid = document.getElementById('kpi-grid');
    if (kpiGrid) {
      kpiGrid.innerHTML = KPI_TILES.map(function (tile) {
        var val = tile.dynamic ? String(openSignalCount()) : tile.value;
        var det = tile.dynamic ? openSignalSummary() : tile.detail;
        var cls = 'kpi' + (tile.attention ? ' attention' : '');
        return '<div class="' + cls + '"><div class="k-lbl">' + tile.label + '</div><div class="k-val">' + val + '</div><div class="k-sub">' + det + '</div></div>';
      }).join('');
    }

    var needsList = document.getElementById('needs-action-list');
    if (needsList) {
      needsList.innerHTML = NEEDS_ACTION_ITEMS.map(function (item) {
        var btnCls = item.primary ? 'btn p' : 'btn';
        return (
          '<div class="a">' +
          '<div class="row-tag"><span class="sev ' + item.severity + '">' + item.severityLabel + '</span></div>' +
          '<div class="a-txt">' +
          '<b>' + item.heading + '</b>' +
          '<div class="m">' + item.body + '</div>' +
          '<div class="meta">' + item.meta + '</div>' +
          '</div>' +
          '<div class="row-actions"><button type="button" class="' + btnCls + '" data-open-account="' + item.accountName + '" data-open-account-source="' + (item.sourceView || 'accounts') + '">' + item.buttonLabel + '</button></div>' +
          '</div>'
        );
      }).join('');
    }

    if (PORTFOLIO_HEALTH) {
      var h = PORTFOLIO_HEALTH;
      var tiles = document.getElementById('health-tiles');
      var pipeline = document.getElementById('pipeline-rows');
      if (tiles) {
        tiles.innerHTML = '<div class="mtile"><div class="mt-l">Healthy</div><div class="mt-v good">' + h.healthy + '</div></div><div class="mtile"><div class="mt-l">Watch</div><div class="mt-v watch">' + h.watch + '</div></div><div class="mtile"><div class="mt-l">At risk</div><div class="mt-v risk">' + h.atRisk + '</div></div>';
      }
      if (pipeline) {
        pipeline.innerHTML = h.pipeline.map(function (row) {
          return '<div class="drv"><div class="d-n"><b>' + row.name + '</b><div class="d-s">' + row.detail + '</div></div><div class="d-bar pos"><i style="width:' + row.width + '"></i></div><div class="d-pct">' + row.value + '</div></div>';
        }).join('');
      }
    }

    renderSignals();
    renderAccountsTable();
  }

  function renderAccountsTable() {
    var tbody = document.getElementById('accounts-tbody');
    if (!tbody) return;
    tbody.innerHTML = ACCOUNTS.slice(0, 7).map(function (a) {
      var deltaClass = a.healthDelta.indexOf('-') === 0 ? 'down' : 'up';
      return '<tr><td><button type="button" class="account-link" data-open-account="' + a.name + '" data-open-account-source="accounts">' + a.name + '</button></td><td>' + a.healthIndex + '</td><td class="' + deltaClass + '">' + a.healthDelta + '</td><td>' + a.industry + '</td><td>' + a.volume + '</td><td><span class="pill ' + a.healthClass + '">' + a.health + '</span></td><td><span class="pill ' + a.riskClass + '">' + a.risk + '</span></td><td>' + (a.pathways || '—') + '</td><td>Today</td></tr>';
    }).join('');
  }

  function renderSignals() {
    var container = document.getElementById('signals');
    var countEl = document.getElementById('sig-count');
    if (countEl) countEl.textContent = openSignalCount() + ' open';
    if (!container) return;
    container.innerHTML = state.signals.map(function (sig) {
      var done = sig.signalStatus !== 'open';
      var statusLabel = sig.signalStatus === 'actioned' ? 'Actioned' : (sig.signalStatus === 'dismissed' ? 'Dismissed' : '');
      if (done) {
        return '<div class="sig done"><span class="' + sig.badgeClass + '">' + sig.category + '</span><div class="s-txt"><div class="s-h">' + sig.title + '</div><div class="s-d">' + sig.description + '</div></div><span class="status-pill">' + statusLabel + '</span></div>';
      }
      return '<div class="sig" data-sig data-sig-id="' + sig.id + '"><span class="' + sig.badgeClass + '">' + sig.category + '</span><div class="s-txt"><div class="s-h">' + sig.title + '</div><div class="s-d">' + sig.description + '</div></div><div class="s-act"><button type="button" class="btn p sm" data-action-sig>Action</button><button type="button" class="btn sm" data-dismiss-sig>Dismiss</button></div></div>';
    }).join('');
    var kpiGrid = document.getElementById('kpi-grid');
    if (kpiGrid && document.querySelector('[data-view-panel="overview"]').classList.contains('active')) {
      renderOverviewKpisOnly();
    }
  }

  function renderOverviewKpisOnly() {
    var kpiGrid = document.getElementById('kpi-grid');
    if (!kpiGrid) return;
    kpiGrid.innerHTML = KPI_TILES.map(function (tile) {
      var val = tile.dynamic ? String(openSignalCount()) : tile.value;
      var det = tile.dynamic ? openSignalSummary() : tile.detail;
      var cls = 'kpi' + (tile.attention ? ' attention' : '');
      return '<div class="' + cls + '"><div class="k-lbl">' + tile.label + '</div><div class="k-val">' + val + '</div><div class="k-sub">' + det + '</div></div>';
    }).join('');
  }

  function filteredAlerts() {
    if (state.alertFilter === 'All') return ALERTS;
    return ALERTS.filter(function (a) { return a.status === state.alertFilter; });
  }

  function renderAlertCentre() {
    var container = document.getElementById('alert-filters');
    if (container) {
      container.innerHTML = ALERT_STATUS_OPTIONS.map(function (status) {
        var active = status === state.alertFilter ? ' active' : '';
        return '<button type="button" class="' + active.trim() + '" data-filter-status="' + status + '">' + status + '</button>';
      }).join('');
    }
    var tbody = document.getElementById('alerts-tbody');
    var alerts = filteredAlerts();
    var count = document.getElementById('alert-count');
    if (count) count.textContent = alerts.length + ' shown';
    if (!tbody) return;
    tbody.innerHTML = alerts.map(function (a) {
      return '<tr><td>' + a.account + '</td><td class="negative">' + a.score + '%</td><td>' + (a.threshold || '-25') + '%</td><td>' + a.alertDate + '</td><td>' + a.suppression + '</td><td>' + (a.rmTask || a.rmNotification || '—') + '</td><td><span class="status-pill">' + a.status + '</span></td><td><button type="button" class="btn p sm" data-open-alert-id="' + a.id + '">Open</button></td></tr>';
    }).join('');
  }

  function renderAlertDetail() {
    var detail = ALERT_DETAIL_BY_ID[state.selectedAlertId] || ALERT_DETAIL_BY_ID['alert-acme'];
    var root = document.getElementById('alert-detail-root');
    if (!root || !detail) return;
    var drivers = (detail.drivers || []).map(function (d) {
      return '<div class="driver"><span>' + d.label + '</span><div class="bar-track"><i style="width:' + d.width + ';display:block;height:100%;background:#ba0517;border-radius:1rem;"></i></div><strong>' + d.impact + '</strong></div>';
    }).join('');
    var bars = (detail.trajectory || []).map(function (value) {
      var h = Math.max(12, Math.abs(value) * 3 + 20);
      var cls = value < 0 ? 'bar negative' : 'bar positive';
      return '<i class="' + cls + '" style="height:' + h + '%"></i>';
    }).join('');
    var products = (detail.crossSell && detail.crossSell.products || []).map(function (p) { return '<li>' + p + '</li>'; }).join('');
    root.innerHTML =
      '<button type="button" class="crumb" id="alert-detail-back">Alert Centre</button>' +
      '<section class="page-heading"><div><h1>Alert detail — ' + detail.account + '</h1><p>Score ' + detail.score + '% | ARR ' + detail.arr + ' | ' + detail.merchantCount + ' merchants</p></div>' +
      '<div class="actions"><button type="button" class="button" data-alert-action="resolve">Mark resolved</button><button type="button" class="button" data-alert-action="defer">Defer signal</button><button type="button" class="button" data-alert-action="dismiss">Dismiss</button><button type="button" class="button primary" data-alert-action="escalate">Escalate to manager</button></div></section>' +
      '<div class="two-column"><article class="panel"><div class="panel-header"><h2>6-month score trajectory</h2></div><div class="chart">' + bars + '</div></article>' +
      '<article class="panel"><div class="panel-header"><h2>Top drivers</h2></div><div class="panel-body">' + drivers + '</div></article></div>' +
      '<article class="panel section-panel"><div class="panel-header"><h2>Cross-sell intelligence</h2></div><div class="panel-body"><p><strong>Pipeline:</strong> ' + detail.crossSell.pipeline + '</p><p><strong>Confidence:</strong> ' + detail.crossSell.confidence + '%</p><ul>' + products + '</ul></div></article>' +
      '<article class="panel section-panel"><div class="panel-header"><h2>Record outcome</h2></div><div class="panel-body form-grid"><label>Interaction date<input type="date"></label><label>Interaction type<select><option>Call</option><option>Email</option><option>Meeting</option></select></label><label>Outcome<select><option>Action scheduled</option><option>Deferred</option><option>Resolved</option><option>Escalated</option></select></label><label>Follow-up actions<textarea rows="3" placeholder="Notes for manager visibility"></textarea></label></div></article>';
    var back = document.getElementById('alert-detail-back');
    if (back) back.addEventListener('click', function () { setView('alertcentre'); });
    root.querySelectorAll('[data-alert-action]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        window.c360Toast('Alert ' + btn.getAttribute('data-alert-action') + ' recorded (preview). Manager visibility updated.');
      });
    });
  }

  function renderChurnTable() {
    var tbody = document.getElementById('churn-tbody');
    if (!tbody) return;
    tbody.innerHTML = CHURN_ROWS.map(function (row) {
      var pathway = row.pathway || 'Retention review';
      return '<tr><td><button type="button" class="account-link" data-open-account="' + row.account + '" data-open-account-source="churn">' + row.account + '</button></td><td><span class="pill ' + row.riskClass + '">' + row.risk + '</span></td><td class="negative">' + row.txnChange + '</td><td>' + row.driver + '</td><td>' + pathway + '</td></tr>';
    }).join('');
  }

  function renderCrossSellTable() {
    var tbody = document.getElementById('cross-sell-tbody');
    if (!tbody) return;
    tbody.innerHTML = CROSS_SELL_ROWS.map(function (row) {
      return '<tr><td><button type="button" class="account-link" data-open-account="' + row.account + '" data-open-account-source="crosssell">' + row.account + '</button></td><td>' + row.product + '</td><td><span class="pill ' + row.propensityClass + '">' + row.propensity + '</span></td><td>' + row.uplift + '</td><td>' + row.driver + '</td><td><button type="button" class="btn sm" data-open-account="' + row.account + '" data-open-account-source="crosssell">Open</button></td></tr>';
    }).join('');
  }

  /* —— Account detail (from fragment.js, SPA-adapted) —— */
  function activateAccountTab(tabKey) {
    state.accountSubTab = tabKey;
    document.querySelectorAll('.c360-account-detail .subtab').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.sub === tabKey);
    });
    document.querySelectorAll('.c360-account-detail .subview').forEach(function (panel) {
      panel.classList.toggle('hide', panel.dataset.subview !== tabKey);
    });
  }

  function closeDriverDrill() {
    state.selectedDriverKey = null;
    var panel = document.getElementById('ch-driver-drill-panel');
    if (panel) panel.classList.add('hide');
    if (state.selectedAccount) renderChurnDrivers(getAccountDetail(state.selectedAccount.name));
  }

  function renderDriverDrillTable() {
    if (!state.selectedDriverKey || !state.selectedAccount) return;
    var detail = getAccountDetail(state.selectedAccount.name);
    var rows = (detail.driverDrilldown && detail.driverDrilldown[state.selectedDriverKey]) || [];
    document.getElementById('ch-drill-title').textContent = 'Driver detail — ' + state.selectedDriverKey;
    document.getElementById('ch-drill-tbody').innerHTML = rows.map(function (r) {
      return '<tr><td>' + (r.id || r.humanCustomerId) + '</td><td class="num">' + (r.value || r.authRateAvg6m) + '</td></tr>';
    }).join('');
  }

  function openDriverDrill(driverName) {
    state.selectedDriverKey = driverName;
    activateAccountTab('ch');
    document.getElementById('ch-driver-drill-panel').classList.remove('hide');
    renderDriverDrillTable();
    renderChurnDrivers(getAccountDetail(state.selectedAccount.name));
  }

  function renderChurnDrivers(detail) {
    var driverRows = [];
    var selected = state.selectedDriverKey;
    detail.negativeDrivers.forEach(function (d, i) {
      var rowClass = d.name === selected ? ' class="driver-row-selected"' : '';
      driverRows.push('<tr' + rowClass + '><td><span class="tag-neg">Negative Driver ' + (i + 1) + '</span></td><td><button type="button" class="driver-link" data-driver="' + d.name + '">' + d.name + '</button></td><td class="num">' + d.value + '</td></tr>');
    });
    detail.positiveDrivers.forEach(function (d, i) {
      var rowClass = d.name === selected ? ' class="driver-row-selected"' : '';
      driverRows.push('<tr' + rowClass + '><td><span class="tag-pos">Positive Driver ' + (i + 1) + '</span></td><td><button type="button" class="driver-link" data-driver="' + d.name + '">' + d.name + '</button></td><td class="num">' + d.value + '</td></tr>');
    });
    document.getElementById('acct-churn-drivers').innerHTML = driverRows.join('');
  }

  function renderDeclineChart(cx) {
    var codes = cx.declineCodes || [];
    var s = cx.summary || {};
    var metricsEl = document.getElementById('acct-cx-decline-metrics');
    if (!codes.length) {
      document.getElementById('acct-cx-decline-chart').innerHTML = '<div class="placeholder-panel">No decline data available.</div>';
      document.getElementById('acct-cx-decline-legend').innerHTML = '';
      if (metricsEl) metricsEl.innerHTML = '';
      return;
    }
    var stackHeight = 224;
    var totalCount = codes.reduce(function (sum, d) { return sum + (d.countNum || 0); }, 0);
    var axisSteps = [totalCount, Math.round(totalCount * 0.66), Math.round(totalCount * 0.33), 0];
    var axisHtml = axisSteps.map(function (v) {
      return '<span>' + (v >= 1000 ? Math.round(v / 1000) + 'k' : v) + '</span>';
    }).join('');
    var segsHtml = codes.map(function (d, i) {
      var h = totalCount ? Math.max(32, (d.countNum / totalCount) * stackHeight) : 32;
      var color = d.color || DECLINE_CHART_COLORS[i % DECLINE_CHART_COLORS.length];
      return '<div class="dbc-seg" style="height:' + h + 'px;background:' + color + ';">' + d.count + '<span class="dbc-cost">' + d.volume + '</span></div>';
    }).join('');
    document.getElementById('acct-cx-decline-chart').innerHTML =
      '<div class="decline-barchart"><div class="dbc-axis-y">' + axisHtml + '</div><div class="dbc-stack-wrap"><div class="dbc-stack">' + segsHtml + '</div></div></div>';
    metricsEl.innerHTML =
      '<div class="krow"><span>Value of declines</span><span><b>' + (s.valueOfDeclines || '—') + '</b></span></div>' +
      '<div class="krow"><span>Count of declines</span><span><b>' + (s.countDeclines || '—') + '</b></span></div>' +
      '<div class="krow"><span>% merchant recoverable declines</span><span><b>' + (s.recoverableSplitMerchant || '—') + '</b></span></div>' +
      '<div class="krow"><span>% peer recoverable declines</span><span><b>' + (s.recoverableSplitPeer || '—') + '</b></span></div>';
    document.getElementById('acct-cx-decline-legend').innerHTML = codes.map(function (d, i) {
      var color = d.color || DECLINE_CHART_COLORS[i % DECLINE_CHART_COLORS.length];
      return '<span><span class="sw" style="background:' + color + ';"></span>' + d.code + ' ' + d.name + ' — ' + d.count + ' · ' + d.volume + (d.curable === 'Y' ? ' · RB curable (' + d.curePct + ')' : '') + '</span>';
    }).join('');
  }

  function renderCrossSellRoi(account, detail) {
    var cx = detail.crossSell;
    var s = cx.summary;
    var price = state.crossSellPrice;
    var ab = state.crossSellAbSplit / 100;
    var recoverableUplift = Math.round(s.grossUplift * ab);
    var productCost = Math.round(s.inScopeTransactions * price * ab);
    var schemeBenefit = Math.round((cx.schemeInterchangeBenefit || 0) * ab);
    var netBenefit = recoverableUplift + schemeBenefit - productCost;
    document.getElementById('acct-peer-segment').textContent = 'vs peer group (' + cx.peerSegmentId + ')';
    document.getElementById('acct-cx-roi').innerHTML =
      '<span class="pill ' + (cx.likelihoodToAcquire === 'High' ? 'risk' : 'watch') + '">' + cx.likelihoodToAcquire + ' propensity</span>' +
      '<div class="calc" style="margin-top:12px;">' +
      '<div class="row-c"><span>In-scope transactions</span><span class="c-v">' + s.inScopeTransactions.toLocaleString() + '</span></div>' +
      '<div class="row-c"><span>Price per transaction (adj.)</span><span class="c-v">' + price.toFixed(2) + '</span></div>' +
      '<div class="row-c"><span>A/B testing split</span><span class="c-v">' + state.crossSellAbSplit + '%</span></div>' +
      '<div class="row-c"><span>Gross revenue uplift (annualised)</span><span class="c-v up">+' + fmtMoney(recoverableUplift) + '</span></div>' +
      '<div class="row-c"><span>Product cost (annualised)</span><span class="c-v">' + fmtMoney(productCost) + '</span></div>' +
      '<div class="row-c"><span>Scheme and interchange fee benefit</span><span class="c-v up">+' + fmtMoney(schemeBenefit) + '</span></div>' +
      '<div class="row-c tot"><span>Net benefit (annualised)</span><span class="c-v wp-val">' + fmtMoney(netBenefit) + '</span></div></div>' +
      '<p style="margin-top:12px;font-size:12px;color:var(--muted);"><b>Recoverable decline codes:</b> ' + s.declineCodeList + '</p>';
  }

  function syncCrossSellSliderLabels() {
    document.getElementById('cx-price-val').textContent = state.crossSellPrice.toFixed(2);
    document.getElementById('cx-ab-val').textContent = state.crossSellAbSplit + '%';
    document.getElementById('cx-price-slider').value = state.crossSellPrice;
    document.getElementById('cx-ab-slider').value = state.crossSellAbSplit;
  }

  function renderAccountDetail(account) {
    var detail = getAccountDetail(account.name);
    var cx = detail.crossSell;
    var parts = account.name.split(' ');
    var init = (parts[0][0] + (parts[1] ? parts[1][0] : '')).toUpperCase();
    document.getElementById('acct-init').textContent = init;
    document.getElementById('acct-name').textContent = account.name;
    var sidebarName = document.getElementById('acct-sidebar-name');
    if (sidebarName) sidebarName.textContent = account.name;
    document.getElementById('acct-meta').textContent =
      'Enterprise | ' + account.industry + ' | RM: Sarah Jenkins | Account ID: ' + detail.accountId + ' | ' + detail.merchantCount + ' MIDs | Market: ' + detail.market;
    document.getElementById('acct-health-pill').textContent = 'Health: ' + account.health;
    document.getElementById('acct-health-pill').className = 'pill ' + account.healthClass;
    document.getElementById('acct-facts').innerHTML =
      '<div><span>Account ID</span><b>' + detail.accountId + '</b></div><div><span>Annual processing volume (LTM)</span><b>' + account.volume + '</b></div><div><span>' + CHURN_SCORE_LABEL + '</span><b class="watch">' + detail.churnScorePct + '</b></div><div><span>Churn risk</span><b>' + account.risk + '</b></div><div><span>Likelihood to acquire RB</span><b>' + cx.likelihoodToAcquire + '</b></div><div><span>Health index</span><b>' + account.healthIndex + '</b></div>';
    if (!state.selectedDriverKey) closeDriverDrill();
    else renderDriverDrillTable();
    syncCrossSellSliderLabels();
    function churnMetricClass(value) { return String(value).indexOf('-') === 0 ? 'metric neg' : 'metric'; }
    document.getElementById('acct-churn-metrics').innerHTML =
      '<div class="metric neg"><div class="m-v">' + detail.churnScorePct + '</div><div class="m-l">' + CHURN_SCORE_LABEL + '</div></div>' +
      '<div class="' + churnMetricClass(detail.txnTrend3m) + '"><div class="m-v">' + detail.txnTrend3m + '</div><div class="m-l">Transaction trend (3 months)</div></div>' +
      '<div class="' + churnMetricClass(detail.txnTrend6m) + '"><div class="m-v">' + detail.txnTrend6m + '</div><div class="m-l">Transaction trend (6 months)</div></div>';
    renderChurnDrivers(detail);
    renderCrossSellRoi(account, detail);
    var s = cx.summary;
    document.getElementById('acct-cx-kpis').innerHTML =
      '<div class="krow"><span>Merchant approval rate</span><span><b>' + s.merchantApprovalRate + '</b></span></div><div class="krow"><span>Peer approval rate</span><span><b>' + s.peerApprovalRate + '</b></span></div><div class="krow"><span>Merchant vs peer group</span><span class="down"><b>' + s.merchantVsPeer + '</b></span></div>';
    renderDeclineChart(cx);
  }

  document.querySelectorAll('[data-nav-view]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (btn.disabled) return;
      setView(btn.getAttribute('data-nav-view'));
    });
  });

  document.getElementById('export-pdf-btn').addEventListener('click', function () {
    window.c360Toast('Export PDF — deferred to Record Page / reporting (preview).');
  });

  document.getElementById('acct-back').addEventListener('click', function () { setView('overview'); });
  document.getElementById('acct-export').addEventListener('click', function () {
    window.c360Toast('Generating Global Payments-branded deck for <b>' + state.selectedAccount.name + '</b>…');
  });
  document.getElementById('acct-subtabs').addEventListener('click', function (e) {
    var tab = e.target.closest('[data-sub]');
    if (tab) activateAccountTab(tab.dataset.sub);
  });
  document.getElementById('ch-drill-close').addEventListener('click', closeDriverDrill);
  document.getElementById('cx-price-slider').addEventListener('input', function (e) {
    state.crossSellPrice = parseFloat(e.target.value);
    syncCrossSellSliderLabels();
    renderCrossSellRoi(state.selectedAccount, getAccountDetail(state.selectedAccount.name));
  });
  document.getElementById('cx-ab-slider').addEventListener('input', function (e) {
    state.crossSellAbSplit = parseInt(e.target.value, 10);
    syncCrossSellSliderLabels();
    renderCrossSellRoi(state.selectedAccount, getAccountDetail(state.selectedAccount.name));
  });

  document.addEventListener('click', function (e) {
    var acct = e.target.closest('[data-open-account]');
    if (acct) {
      openAccount(acct.getAttribute('data-open-account'), acct.getAttribute('data-open-account-source') || 'accounts');
      return;
    }
    var alertBtn = e.target.closest('[data-open-alert-id]');
    if (alertBtn) {
      state.selectedAlertId = alertBtn.getAttribute('data-open-alert-id');
      setView('alertdetail');
      return;
    }
    var filterBtn = e.target.closest('[data-filter-status]');
    if (filterBtn) {
      state.alertFilter = filterBtn.getAttribute('data-filter-status');
      renderAlertCentre();
      return;
    }
    var actionBtn = e.target.closest('[data-action-sig]');
    if (actionBtn) {
      var sigEl = actionBtn.closest('[data-sig]');
      if (sigEl) {
        var id = sigEl.getAttribute('data-sig-id');
        state.signals.forEach(function (s) { if (s.id === id) s.signalStatus = 'actioned'; });
        renderSignals();
        window.c360Toast('Signal actioned — row marked as complete.');
      }
      return;
    }
    var dismissBtn = e.target.closest('[data-dismiss-sig]');
    if (dismissBtn) {
      var sigEl2 = dismissBtn.closest('[data-sig]');
      if (sigEl2) {
        var id2 = sigEl2.getAttribute('data-sig-id');
        state.signals.forEach(function (s) { if (s.id === id2) s.signalStatus = 'dismissed'; });
        renderSignals();
        window.c360Toast('Signal dismissed — row greyed out.');
      }
      return;
    }
    var driverBtn = e.target.closest('[data-driver]');
    if (driverBtn) openDriverDrill(driverBtn.dataset.driver);
  });

  renderOverview();
  renderChurnTable();
  renderCrossSellTable();
  setView('overview');
})();
