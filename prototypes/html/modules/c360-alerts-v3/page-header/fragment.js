(function () {
  var page = window.C360_ALERTS_V3;
  var root = document.querySelector('[data-module="page-header"]');
  if (!page || !root) return;
  var crumbs = page.crumbs.map(function (crumb, index) {
    var link = '<button type="button" class="crumb" data-av3-toast="' + window.av3Esc(crumb) + ' (preview only)">' + window.av3Esc(crumb) + "</button>";
    return index === 0 ? link + window.av3Icon("right", 14) : link;
  }).join("");
  root.innerHTML =
    '<div class="header-stack"><div class="header-top"><div class="crumbs">' + crumbs + "</div>" +
      '<button type="button" class="back-link" data-av3-toast="' + window.av3Esc(page.backLabel) + ' (preview only)">' +
        window.av3Icon("left", 16) + window.av3Esc(page.backLabel) + "</button></div>" +
      '<div class="title-row"><h1 class="title">' + window.av3Esc(page.title) + "</h1>" +
        '<div class="title-tools"><span class="updated">' + window.av3Esc(page.updatedLabel) + "</span>" +
          '<button type="button" class="export" data-av3-toast="Export (preview only)">' +
            window.av3Esc(page.exportLabel) + window.av3Icon("download", 14) + "</button></div></div></div>";
})();
