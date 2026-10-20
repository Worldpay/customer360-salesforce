(function () {
  var page = window.C360_HOME_V3;
  var root = document.querySelector('[data-module="recommended-actions"]');
  if (!page || !root) return;
  var pathways = page.pathways;
  var heads = pathways.columns.map(function (column) { return "<th>" + window.hv3Esc(column) + "</th>"; }).join("");
  var rows = pathways.rows.map(function (row) {
    var tone = row.action === "Chase" ? " chase" : row.action === "Escalate" ? " escalate" : "";
    return "<tr><td>" + window.hv3Esc(row.account) + "</td><td>" + window.hv3Esc(row.pathway) + "</td><td>" +
      window.hv3Esc(row.stage) + "</td><td>" + window.hv3Esc(row.owner) + "</td><td>" + window.hv3Esc(row.date) + "</td>" +
      '<td><span class="status status-' + row.statusTone + '">● ' + window.hv3Esc(row.status) + "</span></td>" +
      "<td>" + window.hv3Esc(row.dependency) + "</td>" +
      '<td><button type="button" class="mini' + tone + '" data-hv3-toast="' + window.hv3Esc(row.action) + ' (preview only)">' +
        window.hv3Esc(row.action) + "</button></td></tr>";
  }).join("");
  var legend = pathways.legend.map(function (item) {
    return "<span><i class=\"dot dot-" + item.tone + '"></i>' + window.hv3Esc(item.label) + "</span>";
  }).join("");
  root.innerHTML =
    '<section class="pathways"><div class="section-head"><div><h2 class="section-title">' + window.hv3Esc(pathways.title) + "</h2>" +
      '<p class="summary">' + window.hv3Esc(pathways.summary) + "</p></div>" +
      '<button type="button" class="linkish" data-hv3-toast="View Full Timeline (preview only)">' + window.hv3Esc(pathways.viewAllLabel) + "</button></div>" +
      "<div class=\"table-wrap\"><table><thead><tr>" + heads + "</tr></thead><tbody>" + rows + "</tbody></table></div>" +
      '<div class="legend"><span>Legend:</span>' + legend + "</div></section>";
})();
