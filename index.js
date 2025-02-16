const list_el = document.getElementById("list");
const create_btn_el = document.getElementById("create");

let todos = [];

create_btn_el.addEventListener("click", createNewTodo);

function createNewTodo() {
  const item = {
    id: new Date().getTime(),
    text: "",
    comlpete: false,
  };
  todos.unshift(item);

  const { item_el, input_el } = createTodoElement(item);
  list_el.prepend(item_el);
  input_el.removeAttribute("disabled");
  input_el.focus();

  Save();
}

function createTodoElement(item) {
  const item_el = document.createElement("div");
  item_el.classList.add("item");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = item.complete;

  if (item.complete) {
    item_el.classList.add("complete");
  }

  const input_el = document.createElement("input");
  input_el.type = "text";
  input_el.value = item.text;
  input_el.setAttribute("disabled", "");

  const action_el = document.createElement("div");
  action_el.classList.add("actions");

  const edit_btn_el = document.createElement("button");
  edit_btn_el.classList.add("material-symbols-outlined");
  edit_btn_el.innerText = "edit";

  const remove_btn_el = document.createElement("button");
  remove_btn_el.classList.add("material-symbols-outlined", "clear-btn");
  remove_btn_el.innerText = "clear";

  action_el.append(edit_btn_el);
  action_el.append(remove_btn_el);

  item_el.append(checkbox);
  item_el.append(input_el);
  item_el.append(action_el);

  checkbox.addEventListener("change", () => {
    item.complete = checkbox.checked;

    if (item.complete) {
      item_el.classList.add("complete");
    } else {
      item_el.classList.remove("complete");
    }

    Save();
  });

  input_el.addEventListener("input", () => {
    item.text = input_el.value;
  });

  input_el.addEventListener("blur", () => {
    input_el.setAttribute("disabled", "");
    Save();
  });

  edit_btn_el.addEventListener("click", () => {
    input_el.removeAttribute("disabled");
    input_el.focus();
  });

  remove_btn_el.addEventListener("click", () => {
    todos = todos.filter((t) => t.id != item.id);
    item_el.remove();

    Save();
  });

  return { item_el, input_el, edit_btn_el, remove_btn_el };
}

function displayTodos() {
  Load();

  for (let i = 0; i < todos.length; i++) {
    const item = todos[i];

    const { item_el } = createTodoElement(item);

    list_el.append(item_el);
  }
}

displayTodos();

function Save() {
  const save = JSON.stringify(todos);
  localStorage.setItem("my_todos", save);
}

function Load() {
  const data = localStorage.getItem("my_todos");

  if (data) {
    todos = JSON.parse(data);
  }
}
