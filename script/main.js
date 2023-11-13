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
showModal();

function  closeModal() {
  const closeButton = document.querySelector("#close-wrapper")

  closeButton.addEventListener("click" , cleanModal)
}
closeModal();

function cleanModal(){
  const newTaskInput = document.querySelector("#input-task"),
    selectInput = document.querySelectorAll('.option input'),
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
}

// Prototipo de criação de elementos da toDo List 

function  createTask() {
  const finishiTaskCreation = document.querySelector(".finish-create");
  
  finishiTaskCreation.addEventListener('click', getTaskValues);
}

createTask();

// ##########################
// Get all the task values
function getTaskValues(){
  // Gets the task values
  const taskInput = document.querySelector('#input-task').value,
  taskType = document.querySelector('#task-type').innerText,
  taskState = document.querySelector("#task-state").innerText;
  
  if(checksInputValue(taskInput, taskType, taskState)){
    const task = new NewListItem(taskInput, taskType, taskState);
    const taskGoIn = document.querySelector(`${
      taskState === "Planejada" ? "#planejada" : "#andamento"
    }`)

    handleTaskActionButton(task.element);
    handleEraseTaskModal(task.element);

    taskGoIn.appendChild(task.element)
    cleanModal();
  }

  return;
}

function checksInputValue(taskInput, taskType, taskState) {
  // Empty input don't work
  if(taskInput.replace(/\s+/g, '').length){
    if(checkStateValue(taskType, taskState) != true) return;

    return true;
  } 
  
  else if(taskInput.replace(/\s+/g, '').length === 0){
      document.querySelector("#input-task").placeholder = 'Não pode estar vazio';
      checkStateValue(taskType, taskState);
      return false;
  }
  
  return true;
}

function checkStateValue(taskType, taskState) {
  if(taskType === 'Selecionar' & taskState === "Selecionar"){
    alert('Selecione um tipo e um estado para a task.')
    return false;
  } else if(taskState === "Selecionar"){
    alert('Selecione um estado.')
    return false;
  } else if(taskType === 'Selecionar'){
    alert('Selecione um tipo.')
    return false
  }

  return true;
}

// List Constructor
function NewListItem(input, type, state,){
  const startTask = `<button class="buttons task-action start-task">
  <svg class='icons' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock-4 icons"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
  </button>` 

  const completeTask = `
  <label for="complete" class="checkbox complete-task">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icons lucide lucide-check-check icons"><path d="M18 6 7 17l-5-5"/><path d="m22 10-7.5 7.5L13 16"/></svg>
    <input type="checkbox" name="complete">
  </label>`
  
  this.element = document.createElement('div');
  this.element.classList.add('task')

  this.taskInput = input;
  this.taskType = type;
  this.taskState = state;
  this.taskAction = 
    function(){
      if(this.taskState === 'Planejada'){
        return startTask
      }
      
      else{
        return completeTask
      }
    };

  this.confirmation = `
    <div class='erase-confirmation'>
      Tem certeza que deseja apagar esta task?
      <div class='confirmation-button'>
        <button>Sim</button>
        <button>Não</button>
      </div>
    </div>
  `

  return this.element.innerHTML = `
  <span class="type">${this.taskType}</span>
  
  <h2>${this.taskInput}</h2>
  
  <div class="task-type-area">
    <p class='state'>${this.taskState}</p>
  
    <div class="task-options buttons">
      <button class="task-edit">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil icons"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
      </button>
  
      
      <button class="task-erase buttons">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2 icons"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
      </button>
      
      ${this.taskAction()}
      
      ${this.confirmation}
    </div>
  </div>  
  `
}

// ############################################
// CUSTOM SELECT
function handleSelect(){
  closeOpenSelect();
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
handleSelect();

function closeSelectOptions(custom, evento) {
  const buttonView = custom.querySelector(".options-view-button");
  
  const mouseOrTouch = 
  evento == 'mouse' ||
  evento == 'touch'
  
  mouseOrTouch && buttonView.click()
}

function closeOpenSelect(){
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

// ###########################################################
// TASK BUTON OPTIONS AREA
function handleTaskActionButton(taskCheck){
  let task = taskCheck;
  console.log(task);

  const state = taskCheck.querySelector(".state").innerText.toLowerCase()
  
  if(state === 'planejada'){
    const startButton = task.querySelector('.start-task')
    startButton.addEventListener("click", () => {
      startTask(task)
    })
  }
  
  if(state === 'em andamento' || state === 'completa'){
    alert("inicio")
    const startButton = task.querySelector('.complete-task'),
    checkState = startButton.querySelector('input')

    if(checkState.checked === true){
      alert("checado")
    } else(
      startButton.addEventListener("click", () => {
        completeTask(task)
        alert('teste')
      })
    )
  }

  return;
}

function startTask(task){
  const emAndamento = document.querySelector("#andamento")
  const taskAction = task.querySelector('.task-action')

  taskAction.classList.remove('start-task')
  taskAction.classList.add('complete-task')

  taskAction.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-check icons"><path d="M18 6 7 17l-5-5"/><path d="m22 10-7.5 7.5L13 16"/></svg>
  `

  task.querySelector('.state').innerText = 'Em andamento'

  emAndamento.appendChild(task)

  handleTaskActionButton();
}

function completeTask(task){
  task.classList.add("finished")
  
  task.querySelector('.state').innerText = 'Completa'
  
  const emAndamento = document.querySelector("#completa")
  emAndamento.appendChild(task)

}


// ###########################################################
// ERASE TASK SECTION
function handleEraseTaskModal(task){
  const eraseTaskModal = task.querySelector(".task-erase")
  eraseTaskModal.addEventListener("click", () => {  
  
  const confirmationModal = eraseTaskModal.parentElement.querySelector(".erase-confirmation")

  removeActiveEraseModal(task);
    
  confirmationModal.classList.add('ativo')
  eraseTask(task);
  })
}

function removeActiveEraseModal(task){
  const confirmationModal = task.querySelector(".erase-confirmation")

  confirmationModal.classList.remove('ativo')
}

function eraseTask(task){
  const confirmationButtons = task.querySelectorAll(".confirmation-button button")

  confirmationButtons.forEach(button => {
    button.addEventListener("click", (event) => {
      if(button.innerText.toLowerCase() === 'sim'){
        const confirmationModal = button.closest('.erase-confirmation')
        confirmationModal.classList.remove('ativo')
        
        button.closest(".task").remove();
      } else{
        const confirmationModal = button.closest('.erase-confirmation')
        confirmationModal.classList.remove('ativo')
      }
    })
  })
}


const filter = document.querySelector("#filter")
filter.addEventListener("click", ()=> {
  const filterArea = document.querySelector(".task-filter")

  filterArea.classList.toggle('ativo')
})