(function () {
  function esc(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function line(points) {
    var max = Math.max.apply(null, points);
    var min = Math.min.apply(null, points);
    var span = max - min || 1;
    var step = points.length > 1 ? 120 / (points.length - 1) : 0;
    return points.map(function (point, index) {
      var x = (index * step).toFixed(1);
      var y = (36 - ((point - min) / span) * 28).toFixed(1);
      return x + ',' + y;
    }).join(' ');
  }

  document.querySelectorAll('[data-module="performance-and-trends"]').forEach(function (root) {
    if (typeof PERFORMANCE_AND_TRENDS === 'undefined') return;
    var data = PERFORMANCE_AND_TRENDS;
    root.querySelector('.pat-title').textContent = data.title;
    root.querySelector('.pat-subtitle').textContent = data.subtitle;
    root.querySelector('.pat-ranges').innerHTML = (data.ranges || []).map(function (range) {
      return '<button type="button" class="pat-range' + (range.selected ? ' is-selected' : '') + '" data-pat-action="range" data-range="' + esc(range.id) + '">' + esc(range.label) + '</button>';
    }).join('');
    root.querySelector('.pat-charts').innerHTML = (data.charts || []).map(function (chart) {
      var note = chart.note ? '<p class="pat-chart-note">' + esc(chart.note) + '</p>' : '';
      var caption = chart.caption ? '<p class="pat-chart-caption">' + esc(chart.caption) + '</p>' : '';
      return '<article class="pat-chart"><h3 class="pat-chart-title">' + esc(chart.title) + '</h3>' +
        caption +
        '<p class="pat-chart-latest">' + esc(chart.latest) + '</p>' +
        note +
        '<svg viewBox="0 0 120 48" preserveAspectRatio="none" aria-hidden="true"><polyline fill="none" stroke="#2e844a" stroke-width="2" points="' + line(chart.points || []) + '"/></svg></article>';
    }).join('');
    var head = '<tr><th>Metric</th>' + (data.periods || []).map(function (period) {
      return '<th>' + esc(period) + '</th>';
    }).join('') + '</tr>';
    var body = (data.rows || []).map(function (row) {
      return '<tr><td>' + esc(row.metric) + '</td>' + (row.cells || []).map(function (cell) {
        return '<td>' + esc(cell) + '</td>';
      }).join('') + '</tr>';
    }).join('');
    root.querySelector('.pat-table-wrap').innerHTML = '<table class="pat-table"><thead>' + head + '</thead><tbody>' + body + '</tbody></table>';
    root.querySelector('.pat-scenario-title').textContent = data.scenarioTitle;
    root.querySelector('.pat-scenario-actions').innerHTML = (data.scenarioActions || []).map(function (action) {
      return '<button type="button" class="pat-action ' + esc(action.variant) + '" data-pat-action="' + esc(action.id) + '">' + esc(action.label) + '</button>';
    }).join('');

    root.addEventListener('click', function (event) {
      var button = event.target.closest('[data-pat-action]');
      if (!button) return;
      if (button.getAttribute('data-pat-action') === 'range') {
        root.querySelectorAll('.pat-range').forEach(function (chip) {
          chip.classList.toggle('is-selected', chip === button);
        });
      }
      root.dispatchEvent(new CustomEvent('performancetrend', {
        bubbles: true,
        detail: { id: button.getAttribute('data-pat-action') }
      }));
      var label = button.textContent.trim() || button.getAttribute('aria-label') || data.title;
      if (window.c360Toast) window.c360Toast(label + ' (preview only)');
    });
  });
})();
