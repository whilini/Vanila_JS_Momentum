const toDoForm = document.querySelector("#todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.querySelector("#todo-list");

const TODOS_KEY = "todos";
let toDos = [];

const saveTodos = () => {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
};

const deleteTodo = (event) => {
  const potatoList = event.target.parentElement;
  potatoList.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(potatoList.id));
  // find, findIndex
  // const idx = toDos.findIndex((toDos) => toDos.id.toString() === event.target.parentElement.id);
  // toDos.splice(idx, 1);
  // delete toDos[idx];
  // console.log(toDos);
  saveTodos();
};

const paintToDo = (newTodoObj) => {
  const potatoList = document.createElement("li");
  potatoList.id = newTodoObj.id;
  const span = document.createElement("span");
  span.innerText = newTodoObj.text;
  const button = document.createElement("button");
  button.innerText = "❌";
  button.addEventListener("click", deleteTodo);
  potatoList.appendChild(span);
  potatoList.appendChild(button);
  toDoList.appendChild(potatoList);
};

const handleToDoSubmit = (event) => {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveTodos();
};

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}
