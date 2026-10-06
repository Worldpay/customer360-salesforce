(function () {
  var root = document.querySelector('[data-module="merchant-business-case-header"]');
  var titleEl = document.getElementById('mbc-title');
  var actionsEl = document.getElementById('mbc-actions');
  var metricsEl = document.getElementById('mbc-metrics');
  if (!root || !titleEl || !actionsEl || !metricsEl || typeof MERCHANT_BUSINESS_CASE_HEADER === 'undefined') return;

  var data = MERCHANT_BUSINESS_CASE_HEADER;
  var actionEvent = {
    share: 'sharewithmerchant',
    'add-to-opportunity': 'addtoopportunity'
  };

  function esc(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  titleEl.textContent = data.title || '';

  actionsEl.innerHTML = (data.actions || []).map(function (action) {
    var variant = action.variant === 'primary' ? 'primary' : 'text';
    var cls = variant === 'primary' ? 'btn mbc-action primary' : 'mbc-action text';
    return (
      '<button type="button" class="' + cls + '" data-action="' + esc(action.id) + '">' +
        esc(action.label) +
      '</button>'
    );
  }).join('');

  metricsEl.innerHTML = (data.metrics || []).map(function (metric) {
    var cls = 'mbc-metric tone-' + esc(metric.tone || 'default');
    if (metric.emphasized) cls += ' emphasized';
    var info = metric.info
      ? '<button type="button" class="mbc-info" data-info="' + esc(metric.id) + '" aria-label="About ' + esc(metric.label) + '">i</button>'
      : '';
    return (
      '<article class="' + cls + '">' +
        '<div class="mbc-label"><span>' + esc(metric.label) + '</span>' + info + '</div>' +
        '<div class="mbc-value">' + esc(metric.value) + '</div>' +
        '<div class="mbc-caption">' + esc(metric.caption) + '</div>' +
      '</article>'
    );
  }).join('');

  actionsEl.addEventListener('click', function (event) {
    var button = event.target.closest('[data-action]');
    if (!button) return;
    var id = button.getAttribute('data-action');
    var name = actionEvent[id];
    if (!name) return;
    root.dispatchEvent(new CustomEvent(name, { bubbles: true, detail: { id: id } }));
    if (window.c360Toast) window.c360Toast(button.textContent + ' (preview only)');
  });

  metricsEl.addEventListener('click', function (event) {
    var info = event.target.closest('[data-info]');
    if (!info || !window.c360Toast) return;
    var id = info.getAttribute('data-info');
    var metric = (data.metrics || []).filter(function (item) { return item.id === id; })[0];
    if (metric) window.c360Toast('<b>' + esc(metric.label) + '</b> — ' + esc(metric.caption));
  });
})();
