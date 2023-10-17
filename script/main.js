// Prototipo de criação de elementos da toDo List 

const creatTask = document.querySelector(".create-task");

creatTask.addEventListener('click', getTaskValues);

// Task creator 
function getTaskValues(){
  // Gets the task values
  const taskInput = document.querySelector('#input-task').value
  console.log(taskInput);
  const taskType = document.querySelector('#task-type').value
  
  // Empty input don't work
  checksInputValue(taskInput, taskType)


  const date = new Date()
}

function checksInputValue(taskInput, taskType) {
  if(taskInput.replace(/\s+/g, '').length){
    createTask(taskInput, taskType)
  } else {
    document.querySelector("#input-task").placeholder = 'Não pode estar vazio.'
  }

}

function createTask(taskInput, taskType){
  //get time of creation
  const getTime = new Date(); 
  const timeTask = `${getTime.getDate()}/${getTime.getMonth() + 1}     ${getTime.getHours()}:${getTime.getMinutes()}`

  // create new task
  const li = new NewListItem(taskInput, taskType, timeTask);
  li.element.classList.add(taskType);
  
  

  const taskArea = document.querySelector(".to-do-area")

  console.log(new Date());
  taskArea.appendChild(li.element)
}

// List Constructor
function NewListItem(tittle, type, time){
  this.element = document.createElement('li')
  this.tittle = `<h3>${tittle}</h3>`
  this.type = `<p>${type}</p>`
  this.time = `<span>${time}</span>`

  this.element.innerHTML = `${this.tittle}
  ${this.type} ${this.time}` 
}

