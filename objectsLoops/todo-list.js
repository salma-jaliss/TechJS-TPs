const todoList = [{
  name: 'review course',
  dueDate: '2025-09-29'
}];

renderTodoList();

function renderTodoList() {
  let todoListHTML = '';

  // Loop over every toDo object and append it to "todoListHTML"
  todoList.forEach((todoObject, index) => {
    const { name, dueDate } = todoObject;
    todoListHTML += `
      <div class="todo-item">
        <span>${name}</span>
        <span>${dueDate}</span>
        <button class="delete-todo-button" data-index="${index}">Delete</button>
      </div>
    `;
  });

  // Show the objects inside the class "js-todo-list"
  document.querySelector('.js-todo-list').innerHTML = todoListHTML;

  // Loop over every delete button and add an eventListener that deletes the toDo and rerender the Tasks
  document.querySelectorAll('.delete-todo-button').forEach((button) => {
    button.addEventListener('click', (event) => {
      const index = event.target.getAttribute('data-index');
      todoList.splice(index, 1);
      renderTodoList();
    });
  });
}

document.querySelector('.js-add-todo-button')
  .addEventListener('click', () => {
    addTodo();
  });

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;

  const dateInputElement = document.querySelector('.js-due-date-input');
  const dueDate = dateInputElement.value;


  // Add these values to the variable "todoList"
  todoList.push({
    name: name,
    dueDate: dueDate
  });


  inputElement.value = '';

  renderTodoList();
}