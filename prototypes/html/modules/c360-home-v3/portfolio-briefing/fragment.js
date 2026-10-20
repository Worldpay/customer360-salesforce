(function () {
  var page = window.C360_HOME_V3;
  var root = document.querySelector('[data-module="portfolio-briefing"]');
  if (!page || !root) return;
  var briefing = page.briefing;
  var alert = page.churnAlert;
  root.classList.add("briefing-stack");
  root.innerHTML =
    '<section class="briefing"><div class="briefing-copy">' +
      '<span class="briefing-mark">' + window.hv3Icon("bell", 20) + "</span>" +
      "<div><h2 class=\"briefing-title\">" + window.hv3Esc(briefing.title) + "</h2>" +
      '<p class="briefing-eyebrow">' + window.hv3Esc(briefing.eyebrow) + "</p></div>" +
      '<p class="briefing-body">' + window.hv3Esc(briefing.body) + "</p></div>" +
      '<svg class="briefing-art" viewBox="0 0 150 72" aria-hidden="true">' +
        '<rect x="78" y="28" width="62" height="36" rx="6" fill="#d9d4ff"/>' +
        '<rect x="86" y="36" width="28" height="18" rx="2" fill="#5b4fe0"/>' +
        '<circle cx="48" cy="28" r="12" fill="#f3d2c4"/>' +
        '<path d="M30 70c2-16 10-22 18-22s16 6 18 22" fill="#6d5ef5"/>' +
      "</svg>" +
      '<div class="briefing-actions">' +
        '<button type="button" class="btn briefing-dismiss" data-hv3-toast="Dismiss (preview only)">' + window.hv3Esc(briefing.dismissLabel) + "</button>" +
        '<button type="button" class="btn briefing-review" data-hv3-toast="Review Insight (preview only)">' + window.hv3Esc(briefing.reviewLabel) + " ›</button>" +
      "</div></section>" +
    '<section class="churn-banner"><div class="churn-banner-copy">' + window.hv3Icon("alert", 16) +
      "<strong>" + window.hv3Esc(alert.title) + "</strong><span>| " + window.hv3Esc(alert.detail) + "</span></div>" +
      '<div class="churn-banner-meta"><span>' + window.hv3Esc(alert.when) + "</span>" +
      '<span class="priority-chip">' + window.hv3Esc(alert.priority) + "</span>" +
      '<button type="button" class="churn-view" data-hv3-toast="View (preview only)">' + window.hv3Esc(alert.viewLabel) + "</button></div></section>";
})();
