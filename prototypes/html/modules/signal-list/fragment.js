window.c360SignalList = (function () {
  var signals = typeof SIGNALS !== 'undefined' ? SIGNALS.map(function (s) {
    return Object.assign({}, s);
  }) : [];

  function openCount() {
    return signals.filter(function (s) { return s.isOpen; }).length;
  }

  function updateCount() {
    var el = document.getElementById('sig-count');
    if (el) el.textContent = openCount() + ' open';
  }

  function render() {
    var container = document.getElementById('signals');
    if (!container) return;

    container.innerHTML = signals.filter(function (s) { return s.isOpen; }).map(function (sig) {
      return (
        '<div class="sig" data-sig data-sig-id="' + sig.id + '">' +
          '<span class="' + sig.badgeClass + '">' + sig.category + '</span>' +
          '<div class="s-txt">' +
            '<div class="s-h">' + sig.title + '</div>' +
            '<div class="s-d">' + sig.description + '</div>' +
            '<div class="s-p">Recommended pathway: <b>' + sig.pathway + '</b></div>' +
          '</div>' +
          '<div class="s-act">' +
            '<button class="btn p sm" data-action-sig>Action</button>' +
            '<button class="btn sm" data-dismiss-sig>Dismiss</button>' +
          '</div>' +
        '</div>'
      );
    }).join('');

    updateCount();
  }

  document.addEventListener('click', function (e) {
    var actionBtn = e.target.closest('[data-action-sig]');
    if (actionBtn) {
      var sigEl = actionBtn.closest('[data-sig]');
      if (sigEl) {
        var id = sigEl.getAttribute('data-sig-id');
        signals.forEach(function (s) { if (s.id === id) s.isOpen = false; });
        render();
        window.c360Toast('Signal actioned — pathway created and visible to your manager.');
      }
      return;
    }

    var dismissBtn = e.target.closest('[data-dismiss-sig]');
    if (dismissBtn) {
      var sigEl2 = dismissBtn.closest('[data-sig]');
      if (sigEl2) {
        var id2 = sigEl2.getAttribute('data-sig-id');
        signals.forEach(function (s) { if (s.id === id2) s.isOpen = false; });
        render();
        window.c360Toast('Signal dismissed.');
      }
    }
  });

  render();
  return { render: render, openCount: openCount };
})();
