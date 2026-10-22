(function () {
  var page = window.C360_ALERTS_V3;
  var root = document.querySelector('[data-module="alert-table"]');
  if (!page || !root) return;
  var query = "";
  var status = "All";

  function paint() {
    var rows = page.rows.filter(function (row) {
      var text = (row.name + " " + row.id).toLowerCase();
      var statusOk = status === "All" || row.status === status;
      return statusOk && text.indexOf(query) !== -1;
    });
    var body = rows.map(function (row) {
      return "<tr><td><button type=\"button\" class=\"account\" data-av3-toast=\"" + window.av3Esc(row.name) + " (preview only)\">" +
        window.av3Esc(row.name) + "</button></td>" +
        '<td class="score score-' + row.scoreTone + '">' + window.av3Esc(row.score) + "</td>" +
        "<td>" + window.av3Esc(row.threshold) + "</td><td>" + window.av3Esc(row.date) + "</td><td>" +
        window.av3Esc(row.suppression) + "</td><td>" + window.av3Esc(row.task) + "</td><td>" +
        window.av3Esc(row.email) + '</td><td><span class="badge badge-' + row.statusTone + '">' +
        window.av3Esc(row.status) + "</span></td><td>" +
        '<button type="button" class="action" data-av3-toast="Action (preview only)">Action</button></td></tr>';
    }).join("");
    var heads = page.columns.map(function (column) { return "<th>" + window.av3Esc(column) + "</th>"; }).join("");
    root.innerHTML =
      '<p class="summary">' + window.av3Esc(page.summary) + "</p>" +
      '<div class="table-wrap"><table class="alerts"><thead><tr>' + heads + "</tr></thead><tbody>" +
        (body || '<tr><td class="empty" colspan="9">No alerts match this filter.</td></tr>') +
      "</tbody></table></div>" +
      '<p class="logic">' + window.av3Esc(page.logicLead) + "<strong>" + window.av3Esc(page.logicEmphasis) + "</strong>" +
        window.av3Esc(page.logicRest) + "</p>";
  }

  document.addEventListener("input", function (event) {
    if (!event.target.matches("[data-av3-query]")) return;
    query = event.target.value.trim().toLowerCase();
    paint();
  });
  document.addEventListener("change", function (event) {
    if (!event.target.matches("[data-av3-status]")) return;
    var value = event.target.value.replace(/^Status:\s*/, "");
    status = value === page.statusLabel ? "All" : value;
    paint();
  });
  paint();
})();
