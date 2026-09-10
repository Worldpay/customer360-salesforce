window.c360PathwaysTable = (function () {
  var currentScope = 'me';

  function visiblePathways() {
    if (typeof PATHWAYS === 'undefined') return [];
    return PATHWAYS.filter(function (p) { return p.scope === currentScope; });
  }

  function render() {
    var tbody = document.getElementById('pathways-tbody');
    var label = document.getElementById('pw-scope-lbl');
    var scopeBtns = document.querySelectorAll('#pathways-scope [data-scope]');

    if (label) label.textContent = currentScope === 'me' ? 'My accounts' : 'My team';

    scopeBtns.forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-scope') === currentScope);
    });

    if (!tbody) return;

    tbody.innerHTML = visiblePathways().map(function (p) {
      return (
        '<tr>' +
          '<td>' + p.account + '</td>' +
          '<td><b>' + p.name + '</b></td>' +
          '<td>' + p.stage + '</td>' +
          '<td>' + p.owner + '</td>' +
          '<td>' + p.date + '</td>' +
          '<td><span class="pill ' + p.statusClass + '">' + p.status + '</span></td>' +
        '</tr>'
      );
    }).join('');
  }

  document.addEventListener('click', function (e) {
    var scopeBtn = e.target.closest('#pathways-scope [data-scope]');
    if (scopeBtn) {
      currentScope = scopeBtn.getAttribute('data-scope');
      render();
    }
  });

  render();
  return { render: render };
})();
