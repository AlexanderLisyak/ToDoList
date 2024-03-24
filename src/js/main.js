import '../scss/style.scss'



const todoInput = document.querySelector('.todo__input')
const todoButton = document.querySelector('.todo__button')
const todoList = document.querySelector('.todo__list')
const filterSelect = document.querySelector('.todo__select')


document.addEventListener("DOMContentLoaded", getTodos)
todoButton.addEventListener('click', toDoAdd);
todoList.addEventListener('click', deleteCheck);
filterSelect.addEventListener('change', filterOption);


function toDoAdd(event){
    event.preventDefault();

    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo')

    const todoElement = document.createElement('li');
    todoElement.innerText = todoInput.value;
    todoElement.classList.add('todo__element');
    todoDiv.appendChild(todoElement);

    saveLocalTodos(todoInput.value);

    const todoCheck = document.createElement('button')
    todoCheck.innerHTML ='<i class="fa-solid fa-check"></i>';
    todoCheck.classList.add('todo__button-check')
    todoDiv.appendChild(todoCheck);

    const todoDelete = document.createElement('button');
    todoDelete.innerHTML ='<i class="fa-solid fa-trash"></i>';
    todoDelete.classList.add('todo__button-delete')
    todoDiv.appendChild(todoDelete);


    todoList.appendChild(todoDiv);
    todoInput.value = "";
}


function deleteCheck(e){
    const item = e.target;
    if(item.classList[0] === "todo__button-delete"){
        const todo = item.parentElement;
        deleteLocalTodos(todo);
        todo.classList.add('fall')
        todo.addEventListener('transitionend', function(){
            todo.remove();
        })
    }


    if(item.classList[0] === "todo__button-check"){
        const todo = item.parentElement;
        todo.classList.toggle("completed")
    }
}


function filterOption(e){
    const todos = todoList.childNodes;
    todos.forEach(todo => {
        if (todo.classList && todo.classList.contains('todo')) {
            switch(e.target.value){
                case 'All':
                    todo.style.display = 'flex';
                    break;
                case 'Completed':
                    if(todo.classList.contains('completed')){
                        todo.style.display = 'flex';
                    } else {
                        todo.style.display = 'none';
                    }
                    break;
                case 'Incompleted':
                    if(!todo.classList.contains('completed')){
                        todo.style.display = 'flex';
                    }else{
                        todo.style.display = 'none';
                    }
            }
        }
    });
}






function saveLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos))
}


function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    
    todos.forEach(function(todo){
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo')

        const todoElement = document.createElement('li');
        todoElement.innerText = todo;
        todoElement.classList.add('todo__element');
        todoDiv.appendChild(todoElement);

        const todoCheck = document.createElement('button')
        todoCheck.innerHTML ='<i class="fa-solid fa-check"></i>';
        todoCheck.classList.add('todo__button-check')
        todoDiv.appendChild(todoCheck);

        const todoDelete = document.createElement('button');
        todoDelete.innerHTML ='<i class="fa-solid fa-trash"></i>';
        todoDelete.classList.add('todo__button-delete')
        todoDiv.appendChild(todoDelete);


        todoList.appendChild(todoDiv);
    })
        
}



function deleteLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);;
    localStorage.setItem('todos', JSON.stringify(todos))
}