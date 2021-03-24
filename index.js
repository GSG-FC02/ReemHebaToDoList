
const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('#static');
const todoItemsList = document.querySelector('#plan-list-items');
const Add_btn = document.querySelector('#add-btn');

let todos = [];
Add_btn.addEventListener('click', function(event) {
  event.preventDefault();
  addTodo(todoInput.value); 
});
//*************************************************************
function addTodo(item) {
  if (item !== '') {
    const todo = {
      id: Date.now(),
      name: item,
      completed: false
    };

    todos.push(todo);
    addToLocalStorage(todos);
    //  clear the input 
    todoInput.value = '';
  }
}
//*************************************************************
// function to render given todos to screen
function renderTodos(todos) {
  // clear everything inside ul
  todoItemsList.innerHTML = '';
  todos.forEach(function(item) {
    // check if the item is completed
    const checked = item.completed ? 'checked': null;
    const li = document.createElement('li');
    li.setAttribute('class', 'item');
    li.setAttribute('data-key', item.id);
    if (item.completed === true) {
      li.classList.add('checked');
    }
    li.innerHTML = `
      <input type="checkbox" class="checkbox" ${checked}>
      ${item.name}
      <button class="delete-button">X</button>
    `;
    // add the <li> to the <ul>
    todoItemsList.append(li);
  });

}
//*************************************************************
// add todos to local storage
function addToLocalStorage(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodos(todos);
}
//*************************************************************
// get everything from local storage
function getFromLocalStorage() {
  const reference = localStorage.getItem('todos');
  if (reference) {
    todos = JSON.parse(reference);
    renderTodos(todos);
  }
}
//************************************************************** 
function toggle(id) {
  todos.forEach(function(item) {
    if (item.id == id) {
      item.completed = !item.completed;
    }
  });

  addToLocalStorage(todos);
}
//****************************************************************** 

// deletes a todo from todos array
function deleteTodo(id) {
  todos = todos.filter(function(item) {
    return item.id != id;
  });
  addToLocalStorage(todos);
}

//  get everything from localStorage
getFromLocalStorage();

todoItemsList.addEventListener('click', function(event) {
  if (event.target.type === 'checkbox') {
    toggle(event.target.parentElement.getAttribute('data-key'));
  }

  if (event.target.classList.contains('delete-button')) {
    deleteTodo(event.target.parentElement.getAttribute('data-key'));
  }
});