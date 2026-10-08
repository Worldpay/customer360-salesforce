(function () {
  var root = document.querySelector('[data-module="enterprise-account-home"]');
  if (!root || typeof ENTERPRISE_ACCOUNT_HOME === 'undefined') return;
  var data = ENTERPRISE_ACCOUNT_HOME;

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

  root.querySelector('.ehome-brand-name').textContent = data.brand;
  root.querySelector('.ehome-side-date').textContent = data.navDate;
  root.querySelector('.ehome-nav').innerHTML = (data.nav || []).map(function (item) {
    return '<button type="button" class="ehome-nav-item' + (item.active ? ' active' : '') + '" data-ehome-action="' + esc(item.id) + '"' + (item.active ? ' aria-current="page"' : '') + '>' +
      (icons[item.id] || '') + '<span>' + esc(item.label) + '</span></button>';
  }).join('');
  root.querySelector('.ehome-product').textContent = data.product;
  root.querySelector('.ehome-search input').placeholder = data.searchPlaceholder;
  root.querySelector('.ehome-avatar').textContent = data.userInitials;
  root.querySelector('.ehome-user-name').textContent = data.userName;
  root.querySelector('.ehome-user-role').textContent = data.userRole;
  root.querySelector('.ehome-crumbs').innerHTML = (data.crumbs || []).map(function (crumb, index) {
    return (index ? '<span aria-hidden="true">›</span>' : '') + '<span>' + esc(crumb) + '</span>';
  }).join('');
  root.querySelector('.ehome-back').textContent = '‹ ' + data.backLabel;
  root.querySelector('.ehome-account').textContent = data.accountName;
  root.querySelector('.ehome-meta').textContent = data.accountLine;
  root.querySelector('.ehome-synced').textContent = data.lastSynced;
  root.querySelector('.ehome-tools-actions').innerHTML = (data.actions || []).map(function (action) {
    return '<button type="button" class="ehome-action ' + esc(action.variant) + '" data-ehome-action="' + esc(action.id) + '">' + esc(action.label) + '</button>';
  }).join('');

  root.addEventListener('click', function (event) {
    var button = event.target.closest('[data-ehome-action]');
    if (!button || !window.c360Toast) return;
    window.c360Toast(button.textContent.trim() + ' (preview only)');
  });
})();
