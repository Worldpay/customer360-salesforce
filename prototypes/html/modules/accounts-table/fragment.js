(function () {
  var tbody = document.getElementById('accounts-tbody');
  if (!tbody || typeof ACCOUNTS === 'undefined') return;

  tbody.innerHTML = ACCOUNTS.slice(0, 5).map(function (a) {
    var deltaClass = a.healthDelta.indexOf('-') === 0 ? 'down' : 'up';
    return (
      '<tr>' +
        '<td><button class="account-link" data-open-account="' + a.name + '" data-open-account-source="accounts">' + a.name + '</button></td>' +
        '<td>' + a.healthIndex + '</td>' +
        '<td class="' + deltaClass + '">' + a.healthDelta + '</td>' +
        '<td>' + a.industry + '</td>' +
        '<td>' + a.volume + '</td>' +
        '<td><span class="pill ' + a.healthClass + '">' + a.health + '</span></td>' +
        '<td><span class="pill ' + a.riskClass + '">' + a.risk + '</span></td>' +
        '<td>' + a.pathways + '</td>' +
        '<td>Today</td>' +
      '</tr>'
    );
  }).join('');
})();
