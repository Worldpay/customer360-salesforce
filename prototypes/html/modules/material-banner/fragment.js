(function () {
  var el = document.getElementById('material-banner-text');
  if (!el || typeof MATERIAL_BANNER === 'undefined') return;
  el.textContent = MATERIAL_BANNER.text;
})();
