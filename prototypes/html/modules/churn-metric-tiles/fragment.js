(function () {
  function esc(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function arrow(direction) {
    if (direction === 'down') return '&#9660;';
    if (direction === 'up') return '&#9650;';
    return '';
  }

  document.querySelectorAll('[data-module="churn-metric-tiles"]').forEach(function (root) {
    if (typeof CHURN_METRIC_TILES === 'undefined') return;
    root.querySelector('.cmt-grid').innerHTML = CHURN_METRIC_TILES.map(function (tile) {
      var valueClass = 'cmt-value' + (tile.valueTone ? ' tone-' + esc(tile.valueTone) : '');
      var trend = tile.trend
        ? '<div class="cmt-trend tone-' + esc(tile.trendTone || 'neutral') + '">' +
            arrow(tile.trendDirection) + ' ' + esc(tile.trend) +
          '</div>'
        : '';
      return (
        '<article class="cmt-tile">' +
          '<div class="cmt-top"><span class="cmt-label">' + esc(tile.label) + '</span>' +
            '<span class="cmt-badge tone-' + esc(tile.badgeTone || 'neutral') + '">' + esc(tile.badge) + '</span></div>' +
          '<div class="' + valueClass + '">' + esc(tile.value) + '</div>' +
          '<div class="cmt-caption">' + esc(tile.caption) + '</div>' +
          trend +
        '</article>'
      );
    }).join('');
  });
})();
