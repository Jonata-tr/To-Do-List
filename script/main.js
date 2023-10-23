lucide.createIcons();

// Prototipo de criação de elementos da toDo List 

const creatTask = document.querySelector(".create-task");

creatTask.addEventListener('click', getTaskValues);

// Task creator 
function getTaskValues(){
  // Gets the task values
  const taskInput = document.querySelector('#input-task').value
  const taskType = document.querySelector('.selected-category').innerText

  // Empty input don't work
  checksInputValue(taskInput, taskType)
}

function checksInputValue(taskInput, taskType) {
  if(taskInput.replace(/\s+/g, '').length){
    if(taskType === 'Selecionar'){
      alert('Selecione uma categoria!')
      return;
    }
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

// ############################################
// MODAL AREA

function handleSelect(){
  const options = document.querySelectorAll(".option input");
  
  options.forEach(item => {
    item.addEventListener("click", event => {
      const customSelect = event.currentTarget.closest('.custom-select');
      const selectedCategory = customSelect.querySelector('.selected-category');
      
      selectedCategory.textContent = item.dataset.category;
      
      closeSelect(customSelect, event.pointerType)
    })
  }) 
}

function closeSelect(custom, evento) {
  const buttonView = custom.querySelector(".options-view-button");
  console.log(buttonView);

  const mouseOrTouch = 
  evento == 'mouse' ||
  evento == 'touch'

  mouseOrTouch && buttonView.click()
}

handleSelect();