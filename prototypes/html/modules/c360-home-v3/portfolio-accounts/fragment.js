(function () {
  var page = window.C360_HOME_V3;
  var root = document.querySelector('[data-module="portfolio-accounts"]');
  if (!page || !root) return;
  var portfolio = page.portfolio;
  var filter = "all";
  var query = "";

  function matches(row) {
    var risk = row.risk.toLowerCase().replace(" ", "-");
    var text = (row.name + " " + row.id).toLowerCase();
    return (filter === "all" || risk === filter) && text.indexOf(query) !== -1;
  }

  function paint(keepSearch) {
    var rows = portfolio.rows.filter(matches);
    var body = rows.map(function (row) {
      var action = row.action
        ? '<button type="button" class="mini mini-fill" data-hv3-toast="Action (preview only)">Action</button>'
        : "";
      return "<tr><td class=\"account-name\">" + window.hv3Esc(row.name) + "</td>" +
        '<td><span class="score tone-' + row.scoreTone + '">' + window.hv3Esc(row.score) + "</span></td>" +
        '<td class="change-' + row.changeTone + '">' + window.hv3Esc(row.change) + "</td>" +
        '<td><span class="risk tone-' + row.scoreTone + '">' + window.hv3Esc(row.risk) + "</span></td>" +
        "<td>" + window.hv3Esc(row.signal) + "</td><td>" + window.hv3Esc(row.leads) + "</td><td>" + window.hv3Esc(row.acv) + "</td>" +
        '<td><div class="row-actions"><button type="button" class="mini" data-hv3-toast="Defer (preview only)">Defer</button>' + action + "</div></td></tr>";
    }).join("");
    var filters = portfolio.filters.map(function (item) {
      return '<button type="button" class="filter' + (item.id === filter ? " is-active" : "") + '" data-filter="' + item.id + '">' +
        window.hv3Esc(item.label) + "</button>";
    }).join("");
    var heads = portfolio.columns.map(function (column) { return "<th>" + window.hv3Esc(column) + "</th>"; }).join("");
    var showing = query || filter !== "all"
      ? "Showing " + rows.length + " of 11 accounts"
      : portfolio.showingTemplate;
    root.innerHTML =
      '<div class="section-head portfolio-head"><div class="filters-wrap"><h2 class="section-title">' + window.hv3Esc(portfolio.title) + "</h2>" +
        '<div class="filters">' + filters + "</div></div>" +
        '<label class="search">' + window.hv3Icon("search", 14) +
          '<input type="search" value="' + window.hv3Esc(query) + '" placeholder="' + window.hv3Esc(portfolio.searchPlaceholder) + '" data-search>' +
        "</label></div>" +
      '<div class="table-wrap"><table class="accounts"><thead><tr>' + heads + "</tr></thead><tbody>" +
        (body || '<tr><td colspan="8">No accounts match this filter.</td></tr>') +
      "</tbody></table></div>" +
      '<div class="table-foot"><span>' + window.hv3Esc(showing) + '</span><div class="pager">' +
        '<button type="button" data-hv3-toast="Previous page (preview only)" aria-label="Previous">‹</button>' +
        '<button type="button" class="is-active" data-page="1">1</button>' +
        '<button type="button" data-hv3-toast="Page 2 (preview only)">2</button>' +
        '<button type="button" data-hv3-toast="Next page (preview only)" aria-label="Next">›</button></div></div>';
    if (keepSearch) {
      var input = root.querySelector("[data-search]");
      input.focus();
      input.setSelectionRange(query.length, query.length);
    }
  }

  root.addEventListener("click", function (event) {
    var button = event.target.closest("[data-filter]");
    if (!button) return;
    filter = button.getAttribute("data-filter");
    paint();
  });
  root.addEventListener("input", function (event) {
    var input = event.target.closest("[data-search]");
    if (!input) return;
    query = input.value.trim().toLowerCase();
    paint(true);
  });
  paint();
})();
