const urlParams = new URLSearchParams(window.location.search);
const msg = urlParams.get('msg');
if(msg){
    console.log(msg);
} 
let firebase_URL =
  "https://join-2-b992b-default-rtdb.europe-west1.firebasedatabase.app/";
let tasks =[];
let contacts=[];
let currentDraggedElement;

async function initBoard() {
    await loadTasks();
    await loadContacts();
    todoBoard();
    inProgressBoard();
    awaitFeedbackBoard();
    doneBoard();
}
 
function todoBoard(){
  let todo = tasks.filter(t => t['status'] == 'todo');
    let content = document.getElementById('todoBoard');
    content.innerHTML='';

    for(i=0; i<todo.length;i++){
      content.innerHTML +=`
      <div class="one-task-div" ondrop="moveTo('inProgressBoard')" ondragleave="removeHighlight('open')" ondragover="allowDrop(event); highlight('open')">
        <div class="category-div"><div class="category-div-child"id="categorySign-${i}">${tasks[i]['category']}</div></div>
        <div>${tasks[i]['title']}</div>
        <div>${tasks[i]['description']}</div>
        <div>
            <div class="load-subtask-div"><div class="load-subtask" style="width:50%"></div></div>
            <div> 1/2-Subtasks</div>
        </div>
        <div class="assigned-persons-initals"id="assignedPerson-${i}"></div>
      </div>`;
      showAssignedPersonsInitial(i);
      categorySign(i);
    }
}

function showAssignedPersonsInitial(i){
  let persons = document.getElementById(`assignedPerson-${i}`);
  persons.innerHTML ='';
  assignedPersons = tasks[i]['assigned']
  for(j=0; j<assignedPersons.length; j++){
    persons.innerHTML +=`
    <div class="initals-div-in-task"style="background-color:${assignedPersons[j]['color']}">${profileInitials(assignedPersons[j]['name'])}</div>
    `;
  }
}

function categorySign(){
  let category = document.getElementById(`categorySign-${i}`);
  if(tasks[i]['category'] =='Technical Task'){
    category.style.backgroundColor = '#1FD7C1';
    category.style.color = 'white';
  }else if(tasks[i]['category'] =='User Story'){
    category.style.backgroundColor ='#0038FF';
    category.style.color = 'white';
  }
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';//jederBuchstabe des Farbstrings
  let color = '#';
  for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

/**
 * In dieser Funktion werden die Initialien der Kontakte rausgefiltert und wiedergegeben
 *
 * @param {*} i
 * @returns
 */
function profileInitials(name) {
  let names = name.split(" "),
    initials = names[0].substring(0, 1).toUpperCase();
  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
}

function inProgressBoard(){

}
function awaitFeedbackBoard(){

}
function doneBoard(){

}
function changeFillColor(){

}
function changeFillColorBack(){

}



function updateHTML() {
    //oberer container
    let open = todos.filter(t => t['category'] == 'open'); //zum rausfiltern aller objecte mit der kategorie open
    document.getElementById('open').innerHTML = '';
    for (let index = 0; index < open.length; index++) {
        const element = open[index];
        document.getElementById('open').innerHTML += generateTodoHTML(element);
    }// alle objekte mit der kategorie open werden dem div zugeordnet
    //unterer container
    let closed = todos.filter(t => t['category'] == 'closed');
    document.getElementById('closed').innerHTML = '';
    for (let index = 0; index < closed.length; index++) {
        const element = closed[index];
        document.getElementById('closed').innerHTML += generateTodoHTML(element);
    }
}



function generateTodoHTML(element) {
    return `<div draggable="true" ondragstart="startDragging(${element['id']})" class="todo">${element['title']}</div>`;
}//draggable= true sagt aus, dass es bewegbar sein soll

/**
 * Wird aufgerufen, sobald man anfängt den Container zu packen.
 * Die Id soll gloabal definiert sein, damit man sie bei dem nächsten feld einfügen kann.
 * @param {*} id 
 */
function startDragging(id) {
    currentDraggedElement = id;
}

/**
 * Diese Funktion soll es ermöglichen, dass das Element außerhalb der div gelangen kann
 * @param {*} ev 
 */
function allowDrop(ev) {
    ev.preventDefault();
}

/**
 * Diese Funktion soll die category anpassen
 * @param {*} category 
 */
function moveTo(category) {
    todos[currentDraggedElement]['category'] = category;
    //der inhalt von category ändert sich zu dem jeweiligen Parameter
    updateHTML();
}

/**
 * Um den Container über den man ist hightliten zu können
 * @param {*} id 
 */
function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}

/**
 * Dies dient dazu den highlight effekt zu removen.
 * @param {*} id 
 */
function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}