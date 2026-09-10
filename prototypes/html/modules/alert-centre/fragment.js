window.c360AlertCentre = (function () {
  var currentFilter = 'All';

  function filteredAlerts() {
    if (typeof ALERTS === 'undefined') return [];
    if (currentFilter === 'All') return ALERTS;
    return ALERTS.filter(function (a) { return a.status === currentFilter; });
  }

  function renderFilters() {
    var container = document.getElementById('alert-filters');
    if (!container || typeof ALERT_STATUS_OPTIONS === 'undefined') return;

    container.innerHTML = ALERT_STATUS_OPTIONS.map(function (status) {
      var active = status === currentFilter ? ' active' : '';
      return '<button class="' + active.trim() + '" data-filter-status="' + status + '">' + status + '</button>';
    }).join('');
  }

  function renderTable() {
    var tbody = document.getElementById('alerts-tbody');
    var count = document.getElementById('alert-count');
    var alerts = filteredAlerts();

    if (count) count.textContent = alerts.length + ' shown';
    if (!tbody) return;

    tbody.innerHTML = alerts.map(function (a) {
      return (
        '<tr>' +
          '<td>' + a.account + '</td>' +
          '<td class="negative">' + a.score + '%</td>' +
          '<td>' + a.threshold + '%</td>' +
          '<td>' + a.alertDate + '</td>' +
          '<td>' + a.suppression + '</td>' +
          '<td>' + a.rmTask + '</td>' +
          '<td><span class="status-pill">' + a.status + '</span></td>' +
          '<td><button class="btn p sm" data-open-alert="' + a.id + '">Open</button></td>' +
        '</tr>'
      );
    }).join('');
  }

  document.addEventListener('click', function (e) {
    var filterBtn = e.target.closest('[data-filter-status]');
    if (filterBtn) {
      currentFilter = filterBtn.getAttribute('data-filter-status');
      renderFilters();
      renderTable();
    }
  });

  renderFilters();
  renderTable();
  return { render: renderTable };
})();
