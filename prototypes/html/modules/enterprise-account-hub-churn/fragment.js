(function () {
  var root = document.querySelector('[data-module="enterprise-account-hub-churn"]');
  if (!root || typeof ENTERPRISE_ACCOUNT_HUB_CHURN === 'undefined') return;
  var data = ENTERPRISE_ACCOUNT_HUB_CHURN;

  function esc(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  root.querySelector('.eah-product').textContent = data.product;
  root.querySelector('.eah-search input').placeholder = data.searchPlaceholder;
  root.querySelector('.eah-avatar').textContent = data.userInitials;
  root.querySelector('.eah-user-name').textContent = data.userName;
  root.querySelector('.eah-user-role').textContent = data.userRole;
  root.querySelector('.eah-crumbs').innerHTML = (data.crumbs || []).map(function (crumb, index) {
    return (index ? '<span aria-hidden="true">›</span>' : '') + '<span>' + esc(crumb) + '</span>';
  }).join('');
  root.querySelector('.eah-back').textContent = '‹ ' + data.backLabel;
  root.querySelector('.eah-account').textContent = data.accountName;
  root.querySelector('.eah-meta').textContent = data.accountLine;
  root.querySelector('.eah-synced').textContent = data.lastSynced;
  root.querySelector('.eah-tools-actions').innerHTML = (data.actions || []).map(function (action) {
    return '<button type="button" class="eah-action ' + esc(action.variant) + '" data-eah-action="' + esc(action.id) + '">' + esc(action.label) + '</button>';
  }).join('');

  root.addEventListener('click', function (event) {
    var button = event.target.closest('[data-eah-action]');
    if (!button || !window.c360Toast) return;
    window.c360Toast(button.textContent.trim() + ' (preview only)');
  });
})();
