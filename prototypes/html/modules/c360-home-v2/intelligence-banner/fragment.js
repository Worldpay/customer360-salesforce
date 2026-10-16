(function () {
  var data = window.C360_HOME_V2 && window.C360_HOME_V2.intelligence;
  var root = document.querySelector('[data-module="intelligence-banner"]');
  if (!data || !root || !window.hv2Icon) return;

  var body = window.hv2Fill(data.bodyTemplate, {
    accountName: data.accountName,
    closeProbabilityDeltaPct: data.closeProbabilityDeltaPct
  });

  root.innerHTML =
    '<div class="assistant-glow assistant-glow-one"></div>' +
    '<div class="assistant-glow assistant-glow-two"></div>' +
    '<span class="assistant-icon">' + window.hv2Icon("wand", 21) + "</span>" +
    '<div class="assistant-copy"><span class="assistant-label">' + window.hv2Esc(data.label) + "</span>" +
      "<h2>" + window.hv2Esc(data.heading) + "</h2>" +
      "<p>" + window.hv2Esc(body) + "</p></div>" +
    '<div class="assistant-actions">' +
      '<button type="button" class="assistant-action">' + window.hv2Esc(data.actionLabel) +
        window.hv2Icon("arrow", 15) + "</button>" +
      '<button type="button" class="icon-button" data-dismiss aria-label="' + window.hv2Esc(data.dismissLabel) + '">' +
        window.hv2Icon("x", 18) + "</button>" +
    "</div>";
  root.classList.add("assistant-card");

  root.querySelector("[data-dismiss]").addEventListener("click", function () {
    root.hidden = true;
  });
})();
