(function () {
  document.querySelectorAll('[data-module="identified-risk-signals"]').forEach(function (root) {
    if (typeof IDENTIFIED_RISK_SIGNALS === 'undefined') return;
    var data = IDENTIFIED_RISK_SIGNALS;
    root.querySelector('.irs-title').textContent = data.title;
    root.querySelector('.irs-badge').textContent = data.badge;
    var row = root.querySelector('.irs-row');
    row.setAttribute('aria-expanded', 'false');
    row.addEventListener('click', function () {
      root.dispatchEvent(new CustomEvent('togglesignals', { bubbles: true }));
      if (window.c360Toast) window.c360Toast(data.title + ' (preview only)');
    });
  });
})();
