(function () {
  var page = window.C360_HOME_V3;
  var root = document.querySelector('[data-module="revenue-overview"]');
  if (!page || !root) return;
  var revenue = page.revenue;
  var max = 138;
  var bars = revenue.bars.map(function (bar) {
    var height = Math.round((bar.height / max) * 120);
    return '<div class="bar-col"><span class="bar' + (bar.current ? " is-current" : "") + '" style="height:' + height + 'px"></span>' +
      '<span class="bar-label">' + window.hv3Esc(bar.label) + "</span></div>";
  }).join("");
  root.innerHTML =
    '<div class="section-head"><div><h2 class="section-title">' + window.hv3Esc(revenue.title) + "</h2>" +
      '<p class="section-sub">' + window.hv3Esc(revenue.subtitle) + "</p></div>" +
      '<button type="button" class="select-btn" data-hv3-toast="' + window.hv3Esc(revenue.periodLabel) + ' (preview only)">' +
        window.hv3Esc(revenue.periodLabel) + window.hv3Icon("chevron", 14) + "</button></div>" +
    '<div class="panel"><div class="revenue-headline"><strong class="revenue-amount">' + window.hv3Esc(revenue.amount) + "</strong>" +
      '<span class="revenue-change">' + window.hv3Icon("trend", 16) + window.hv3Esc(revenue.change) + "</span></div>" +
      '<div class="bar-chart">' + bars +
        '<svg class="trend" viewBox="0 0 520 78" preserveAspectRatio="none" aria-hidden="true">' +
          '<polyline points="20,62 104,70 188,48 272,38 356,22 450,4" fill="none" stroke="#5b5bd7" stroke-width="2"/>' +
        "</svg></div></div>";
})();
