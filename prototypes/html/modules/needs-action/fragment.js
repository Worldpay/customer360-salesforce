(function () {
  var list = document.getElementById('needs-action-list');
  if (!list || typeof NEEDS_ACTION_ITEMS === 'undefined') return;

  list.innerHTML = NEEDS_ACTION_ITEMS.map(function (item) {
    return (
      '<div class="a">' +
        '<div class="row-tag"><span class="sev ' + item.severity + '">' + item.severityLabel + '</span></div>' +
        '<div class="a-txt row-body">' +
          '<b>' + item.heading + '</b>' +
          '<div class="m">' + item.body + '</div>' +
        '</div>' +
        '<div class="row-actions"><button class="' + item.buttonClass + '" data-open-account="' + item.accountName + '" data-open-account-source="' + (item.sourceView || 'accounts') + '">' + item.buttonLabel + '</button></div>' +
      '</div>'
    );
  }).join('');
})();
