(function () {
  function esc(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  document.querySelectorAll('[data-module="churn-alert-notification"]').forEach(function (root) {
    if (typeof CHURN_ALERT_NOTIFICATION === 'undefined') return;
    var data = CHURN_ALERT_NOTIFICATION;
    var body = root.querySelector('.can-body');
    body.innerHTML =
      '<span class="can-icon" aria-hidden="true">&#128276;</span>' +
      '<p class="can-copy"><strong>' + esc(data.title) + '</strong> <span class="can-sep">|</span> ' + esc(data.message) + '</p>' +
      '<div class="can-meta">' +
        '<span>' + esc(data.timestamp) + '</span>' +
        '<span class="can-priority">' + esc(data.priority) + '</span>' +
        '<button type="button" class="can-view" data-action="view">' + esc(data.viewLabel) + '</button>' +
      '</div>';
    body.addEventListener('click', function (event) {
      var button = event.target.closest('[data-action="view"]');
      if (!button) return;
      root.dispatchEvent(new CustomEvent('viewalert', { bubbles: true, detail: { id: 'churn-alert' } }));
      if (window.c360Toast) window.c360Toast(data.title + ' (preview only)');
    });
  });
})();
