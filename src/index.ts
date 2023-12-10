interface Todo {
  text: string;
  completed: boolean;
}

//access the dom
const btn = document.getElementById("btn")!;
const input = document.getElementById("todoinput")! as HTMLInputElement;
const form = document.querySelector("form")!;
const todolist = document.getElementById("todols")!;

const todos: Todo[] = readTodos();
todos.forEach(createTODOElement);

//read todo from local 
function readTodos(): Todo[] {
  const todoJSON = localStorage.getItem("todos");
  if (todoJSON === null) {
    return [];
  }
  return JSON.parse(todoJSON);
}

//save todo to local
function saveTodo() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

//sumit todo
function handleSubmit(e: SubmitEvent) {
  e.preventDefault();
  const newTodo: Todo = {
    text: input.value,
    completed: false
  };
  createTODOElement(newTodo);
  todos.push(newTodo);
  saveTodo();
  input.value = "";
}

//create todo element to render on screen
function createTODOElement(todo: Todo) {
  const newLI = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.completed;
  checkbox.addEventListener("change", function () {
    todo.completed = checkbox.checked;
    saveTodo();
  });
  newLI.append(todo.text);
  newLI.append(checkbox);
  todolist.append(newLI);
}

form.addEventListener("submit", handleSubmit);

// btn.addEventListener("click", () => {
//   alert(input.value);
//   input.value = "";
// });
