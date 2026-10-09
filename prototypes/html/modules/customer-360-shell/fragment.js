(function () {
  var root = document.querySelector('[data-module="customer-360-shell"]');
  if (!root || typeof CUSTOMER_360_SHELL === 'undefined') return;
  var data = CUSTOMER_360_SHELL;
  var current = 'home';

  function esc(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  var icons = {
    home: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
    'alert-centre': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 4 3.5 19h17L12 4Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M12 10v4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="16.5" r="0.8" fill="currentColor"/></svg>',
    'cross-sell': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    analytics: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 19V10M12 19V5M19 19v-7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    customers: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="9" cy="9" r="3" stroke="currentColor" stroke-width="1.8"/><path d="M4 19c.6-2.4 2.5-4 5-4s4.4 1.6 5 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="17" cy="9" r="2.2" stroke="currentColor" stroke-width="1.8"/><path d="M16.2 15c1.8.3 3.2 1.5 3.8 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    reports: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 3.5h7l5 5V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M14 3.5V9h5.5" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
    settings: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8"/><path d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2M6 6l1.6 1.6M16.4 16.4 18 18M18 6l-1.6 1.6M7.6 16.4 6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>'
  };

  function accountRecord(id, name) {
    return { id: id || 'SF-89210', name: name || 'Acme Corporation' };
  }

  function highlightFor(view) {
    if (view === 'churn' || view === 'cross-sell') return 'customers';
    if (view === 'alerts') return 'alert-centre';
    if (view === 'analytics') return 'analytics';
    if (view === 'customers') return 'customers';
    return 'home';
  }

  function nameFor(id) {
    var lists = [];
    if (window.HOME_PAGE) lists = lists.concat(HOME_PAGE.accounts || [], HOME_PAGE.signals || [], HOME_PAGE.leads || []);
    if (window.ALERTS_CENTRE) lists = lists.concat(ALERTS_CENTRE.rows || []);
    var found = lists.filter(function (row) { return row.id === id; })[0];
    return found ? found.name : 'Account';
  }

  function pathFor(view, accountId) {
    if (view === 'alerts') return '/alerts';
    if (view === 'analytics') return '/analytics';
    if (view === 'customers') return '/customers';
    if (view === 'churn') return '/churn' + (accountId ? '?id=' + encodeURIComponent(accountId) : '');
    if (view === 'cross-sell') return '/crosssell' + (accountId ? '?id=' + encodeURIComponent(accountId) : '');
    return '/';
  }

  function readRoute() {
    var path = location.pathname.replace(/\/$/, '') || '/';
    var id = new URLSearchParams(location.search).get('id');
    if (path === '/alerts') return { view: 'alerts' };
    if (path === '/analytics') return { view: 'analytics' };
    if (path === '/customers') return { view: 'customers' };
    if (path === '/churn') return { view: 'churn', accountId: id || '' };
    if (path === '/crosssell') return { view: 'cross-sell', accountId: id || '' };
    return { view: 'home' };
  }

  function paintNav() {
    var active = highlightFor(current);
    root.querySelectorAll('[data-hub-nav]').forEach(function (button) {
      var on = button.getAttribute('data-hub-nav') === active;
      button.classList.toggle('active', on);
      if (on) button.setAttribute('aria-current', 'page');
      else button.removeAttribute('aria-current');
    });
  }

  function paintChurn(account) {
    var page = root.querySelector('[data-view="churn"]');
    var base = window.ENTERPRISE_ACCOUNT_HOME || {};
    page.querySelector('.ehome-crumbs').textContent = 'Home › Customers › ' + account.name;
    page.querySelector('.ehome-back').textContent = '‹ Back to Customers';
    page.querySelector('.ehome-account').textContent = account.name;
    page.querySelector('.ehome-meta').textContent = 'Salesforce Account ID: #' + account.id + ' • Enterprise Segment • Assigned RM: You';
    page.querySelector('.ehome-synced').textContent = base.lastSynced || 'Last Synced: 28 Aug 2026';
    if (!page.querySelector('.ehome-action')) {
      page.querySelector('.ehome-tools-actions').innerHTML = (base.actions || []).map(function (action) {
        return '<button type="button" class="ehome-action ' + esc(action.variant) + '" data-hub-action="header">' + esc(action.label) + '</button>';
      }).join('');
    }
    var known = (data.insightAccounts.churn || []).indexOf(account.id) !== -1;
    page.querySelector('.ehome-children').hidden = !known;
    page.querySelector('.ehome-missing').hidden = known;
    page.querySelectorAll('[data-module]').forEach(function (child) {
      child.setAttribute('data-account-id', account.id);
    });
  }

  function paintCrossSell(account) {
    var page = root.querySelector('[data-view="cross-sell"]');
    var base = window.REVENUE_BOOST_SUMMARY || {};
    var accountNode = page.querySelector('.rbs-account');
    if (accountNode) {
      accountNode.innerHTML = esc(account.name) + ' <span class="rbs-badge">' + esc(base.badge || 'Revenue Boost opportunity') + '</span>';
    }
    var meta = page.querySelector('.rbs-meta');
    if (meta) meta.textContent = 'Salesforce Account ID: #' + account.id + ' · Enterprise Segment · Assigned RM: You';
    var crumbs = page.querySelector('.rbs-crumbs');
    if (crumbs) crumbs.textContent = 'Home › Customers › ' + account.name + ' › Cross-Sell Leads › Revenue Boost Opportunity';
    var known = (data.insightAccounts['cross-sell'] || []).indexOf(account.id) !== -1;
    var children = page.querySelector('.rbs-children');
    var missing = page.querySelector('.rbs-missing');
    if (children) children.hidden = !known;
    if (missing) missing.hidden = known;
    page.querySelectorAll('[data-module]').forEach(function (child) {
      child.setAttribute('data-account-id', account.id);
    });
  }

  function show(view, accountId, accountName, skipUrl) {
    current = view;
    root.querySelectorAll('.hub-view').forEach(function (panel) {
      panel.classList.toggle('is-active', panel.getAttribute('data-view') === view);
    });
    var account = accountRecord(accountId, accountName || nameFor(accountId));
    if (view === 'churn') paintChurn(account);
    if (view === 'cross-sell') paintCrossSell(account);
    paintNav();
    if (skipUrl) return;
    var next = pathFor(view, view === 'churn' || view === 'cross-sell' ? account.id : '');
    var here = (location.pathname.replace(/\/$/, '') || '/') + location.search;
    if (here !== next) history.pushState({ view: view, accountId: account.id }, '', next);
  }

  function destination(item) {
    if (item.view === 'crossSellNav') return data.crossSellNav || {};
    if (!item.view) return null;
    return { view: item.view };
  }

  root.querySelector('.hub-brand-name').textContent = data.brand;
  root.querySelector('.hub-side-date').textContent = data.navDate;
  root.querySelector('.hub-product').textContent = data.product;
  root.querySelector('.hub-search input').placeholder = data.searchPlaceholder;
  root.querySelector('.hub-avatar').textContent = data.userInitials;
  root.querySelector('.hub-user-name').textContent = data.userName;
  root.querySelector('.hub-user-role').textContent = data.userRole;
  root.querySelector('.hub-nav').innerHTML = (data.nav || []).map(function (item) {
    var target = destination(item);
    var attrs = target
      ? ' data-hub-go="' + esc(target.view) + '"' + (target.accountId ? ' data-account-id="' + esc(target.accountId) + '"' : '')
      : '';
    return '<button type="button" class="hub-nav-item" data-hub-nav="' + esc(item.id) + '"' + attrs + '>' +
      (icons[item.id] || '') + '<span>' + esc(item.label) + '</span></button>';
  }).join('');

  root.addEventListener('click', function (event) {
    var button = event.target.closest('button');
    if (button && button.hasAttribute('data-hub-action')) {
      if (window.c360Toast) window.c360Toast(button.textContent.trim() + ' (preview only)');
      return;
    }
    if (button && button.hasAttribute('data-hub-nav') && !button.hasAttribute('data-hub-go')) {
      if (window.c360Toast) window.c360Toast(button.textContent.trim() + ' (preview only)');
      return;
    }
    if (button && !button.hasAttribute('data-hub-go')) return;
    var go = button && button.hasAttribute('data-hub-go') ? button : event.target.closest('[data-hub-go]');
    if (!go) {
      var chrome = event.target.closest('[data-hub-action]');
      if (chrome && window.c360Toast) window.c360Toast((chrome.getAttribute('aria-label') || chrome.textContent.trim()) + ' (preview only)');
      return;
    }
    show(go.getAttribute('data-hub-go'), go.getAttribute('data-account-id'), go.getAttribute('data-account-name'));
  });

  if (window.c360RenderHome) c360RenderHome(root.querySelector('[data-module="home-page"]'), window.HOME_PAGE);
  if (window.c360RenderAlerts) c360RenderAlerts(root.querySelector('[data-module="alerts-centre"]'), window.ALERTS_CENTRE);

  window.addEventListener('popstate', function () {
    var route = readRoute();
    show(route.view, route.accountId, nameFor(route.accountId), true);
  });

  var opening = readRoute();
  if (location.pathname.indexOf('preview.html') !== -1) {
    history.replaceState({ view: 'home' }, '', '/');
    opening = { view: 'home' };
  }
  show(opening.view, opening.accountId, nameFor(opening.accountId), true);
})();
