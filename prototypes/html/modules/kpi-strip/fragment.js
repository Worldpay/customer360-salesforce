(function () {
  var grid = document.getElementById('kpi-grid');
  if (!grid || typeof KPI_TILES === 'undefined') return;

  grid.innerHTML = KPI_TILES.map(function (tile) {
    var cls = 'kpi' + (tile.attention ? ' attention' : '');
    return (
      '<div class="' + cls + '">' +
        '<div class="k-lbl">' + tile.label + '</div>' +
        '<div class="k-val">' + tile.value + '</div>' +
        '<div class="k-sub">' + tile.detail + '</div>' +
      '</div>'
    );
  }).join('');
})();
