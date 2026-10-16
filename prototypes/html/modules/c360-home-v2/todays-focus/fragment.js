(function () {
  var data = window.C360_HOME_V2 && window.C360_HOME_V2.focus;
  var root = document.querySelector('[data-module="todays-focus"]');
  if (!data || !root || !window.hv2Icon) return;

  var done = {};

  function remaining() {
    return data.tasks.filter(function (task) { return !done[task.id]; }).length;
  }

  function render() {
    var tasks = data.tasks.map(function (task) {
      var complete = done[task.id] ? " task-complete" : "";
      var priority = task.priority ? " task-time-priority" : "";
      var flag = task.priority ? "<em>Priority</em>" : "";
      var mark = done[task.id] ? window.hv2Icon("check", 12, 3) : "";
      var verb = done[task.id] ? "Reopen" : "Complete";
      return (
        '<div class="task' + complete + '">' +
          '<button type="button" class="task-check" data-task="' + window.hv2Esc(task.id) + '" aria-label="' +
            window.hv2Esc(verb + " " + task.title) + '">' + mark + "</button>" +
          '<div class="task-content"><strong>' + window.hv2Esc(task.title) + "</strong>" +
            '<span class="task-time' + priority + '">' + window.hv2Icon("clock", 12) +
              window.hv2Esc(task.time) + flag + "</span></div>" +
          '<button type="button" class="icon-button" aria-label="' +
            window.hv2Esc("More options for " + task.title) + '">' + window.hv2Icon("more", 18) + "</button>" +
        "</div>"
      );
    }).join("");

    root.innerHTML =
      '<header class="panel-header"><div><h2>' + window.hv2Esc(data.title) + "</h2>" +
        "<p>" + window.hv2Esc(window.hv2Fill(data.remainingTemplate, { count: remaining() })) + "</p></div>" +
        '<button type="button" class="icon-button" aria-label="Task options">' + window.hv2Icon("more", 18) +
        "</button></header>" +
      '<div class="task-list">' + tasks +
        '<button type="button" class="button button-ghost">' + window.hv2Icon("plus", 16) +
          window.hv2Esc(data.addLabel) + "</button></div>";
  }

  root.classList.add("panel", "focus-panel");
  root.addEventListener("click", function (event) {
    var button = event.target.closest("[data-task]");
    if (!button) return;
    var id = Number(button.getAttribute("data-task"));
    done[id] = !done[id];
    render();
  });
  render();
})();
