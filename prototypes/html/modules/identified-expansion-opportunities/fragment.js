(function () {
  document.querySelectorAll('[data-module="identified-expansion-opportunities"]').forEach(function (root) {
    if (typeof IDENTIFIED_EXPANSION_OPPORTUNITIES === 'undefined') return;
    var data = IDENTIFIED_EXPANSION_OPPORTUNITIES;
    root.querySelector('.ieo-title').textContent = data.title;
    root.querySelector('.ieo-badge').textContent = data.badge;
    var row = root.querySelector('.ieo-row');
    row.setAttribute('aria-expanded', 'false');
    row.addEventListener('click', function () {
      root.dispatchEvent(new CustomEvent('toggleopportunities', { bubbles: true }));
      if (window.c360Toast) window.c360Toast(data.title + ' (preview only)');
    });
  });
})();
