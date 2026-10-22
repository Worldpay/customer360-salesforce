(function () {
  var page = window.C360_ALERTS_V3;
  var root = document.querySelector('[data-module="alert-filters"]');
  if (!page || !root) return;
  var options = page.statuses.map(function (status) {
    return "<option>" + window.av3Esc(status === "All" ? page.statusLabel : "Status: " + status) + "</option>";
  }).join("");
  root.innerHTML =
    '<div class="filter-bar">' +
      '<input class="filter-search" type="search" aria-label="Filter alerts" placeholder="' + window.av3Esc(page.filterPlaceholder) + '" data-av3-query>' +
      '<button type="button" class="filter-select" data-av3-toast="' + window.av3Esc(page.priorityLabel) + ' (preview only)">' + window.av3Esc(page.priorityLabel) + " ▾</button>" +
      '<select class="filter-select" aria-label="Status" data-av3-status>' + options + "</select>" +
      '<button type="button" class="save-filters" data-av3-toast="Save Filters (preview only)">' + window.av3Esc(page.saveLabel) + "</button>" +
    "</div>";
})();
