(function () {
  var root = document.querySelector('[data-module="cross-sell-detail"]');
  if (!root || typeof CROSS_SELL_DETAIL === 'undefined') return;
  var data = CROSS_SELL_DETAIL;

  function esc(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  root.querySelector('.xsd-bars').innerHTML = (data.comparisons || []).map(function (item) {
    return '<article class="xsd-bar"><h3>' + esc(item.label) + '</h3><p class="xsd-value">' + esc(item.value) + '</p>' +
      '<p>' + esc(item.caption) + '</p><div class="xsd-track"><span style="width:' + esc(item.width) + '"></span></div></article>';
  }).join('');
  root.querySelector('.xsd-decline-title').textContent = data.declineTitle;
  root.querySelector('.xsd-badge').textContent = data.declineBadge;
  root.querySelector('.xsd-table-title').textContent = data.declineTable;
  root.querySelector('.xsd-note').textContent = data.declineNote;
  var head = '<tr>' + (data.columns || []).map(function (column) {
    return '<th>' + esc(column) + '</th>';
  }).join('') + '</tr>';
  var body = (data.rows || []).map(function (row) {
    return '<tr>' + row.map(function (cell) {
      return '<td>' + esc(cell) + '</td>';
    }).join('') + '</tr>';
  }).join('');
  root.querySelector('.xsd-table').innerHTML = '<thead>' + head + '</thead><tbody>' + body + '</tbody>';
})();
