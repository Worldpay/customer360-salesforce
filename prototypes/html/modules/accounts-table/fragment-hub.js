(function () {
  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function accountsAfterHealthFilter(healthFilter) {
    if (typeof ACCOUNTS === 'undefined') return [];
    if (healthFilter === 'All') return ACCOUNTS.slice();
    return ACCOUNTS.filter(function (a) { return a.health === healthFilter; });
  }

  function render(options) {
    var healthFilter = (options && options.healthFilter) || 'All';
    var tbody = document.getElementById('accounts-full-tbody');
    var countEl = document.getElementById('accounts-full-count');
    if (!tbody) return;
    var rows = accountsAfterHealthFilter(healthFilter);
    if (countEl) countEl.textContent = rows.length + ' accounts';
    tbody.innerHTML = rows.map(function (a) {
      var txnCls = a.predictedTxnChangeSort < 0 ? 'negative' : 'up';
      return (
        '<tr>' +
        '<td><button type="button" class="account-link" data-open-account="' + escapeHtml(a.name) + '" data-open-account-source="accounts">' + escapeHtml(a.name) + '</button></td>' +
        '<td>' + escapeHtml(a.industry) + '</td>' +
        '<td>' + escapeHtml(a.revenue) + '</td>' +
        '<td>' + escapeHtml(String(a.healthIndex)) + '</td>' +
        '<td><span class="pill ' + a.healthClass + '">' + escapeHtml(a.health) + '</span></td>' +
        '<td>' + escapeHtml(a.lastActivity) + '</td>' +
        '<td class="' + txnCls + '">' + escapeHtml(a.predictedTxnChange) + '</td>' +
        '<td>' + escapeHtml(a.topCrossSellProduct) + '</td>' +
        '<td class="wp-val">' + escapeHtml(a.topCrossSellNetBenefit) + '</td>' +
        '</tr>'
      );
    }).join('');
    document.querySelectorAll('[data-health-filter]').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-health-filter') === healthFilter);
    });
  }

  window.C360AccountsTableHub = {
    render: render,
    accountsAfterHealthFilter: accountsAfterHealthFilter
  };
})();
