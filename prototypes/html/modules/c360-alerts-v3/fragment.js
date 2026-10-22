(function () {
  var ICONS = {
    home: '<path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1z"/>',
    alert: '<path d="M12 4 3 19h18z"/><path d="M12 10v4M12 16.5h.01"/>',
    spark: '<path d="M12 3l1.6 4.8L18 9.5l-4.4 1.7L12 16l-1.6-4.8L6 9.5l4.4-1.7z"/>',
    chart: '<path d="M4 19V5M4 19h16M8 15v-3M12 15V8M16 15v-5"/>',
    users: '<path d="M16 19v-1.2A3.8 3.8 0 0 0 12.2 14H7.8A3.8 3.8 0 0 0 4 17.8V19"/><circle cx="10" cy="8" r="3"/>',
    file: '<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v5h5"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M12 3v2M12 19v2M4.9 6.5l1.5 1.5M17.6 15.8l1.5 1.5M3 12h2M19 12h2M4.9 17.5l1.5-1.5M17.6 8.2l1.5-1.5"/>',
    search: '<circle cx="11" cy="11" r="6"/><path d="m16 16 4 4"/>',
    bell: '<path d="M6 16V10a6 6 0 1 1 12 0v6l1.5 2h-15z"/><path d="M10 19a2 2 0 0 0 4 0"/>',
    chevron: '<path d="m6 9 6 6 6-6"/>',
    left: '<path d="m15 6-6 6 6 6"/>',
    right: '<path d="m9 6 6 6-6 6"/>',
    download: '<path d="M12 4v10M8 10l4 4 4-4M5 19h14"/>'
  };

  window.av3Esc = function (value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  };

  window.av3Icon = function (name, size) {
    return '<svg width="' + (size || 16) + '" height="' + (size || 16) + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[name] || "") + "</svg>";
  };

  window.av3Toast = function (message) {
    var existing = document.querySelector(".toast");
    if (existing) existing.remove();
    var toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message || "Preview only";
    document.body.appendChild(toast);
    window.setTimeout(function () { toast.remove(); }, 1800);
  };

  var page = window.C360_ALERTS_V3;
  if (!page) return;

  var nav = document.querySelector("[data-av3-nav]");
  if (nav) {
    nav.innerHTML = page.nav.map(function (item) {
      var chevron = item.hasChevron ? window.av3Icon("chevron", 14) : "";
      return '<button type="button" class="nav-item' + (item.id === "alerts" ? " is-active" : "") + '" data-nav="' + item.id + '">' +
        "<span>" + window.av3Icon(item.icon, 16) + window.av3Esc(item.label) + "</span>" + chevron + "</button>";
    }).join("");
    nav.addEventListener("click", function (event) {
      var button = event.target.closest("[data-nav]");
      if (!button) return;
      nav.querySelectorAll(".nav-item").forEach(function (item) { item.classList.remove("is-active"); });
      button.classList.add("is-active");
      if (button.getAttribute("data-nav") !== "alerts") {
        window.av3Toast(button.textContent.trim() + " (preview only)");
      }
    });
  }

  var brand = document.querySelector("[data-av3-brand]");
  if (brand) brand.textContent = page.brandName;
  var mark = document.querySelector("[data-av3-mark]");
  if (mark) mark.textContent = page.brandMark;
  var date = document.querySelector("[data-av3-date]");
  if (date) date.textContent = page.sidebarDate;
  var hub = document.querySelector("[data-av3-hub]");
  if (hub) hub.textContent = page.hubTitle;

  var search = document.querySelector("[data-av3-hub-search]");
  if (search) search.placeholder = page.searchPlaceholder;
  var count = document.querySelector("[data-av3-count]");
  if (count) count.textContent = page.notificationCount;
  var user = document.querySelector("[data-av3-user]");
  if (user) {
    user.innerHTML = '<span class="avatar">' + window.av3Esc(page.userInitials) + "</span><span><strong>" +
      window.av3Esc(page.userName) + "</strong><small>" + window.av3Esc(page.userRole) + "</small></span>";
  }

  document.addEventListener("click", function (event) {
    var button = event.target.closest("[data-av3-toast]");
    if (!button || button.closest("[data-av3-nav]")) return;
    window.av3Toast(button.getAttribute("data-av3-toast"));
  });
})();
