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
let idNumberStartValue =0;

async function initBoard() {
    await loadTasks();
    await loadContacts();
    todoBoard();
    inProgressBoard();
    awaitFeedbackBoard();
    doneBoard();
}
 
function showAssignedPersonsInitial(element){
  let persons = document.getElementById(`assignedPerson-${element['idNumber']}`);
  persons.innerHTML ='';
  assignedPersons = element['assigned'];
  for(j=0; j<assignedPersons.length; j++){
    persons.innerHTML +=`
    <div class="initals-div-in-task"style="background-color:${assignedPersons[j]['color']}">${profileInitials(assignedPersons[j]['name'])}</div>
    `;
  }
}

function categorySign(element){
  let category = document.getElementById(`categorySign-${element['idNumber']}`);
  if(element['category'] =='Technical Task'){
    category.style.backgroundColor = '#1FD7C1';
    category.style.color = 'white';
  }else if(element['category'] =='User Story'){
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

function todoBoard(){
  let todo = tasks.filter(t => t['status'] == 'todo');
  console.log(todo);
    let content = document.getElementById('todoBoard');
    content.innerHTML='';
    if(todo.length==0){
      content.innerHTML=`
      <div class="no-task-available">No tasks To do</div>
      `
    }else{
      for(i=0; i<todo.length;i++){
        let element = todo[i];
        content.innerHTML += 
        `
        <div class="one-task-div" draggable="true" ondragstart="startDragging(${element['idNumber']})">
          <div class="category-div"><div class="category-div-child"id="categorySign-${element['idNumber']}">${element['category']}</div></div>
          <div>${element['title']}</div>
          <div>${element['description']}</div>
          <div>
              <div class="load-subtask-div"><div class="load-subtask" style="width:50%"></div></div>
              <div> 1/2-Subtasks</div>
          </div>
          <div class="assigned-persons-initals"id="assignedPerson-${element['idNumber']}"></div>
        </div>`;
        showAssignedPersonsInitial(element);
        categorySign(element);
    }}
}

function inProgressBoard(){
  let inProgress = tasks.filter(t => t['status'] == 'inProgress');
  console.log(inProgress);
    let content = document.getElementById('inProgressBoard');
    content.innerHTML='';
    if(inProgress.length == 0){
      content.innerHTML=`
      <div class="no-task-available">No tasks in Progress</div>
      `
    }else{
      for(i=0; i<inProgress.length;i++){
        let element = inProgress[i];
        content.innerHTML +=`
        <div class="one-task-div" draggable="true" ondragstart="startDragging(${element['idNumber']})">
          <div class="category-div"><div class="category-div-child"id="categorySign-${element['idNumber']}">${element['category']}</div></div>
          <div>${element['title']}</div>
          <div>${element['description']}</div>
          <div>
              <div class="load-subtask-div"><div class="load-subtask" style="width:50%"></div></div>
              <div> 1/2-Subtasks</div>
          </div>
          <div class="assigned-persons-initals"id="assignedPerson-${element['idNumber']}"></div>
        </div>`;
        showAssignedPersonsInitial(element);
        categorySign(element);
    }}
}

function awaitFeedbackBoard(){
  let awaitFeedback = tasks.filter(t => t['status'] == 'awaitFeedback');
    let content = document.getElementById('awaitFeedbackBoard');
    content.innerHTML='';
    if(awaitFeedback.length == 0){
      content.innerHTML=`
      <div class="no-task-available">No tasks await Feedback</div>
      `
    }else{
    for(i=0; i<awaitFeedback.length;i++){
      let element = awaitFeedback[i];
      content.innerHTML +=`
      <div class="one-task-div" draggable="true" ondragstart="startDragging(${element['idNumber']})">
        <div class="category-div"><div class="category-div-child"id="categorySign-${element['idNumber']}">${element['category']}</div></div>
        <div>${element['title']}</div>
        <div>${element['description']}</div>
        <div>
            <div class="load-subtask-div"><div class="load-subtask" style="width:50%"></div></div>
            <div> 1/2-Subtasks</div>
        </div>
        <div class="assigned-persons-initals"id="assignedPerson-${element['idNumber']}"></div>
      </div>`;
      showAssignedPersonsInitial(element);
      categorySign(element);
    }}
}

function doneBoard(){
  let doneTask = tasks.filter(t => t['status'] == 'done');
    let content = document.getElementById('doneBoard');
    content.innerHTML='';
    if(doneTask.length == 0){
      content.innerHTML=`
      <div class="no-task-available">No tasks await Feedback</div>
      `
    }else{
      for(i=0; i<doneTask.length;i++){
        let element = doneTask[i];
        content.innerHTML +=`
        <div class="one-task-div" draggable="true" ondragstart="startDragging(${element['idNumber']})">
          <div class="category-div"><div class="category-div-child"id="categorySign-${element['idNumber']}">${element['category']}</div></div>
          <div>${element['title']}</div>
          <div>${element['description']}</div>
          <div>
              <div class="load-subtask-div"><div class="load-subtask" style="width:50%"></div></div>
              <div> 1/2-Subtasks</div>
          </div>
          <div class="assigned-persons-initals"id="assignedPerson-${element['idNumber']}"></div>
        </div>`;
        showAssignedPersonsInitial(element);
        categorySign(element);
    }}
}

function changeFillColor(){

}
function changeFillColorBack(){

}

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
 * Diese Funktion soll den Status anpassen
 * @param {*} category 
 */
async function moveTo(event) {
  let status = event.currentTarget.id.replace('Board', '');
  //mit event.currentTarget.id finden wir die id heraus, auf dem sich das gedropte element befindet.
  //da die Ids genauso wie die statuse heißen, nur mit Board am ende, wird board entfernt
    tasks[currentDraggedElement]['status'] = status;
    console.log('yes'+ tasks[currentDraggedElement]['status']);
    await putData(`/tasks/${tasks[currentDraggedElement]['id']}/status`, status);
    tasks=[];
    await loadTasks();
    todoBoard();
    inProgressBoard();
    awaitFeedbackBoard();
    doneBoard();
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