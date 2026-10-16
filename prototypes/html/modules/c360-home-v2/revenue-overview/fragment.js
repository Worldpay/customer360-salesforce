(function () {
  var data = window.C360_HOME_V2 && window.C360_HOME_V2.revenue;
  var root = document.querySelector('[data-module="revenue-overview"]');
  if (!data || !root || !window.hv2Icon) return;

  var bars = data.points.map(function (height, index) {
    var active = index === data.points.length - 1 ? " chart-bar-active" : "";
    return (
      '<span class="chart-column"><span class="chart-bar' + active + '" style="height:' +
        Number(height) + '%"></span></span>'
    );
  }).join("");

  var labels = data.labels.map(function (label) {
    return "<span>" + window.hv2Esc(label) + "</span>";
  }).join("");

  root.classList.add("panel", "revenue-panel");
  root.innerHTML =
    '<header class="panel-header"><div><h2>' + window.hv2Esc(data.title) + "</h2>" +
      "<p>" + window.hv2Esc(data.subtitle) + "</p></div>" +
      '<button type="button" class="period-select">' + window.hv2Esc(data.periodLabel) +
        window.hv2Icon("chevron", 14) + "</button></header>" +
    '<div class="revenue-summary"><strong>' + window.hv2Esc(data.amount) + "</strong>" +
      "<span>" + window.hv2Icon("activity", 13) + window.hv2Esc(data.change) + "</span></div>" +
    '<div class="chart"><div class="chart-grid"><span></span><span></span><span></span><span></span></div>' +
      '<div class="chart-columns">' + bars + "</div>" +
      '<div class="chart-labels">' + labels + "</div></div>";
})();
