// const urlParams = new URLSearchParams(window.location.search);
// const msg = urlParams.get('msg');
// if(msg){
//     console.log(msg);
// } 
let firebase_URL =
  "https://join-2-b992b-default-rtdb.europe-west1.firebasedatabase.app/";
let tasks =[];
let contacts=[];
let currentDraggedElement;
let isTouchDevice = ('ontouchstart' in document.documentElement);
let idNumberStartValue = 0;
let checkedSubTaskNumber = 0;//vorerst ersatznummer für den eigentlichen wert;


/**
 * Diese Funktion dient dazu, um die benötigten Daten zu laden und zu rendern
 */
async function initBoard() {
    await loadTasks();
    await loadContacts();
    todoBoard();
    inProgressBoard();
    awaitFeedbackBoard();
    doneBoard();
}

/**
 * Diese Funktion dient zum filtern der Aufgaben.
 */
function filterTasks(){
  let searchBar = document.getElementById('searchBar');
  console.log('filter starten');
   // Suchbegriff bereinigen
   let searchQuery = searchBar.value.trim().toLowerCase();
  // Filter die Aufgaben, ohne das ursprüngliche tasks-Array zu überschreiben
  let filteredTasks = tasks.filter(task => task.title.toLowerCase().includes(searchQuery));
  console.log(filteredTasks)
  // Wenn du die gefilterten Aufgaben anzeigen möchtest, kannst du hier entsprechende Funktionen aufrufen
  todoBoard(filteredTasks);
  inProgressBoard(filteredTasks);
  awaitFeedbackBoard(filteredTasks);
  doneBoard(filteredTasks);
}

/**
 * Diese Funktion dient dazu die Initalien der zugeschriebenen Personen darzustellen
 * @param {*} element 
 */
function showAssignedPersonsInitial(element){
  let persons = document.getElementById(`assignedPerson-${element['idNumber']}`);
  persons.innerHTML ='';
  assignedPersons = element['assigned'];
  // Arrow-Funktion zum Filtern von Personen, die noch in den Kontakten existieren
  assignedPersons = assignedPersons.filter(assignedPerson => 
    contacts.some(contact => contact.name === assignedPerson.name)
);
  for(j=0; j<assignedPersons.length; j++){
    persons.innerHTML +=`
    <div class="initals-div-in-task"style="background-color:${assignedPersons[j]['color']}">${profileInitials(assignedPersons[j]['name'])}</div>`;
  }
   // Optional: Aktualisieren des 'assigned' Felds im Element, falls nötig
   element['assigned'] = assignedPersons;
}

/**
 * Diese Funktion soll die Hintergrundfarbe der div für die Kategorien je nach Kategorie ändern
 * @param {*} element 
 */
function categorySign(element){
  let category = document.getElementById(`categorySign-${element['idNumber']}`);
  if(element['category'] =='Technical Task'){
    category.style.backgroundColor = '#1FD7C1';
  }else if(element['category'] =='User Story'){
    category.style.backgroundColor ='#0038FF';
  }category.style.color = 'white';
}

/**
 * In dieser Funktion werden die Initialien der Kontakte rausgefiltert und wiedergegeben
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

/**
 * Diese Funktion dient zum toggeln des Menüs, wo die Staten in der responsive Ansicht geändert werden können.
 * @param {*} id 
 */
function changeStatusToggle(id){
  let menu = document.getElementById(`changeStatusMenu-${id}`);
  if (menu.style.display === "none" || menu.style.display === "") {
    menu.style.display = "flex";
} else {
    menu.style.display = "none";
}
}

/**
 * In dieser Funktion wird bei der jeweiligen Aufgabe der status im Firebase geändert.
 * @param {*} id 
 */
async function changeStatusPutData(id){
  await putData(`/tasks/${tasks[id]['id']}`, tasks[id]);
  tasks=[];
  await loadTasks();
  todoBoard();
  inProgressBoard();
  awaitFeedbackBoard();
  doneBoard()
}

/**
 *  In dieser Funktion wird bei der jeweiligen Aufgabe der status zu todo umgeändert.
 * @param {*} id 
 */
async function changeStatusToTodo(id){
  tasks[id]['status'] = "todo";
  changeStatusPutData(id);
}

/**
 *  In dieser Funktion wird bei der jeweiligen Aufgabe der status zu inProgress umgeändert.
 * @param {*} id 
 */
async function changeStatusToInProgress(id){
  tasks[id]['status'] = "inProgress";
  changeStatusPutData(id);
}

/**
 *  In dieser Funktion wird bei der jeweiligen Aufgabe der status zu awaitFeedback umgeändert.
 * @param {*} id 
 */
async function changeStatusToAwaitFeedback(id){
  tasks[id]['status'] = "awaitFeedback";
  changeStatusPutData(id);
}

/**
 * /**
 *  In dieser Funktion wird bei der jeweiligen Aufgabe der status zu done umgeändert.
 * @param {*} id 
 */
async function changeStatusToDone(id){
  tasks[id]['status'] = "done";
  changeStatusPutData(id);
}

/**
 * Diese Funktion soll die Tasks mit dem status todo rendern
 */
function todoBoard(filteredTasks){
  let status =[];
  if(filteredTasks && filteredTasks.length >= 1){
    status = filteredTasks.filter(t => t['status'] == 'todo');
  }else{
  status = tasks.filter(t => t['status'] == 'todo');
}
    let content = document.getElementById('todoBoard');
    content.innerHTML='';
    if(status.length==0){
      content.innerHTML=`
      <div class="no-task-available">No tasks To do</div>
      `
    }else{ 

      for(i=0; i<status.length;i++){
        let element = status[i]
        content.innerHTML += boardHTML(i, status)
        // / Überprüfen, ob Subtasks vorhanden sind
          if (element['subtaskList'] && element['subtaskList'].length > 0) {
            let result = parseInt((element.checkedSubtasksCount / element['subtaskList'].length) * 100);
            let subtaskContent = document.getElementById(`subtaskLoadboardAndText-${element['idNumber']}`);
            subtaskContent.innerHTML = `
                <div class="load-subtask-div"><div class="load-subtask" style="width:${result}%"></div></div>
                <div class="subtasks">${element.checkedSubtasksCount}/${element['subtaskList'].length} Subtasks</div>`;
                subtaskContent.classList.remove('d-none');
          }
        if(element['assigned']){
          showAssignedPersonsInitial(element);  
        }
        if(element['category']){
          categorySign(element);
        }
        if(element['priority']){
           prioritySign(element);
        }
        if(!element['category']){
          document.getElementById(`categorySign-${element['idNumber']}`).classList.add('d-none');
        }
        if(!element['description']){
          document.getElementById(`descriptionSign-${element['idNumber']}`).classList.add('d-none');
        }
    }}
}

/**
 * Diese Funktion soll die Tasks mit dem status inProgress rendern
 */
function inProgressBoard(filteredTasks){
  let status =[];
  if(filteredTasks && filteredTasks.length >= 1){
    status = filteredTasks.filter(t => t['status'] == 'inProgress');
  }else{
  status = tasks.filter(t => t['status'] == 'inProgress');
}
    let content = document.getElementById('inProgressBoard');
    content.innerHTML='';
    if(status.length == 0){
      content.innerHTML=`
      <div class="no-task-available">No tasks in Progress</div>
      `
    }else{
      for(i=0; i<status.length;i++){
        let element = status[i];
        content.innerHTML += boardHTML(i, status)
        // / Überprüfen, ob Subtasks vorhanden sind
          if (element['subtaskList'] && element['subtaskList'].length > 0) {
            let result = parseInt((element.checkedSubtasksCount / element['subtaskList'].length) * 100);
            let subtaskContent = document.getElementById(`subtaskLoadboardAndText-${element['idNumber']}`);
            subtaskContent.innerHTML = `
                <div class="load-subtask-div"><div class="load-subtask" style="width:${result}%"></div></div>
                <div class="subtasks">${element.checkedSubtasksCount}/${element['subtaskList'].length} Subtasks</div>`;
                subtaskContent.classList.remove('d-none');
              }
            if(element['assigned']){
            showAssignedPersonsInitial(element);  
            }
            if(element['category']){
              categorySign(element);
            }
            if(element['priority']){
               prioritySign(element);
            }
        if(!element['category']){
          document.getElementById(`categorySign-${element['idNumber']}`).classList.add('d-none');
        }
        if(!element['description']){
          document.getElementById(`descriptionSign-${element['idNumber']}`).classList.add('d-none');
        }
    }}
}

/**
 * Diese Funktion soll die Tasks mit dem status awaitFeedback rendern
 */
function awaitFeedbackBoard(filteredTasks){
  let status =[];
  if(filteredTasks && filteredTasks.length >= 1){
    status = filteredTasks.filter(t => t['status'] == 'awaitFeedback');
  }else{
  status = tasks.filter(t => t['status'] == 'awaitFeedback');
  }
    let content = document.getElementById('awaitFeedbackBoard');
    content.innerHTML='';
    if(status.length == 0){
      content.innerHTML=`
      <div class="no-task-available">No tasks await Feedback</div>
      `
    }else{
    for(i=0; i<status.length;i++){
      let element = status[i];
      content.innerHTML += boardHTML(i, status)
        // / Überprüfen, ob Subtasks vorhanden sind
          if (element['subtaskList'] && element['subtaskList'].length > 0) {
            let result = parseInt((element.checkedSubtasksCount / element['subtaskList'].length) * 100);
            let subtaskContent = document.getElementById(`subtaskLoadboardAndText-${element['idNumber']}`);
            subtaskContent.innerHTML = `
                <div class="load-subtask-div"><div class="load-subtask" style="width:${result}%"></div></div>
                <div class="subtasks">${element.checkedSubtasksCount}/${element['subtaskList'].length} Subtasks</div>`;
                subtaskContent.classList.remove('d-none');
              }
            if(element['assigned']){
            showAssignedPersonsInitial(element);  
            }
            if(element['category']){
              categorySign(element);
            }
            if(element['priority']){
               prioritySign(element);
            }
      if(!element['category']){
        document.getElementById(`categorySign-${element['idNumber']}`).classList.add('d-none');
      }
      if(!element['description']){
        document.getElementById(`descriptionSign-${element['idNumber']}`).classList.add('d-none');
    }
  }
  }
}

/**
 * Diese Funktion soll die Tasks mit dem status done rendern
 */
function doneBoard(filteredTasks){
  let status =[];
  if(filteredTasks && filteredTasks.length >= 1){
    status = filteredTasks.filter(t => t['status'] == 'done');
  }else{
  status = tasks.filter(t => t['status'] == 'done');
  }
    let content = document.getElementById('doneBoard');
    content.innerHTML='';
    if(status.length == 0){
      content.innerHTML=`
      <div class="no-task-available">No tasks await Feedback</div>
      `
    }else{
      for(i=0; i<status.length;i++){
        let element = status[i];
        if(element['subtaskList']){
          let result = parseInt((element.checkedSubtasksCount/element['subtaskList'].length)*100);
        }
        content.innerHTML += boardHTML(i, status)
        // / Überprüfen, ob Subtasks vorhanden sind
          if (element['subtaskList'] && element['subtaskList'].length > 0) {
            let result = parseInt((element.checkedSubtasksCount / element['subtaskList'].length) * 100);
            let subtaskContent = document.getElementById(`subtaskLoadboardAndText-${element['idNumber']}`);
            subtaskContent.innerHTML = `
                <div class="load-subtask-div"><div class="load-subtask" style="width:${result}%"></div></div>
                <div class="subtasks">${element.checkedSubtasksCount}/${element['subtaskList'].length} Subtasks</div>`;
                subtaskContent.classList.remove('d-none');
              }
            if(element['assigned']){
            showAssignedPersonsInitial(element);  
            }
            if(element['category']){
              categorySign(element);
            }
            if(element['priority']){
               prioritySign(element);
            }
        if(!element['category']){
          document.getElementById(`categorySign-${element['idNumber']}`).classList.add('d-none');
        }
        if(!element['description']){
          document.getElementById(`descriptionSign-${element['idNumber']}`).classList.add('d-none');}
    }}
    
}


/**
 * Diese Funktion sorgt dafür, dass je nach priority, die richtige svg gerendert wird
 * @param {*} element 
 */
function prioritySign(element){
  let priority = document.getElementById(`prioritySVG-${element['idNumber']}`);
  if(element['priority']=="urgent"){
    priority.innerHTML= prioUrgentHTML()
  }else
  if(element['priority']=="medium"){
    priority.innerHTML = prioMediumHTML()
  }else
  if(element['priority']=="low")
    priority.innerHTML = prioLowHTML()
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

/**
 * Diese Funktion sorgt dafür, dass eine zufällige Farbe erstellt wird
 * @returns 
 */
function getRandomColor() {
  const letters = '0123456789ABCDEF';//jederBuchstabe des Farbstrings
  let color = '#';
  for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function cancelAddingBoard(){
  nameValue = "";
  emailValue = "";
  numberValue = "";
  let overlay = document.getElementById('atOaddTaskOverlayParent');
  overlay.classList.add("d-none");
  overlay.classList.remove("d-flex");
}
