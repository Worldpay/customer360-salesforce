(function () {
  function esc(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  document.querySelectorAll('[data-module="churn-current-status"]').forEach(function (root) {
    if (typeof CHURN_CURRENT_STATUS === 'undefined') return;
    var data = CHURN_CURRENT_STATUS;
    var actions = (data.actions || []).map(function (action) {
      var variant = action.variant === 'danger' ? 'danger' : 'text';
      return '<button type="button" class="ccs-action ' + variant + '" data-action="' + esc(action.id) + '">' + esc(action.label) + '</button>';
    }).join('');
    root.querySelector('.ccs-bar').innerHTML =
      '<div class="ccs-state"><span>' + esc(data.statusLabel) + '</span> <span class="ccs-pill">' + esc(data.status) + '</span></div>' +
      '<div class="ccs-triggered">' + esc(data.triggered) + '</div>' +
      '<div class="ccs-actions">' + actions + '</div>' +
      '<div class="ccs-visibility">' + esc(data.visibility) + '</div>';
    root.addEventListener('click', function (event) {
      var button = event.target.closest('[data-action]');
      if (!button) return;
      root.dispatchEvent(new CustomEvent('statusaction', {
        bubbles: true,
        detail: { id: button.getAttribute('data-action') }
      }));
      if (window.c360Toast) window.c360Toast(button.textContent + ' (preview only)');
    });
  });
})();
