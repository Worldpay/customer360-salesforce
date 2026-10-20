(function () {
  var page = window.C360_HOME_V3;
  var root = document.querySelector('[data-module="churn-signals"]');
  if (!page || !root) return;
  var signals = page.signals;
  var cards = signals.cards.map(function (card) {
    return '<article class="signal-card"><div class="signal-top"><span>' +
      '<span class="pill pill-' + card.tone + '">' + window.hv3Esc(card.badge) + "</span> " +
      '<span class="signal-id">' + window.hv3Esc(card.account) + "</span></span>" +
      '<span class="pill pill-' + card.state.toLowerCase() + '">' + window.hv3Esc(card.state) + "</span></div>" +
      '<h3 class="signal-title">' + window.hv3Esc(card.title) + "</h3>" +
      '<p class="signal-copy">' + window.hv3Esc(card.signal) + "</p>" +
      '<p class="signal-impact">' + window.hv3Esc(card.impact) + "</p>" +
      '<div class="signal-foot"><span class="signal-date">' + window.hv3Esc(card.date) + "</span>" +
        '<span class="row-actions"><button type="button" class="text-btn" data-hv3-toast="Dismiss (preview only)">Dismiss</button>' +
        '<button type="button" class="mini" data-hv3-toast="Defer (preview only)">Defer</button>' +
        '<button type="button" class="mini mini-fill" data-hv3-toast="Action (preview only)">Action</button></span></div></article>';
  }).join("");
  root.innerHTML =
    '<div class="section-head signal-head"><h2 class="section-title">' + window.hv3Esc(signals.title) +
      '<span class="badge-count">' + window.hv3Esc(signals.badge) + "</span></h2>" +
      '<button type="button" class="linkish" data-hv3-toast="View All Signals (preview only)">' + window.hv3Esc(signals.viewAllLabel) + "</button></div>" +
    '<div class="signal-grid">' + cards + "</div>";
  root.style.marginBottom = "28px";
})();
