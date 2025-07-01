const userinputEl = document.getElementById('userinput');
const addBtn = document.getElementById('addTask');
const storeContainer = document.querySelector('.store-container');

addBtn.addEventListener('click', () => {
  let inputValue = userinputEl.value.trim();
  if(inputValue === "") return;
  createStoreBox(inputValue);
  userinputEl.value = " ";
  saveTask();  //save localstorage
})

const createStoreBox = (inputValue) => {
  let storeBox = document.createElement('div');
  storeBox.classList.add('store');
  let para = document.createElement('p');
  para.innerHTML = inputValue;
  let icon = document.createElement('i');
  icon.className = 'fa-solid fa-circle-xmark';
  // storeBox.innerHTML = '<i class=""></i>';
  storeBox.appendChild(para);
  storeBox.appendChild(icon);
  storeContainer.appendChild(storeBox);

  icon.addEventListener('click', (e) => {
    storeBox.classList.add('fade-out');
    setTimeout(()=>{
      icon.parentElement.remove();
      saveTask();  //remove localstorage
    },400)
})  
}

function saveTask(){
  const allTasks = Array.from(document.querySelectorAll('.store p')).map(p => p.textContent );
  localStorage.setItem("todolist", JSON.stringify(allTasks));
}

window.addEventListener('DOMContentLoaded',()=>{
  const savedTasks = JSON.parse(localStorage.getItem("todolist")) || [] ;
   savedTasks.forEach(task => createStoreBox(task));
})