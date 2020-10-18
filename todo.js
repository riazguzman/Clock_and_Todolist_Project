const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");


const TODOS_LS = "toDos";

let toDos = [];


function saveToDos(){
  localStorage.setItem(TODOS_LS,JSON.stringify(toDos))
}

function deleteToDo(event){
  toDoList.removeChild(event.path[1]);
  console.log(event.path[1]);
  let cleantodoes = toDos.filter(function(l){
    return l.id != event.path[1].id;
  })
  toDos = cleantodoes;
  saveToDos();
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const cleantodoes = toDos;
    delBtn.innerText = "❌";
    delBtn.addEventListener("click",deleteToDo);
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    li.setAttribute("id",newId);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    toDoList.appendChild(li);
    const toDoObj = {
      text: text,
      id: newId
    }
    toDos.push(toDoObj);
    saveToDos(toDoObj);
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function(l){
      paintToDo(l.text);
    })
  }
}



function init() {
  loadToDos();
  toDoForm.addEventListener("submit",handleSubmit);
  
}

init();
