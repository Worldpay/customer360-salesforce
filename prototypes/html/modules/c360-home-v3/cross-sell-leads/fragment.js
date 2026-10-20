(function () {
  var page = window.C360_HOME_V3;
  var root = document.querySelector('[data-module="cross-sell-leads"]');
  if (!page || !root) return;
  var leads = page.leads;
  var cards = leads.cards.map(function (card) {
    return '<article class="lead-card"><strong class="signal-id">' + window.hv3Esc(card.account) + "</strong>" +
      '<div class="product-line"><span>Recommended product:</span><strong>' + window.hv3Esc(card.product) + "</strong></div>" +
      '<div class="metrics"><div><span>ESTIMATED ACV</span><strong>' + window.hv3Esc(card.acv) + "</strong></div>" +
      "<div><span>MERCHANT ROI</span><strong>" + window.hv3Esc(card.roi) + "</strong></div></div><hr>" +
      '<div class="signal-foot"><button type="button" class="linkish" data-hv3-toast="Learn More (preview only)">Learn More ›</button>' +
        '<span class="row-actions"><button type="button" class="mini" data-hv3-toast="Dismiss (preview only)">Dismiss</button>' +
        '<button type="button" class="mini mini-fill" data-hv3-toast="Create Opportunity (preview only)">Create Opportunity</button></span></div></article>';
  }).join("");
  root.innerHTML =
    '<div class="section-head signal-head"><h2 class="section-title">' + window.hv3Esc(leads.title) + "</h2>" +
      '<button type="button" class="linkish" data-hv3-toast="View All Recommended Leads (preview only)">' + window.hv3Esc(leads.viewAllLabel) + "</button></div>" +
    '<div class="lead-grid">' + cards + "</div>";
  root.style.marginBottom = "28px";
})();
