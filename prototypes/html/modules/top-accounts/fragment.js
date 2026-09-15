(function () {
  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function heroModeLabel(mode) {
    return mode === 'churn'
      ? 'Top accounts by predicted change in transaction count'
      : 'Top accounts by cross-sell opportunity (estimated net benefit)';
  }

  function topAccountsForHero(heroMode) {
    if (typeof ACCOUNTS === 'undefined') return [];
    var list = ACCOUNTS.slice();
    if (heroMode === 'churn') {
      list.sort(function (a, b) { return a.predictedTxnChangeSort - b.predictedTxnChangeSort; });
    } else {
      list.sort(function (a, b) { return b.topCrossSellNetBenefitSort - a.topCrossSellNetBenefitSort; });
    }
    return list.slice(0, 3);
  }

  function heroField(label, value) {
    return (
      '<div class="hero-field">' +
      '<span class="hero-lbl">' + escapeHtml(label) + '</span>' +
      '<span class="hero-val">' + value + '</span>' +
      '</div>'
    );
  }

  function heroModelField(label, value, emphasis) {
    var lead = emphasis ? ' hero-field--lead' : '';
    return (
      '<div class="hero-field hero-field--model' + lead + '">' +
      '<span class="hero-lbl">' + escapeHtml(label) + '</span>' +
      '<span class="hero-val">' + value + '</span>' +
      '</div>'
    );
  }

  function renderHeroCard(account, rank, heroMode) {
    var txnCls = account.predictedTxnChangeSort < 0 ? 'negative' : 'up';
    var churnFocus = heroMode === 'churn';
    return (
      '<article class="hero-account-card hero-account-card--clickable" tabindex="0" role="link" ' +
      'data-open-account="' + escapeHtml(account.name) + '" data-open-account-source="overview" ' +
      'aria-label="Open account ' + escapeHtml(account.name) + '">' +
      '<div class="hero-card-rank">#' + rank + '</div>' +
      '<header class="hero-card-header">' +
      '<h2 class="hero-account-headline">' + escapeHtml(account.name) + '</h2>' +
      '<p class="hero-account-meta">' + escapeHtml(account.industry) + ' · ' + escapeHtml(account.revenue) + '</p>' +
      '</header>' +
      '<div class="hero-row hero-row--state hero-row--compact">' +
      '<div class="hero-row-fields hero-row-fields--inline">' +
      heroField('Health index', escapeHtml(String(account.healthIndex))) +
      heroField('Health', '<span class="pill ' + account.healthClass + '">' + escapeHtml(account.health) + '</span>') +
      heroField('Last activity', escapeHtml(account.lastActivity)) +
      '</div></div>' +
      '<div class="hero-row hero-row--model">' +
      '<div class="hero-row-tag">Model outputs</div>' +
      '<div class="hero-row-fields hero-row-fields--model">' +
      heroModelField('Predicted change in transaction count', '<span class="hero-metric ' + txnCls + '">' + escapeHtml(account.predictedTxnChange) + '</span>', churnFocus) +
      heroModelField('Top cross-sell (product)', escapeHtml(account.topCrossSellProduct), false) +
      heroModelField('Top cross-sell (est. net benefit)', '<span class="hero-metric wp-val">' + escapeHtml(account.topCrossSellNetBenefit) + '</span>', !churnFocus) +
      '</div></div>' +
      '</article>'
    );
  }

  function render(options) {
    var heroMode = (options && options.heroMode) || 'churn';
    var grid = document.getElementById('hero-tiles-grid');
    var subtitle = document.getElementById('hero-subtitle');
    if (subtitle) subtitle.textContent = heroModeLabel(heroMode);
    if (!grid) return;
    var top = topAccountsForHero(heroMode);
    grid.innerHTML = top.map(function (a, i) { return renderHeroCard(a, i + 1, heroMode); }).join('');
    document.querySelectorAll('[data-hero-mode]').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-hero-mode') === heroMode);
    });
  }

  window.C360TopAccounts = {
    render: render,
    getSubtitle: heroModeLabel,
    topAccountsForHero: topAccountsForHero
  };
})();
