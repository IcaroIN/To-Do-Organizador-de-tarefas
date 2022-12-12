// Seleção de elementos//
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

let oldInputValue;

//Funções//

function viewTasks() {
  const userStorage = JSON.parse(localStorage.getItem("infoLogin"));
  const idStorage = userStorage.createdUser.id;
  axios
    .get(`http://localhost:8888/user/${idStorage}/task`)
    .then(function ({ data }) {
      data.forEach(function (task) {
        saveTodo(task.task, task.id);
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}
viewTasks();

const saveTodo = (text, id) => {
  const todo = document.createElement("div");
  todo.setAttribute("id", id);
  todo.classList.add("todo");

  const todoTitle = document.createElement("h3");
  todoTitle.innerText = text;
  todo.appendChild(todoTitle);

  const doneBtn = document.createElement("button");
  doneBtn.classList.add("finish-todo");
  doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
  todo.appendChild(doneBtn);

  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-todo");
  editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
  todo.appendChild(editBtn);

  const deletBtn = document.createElement("button");
  deletBtn.classList.add("remove-todo");
  deletBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  todo.appendChild(deletBtn);

  todoList.appendChild(todo);

  todoInput.value = "";
  todoInput.focus();
};

const toggleForms = () => {
  editForm.classList.toggle("hide");
  todoForm.classList.toggle("hide");
  todoList.classList.toggle("hide");
};

const updateTodo = (text) => {
  const todos = document.querySelectorAll(".todo");

  todos.forEach((todo) => {
    let todoTitle = todo.querySelector("h3");

    if (todoTitle.innerText === oldInputValue) {
      todoTitle.innerText = text;
    }
  });
};

//Eventos//
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = todoInput.value;

  const userStorage = JSON.parse(localStorage.getItem("infoLogin"));
  const idStorage = userStorage.createdUser.id;

  axios
    .post(`http://localhost:8888/user/${idStorage}/task`, { task: inputValue })
    .then(function ({ data }) {
      console.log(data);
    })
    .catch(function (error) {
      console.log(error);
    });

  if (inputValue) {
    saveTodo(inputValue);
  }
});

document.addEventListener("click", (e) => {
  const targetEl = e.target;
  const parentEl = targetEl.closest("div");

  if (parentEl.id) {
    localStorage.setItem("taskId", parentEl.id);
  }
  let todoTitle;

  if (parentEl && parentEl.querySelector("h3")) {
    todoTitle = parentEl.querySelector("h3").innerText;
  }

  if (targetEl.classList.contains("finish-todo")) {
    parentEl.classList.toggle("done");
  }

  if (targetEl.classList.contains("remove-todo")) {
    const userStorage = JSON.parse(localStorage.getItem("infoLogin"));
    const idStorage = userStorage.createdUser.id;

    const taskId = localStorage.getItem("taskId");
    axios
      .delete(`http://localhost:8888/user/${idStorage}/task/${taskId}`)
      .then(function ({ data }) {})
      .catch(function (error) {
        console.log(error);
      });
    parentEl.remove();
  }

  if (targetEl.classList.contains("edit-todo")) {
    toggleForms();

    editInput.value = todoTitle;
    oldInputValue = todoTitle;
  }
});

cancelEditBtn.addEventListener("click", (e) => {
  e.preventDefault();

  toggleForms();
});

editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const editInputValue = editInput.value;

  const userStorage = JSON.parse(localStorage.getItem("infoLogin"));
  const idStorage = userStorage.createdUser.id;

  const taskId = localStorage.getItem("taskId");

  axios
    .put(`http://localhost:8888/user/${idStorage}/task/${taskId}`, {
      taskName: editInputValue,
    })
    .then(function ({ data }) {})
    .catch(function (error) {
      console.log(error);
    });

  if (editInputValue) {
    updateTodo(editInputValue);
  }
  toggleForms();
});
