(function () {
  var ICONS = {
    home: '<path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1z"/>',
    bell: '<path d="M6 16V10a6 6 0 1 1 12 0v6l1.5 2h-15z"/><path d="M10 19a2 2 0 0 0 4 0"/>',
    layers: '<path d="m12 3 8 4.5-8 4.5L4 7.5z"/><path d="m4 12 8 4.5 8-4.5"/><path d="m4 16.5 8 4.5 8-4.5"/>',
    chart: '<path d="M4 19V5"/><path d="M4 19h16"/><path d="M8 15v-4"/><path d="M12 15V8"/><path d="M16 15v-6"/>',
    users: '<path d="M16 19v-1.2A3.8 3.8 0 0 0 12.2 14H7.8A3.8 3.8 0 0 0 4 17.8V19"/><circle cx="10" cy="8" r="3"/><path d="M20 19v-1.2A3.8 3.8 0 0 0 17 14.1"/><path d="M15 5.1a3 3 0 0 1 0 5.8"/>',
    file: '<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v5h5"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M12 3v2.2M12 18.8V21M4.9 6.5l1.6 1.6M17.5 15.9l1.6 1.6M3 12h2.2M18.8 12H21M4.9 17.5l1.6-1.6M17.5 8.1l1.6-1.6"/>',
    dollar: '<path d="M12 3v18"/><path d="M16 7.5c0-1.8-1.8-3-4-3s-4 1.2-4 3 1.6 2.6 4 3 4 1.3 4 3-1.8 3-4 3-4-1.2-4-3"/>',
    "user-plus": '<path d="M15 19v-1.2A3.8 3.8 0 0 0 11.2 14H7"/><circle cx="10" cy="8" r="3"/><path d="M18 8v6M15 11h6"/>',
    repeat: '<path d="M17 4h3v3"/><path d="M20 7a8 8 0 0 0-13.5 2"/><path d="M7 20H4v-3"/><path d="M4 17a8 8 0 0 0 13.5-2"/>',
    search: '<circle cx="11" cy="11" r="6"/><path d="m16 16 4 4"/>',
    chevron: '<path d="m6 9 6 6 6-6"/>',
    download: '<path d="M12 4v10"/><path d="m8 10 4 4 4-4"/><path d="M5 19h14"/>',
    bellSolid: '<path d="M6 16V10a6 6 0 1 1 12 0v6l1.5 2h-15z"/>',
    trend: '<path d="M4 16 9 11l3 3 8-8"/><path d="M14 6h6v6"/>',
    trash: '<path d="M5 7h14"/><path d="M9 7V5h6v2"/><path d="M8 7l1 12h6l1-12"/>',
    more: '<circle cx="12" cy="6" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="12" cy="18" r="1.2"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    alert: '<path d="M12 4 3 19h18z"/><path d="M12 10v4"/><path d="M12 16.5h.01"/>'
  };

  window.hv3Esc = function (value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  };

  window.hv3Icon = function (name, size) {
    var path = ICONS[name] || "";
    var px = size || 18;
    return '<svg width="' + px + '" height="' + px + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + path + "</svg>";
  };

  window.hv3Toast = function (message) {
    var existing = document.querySelector(".toast");
    if (existing) existing.remove();
    var toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message || "Preview only";
    document.body.appendChild(toast);
    window.setTimeout(function () { toast.remove(); }, 1800);
  };

  var page = window.C360_HOME_V3;
  if (!page) return;

  var nav = document.querySelector("[data-hv3-nav]");
  if (nav) {
    nav.innerHTML = page.nav.map(function (item) {
      return '<button type="button" class="nav-item' + (item.id === "home" ? " is-active" : "") + '" data-nav="' + item.id + '">' +
        window.hv3Icon(item.icon, 16) + "<span>" + window.hv3Esc(item.label) + "</span></button>";
    }).join("");
    nav.addEventListener("click", function (event) {
      var button = event.target.closest("[data-nav]");
      if (!button) return;
      nav.querySelectorAll(".nav-item").forEach(function (item) { item.classList.remove("is-active"); });
      button.classList.add("is-active");
      if (button.getAttribute("data-nav") !== "home") {
        window.hv3Toast(button.textContent.trim() + " (preview only)");
      }
    });
  }

  var brand = document.querySelector("[data-hv3-brand]");
  if (brand) brand.textContent = page.brandName;
  var logo = document.querySelector("[data-hv3-logo]");
  if (logo) logo.innerHTML = window.hv3Icon("layers", 16);

  var user = document.querySelector("[data-hv3-user]");
  if (user) {
    user.innerHTML = '<span class="avatar">' + window.hv3Esc(page.userInitials) + "</span>" +
      "<span><span class=\"user-name\">" + window.hv3Esc(page.userName) + "</span>" +
      '<span class="user-role">' + window.hv3Esc(page.userRole) + "</span></span>";
  }

  var header = document.querySelector("[data-hv3-header]");
  if (header) {
    header.innerHTML =
      '<div><div class="greeting-row"><h1 class="greeting">' + window.hv3Esc(page.greeting) + "</h1>" +
        '<span class="priority-pill">' + window.hv3Esc(page.priorityAlertLabel) + "</span></div>" +
        '<p class="subtitle">' + window.hv3Esc(page.subtitle) + "</p></div>" +
      '<div class="header-tools"><span class="updated">' + window.hv3Esc(page.updatedLabel) + "</span>" +
        '<button type="button" class="select-btn" data-hv3-toast="' + window.hv3Esc(page.periodLabel) + ' (preview only)">' +
          window.hv3Esc(page.periodLabel) + window.hv3Icon("chevron", 14) + "</button>" +
        '<div class="header-actions">' +
          '<button type="button" class="btn" data-hv3-toast="Export PDF (preview only)">' +
            window.hv3Esc(page.exportLabel) + window.hv3Icon("download", 14) + "</button>" +
          '<button type="button" class="btn btn-brand" data-hv3-toast="Portfolio Analysis (preview only)">' +
            window.hv3Esc(page.analysisLabel) + window.hv3Icon("chart", 14) + "</button>" +
        "</div></div>";
  }

  var footer = document.querySelector("[data-hv3-footer]");
  if (footer) {
    footer.innerHTML = "<span>" + window.hv3Esc(page.footer.note) + "</span><span>" + window.hv3Esc(page.footer.date) + "</span>";
  }

  document.addEventListener("click", function (event) {
    var button = event.target.closest("[data-hv3-toast]");
    if (!button || button.closest("[data-hv3-nav]")) return;
    window.hv3Toast(button.getAttribute("data-hv3-toast"));
  });
})();
