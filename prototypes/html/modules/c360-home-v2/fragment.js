(function () {
  var data = window.C360_HOME_V2;
  if (!data || !window.hv2Icon) return;

  var brand = document.querySelector("[data-hv2-brand]");
  var mark = document.querySelector("[data-hv2-logo-mark]");
  var nav = document.querySelector("[data-hv2-nav]");
  var user = document.querySelector("[data-hv2-user]");
  var searchIcon = document.querySelector("[data-hv2-search-icon]");
  var search = document.querySelector("[data-hv2-search]");
  var shortcut = document.querySelector("[data-hv2-shortcut]");
  var actions = document.querySelector("[data-hv2-top-actions]");
  var header = document.querySelector("[data-hv2-page-header]");
  var copilot = document.querySelector("[data-hv2-copilot]");
  if (!brand || !nav || !user || !search || !header || !copilot) return;

  brand.textContent = data.brandName;
  mark.innerHTML = window.hv2Icon("zap", 19);
  searchIcon.innerHTML = window.hv2Icon("search", 17);
  search.placeholder = data.searchPlaceholder;
  search.setAttribute("aria-label", "Search workspace");
  shortcut.innerHTML = window.hv2Icon("command", 12) + "K";

  nav.innerHTML =
    '<span class="nav-section-label">' + window.hv2Esc(data.navSectionLabel) + "</span>" +
    data.navigation.map(function (item) {
      var badge = item.count != null ? "<b>" + window.hv2Esc(item.count) + "</b>" : "";
      var active = item.id === "home" ? " nav-link-active" : "";
      return (
        '<button type="button" class="nav-link' + active + '" data-nav="' + window.hv2Esc(item.id) + '">' +
          window.hv2Icon(item.icon, 18) +
          "<span>" + window.hv2Esc(item.label) + "</span>" +
          badge +
        "</button>"
      );
    }).join("");

  nav.addEventListener("click", function (event) {
    var button = event.target.closest("[data-nav]");
    if (!button) return;
    nav.querySelectorAll(".nav-link").forEach(function (link) {
      link.classList.toggle("nav-link-active", link === button);
    });
  });

  user.innerHTML =
    '<span class="avatar avatar-dark avatar-medium">' + window.hv2Esc(data.userInitials) + "</span>" +
    "<span><strong>" + window.hv2Esc(data.userName) + "</strong><small>" + window.hv2Esc(data.userTeam) + "</small></span>" +
    window.hv2Icon("chevron", 15);

  actions.innerHTML =
    '<button type="button" class="icon-button" aria-label="Open apps">' + window.hv2Icon("grid", 18) + "</button>" +
    '<span class="notification-button"><button type="button" class="icon-button" aria-label="Notifications">' +
      window.hv2Icon("bell", 18) + "</button><i></i></span>" +
    '<button type="button" class="button button-primary">' + window.hv2Icon("plus", 16, 2.2) +
      window.hv2Esc(data.createLabel) + "</button>";

  header.innerHTML =
    "<div><span class=\"date-label\">" + window.hv2Esc(data.todayLabel) + "</span>" +
      "<h1>" + window.hv2Esc(data.greeting) + "</h1>" +
      "<p>" + window.hv2Esc(data.homeSubtitle) + "</p></div>" +
    '<div class="page-actions">' +
      '<button type="button" class="button button-secondary">' + window.hv2Icon("filter", 16) +
        window.hv2Esc(data.filterLabel) + "</button>" +
      '<button type="button" class="button button-secondary">' + window.hv2Icon("calendar", 16) +
        window.hv2Esc(data.periodLabel) + window.hv2Icon("chevron", 14) + "</button>" +
    "</div>";

  copilot.innerHTML =
    window.hv2Icon("message", 19) +
    "<span>" + window.hv2Esc(data.copilotLabel) + "</span>" +
    window.hv2Icon("send", 14);
  copilot.setAttribute("aria-label", "Open Customer360 AI assistant");
})();
