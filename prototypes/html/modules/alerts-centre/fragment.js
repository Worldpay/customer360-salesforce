window.c360RenderAlerts = function (root, data) {
  if (!root || !data || root.getAttribute('data-rendered') === 'true') return;
  root.setAttribute('data-rendered', 'true');
  root.setAttribute('data-account-ids', (data.rows || []).map(function (row) { return row.id; }).join(' '));

  function esc(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  root.querySelector('.alerts-crumbs').innerHTML = (data.crumbs || []).map(function (crumb, index) {
    return (index ? ' <span aria-hidden="true">›</span> ' : '') + esc(crumb);
  }).join('');
  root.querySelector('.alerts-back').textContent = '‹ ' + data.backLabel;
  root.querySelector('.alerts-back').setAttribute('data-hub-go', 'home');
  root.querySelector('.alerts-title').textContent = data.title;
  root.querySelector('.alerts-updated').textContent = data.updated;
  root.querySelector('.alerts-export').textContent = data.exportLabel;
  root.querySelector('.alerts-search').placeholder = data.searchPlaceholder;
  root.querySelector('.alerts-summary').textContent = data.summary;
  root.querySelector('.alerts-note').textContent = data.note;
  root.querySelector('.alerts-rows').innerHTML = (data.rows || []).map(function (row) {
    var open = ' data-hub-go="churn" data-account-id="' + esc(row.id) + '" data-account-name="' + esc(row.name) + '"';
    return '<tr>' +
      '<td><button type="button" class="alerts-name"' + open + '>' + esc(row.name) + '</button></td>' +
      '<td>' + esc(row.score) + '</td>' +
      '<td>' + esc(row.threshold) + '</td>' +
      '<td>' + esc(row.date) + '</td>' +
      '<td>' + esc(row.suppression) + '</td>' +
      '<td>' + esc(row.task) + '</td>' +
      '<td>' + esc(row.email) + '</td>' +
      '<td>' + esc(row.status) + '</td>' +
      '<td><button type="button" class="alerts-action"' + open + '>Action</button></td>' +
      '</tr>';
  }).join('');

  root.addEventListener('click', function (event) {
    var button = event.target.closest('button');
    if (!button || button.hasAttribute('data-hub-go') || !window.c360Toast) return;
    window.c360Toast(button.textContent.trim() + ' (preview only)');
  });
};
