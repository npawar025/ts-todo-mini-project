"use strict";
const btn = document.getElementById("btn");
const input = document.getElementById("todoinput");
const form = document.querySelector("form");
const todolist = document.getElementById("todols");
const todos = readTodos();
todos.forEach(createTODOElement);
function readTodos() {
    const todoJSON = localStorage.getItem("todos");
    if (todoJSON === null) {
        return [];
    }
    return JSON.parse(todoJSON);
}
function saveTodo() {
    localStorage.setItem("todos", JSON.stringify(todos));
}
function handleSubmit(e) {
    e.preventDefault();
    const newTodo = {
        text: input.value,
        completed: false
    };
    createTODOElement(newTodo);
    todos.push(newTodo);
    saveTodo();
    input.value = "";
}
function createTODOElement(todo) {
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
