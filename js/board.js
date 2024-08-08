const urlParams = new URLSearchParams(window.location.search);
const msg = urlParams.get('msg');
if(msg){
    console.log(msg);
} 
let firebase_URL =
  "https://join-2-b992b-default-rtdb.europe-west1.firebasedatabase.app/";
let tasks =[];
let contacts=[];

async function initBoard() {
    await loadTasks();
    await loadContacts();
    todoBoard();
    inProgressBoard();
    awaitFeedbackBoard();
    doneBoard();
}
 
function todoBoard(){
    let content = document.getElementById('todoBoard');
    content.innerHTML='';
    for(i=0; i<tasks.length;i++){
      content.innerHTML +=`
      <div class="one-task-div">
        <div id="categorySign-${i}">${tasks[i]['category']}</div>
        <div>${tasks[i]['title']}</div>
        <div>${tasks[i]['description']}</div>
        <div>
            <div></div>
            <div> 0/0-Subtasks</div>
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