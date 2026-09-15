(function () {
  function ensureHost(container) {
    if (!container) return null;
    var host = container.closest('.table-loading-host');
    if (!host) {
      host = document.createElement('div');
      host.className = 'table-loading-host';
      var parent = container.parentNode;
      if (container.classList.contains('table-scroll')) {
        parent.insertBefore(host, container);
        host.appendChild(container);
      } else {
        parent.insertBefore(host, container);
        host.appendChild(container);
      }
    }
    if (!host.querySelector('.table-loading-overlay')) {
      var overlay = document.createElement('div');
      overlay.className = 'table-loading-overlay';
      overlay.setAttribute('aria-live', 'polite');
      overlay.innerHTML =
        '<div class="table-loading-spinner" role="status" aria-label="Loading"></div>' +
        '<span class="table-loading-label">Loading accounts…</span>';
      host.insertBefore(overlay, host.firstChild);
    }
    return host;
  }

  function run(options) {
    var container = options.container;
    var renderFn = options.renderFn;
    var delayMs = options.delayMs == null ? 800 : options.delayMs;
    var label = options.label || 'Loading accounts…';
    var host = ensureHost(container);
    if (!host || typeof renderFn !== 'function') return;
    var overlay = host.querySelector('.table-loading-label');
    if (overlay) overlay.textContent = label;
    host.classList.add('is-loading');
    setTimeout(function () {
      renderFn();
      host.classList.remove('is-loading');
    }, delayMs);
  }

  window.C360TableLoading = { run: run, ensureHost: ensureHost };
})();
