(function () {
  if (typeof PORTFOLIO_HEALTH === 'undefined') return;

  var tiles = document.getElementById('health-tiles');
  var pipeline = document.getElementById('pipeline-rows');
  if (!tiles || !pipeline) return;

  var h = PORTFOLIO_HEALTH;
  tiles.innerHTML =
    '<div class="mtile"><div class="mt-l">Healthy</div><div class="mt-v good">' + h.healthy + '</div></div>' +
    '<div class="mtile"><div class="mt-l">Watch</div><div class="mt-v watch">' + h.watch + '</div></div>' +
    '<div class="mtile"><div class="mt-l">At risk</div><div class="mt-v risk">' + h.atRisk + '</div></div>';

  pipeline.innerHTML = h.pipeline.map(function (row) {
    return (
      '<div class="drv">' +
        '<div class="d-n"><b>' + row.name + '</b><div class="d-s">' + row.detail + '</div></div>' +
        '<div class="d-bar pos"><i style="width:' + row.width + '"></i></div>' +
        '<div class="d-pct">' + row.value + '</div>' +
      '</div>'
    );
  }).join('');
})();
