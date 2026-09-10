(function () {
  var tbody = document.getElementById('cross-sell-tbody');
  if (!tbody || typeof CROSS_SELL_ROWS === 'undefined') return;

  tbody.innerHTML = CROSS_SELL_ROWS.map(function (row) {
    return (
      '<tr>' +
        '<td><button class="account-link" data-open-account="' + row.account + '" data-open-account-source="crosssell">' + row.account + '</button></td>' +
        '<td>' + row.product + '</td>' +
        '<td><span class="pill ' + row.propensityClass + '">' + row.propensity + '</span></td>' +
        '<td>' + row.uplift + '</td>' +
        '<td>' + row.driver + '</td>' +
        '<td><button class="btn sm" data-open-account="' + row.account + '" data-open-account-source="crosssell">Open</button></td>' +
      '</tr>'
    );
  }).join('');
})();
