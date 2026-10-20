(function () {
  var page = window.C360_HOME_V3;
  var root = document.querySelector('[data-module="kpi-row"]');
  if (!page || !root) return;
  root.classList.add("kpi-row");
  root.innerHTML = page.kpis.map(function (kpi) {
    var chip = kpi.chip
      ? '<span class="kpi-chip kpi-chip-' + kpi.chipTone + '">' +
          (kpi.chipPrefix === "up" ? "▲ " : "") + window.hv3Esc(kpi.chip) + "</span>"
      : "";
    var note = kpi.note
      ? '<span class="kpi-note kpi-note-' + kpi.noteTone + '">' + window.hv3Esc(kpi.note) + "</span>"
      : "";
    return '<article class="kpi-card">' + chip +
      '<span class="kpi-icon">' + window.hv3Icon(kpi.icon, 18) + "</span>" +
      '<span class="kpi-label">' + window.hv3Esc(kpi.label) + "</span>" +
      '<div class="kpi-value-row"><strong class="kpi-value">' + window.hv3Esc(kpi.value) + "</strong>" + note + "</div></article>";
  }).join("");
})();
