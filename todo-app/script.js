const form = document.getElementById('form');
const text = document.getElementById('text');
const list = document.getElementById('list');
const completed = document.getElementById('completed')

const dummy = [
  { id: 1, text: 'javascript' },
  { id: 2, text: 'laravel' },
];

let todos = dummy;

let complete = 0

function addTodo(e) {
  e.preventDefault();
  if (text.value.trim() === '') {
    alert('Not value');
  } else {
    const todo = {
      id: generateID(),
      text: text.value,
    };
    todos.push(todo);
    console.log(todos);
    text.value = '';
  }
  init()
}

function generateID() {
  return Math.floor(Math.random() * 10000000);
}

function removeTodo(id) {
  todos = todos.filter(todo => todo.id !== id)
  init()
}

function completedTodo(id) {
  todos = todos.filter(todo => todo.id !== id)
  complete++
  completed.innerHTML = `タスクを${complete}件完了しました`

  init()
}

function addTodoDOM(todo) {
  const item = document.createElement('li');
  item.innerHTML = `
    <button class="complete-btn" onclick="completedTodo(${todo.id})" ><i class="far fa-circle"></i></button>
          ${todo.text} <button class="delete-btn" onclick="removeTodo(${todo.id})">x</button>
  `;

  list.appendChild(item)
}

function init() {
  list.innerHTML = '';
  todos.forEach(addTodoDOM);
}

init()

form.addEventListener('submit', addTodo);
