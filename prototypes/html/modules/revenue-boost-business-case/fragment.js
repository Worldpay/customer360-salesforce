(function () {
  var DATA = window.REVENUE_BOOST_BUSINESS_CASE;
  var state = {
    accountKey: 'pets',
    mid: '1',
    pricePerTxn: 0.05,
    tokenUtilisation: 0.45,
    declineCollapsed: false
  };

  function fmtMoney(n) {
    return '$' + Math.round(n).toLocaleString();
  }

  function fmtPct(decimal, digits) {
    return (decimal * 100).toFixed(digits == null ? 1 : digits) + '%';
  }

  function caseKey() {
    return state.accountKey + '|' + state.mid;
  }

  function getCase() {
    if (!DATA || !DATA.cases) return null;
    return DATA.cases[caseKey()];
  }

  function getAccount() {
    if (!DATA || !DATA.accounts) return null;
    for (var i = 0; i < DATA.accounts.length; i++) {
      if (DATA.accounts[i].key === state.accountKey) return DATA.accounts[i];
    }
    return null;
  }

  function utilScale(caseData, util) {
    var ref = caseData.defaults.tokenUtilisation || 0.45;
    return ref > 0 ? util / ref : 1;
  }

  function compute(caseData) {
    var base = caseData.base;
    var util = state.tokenUtilisation;
    var price = state.pricePerTxn;
    var scale = utilScale(caseData, util);

    var tokenisedTransactions = Math.round(base.inScopeTransactions * util);
    var numTokens = Math.round(base.tokenPool * util);
    var revenue = Math.round(base.annualRevenue * util);
    var tokenisedRevenueEst = Math.round(tokenisedTransactions * base.avgTxnValue);
    var rbFeeEst = Math.round(tokenisedTransactions * price);

    var declineRecovery = 0;
    var declineRows = (caseData.declineRows || []).map(function (row) {
      var estCount = Math.round(row.eligibleCount * row.cureRate * scale);
      var estAmount = Math.round(row.eligibleAmount * row.cureRate * scale);
      declineRecovery += estAmount;
      return {
        reason: row.reason,
        eligibleCount: row.eligibleCount,
        eligibleAmount: row.eligibleAmount,
        cureRate: row.cureRate,
        estCount: estCount,
        estAmount: estAmount
      };
    });

    var authUpliftRevenue = Math.round(base.authUpliftRevenue * scale);
    var netBenefit = authUpliftRevenue + declineRecovery - rbFeeEst;

    var totalInScopeAuths = Math.round(base.inScopeAuths * util);
    var approvals = Math.round(totalInScopeAuths * base.baseApprovalRate);
    var upliftCount = Math.round(totalInScopeAuths * base.upliftRatePoints * scale);
    var approvalRate = totalInScopeAuths > 0 ? approvals / totalInScopeAuths : 0;
    var upliftRate = base.upliftRatePoints * scale;

    return {
      tokenisedTransactions: tokenisedTransactions,
      tokenisationRate: util,
      numTokens: numTokens,
      revenue: revenue,
      tokenisedRevenueEst: tokenisedRevenueEst,
      rbFeeEst: rbFeeEst,
      netBenefit: netBenefit,
      auth: {
        totalInScopeAuths: totalInScopeAuths,
        approvals: approvals,
        upliftCount: upliftCount,
        approvalRate: approvalRate,
        upliftRate: upliftRate
      },
      declineRows: declineRows,
      declineRecovery: declineRecovery
    };
  }

  function renderFilters() {
    var el = document.getElementById('rb-filters');
    if (!el || !DATA) return;
    var account = getAccount();
    if (!account) return;

    el.innerHTML =
      '<div class="fld"><label for="rb-filter-account">Account name &amp; ID</label>' +
      '<select id="rb-filter-account">' +
      DATA.accounts.map(function (a) {
        return '<option value="' + a.key + '"' + (a.key === state.accountKey ? ' selected' : '') + '>' +
          a.label + ' (' + a.accountId + ')</option>';
      }).join('') +
      '</select></div>' +
      '<div class="fld"><label for="rb-filter-mid">MID</label>' +
      '<select id="rb-filter-mid">' +
      account.mids.map(function (m) {
        return '<option value="' + m.mid + '"' + (m.mid === state.mid ? ' selected' : '') + '>' + m.label + '</option>';
      }).join('') +
      '</select></div>';

    document.getElementById('rb-filter-account').addEventListener('change', function (e) {
      state.accountKey = e.target.value;
      var acc = getAccount();
      state.mid = acc && acc.mids[0] ? acc.mids[0].mid : '1';
      loadCaseDefaults();
      renderAll();
    });
    document.getElementById('rb-filter-mid').addEventListener('change', function (e) {
      state.mid = e.target.value;
      loadCaseDefaults();
      renderAll();
    });
  }

  function loadCaseDefaults() {
    var caseData = getCase();
    if (!caseData) return;
    state.pricePerTxn = caseData.defaults.pricePerTxn;
    state.tokenUtilisation = caseData.defaults.tokenUtilisation;
  }

  function renderManualInputs(caseData, bindEvents) {
    var fields = document.getElementById('rb-manual-fields');
    var rec = document.getElementById('rb-recommended');
    if (!fields || !rec || !caseData) return;

    if (bindEvents) {
      fields.innerHTML =
        '<div class="rb-input-row fld">' +
        '<label for="rb-price">Price per transaction ($)</label>' +
        '<input type="number" id="rb-price" min="0.01" max="5" step="0.01" value="' + state.pricePerTxn.toFixed(2) + '">' +
        '</div>' +
        '<div class="rb-input-row fld">' +
        '<label for="rb-util">Token utilisation rate</label>' +
        '<input type="number" id="rb-util" min="0" max="1" step="0.01" value="' + state.tokenUtilisation.toFixed(2) + '">' +
        '</div>';

      document.getElementById('rb-price').addEventListener('input', function (e) {
        state.pricePerTxn = parseFloat(e.target.value, 10) || 0;
        renderComputed(false);
      });
      document.getElementById('rb-util').addEventListener('input', function (e) {
        state.tokenUtilisation = Math.min(1, Math.max(0, parseFloat(e.target.value, 10) || 0));
        renderComputed(false);
      });
    } else {
      var priceEl = document.getElementById('rb-price');
      var utilEl = document.getElementById('rb-util');
      if (priceEl && document.activeElement !== priceEl) {
        priceEl.value = state.pricePerTxn.toFixed(2);
      }
      if (utilEl && document.activeElement !== utilEl) {
        utilEl.value = state.tokenUtilisation.toFixed(2);
      }
    }

    var recommended = caseData.recommendedTokenUtilisation;
    var differs = Math.abs(state.tokenUtilisation - recommended) > 0.001;
    rec.className = 'rb-recommended' + (differs ? ' warn-user' : '');
    rec.innerHTML =
      '<div>Recommended token utilisation rate</div>' +
      '<div class="rec-val">' + fmtPct(recommended, 0) + '</div>' +
      (differs ? '<p class="hint" style="margin:8px 0 0;font-size:12px;color:var(--red);">Current rate differs from recommendation.</p>' : '');
  }

  function renderBusinessCaseSummary(computed) {
    var el = document.getElementById('rb-summary');
    if (!el) return;
    var rows = [
      { lbl: '# Tokenised transactions', val: computed.tokenisedTransactions.toLocaleString(), note: 'Estimated number of transactions to tokenize' },
      { lbl: 'Tokenisation rate', val: fmtPct(computed.tokenisationRate, 1), note: 'Share of in-scope volume tokenised' },
      { lbl: '# Tokens', val: computed.numTokens.toLocaleString(), note: 'Active tokens in vault' },
      { lbl: 'Revenue', val: fmtMoney(computed.revenue), note: 'In-scope annual processing revenue' },
      { lbl: 'Tokenised revenue (est.)', val: fmtMoney(computed.tokenisedRevenueEst), note: 'Revenue on tokenised transactions' },
      { lbl: 'RB fee (est.)', val: fmtMoney(computed.rbFeeEst), note: 'Annual product fee at current price per txn' },
      { lbl: 'Net benefit', val: fmtMoney(computed.netBenefit), note: 'Auth uplift + decline recovery − RB fee', tot: true }
    ];
    el.innerHTML = rows.map(function (r) {
      return (
        '<div class="rb-summary-row' + (r.tot ? ' tot' : '') + '">' +
        '<span class="rb-lbl">' + r.lbl + '</span>' +
        '<span class="rb-val">' + r.val + '</span>' +
        '<span class="rb-note">' + r.note + '</span></div>'
      );
    }).join('');
  }

  function renderAuthImpact(computed) {
    var el = document.getElementById('rb-auth-impact');
    if (!el) return;
    var a = computed.auth;
    el.innerHTML =
      '<div class="rb-auth-h"></div><div class="rb-auth-h">Counts</div><div class="rb-auth-h">Rates</div>' +
      '<div class="rb-auth-row"><span>Total in-scope auths</span><span class="num">' + a.totalInScopeAuths.toLocaleString() + '</span><span class="num">' + fmtPct(a.approvalRate, 1) + '</span></div>' +
      '<div class="rb-auth-row"><span>Approvals</span><span class="num">' + a.approvals.toLocaleString() + '</span><span class="num">—</span></div>' +
      '<div class="rb-auth-row uplift"><span>Uplift</span><span class="num">' + a.upliftCount.toLocaleString() + '</span><span class="num">' + fmtPct(a.upliftRate, 2) + '</span></div>';
  }

  function renderDeclineBreakdown(computed, collapsed) {
    var body = document.getElementById('rb-decline-body');
    var tbody = document.getElementById('rb-decline-tbody');
    var toggle = document.getElementById('rb-decline-toggle');
    if (!tbody || !body) return;

    if (toggle) {
      toggle.textContent = collapsed ? 'Show' : 'Hide';
      toggle.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
    }
    body.classList.toggle('hide', collapsed);

    var rows = computed.declineRows;
    var totCount = 0;
    var totAmount = 0;
    var totRecCount = 0;
    var totRecAmount = 0;
    rows.forEach(function (r) {
      totCount += r.eligibleCount;
      totAmount += r.eligibleAmount;
      totRecCount += r.estCount;
      totRecAmount += r.estAmount;
    });

    var html = (
      '<tr class="total">' +
      '<td>Grand total</td>' +
      '<td class="num">' + totCount.toLocaleString() + '</td>' +
      '<td class="num">' + fmtMoney(totAmount) + '</td>' +
      '<td class="num">—</td>' +
      '<td class="num">' + totRecCount.toLocaleString() + '</td>' +
      '<td class="num">' + fmtMoney(totRecAmount) + '</td></tr>'
    );
    html += rows.map(function (r) {
      return (
        '<tr><td>' + r.reason + '</td>' +
        '<td class="num">' + r.eligibleCount.toLocaleString() + '</td>' +
        '<td class="num">' + fmtMoney(r.eligibleAmount) + '</td>' +
        '<td class="num">' + fmtPct(r.cureRate, 0) + '</td>' +
        '<td class="num">' + r.estCount.toLocaleString() + '</td>' +
        '<td class="num">' + fmtMoney(r.estAmount) + '</td></tr>'
      );
    }).join('');
    tbody.innerHTML = html;
  }

  function renderComputed(rebindManual) {
    var caseData = getCase();
    if (!caseData) return;
    var computed = compute(caseData);
    renderManualInputs(caseData, rebindManual !== false);
    renderBusinessCaseSummary(computed);
    renderAuthImpact(computed);
    renderDeclineBreakdown(computed, state.declineCollapsed);
  }

  function renderAll() {
    renderFilters();
    renderComputed(true);
  }

  function bindToggle() {
    var toggle = document.getElementById('rb-decline-toggle');
    if (!toggle || toggle.dataset.bound) return;
    toggle.dataset.bound = '1';
    toggle.addEventListener('click', function () {
      state.declineCollapsed = !state.declineCollapsed;
      var caseData = getCase();
      if (caseData) {
        renderDeclineBreakdown(compute(caseData), state.declineCollapsed);
      }
    });
  }

  function init() {
    if (!document.querySelector('.c360-revenue-boost-business-case')) return;
    if (!DATA) return;
    loadCaseDefaults();
    bindToggle();
    renderAll();
  }

  window.C360RevenueBoostBusinessCase = { init: init, render: renderAll, compute: compute, getState: function () { return state; } };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
