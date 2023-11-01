lucide.createIcons();

// #####################
// Show modal

function showModal(){
  const modalButton = document.querySelector(".create-task")

  modalButton.addEventListener('click', () => {
    const modalWrapper = document.querySelector("#modal-wrapper")

    modalWrapper.classList.add('ativo')
  })
}

function  closeModal() {
  const closeButton = document.querySelector("#close-wrapper")

  closeButton.addEventListener("click" , () => {
    const newTaskInput = document.querySelector("#input-task"),
    selectInput = document.querySelectorAll('.option input'),
    selectLabel = document.querySelectorAll('.option'),
    selectedCategory = document.querySelectorAll(".selected-category");
    

    newTaskInput.value = '';
    
    selectedCategory.forEach(item => {
      item.innerText = 'Selecionar'
    })
  
    selectInput.forEach(item => {
      item.checked = false
    })
    
    const modalWrapper = document.querySelector("#modal-wrapper")
    modalWrapper.classList.remove('ativo')
  })
}

showModal();
closeModal();

const filter = document.querySelector("#filter")
filter.addEventListener("click", ()=> {
  const filterArea = document.querySelector(".task-filter")

  filterArea.classList.toggle('ativo')
})

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
  
  

  const taskArea = document.getElementById(li.task-state)

  taskArea.appendChild(li.element)
}

// List Constructor
function NewListItem(state, tittle, type, time){
  this.element = document.createElement('div');
  this.element.classList.add('task')
  this.type = type;

  this.element.innerHTML = `
    <span class="type">${this.type}</span>
    <h2>${tittle}</h2>
    <div class="task-type-area">
      <p>${state}</p>
      
      <div>
        <button>
          <svg class='icons' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
        </button>

        <button>
          <svg class='icons' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
        </button>
        
        <button>
          <svg class='icons' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock-4"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        </button>
      </div>
    </div>  
  `
}

const planejada = document.querySelector("#planejada")
const andamento = document.querySelector("#andamento")
const completa = document.querySelector("#completa")

const tipos = [
  'Trabalho',
  'Casa',
  'Lazer',
  'Jogos',
  'Estudos'
]

for(let i =0; i <= 4; i++){
  const li = new NewListItem('Planejada', 'Limpar a casa e depois lavar a louça', tipos[i], '20/03')
  const lii = new NewListItem('Em andamento', 'Limpar a casa e depois lavar a louça', tipos[i], '20/03')
  const liii = new NewListItem('Completada', 'Limpar a casa e depois lavar a louça', tipos[i], '20/03')

  planejada.appendChild(li.element)
  andamento.appendChild(lii.element)
  completa.appendChild(liii.element)
}

// ############################################
// CUSTOM SELECT

function handleSelect(){
  const options = document.querySelectorAll(".option input");
  
  options.forEach(item => {
    item.addEventListener("click", event => {
      const customSelect = event.currentTarget.closest('.custom-select');
      const selectedCategory = customSelect.querySelector('.selected-category');
      
      selectedCategory.textContent = item.dataset.category;
      
      closeSelectOptions(customSelect, event.pointerType)
    })
  }) 
}

function closeSelectOptions(custom, evento) {
  const buttonView = custom.querySelector(".options-view-button");

  const mouseOrTouch = 
  evento == 'mouse' ||
  evento == 'touch'

  mouseOrTouch && buttonView.click()
}

handleSelect();

function closeSelect(){
  const optionsView = document.querySelectorAll('.options-view-button')
  optionsView.forEach( button => {
    button.addEventListener('click', event => {
      button.classList.toggle("ativo")
      checkSelectState(event, optionsView);
    })
  })
}

function checkSelectState(event, optionsView){
  optionsView.forEach(button => {
    if(button !== event.currentTarget){
      button.checked = false;
      button.classList.remove('ativo') 
    }
  })  
}

closeSelect();