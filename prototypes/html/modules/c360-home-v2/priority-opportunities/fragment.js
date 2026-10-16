(function () {
  var data = window.C360_HOME_V2 && window.C360_HOME_V2.opportunities;
  var root = document.querySelector('[data-module="priority-opportunities"]');
  if (!data || !root || !window.hv2Icon) return;

  var head = data.columns.map(function (column) {
    return "<th>" + window.hv2Esc(column) + "</th>";
  }).join("") + '<th aria-label="Actions"></th>';

  var body = data.rows.map(function (row) {
    return (
      "<tr><td><div class=\"company-cell\">" +
        '<span class="avatar avatar-' + window.hv2Esc(row.tone) + ' avatar-medium">' +
          window.hv2Esc(row.initials) + "</span>" +
        "<span><strong>" + window.hv2Esc(row.companyName) + "</strong><small>" +
          window.hv2Esc(row.contactName) + "</small></span></div></td>" +
        '<td><span class="stage stage-' + window.hv2Esc(row.stage.toLowerCase()) + '">' +
          window.hv2Esc(row.stage) + "</span></td>" +
        '<td class="value-cell">' + window.hv2Esc(row.amount) + "</td>" +
        '<td class="muted-cell">' + window.hv2Esc(row.closeDate) + "</td>" +
        "<td><div class=\"confidence\"><span class=\"confidence-track\"><span style=\"width:" +
          Number(row.confidence) + "%\"></span></span><strong>" + window.hv2Esc(row.confidence) +
          "%</strong></div></td>" +
        '<td><button type="button" class="icon-button" aria-label="' +
          window.hv2Esc("Actions for " + row.companyName) + '">' + window.hv2Icon("more", 18) +
        "</button></td></tr>"
    );
  }).join("");

  root.classList.add("panel", "opportunities-panel");
  root.innerHTML =
    '<header class="panel-header"><div><h2>' + window.hv2Esc(data.title) + "</h2>" +
      "<p>" + window.hv2Esc(data.subtitle) + "</p></div>" +
      '<button type="button" class="button button-ghost">' + window.hv2Esc(data.viewLabel) +
        window.hv2Icon("arrow", 14) + "</button></header>" +
    '<div class="table-wrap"><table class="opportunity-table"><thead><tr>' + head +
      "</tr></thead><tbody>" + body + "</tbody></table></div>";
})();
