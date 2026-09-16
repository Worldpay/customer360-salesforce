(function () {
  var DEFAULT_VISIBLE = 5;

  function sliceRows(key, rows, expanded) {
    if (!rows || !rows.length) return rows || [];
    if (expanded[key]) return rows;
    return rows.slice(0, DEFAULT_VISIBLE);
  }

  function footerHtml(key, total, expanded) {
    if (total <= DEFAULT_VISIBLE) return '';
    if (expanded[key]) {
      return (
        '<div class="table-expand-footer">' +
        '<button type="button" class="btn sm" data-table-collapse="' + key + '">Show first ' + DEFAULT_VISIBLE + ' only</button>' +
        '</div>'
      );
    }
    return (
      '<div class="table-expand-footer">' +
      '<button type="button" class="btn sm" data-table-expand="' + key + '">Show all ' + total + ' results</button>' +
      '</div>'
    );
  }

  window.C360TableExpand = {
    DEFAULT_VISIBLE: DEFAULT_VISIBLE,
    sliceRows: sliceRows,
    footerHtml: footerHtml
  };
})();
