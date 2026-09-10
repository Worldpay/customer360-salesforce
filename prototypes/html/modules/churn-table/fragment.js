(function () {
  var tbody = document.getElementById('churn-tbody');
  if (!tbody || typeof CHURN_ROWS === 'undefined') return;

  tbody.innerHTML = CHURN_ROWS.map(function (row) {
    return (
      '<tr>' +
        '<td><button class="account-link" data-open-account="' + row.account + '" data-open-account-source="churn">' + row.account + '</button></td>' +
        '<td><span class="pill ' + row.riskClass + '">' + row.risk + '</span></td>' +
        '<td class="negative">' + row.txnChange + '</td>' +
        '<td>' + row.driver + '</td>' +
        '<td>' + row.pathway + '</td>' +
      '</tr>'
    );
  }).join('');
})();
