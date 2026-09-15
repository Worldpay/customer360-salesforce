(function () {
  /* Material banner */
  var banner = document.getElementById('material-banner-text');
  if (banner && typeof MATERIAL_BANNER !== 'undefined') {
    banner.textContent = MATERIAL_BANNER.text;
  }

  /* KPI strip */
  var kpiGrid = document.getElementById('kpi-grid');
  if (kpiGrid && typeof KPI_TILES !== 'undefined') {
    kpiGrid.innerHTML = KPI_TILES.map(function (tile) {
      var cls = 'kpi' + (tile.attention ? ' attention' : '');
      return (
        '<div class="' + cls + '">' +
          '<div class="k-lbl">' + tile.label + '</div>' +
          '<div class="k-val">' + tile.value + '</div>' +
          '<div class="k-sub">' + tile.detail + '</div>' +
        '</div>'
      );
    }).join('');
  }

  /* Needs action */
  var needsList = document.getElementById('needs-action-list');
  if (needsList && typeof NEEDS_ACTION_ITEMS !== 'undefined') {
    needsList.innerHTML = NEEDS_ACTION_ITEMS.map(function (item) {
      return (
        '<div class="a">' +
          '<div class="row-tag"><span class="sev ' + item.severity + '">' + item.severityLabel + '</span></div>' +
          '<div class="a-txt">' +
            '<b>' + item.heading + '</b>' +
            '<div class="m">' + item.body + '</div>' +
            '<div class="meta">' + item.meta + '</div>' +
          '</div>' +
          '<div class="row-actions"><button type="button" class="' + item.buttonClass + '" data-open-account="' + item.accountName + '" data-open-account-source="' + (item.sourceView || 'accounts') + '">' + item.buttonLabel + '</button></div>' +
        '</div>'
      );
    }).join('');
  }

  /* Portfolio health */
  if (typeof PORTFOLIO_HEALTH !== 'undefined') {
    var tiles = document.getElementById('health-tiles');
    var pipeline = document.getElementById('pipeline-rows');
    var h = PORTFOLIO_HEALTH;
    if (tiles) {
      tiles.innerHTML =
        '<div class="mtile"><div class="mt-l">Healthy</div><div class="mt-v good">' + h.healthy + '</div></div>' +
        '<div class="mtile"><div class="mt-l">Watch</div><div class="mt-v watch">' + h.watch + '</div></div>' +
        '<div class="mtile"><div class="mt-l">At risk</div><div class="mt-v risk">' + h.atRisk + '</div></div>';
    }
    if (pipeline) {
      pipeline.innerHTML = h.pipeline.map(function (row) {
        return (
          '<div class="drv">' +
            '<div class="d-n"><b>' + row.name + '</b><div class="d-s">' + row.detail + '</div></div>' +
            '<div class="d-bar pos"><i style="width:' + row.width + '"></i></div>' +
            '<div class="d-pct">' + row.value + '</div>' +
          '</div>'
        );
      }).join('');
    }
  }

  /* Accounts table */
  var accountsTbody = document.getElementById('accounts-tbody');
  if (accountsTbody && typeof ACCOUNTS !== 'undefined') {
    accountsTbody.innerHTML = ACCOUNTS.slice(0, 5).map(function (a) {
      var deltaClass = a.healthDelta.indexOf('-') === 0 ? 'down' : 'up';
      return (
        '<tr>' +
          '<td><button class="account-link" data-open-account="' + a.name + '" data-open-account-source="accounts">' + a.name + '</button></td>' +
          '<td>' + a.healthIndex + '</td>' +
          '<td class="' + deltaClass + '">' + a.healthDelta + '</td>' +
          '<td>' + a.industry + '</td>' +
          '<td>' + a.volume + '</td>' +
          '<td><span class="pill ' + a.healthClass + '">' + a.health + '</span></td>' +
          '<td><span class="pill ' + a.riskClass + '">' + a.risk + '</span></td>' +
          '<td>' + a.pathways + '</td>' +
          '<td>Today</td>' +
        '</tr>'
      );
    }).join('');
  }

  /* Signal list */
  var signals = typeof SIGNALS !== 'undefined' ? SIGNALS.map(function (s) {
    return Object.assign({}, s);
  }) : [];

  function openCount() {
    return signals.filter(function (s) { return s.isOpen; }).length;
  }

  function updateSigCount() {
    var el = document.getElementById('sig-count');
    if (el) el.textContent = openCount() + ' open';
  }

  function renderSignals() {
    var container = document.getElementById('signals');
    if (!container) return;
    container.innerHTML = signals.filter(function (s) { return s.isOpen; }).map(function (sig) {
      return (
        '<div class="sig" data-sig data-sig-id="' + sig.id + '">' +
          '<span class="' + sig.badgeClass + '">' + sig.category + '</span>' +
          '<div class="s-txt">' +
            '<div class="s-h">' + sig.title + '</div>' +
            '<div class="s-d">' + sig.description + '</div>' +
            '<div class="s-p">Recommended pathway: <b>' + sig.pathway + '</b></div>' +
          '</div>' +
          '<div class="s-act">' +
            '<button class="btn p sm" data-action-sig>Action</button>' +
            '<button class="btn sm" data-dismiss-sig>Dismiss</button>' +
          '</div>' +
        '</div>'
      );
    }).join('');
    updateSigCount();
  }

  document.addEventListener('click', function (e) {
    var actionBtn = e.target.closest('[data-action-sig]');
    if (actionBtn) {
      var sigEl = actionBtn.closest('[data-sig]');
      if (sigEl) {
        var id = sigEl.getAttribute('data-sig-id');
        signals.forEach(function (s) { if (s.id === id) s.isOpen = false; });
        renderSignals();
        window.c360Toast('Signal actioned — pathway created and visible to your manager.');
      }
      return;
    }
    var dismissBtn = e.target.closest('[data-dismiss-sig]');
    if (dismissBtn) {
      var sigEl2 = dismissBtn.closest('[data-sig]');
      if (sigEl2) {
        var id2 = sigEl2.getAttribute('data-sig-id');
        signals.forEach(function (s) { if (s.id === id2) s.isOpen = false; });
        renderSignals();
        window.c360Toast('Signal dismissed.');
      }
    }
  });

  renderSignals();
})();
