(function () {
  var page = window.C360_HOME_V3;
  var root = document.querySelector('[data-module="todays-focus"]');
  if (!page || !root) return;
  var focus = page.focus;
  var done = {};

  function remaining() {
    return focus.tasks.filter(function (_, index) { return !done[index]; }).length;
  }

  function paint() {
    var tasks = focus.tasks.map(function (task, index) {
      var chip = task.priority ? '<span class="task-chip">' + window.hv3Esc(task.priority) + "</span>" : "";
      return '<label class="task' + (done[index] ? " is-done" : "") + '">' +
        '<span class="task-main"><input type="checkbox" data-task="' + index + '"' + (done[index] ? " checked" : "") + ">" +
        "<span><span class=\"task-title\">" + window.hv3Esc(task.title) + "</span>" +
        '<span class="task-time">' + window.hv3Esc(task.time) + "</span></span></span>" +
        '<span class="task-tools">' + chip +
          '<button type="button" class="icon-btn" data-hv3-toast="Delete task (preview only)" aria-label="Delete">' + window.hv3Icon("trash", 16) + "</button>" +
          '<button type="button" class="icon-btn quiet" data-hv3-toast="More (preview only)" aria-label="More">' + window.hv3Icon("more", 16) + "</button>" +
        "</span></label>";
    }).join("");
    root.innerHTML =
      '<div class="section-head"><div><h2 class="section-title">' + window.hv3Esc(focus.title) + "</h2>" +
        '<p class="focus-count">' + remaining() + " " + window.hv3Esc(focus.remainingLabel) + "</p></div></div>" +
      '<div class="panel focus-panel"><div class="task-list">' + tasks + "</div>" +
        '<button type="button" class="add-task" data-hv3-toast="Add Task (preview only)">' +
          window.hv3Esc(focus.addLabel) + " " + window.hv3Icon("plus", 14) + "</button></div>";
  }

  root.addEventListener("change", function (event) {
    var box = event.target.closest("[data-task]");
    if (!box) return;
    done[box.getAttribute("data-task")] = box.checked;
    paint();
  });
  paint();
})();
