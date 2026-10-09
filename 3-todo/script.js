const input = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("task-list");
const counter = document.getElementById("counter");
const errorEl = document.getElementById("error");
const clearBtn = document.getElementById("clear-completed");
const filterButtons = document.querySelectorAll(".filter");

let tasks = [];
let currentFilter = "all";
let nextId = 1;

function addTask() {
  const text = input.value;
  if (!text.trim()) {
    errorEl.hidden = false;
    return;
  }
  errorEl.hidden = true;
  tasks.push({ id: nextId++, text: text, done: false });
  input.value = "";
  render();
}

function toggleTask(id) {
  const task = tasks.find((t) => t.id === id);
  if (task.done) {
    task.done = false;
  } else {
    task.done = true;
  }
  render();
}

function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  render();
}

function clearCompleted() {
  tasks = tasks.filter( (t) => t.done !== true );
  render();
}

function getVisibleTasks() {
  if (currentFilter === "done") {
    return tasks.filter( (task) => task.done === true);
  } 
  else if (currentFilter === "active") {
    return tasks.filter((task) => task.done === false );
  }
  return tasks;
}

function updateCounter() {
  const activeTasks = tasks.filter( (task) => task.done === false );
  counter.textContent = "Активных задач: " + activeTasks.length;
}

function render() {
  list.replaceChildren();
  const filteredTasks = getVisibleTasks();

  for (const t of filteredTasks) {
    const li = document.createElement("li");
    li.className = "task";
    if (t.done) {
      li.classList.add("done");
    }

    const span = document.createElement("span");
    span.className = "task__text";
    span.textContent = t.text;
    span.addEventListener("click", () => toggleTask(t.id));

    const del = document.createElement("button");
    del.className = "task__del";
    del.textContent = "✕";
    del.addEventListener("click", () => deleteTask(t.id));

    li.appendChild(span);
    li.appendChild(del);
    list.appendChild(li);
  }
  updateCounter();
}

addBtn.addEventListener("click", addTask);
clearBtn.addEventListener("click", clearCompleted);

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    render();
  });
});

render();
