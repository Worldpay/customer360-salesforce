(function () {
  var toastEl = document.getElementById('toast');
  var toastTimer;

  window.c360Toast = function (msg) {
    if (!toastEl) return;
    toastEl.innerHTML = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.classList.remove('show');
    }, 3200);
  };

  function resolveAccountDetailUrl(account, source) {
    var params = '?account=' + encodeURIComponent(account) + '&source=' + (source || 'accounts');
    var path = (window.location.pathname || '').replace(/\\/g, '/');
    if (path.indexOf('/assembly/') !== -1) {
      return '../modules/account-detail/preview.html' + params;
    }
    if (path.indexOf('/modules/') !== -1) {
      return '../account-detail/preview.html' + params;
    }
    return 'html/modules/account-detail/preview.html' + params;
  }

  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-toast]');
    if (el) {
      window.c360Toast(el.getAttribute('data-toast'));
      return;
    }

    var acct = e.target.closest('[data-open-account], [data-account]');
    if (acct) {
      var name = acct.getAttribute('data-open-account') || acct.getAttribute('data-account');
      var source = acct.getAttribute('data-open-account-source') || acct.getAttribute('data-source') || 'accounts';
      window.location.href = resolveAccountDetailUrl(name, source);
      return;
    }

    var openAlert = e.target.closest('[data-open-alert]');
    if (openAlert) {
      window.c360Toast('Open alert: <b>' + openAlert.getAttribute('data-open-alert') + '</b> (preview only)');
      return;
    }

    var initiate = e.target.closest('[data-initiate]');
    if (initiate) {
      window.c360Toast('Pathway initiated: <b>' + initiate.getAttribute('data-initiate') + '</b>');
    }
  });
})();
