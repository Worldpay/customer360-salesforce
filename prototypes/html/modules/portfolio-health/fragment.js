(function () {
  function render() {
    if (typeof PORTFOLIO_HEALTH === 'undefined') return;
    var h = PORTFOLIO_HEALTH;
    var tiles = document.getElementById('health-tiles');
    var pipeline = document.getElementById('pipeline-rows');
    if (!tiles || !pipeline) return;
    tiles.innerHTML =
      '<button type="button" class="mtile mtile--link" data-portfolio-health-filter="Healthy" aria-label="View Healthy accounts">' +
      '<div class="mt-l">Healthy</div><div class="mt-v good">' + h.healthy + '</div></button>' +
      '<button type="button" class="mtile mtile--link" data-portfolio-health-filter="Watch" aria-label="View Watch accounts">' +
      '<div class="mt-l">Watch</div><div class="mt-v watch">' + h.watch + '</div></button>' +
      '<button type="button" class="mtile mtile--link" data-portfolio-health-filter="At risk" aria-label="View At risk accounts">' +
      '<div class="mt-l">At risk</div><div class="mt-v risk">' + h.atRisk + '</div></button>';
    pipeline.innerHTML = h.pipeline.map(function (row) {
      return (
        '<div class="drv">' +
        '<div class="d-n"><b>' + row.name + '</b><div class="d-s">' + row.detail + '</div></div>' +
        '<div class="d-bar pos"><i style="width:' + row.width + '"></i></div>' +
        '<div class="d-pct">' + row.value + '</div>' +
        '</div>'
      );
    }).join('');
  }

  window.C360PortfolioHealth = { render: render };

  if (document.getElementById('health-tiles') && !window.C360_UNIFIED_SPA && !window.C360_ACCOUNTS_HUB_SPA) {
    render();
  }
})();
