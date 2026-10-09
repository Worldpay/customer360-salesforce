window.c360RenderHome = function (root, data) {
  if (!root || !data || root.getAttribute('data-rendered') === 'true') return;
  root.setAttribute('data-rendered', 'true');
  root.setAttribute('data-account-ids', (data.accounts || []).map(function (account) { return account.id; }).join(' '));
  var filter = 'all';

  function esc(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function riskKey(risk) {
    return String(risk || '').toLowerCase().replace(/\s+/g, '-');
  }

  function goButton(label, view, account) {
    if (!view) {
      return '<button type="button" class="home-text">' + esc(label) + '</button>';
    }
    return '<button type="button" class="home-text" data-hub-go="' + esc(view) + '" data-account-id="' + esc(account.id) + '" data-account-name="' + esc(account.name) + '">' + esc(label) + '</button>';
  }

  function renderTable() {
    var rows = data.accounts.filter(function (account) {
      if (filter === 'all') return true;
      return riskKey(account.risk) === filter;
    });
    root.querySelector('.home-rows').innerHTML = rows.map(function (account) {
      var actions = (account.actions || []).map(function (label) {
        return '<button type="button" class="home-text">' + esc(label) + '</button>';
      }).join('');
      return '<tr>' +
        '<td>' + esc(account.name) + '</td>' +
        '<td>' + esc(account.score) + '</td>' +
        '<td class="is-' + esc(account.deltaDir) + '">' + esc(account.delta) + '</td>' +
        '<td><span class="home-risk is-' + esc(riskKey(account.risk)) + '">' + esc(account.risk) + '</span></td>' +
        '<td>' + esc(account.signal) + '</td>' +
        '<td>' + esc(account.leads) + '</td>' +
        '<td>' + esc(account.acv) + '</td>' +
        '<td class="home-actions">' + actions + '</td>' +
        '</tr>';
    }).join('');
  }

  root.querySelector('.home-greeting').textContent = data.greeting;
  root.querySelector('.home-pill').textContent = data.alertPill;
  root.querySelector('.home-subtitle').textContent = data.subtitle;
  root.querySelector('.home-updated').textContent = data.updated;
  root.querySelector('.home-range').textContent = data.range;
  root.querySelector('.home-tool-list').innerHTML = (data.tools || []).map(function (label) {
    return '<button type="button" class="home-tool">' + esc(label) + '</button>';
  }).join('');
  root.querySelector('.home-kpis').innerHTML = (data.kpis || []).map(function (kpi) {
    return '<article class="home-kpi"><p class="home-kpi-label">' + esc(kpi.label) + '</p>' +
      '<p class="home-kpi-value">' + esc(kpi.value) + (kpi.tag ? ' <span>' + esc(kpi.tag) + '</span>' : '') + '</p>' +
      (kpi.note ? '<p class="home-kpi-note">' + esc(kpi.note) + '</p>' : '') + '</article>';
  }).join('');
  root.querySelector('.home-filters').innerHTML = (data.filters || []).map(function (item, index) {
    return '<button type="button" class="home-filter' + (index ? '' : ' is-selected') + '" data-home-filter="' + esc(item.id) + '">' + esc(item.label) + ' (' + esc(item.count) + ')</button>';
  }).join('');
  root.querySelector('.home-search').placeholder = data.searchPlaceholder;
  root.querySelector('.home-page-label').textContent = data.pageLabel;
  renderTable();

  root.querySelector('.home-signals-title').textContent = data.signalsTitle;
  root.querySelector('.home-signals-badge').textContent = data.signalsBadge;
  root.querySelector('.home-signals-link').textContent = data.signalsLink + ' ›';
  root.querySelector('.home-signals').innerHTML = (data.signals || []).map(function (signal) {
    var open = signal.opens
      ? ' data-hub-go="' + esc(signal.opens) + '" data-account-id="' + esc(signal.id) + '" data-account-name="' + esc(signal.name) + '"'
      : '';
    return '<article class="home-card"' + open + '>' +
      '<p class="home-card-kicker"><span class="is-' + esc(riskKey(signal.level)) + '">' + esc(signal.level) + '</span> ' + esc(signal.name) + ' <span class="home-state">' + esc(signal.state) + '</span></p>' +
      '<h3>' + esc(signal.title) + '</h3>' +
      '<p>' + esc(signal.body) + '</p>' +
      '<p>' + esc(signal.impact) + '</p>' +
      '<p class="home-date">' + esc(signal.date) + '</p>' +
      '<div class="home-card-actions">' +
        '<button type="button" class="home-text">Dismiss</button>' +
        '<button type="button" class="home-text">Defer</button>' +
        goButton('Action', signal.opens, signal) +
      '</div></article>';
  }).join('');

  root.querySelector('.home-leads-title').textContent = data.leadsTitle;
  root.querySelector('.home-leads-link').textContent = data.leadsLink + ' ›';
  root.querySelector('.home-leads').innerHTML = (data.leads || []).map(function (lead) {
    var open = lead.opens
      ? ' data-hub-go="' + esc(lead.opens) + '" data-account-id="' + esc(lead.id) + '" data-account-name="' + esc(lead.name) + '"'
      : '';
    return '<article class="home-card"' + open + '>' +
      '<h3>' + esc(lead.name) + '</h3>' +
      '<p>' + esc(lead.product) + '</p>' +
      '<p>Estimated ACV ' + esc(lead.acv) + '</p>' +
      '<p>Merchant ROI ' + esc(lead.roi) + '</p>' +
      '<div class="home-card-actions">' +
        '<button type="button" class="home-text">Dismiss</button>' +
        goButton('Learn More', lead.opens, lead) +
      '</div></article>';
  }).join('');

  root.addEventListener('click', function (event) {
    var filterButton = event.target.closest('[data-home-filter]');
    if (filterButton) {
      filter = filterButton.getAttribute('data-home-filter');
      root.querySelectorAll('.home-filter').forEach(function (button) {
        button.classList.toggle('is-selected', button === filterButton);
      });
      renderTable();
      return;
    }
    var button = event.target.closest('button');
    if (!button || button.hasAttribute('data-hub-go') || !window.c360Toast) return;
    window.c360Toast(button.textContent.trim() + ' (preview only)');
  });
};
