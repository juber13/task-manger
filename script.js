const addTaskBtn = document.querySelector('#add-btn');
const closeModalBtn = document.querySelector('.btn-warning');

const saveBtn = document.querySelector('.btn-primary');
const updateBtn = document.querySelector('.update');
const modalContainer = document.querySelector('.container-fluid')

const taskName = document.querySelector('#task-name');
const description =  document.querySelector('#description');
const option =  document.querySelector('#option-value');
const form = document.querySelector('#task-manager-form');

const cards =  document.querySelectorAll('.card');
// const items = document.querySelectorAll('.items');


const showModal = () => modalContainer.classList.add('active');
const closeModal = () => modalContainer.classList.remove('active');

let data = JSON.parse(localStorage.getItem('item')) || [];

function setToLocalStorage(items){
  localStorage.setItem('item' , JSON.stringify(items));
}


function renderTask(e){
  e.preventDefault();
    const value = taskName.value;
    const  optionValue  =  option.value;
    var listElement = document.createElement('div');
    listElement.setAttribute('class' , 'items');
    listElement.setAttribute("draggable" , 'true');
    listElement.innerHTML = `<ul><li>${value}</li></ul>`;
    let curr = document.getElementById(`${optionValue}`);
    curr.appendChild(listElement);
   
    let obj = {}
      obj.name = value;
      obj.container = optionValue;
      
    data.push(obj);
    closeModal();
    setToLocalStorage(data);
    draggingFunction(listElement);
  }
  
  function renderHTML(){
    data.forEach((item , index) => {
      let output = document.createElement('div');
      let currenCard = document.getElementById(`${item.container}`);
      output.innerHTML =  `<div class="items" draggable="true" onclick="update(${index})"><ul><li data-index=${index}>${item.name}</li></ul></div>`;
      currenCard.appendChild(output);
      draggingFunction(output);
    })
  }

  
  


function update(index){
  updateBtn.style = "block"
  saveBtn.style.display = "none";
  showModal();
  updateBtn.addEventListener("click" , () => {
    console.log(index);
    data[index].name = taskName.value;
    data[index].container = option.value;
    data.splice(index , 1)
    setToLocalStorage(data);
  })
}

  renderHTML();



function draggingFunction(element){
   element.addEventListener('dragstart' , () => element.classList.add('dragging'));
   element.addEventListener('dragend' , () => element.classList.remove('dragging'));    
}



cards.forEach((card) => {
    card.addEventListener('dragover' , () => {
        const draggingElement = document.querySelector('.dragging');
        card.appendChild(draggingElement);
    })
})



form.addEventListener('submit' , renderTask);
addTaskBtn.addEventListener("click" , () => {
  updateBtn.style.display = "none"
  saveBtn.style.display = "block";
  showModal();
});
closeModalBtn.addEventListener("click" , closeModal);
window.addEventListener('keydown', function(e){
  if(e.key == 'Escape') closeModal();
})