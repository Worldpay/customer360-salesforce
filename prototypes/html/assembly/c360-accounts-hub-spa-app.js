/* Accounts Hub standalone SPA — assembled into 360 Accounts Hub prototype.html */
(function () {
  window.C360_ACCOUNTS_HUB_SPA = true;
  var state = {
    activeView: 'overview',
    heroMode: 'churn',
    healthFilter: 'All',
    selectedAlertId: 'alert-acme',
    selectedAccount: ACCOUNTS[0],
    accountSourceView: 'overview',
    accountSubTab: 'ch',
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

  function sourceToView(source) {
    if (source === 'churn') return 'churn';
    if (source === 'crosssell') return 'crosssell';
    if (source === 'accounts') return 'accounts';
    return 'overview';
  }

  function accountTabToNavView(tabKey) {
    if (tabKey === 'cx') return 'crosssell';
    if (tabKey === 'ch') return 'churn';
    return 'overview';
  }

  function navHighlightView() {
    if (state.activeView === 'alertdetail') return 'alertcentre';
    if (state.activeView === 'account') {
      if (state.accountSourceView === 'overview') return 'overview';
      if (state.accountSourceView === 'accounts') return 'accounts';
      return accountTabToNavView(state.accountSubTab);
    }
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
    if (view === 'overview') {
      renderHeroTiles();
      renderPortfolioHealth();
    }
    if (view === 'accounts') renderAccountsFullTable();
    if (view === 'alertcentre') renderAlertCentre();
    if (view === 'alertdetail') renderAlertDetail();
    if (view === 'account') renderAccountDetail(state.selectedAccount);
  }

  function openAccount(name, source) {
    var found = ACCOUNTS.find(function (a) { return a.name === name; });
    state.selectedAccount = found || ACCOUNTS[0];
    state.accountSourceView = source || 'accounts';
    if (source === 'overview') {
      state.accountSubTab = state.heroMode === 'crosssell' ? 'cx' : 'ch';
    } else {
      state.accountSubTab = sourceToTab(state.accountSourceView);
    }
    state.selectedDriverKey = null;
    setView('account');
    activateAccountTab(state.accountSubTab);
  }

  window.C360App = { setView: setView, openAccount: openAccount };

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function goToAccountsWithHealthFilter(filter) {
    state.healthFilter = filter;
    setView('accounts');
  }

  function renderPortfolioHealth() {
    if (window.C360PortfolioHealth) C360PortfolioHealth.render();
  }

  function renderHeroTiles() {
    if (window.C360TopAccounts) C360TopAccounts.render({ heroMode: state.heroMode });
  }

  function renderAccountsFullTable() {
    if (window.C360AccountsTableHub) {
      C360AccountsTableHub.render({ healthFilter: state.healthFilter });
    }
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
      return (
        '<tr>' +
        '<td><button type="button" class="account-link" data-open-account="' + escapeHtml(row.account) + '" data-open-account-source="churn">' + escapeHtml(row.account) + '</button></td>' +
        '<td><span class="pill ' + row.riskClass + '">' + escapeHtml(row.risk) + '</span></td>' +
        '<td class="negative">' + escapeHtml(row.txnChange) + '</td>' +
        '<td>' + escapeHtml(row.driver) + '</td>' +
        '<td>' + escapeHtml(pathway) + '</td>' +
        '</tr>'
      );
    }).join('');
  }

  function renderCrossSellTable() {
    var tbody = document.getElementById('cross-sell-tbody');
    if (!tbody) return;
    tbody.innerHTML = CROSS_SELL_ROWS.map(function (row) {
      return (
        '<tr>' +
        '<td><button type="button" class="account-link" data-open-account="' + escapeHtml(row.account) + '" data-open-account-source="crosssell">' + escapeHtml(row.account) + '</button></td>' +
        '<td>' + escapeHtml(row.product) + '</td>' +
        '<td><span class="pill ' + row.propensityClass + '">' + escapeHtml(row.propensity) + '</span></td>' +
        '<td>' + escapeHtml(row.uplift) + '</td>' +
        '<td>' + escapeHtml(row.driver) + '</td>' +
        '<td><button type="button" class="btn sm" data-open-account="' + escapeHtml(row.account) + '" data-open-account-source="crosssell">Open</button></td>' +
        '</tr>'
      );
    }).join('');
  }

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

  var goAccounts = document.getElementById('go-accounts-table');
  if (goAccounts) goAccounts.addEventListener('click', function () { setView('accounts'); });

  var acctBack = document.getElementById('acct-back');
  if (acctBack) {
    acctBack.addEventListener('click', function () { setView(sourceToView(state.accountSourceView)); });
  }
  var acctExport = document.getElementById('acct-export');
  if (acctExport) {
    acctExport.addEventListener('click', function () {
      window.c360Toast('Generating Global Payments-branded deck for <b>' + state.selectedAccount.name + '</b>…');
    });
  }
  var acctSubtabs = document.getElementById('acct-subtabs');
  if (acctSubtabs) {
    acctSubtabs.addEventListener('click', function (e) {
      var tab = e.target.closest('[data-sub]');
      if (tab) activateAccountTab(tab.dataset.sub);
    });
  }
  var chDrillClose = document.getElementById('ch-drill-close');
  if (chDrillClose) chDrillClose.addEventListener('click', closeDriverDrill);
  var cxPriceSlider = document.getElementById('cx-price-slider');
  if (cxPriceSlider) {
    cxPriceSlider.addEventListener('input', function (e) {
      state.crossSellPrice = parseFloat(e.target.value);
      syncCrossSellSliderLabels();
      renderCrossSellRoi(state.selectedAccount, getAccountDetail(state.selectedAccount.name));
    });
  }
  var cxAbSlider = document.getElementById('cx-ab-slider');
  if (cxAbSlider) {
    cxAbSlider.addEventListener('input', function (e) {
      state.crossSellAbSplit = parseInt(e.target.value, 10);
      syncCrossSellSliderLabels();
      renderCrossSellRoi(state.selectedAccount, getAccountDetail(state.selectedAccount.name));
    });
  }

  document.addEventListener('click', function (e) {
    var modeBtn = e.target.closest('[data-hero-mode]');
    if (modeBtn) {
      state.heroMode = modeBtn.getAttribute('data-hero-mode');
      renderHeroTiles();
      return;
    }
    var portfolioHealth = e.target.closest('[data-portfolio-health-filter]');
    if (portfolioHealth) {
      goToAccountsWithHealthFilter(portfolioHealth.getAttribute('data-portfolio-health-filter'));
      return;
    }
    var filterHealth = e.target.closest('[data-health-filter]');
    if (filterHealth) {
      state.healthFilter = filterHealth.getAttribute('data-health-filter');
      renderAccountsFullTable();
      return;
    }
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
    var driverBtn = e.target.closest('[data-driver]');
    if (driverBtn) openDriverDrill(driverBtn.dataset.driver);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    var card = e.target.closest('.hero-account-card--clickable');
    if (!card || e.target.closest('[data-hero-mode]')) return;
    e.preventDefault();
    openAccount(card.getAttribute('data-open-account'), card.getAttribute('data-open-account-source') || 'overview');
  });

  renderHeroTiles();
  renderPortfolioHealth();
  renderAccountsFullTable();
  renderChurnTable();
  renderCrossSellTable();
  setView('overview');
})();
