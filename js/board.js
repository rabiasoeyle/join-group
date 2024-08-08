const urlParams = new URLSearchParams(window.location.search);
const msg = urlParams.get('msg');
if(msg){
    console.log(msg);
} 
let firebase_URL =
  "https://join-2-b992b-default-rtdb.europe-west1.firebasedatabase.app/";
let tasks =[];

async function initBoard() {
    await loadTasks()
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
        <div>${tasks[i]['priority']}</div>
        <div>${tasks[i]['title']}</div>
        <div>${tasks[i]['description']}</div>
        <div>
            <div></div>
            <div> 0/0-Subtasks</div>
        </div>
        <div id="assignedPerson-${i}"></div>
      </div>`;
      showAssignedPersonsInitial(i);
    }
}

function showAssignedPersonsInitial(i){
  let persons = document.getElementById(`assignedPerson-${i}`);
  persons.innerHTML ='';
  assignedPersons = tasks[i]['assigned']
  for(j=0; j<assignedPersons.length; j++){
    persons.innerHTML +=`
    <div>${assignedPersons[j]['name']}</div>
    `;
  }

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