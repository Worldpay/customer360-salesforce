(function () {
  if (typeof ACCOUNTS === 'undefined' || typeof getAccountDetail === 'undefined') return;

  var params = new URLSearchParams(window.location.search);
  var state = {
    selectedAccount: ACCOUNTS[0],
    accountSubTab: 'ch',
    accountSourceView: params.get('source') || 'accounts',
    crossSellPrice: 0.05,
    crossSellAbSplit: 99,
    crossSellMerchantId: null,
    selectedDriverKey: null,
    drillFilterAccount: null
  };

  var accountParam = params.get('account');
  if (accountParam) {
    var found = ACCOUNTS.find(function (a) { return a.name === accountParam; });
    if (found) state.selectedAccount = found;
  }

  function sourceToTab(source) {
    if (source === 'crosssell') return 'cx';
    return 'ch';
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
    renderChurnDrivers(getAccountDetail(state.selectedAccount.name));
  }

  var CHURN_SCORE_LABEL = 'Predicted change in transaction count in 3-6 months';

  function getNormalizedAccountDetail(name) {
    if (typeof normalizeDriverDrilldown === 'function') {
      var detail = getAccountDetail(name);
      var seed = (parseInt(detail.accountId, 10) || 1) * 100;
      return Object.assign({}, detail, { driverDrilldown: normalizeDriverDrilldown(detail, seed) });
    }
    return getAccountDetail(name);
  }

  function renderDriverDrillTable() {
    if (!state.selectedDriverKey) return;
    var detail = getNormalizedAccountDetail(state.selectedAccount.name);
    var rows = (detail.driverDrilldown && detail.driverDrilldown[state.selectedDriverKey]) || [];
    document.getElementById('ch-drill-title').textContent = 'Driver detail — ' + state.selectedDriverKey;
    document.getElementById('ch-drill-tbody').innerHTML = rows.map(function (r) {
      return '<tr><td>' + r.id + '</td><td class="num">' + r.value + '</td></tr>';
    }).join('');
  }

  function openDriverDrill(driverName) {
    if (!driverName) return;
    state.selectedDriverKey = driverName;
    activateAccountTab('ch');
    var panel = document.getElementById('ch-driver-drill-panel');
    panel.classList.remove('hide');
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
      '<div class="decline-barchart"><div class="dbc-axis-y">' + axisHtml + '</div>' +
      '<div class="dbc-stack-wrap"><div class="dbc-stack">' + segsHtml + '</div></div></div>';
    metricsEl.innerHTML =
      '<div class="krow"><span>Value of declines</span><span><b>' + (s.valueOfDeclines || '—') + '</b></span></div>' +
      '<div class="krow"><span>Count of declines</span><span><b>' + (s.countDeclines || '—') + '</b></span></div>' +
      '<div class="krow"><span>% merchant recoverable declines</span><span><b>' + (s.recoverableSplitMerchant || '—') + '</b></span></div>' +
      '<div class="krow"><span>% peer recoverable declines</span><span><b>' + (s.recoverableSplitPeer || '—') + '</b></span></div>';
    document.getElementById('acct-cx-decline-legend').innerHTML = codes.map(function (d, i) {
      var color = d.color || DECLINE_CHART_COLORS[i % DECLINE_CHART_COLORS.length];
      return '<span><span class="sw" style="background:' + color + ';"></span>' + d.code + ' ' + d.name + ' — ' + d.count + ' · ' + d.volume +
        (d.curable === 'Y' ? ' · RB curable (' + d.curePct + ')' : '') + '</span>';
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
      'Enterprise | ' + account.industry + ' | RM: Sarah Jenkins | Account ID: ' + detail.accountId +
      ' | ' + detail.merchantCount + ' MIDs | Market: ' + detail.market;
    document.getElementById('acct-health-pill').textContent = 'Health: ' + account.health;
    document.getElementById('acct-health-pill').className = 'pill ' + account.healthClass;

    document.getElementById('acct-facts').innerHTML =
      '<div><span>Account ID</span><b>' + detail.accountId + '</b></div>' +
      '<div><span>Annual processing volume (LTM)</span><b>' + account.volume + '</b></div>' +
      '<div><span>' + CHURN_SCORE_LABEL + '</span><b class="watch">' + detail.churnScorePct + '</b></div>' +
      '<div><span>Churn risk</span><b>' + account.risk + '</b></div>' +
      '<div><span>Likelihood to acquire RB</span><b>' + cx.likelihoodToAcquire + '</b></div>' +
      '<div><span>Health index</span><b>' + account.healthIndex + '</b></div>';

    if (!state.selectedDriverKey) {
      closeDriverDrill();
    } else {
      renderDriverDrillTable();
    }
    syncCrossSellSliderLabels();

    function churnMetricClass(value) {
      return String(value).indexOf('-') === 0 ? 'metric neg' : 'metric';
    }
    document.getElementById('acct-churn-metrics').innerHTML =
      '<div class="metric neg"><div class="m-v">' + detail.churnScorePct + '</div><div class="m-l">' + CHURN_SCORE_LABEL + '</div></div>' +
      '<div class="' + churnMetricClass(detail.txnTrend3m) + '"><div class="m-v">' + detail.txnTrend3m + '</div><div class="m-l">Transaction trend (3 months)</div></div>' +
      '<div class="' + churnMetricClass(detail.txnTrend6m) + '"><div class="m-v">' + detail.txnTrend6m + '</div><div class="m-l">Transaction trend (6 months)</div></div>';

    renderChurnDrivers(detail);
    renderCrossSellRoi(account, detail);

    var s = cx.summary;
    document.getElementById('acct-cx-kpis').innerHTML =
      '<div class="krow"><span>Merchant approval rate</span><span><b>' + s.merchantApprovalRate + '</b></span></div>' +
      '<div class="krow"><span>Peer approval rate</span><span><b>' + s.peerApprovalRate + '</b></span></div>' +
      '<div class="krow"><span>Merchant vs peer group</span><span class="down"><b>' + s.merchantVsPeer + '</b></span></div>';

    renderDeclineChart(cx);
  }

  renderAccountDetail(state.selectedAccount);
  activateAccountTab(sourceToTab(state.accountSourceView));

  document.getElementById('acct-subtabs').addEventListener('click', function (e) {
    var tab = e.target.closest('[data-sub]');
    if (tab) activateAccountTab(tab.dataset.sub);
  });

  document.getElementById('acct-export').addEventListener('click', function () {
    window.c360Toast('Export PowerPoint for <b>' + state.selectedAccount.name + '</b> (preview).');
  });

  document.getElementById('acct-back').addEventListener('click', function () {
    var href = window.C360_OVERVIEW_URL || '../../assembly/overview-page.html';
    window.location.href = href;
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
    var driverBtn = e.target.closest('[data-driver]');
    if (driverBtn) {
      openDriverDrill(driverBtn.dataset.driver);
    }
  });
})();
