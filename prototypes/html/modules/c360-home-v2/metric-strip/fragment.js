(function () {
  var page = window.C360_HOME_V2;
  var root = document.querySelector('[data-module="metric-strip"]');
  if (!page || !root || !window.hv2Icon) return;

  var cards = page.metrics.map(function (metric) {
    return (
      '<article class="metric-card"><div class="metric-card-top">' +
        '<span class="metric-icon metric-icon-' + window.hv2Esc(metric.tone) + '">' +
          window.hv2Icon(metric.icon, 19) + "</span>" +
        '<span class="metric-change">' + window.hv2Esc(metric.change) + "</span></div>" +
        '<strong class="metric-value">' + window.hv2Esc(metric.value) + "</strong>" +
        '<span class="metric-label">' + window.hv2Esc(metric.label) + "</span>" +
        '<span class="metric-detail">' + window.hv2Esc(metric.detail) + "</span></article>"
    );
  }).join("");

  var activity = page.activity;
  var people = activity.people.map(function (person) {
    return (
      '<span class="avatar avatar-' + window.hv2Esc(person.tone) + ' avatar-small">' +
        window.hv2Esc(person.initials) + "</span>"
    );
  }).join("");

  cards +=
    '<article class="metric-card activity-metric"><div class="metric-card-top">' +
      '<span class="metric-icon metric-icon-orange">' + window.hv2Icon("activity", 19) + "</span>" +
      '<span class="live-indicator"><i></i> ' + window.hv2Esc(activity.liveLabel) + "</span></div>" +
      '<strong class="metric-value">' + window.hv2Esc(activity.value) + "</strong>" +
      '<span class="metric-label">' + window.hv2Esc(activity.label) + "</span>" +
      '<div class="avatar-stack">' + people + "<span>+" + window.hv2Esc(activity.overflowCount) + "</span></div></article>";

  root.classList.add("metrics-grid");
  root.innerHTML = cards;
})();
