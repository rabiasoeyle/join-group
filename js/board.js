let firebase_URL =
  "https://join-2-b992b-default-rtdb.europe-west1.firebasedatabase.app/";
let tasks =[];
let contacts=[];
let currentDraggedElement;
let isOverlayOpen = true;
let idNumberStartValue = 0;
let checkedSubTaskNumber = 0;//vorerst ersatznummer für den eigentlichen wert;


/**
 * This function is used to load and render the required data
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
 * This feature filters the tasks based on the search term.
 */
function filterTasks() {
  let searchBar = document.getElementById('searchBar');
  let searchQuery = searchBar.value.trim().toLowerCase();
  let clearButton = document.getElementById('clearSearch');
  if (searchQuery.length < 3) {
      todoBoard();
      inProgressBoard();
      awaitFeedbackBoard();
      doneBoard();
  } else {
      let filteredTasks = tasks.filter(task =>
          task.title.toLowerCase().includes(searchQuery) ||
          (task.description && task.description.toLowerCase().includes(searchQuery))
      );
      elseFilterTasks(filteredTasks);
  }
}

/**
 * This function is used to render the status fields with the filtered tasks.
 * @param {*} filteredTasks 
 */
function elseFilterTasks(filteredTasks){
    todoBoard(filteredTasks);
    inProgressBoard(filteredTasks);
    awaitFeedbackBoard(filteredTasks);
    doneBoard(filteredTasks);
}

/**
* This function resets the search.
*/
function clearSearch() {
  let searchBar = document.getElementById('searchBar');
  searchBar.value = ""; // Suchfeld leeren
  filterTasks(); // Alle Aufgaben wieder anzeigen
}

/**
 * Diese Funktion dient dazu die Initalien der zugeschriebenen Personen darzustellen
 * @param {*} element 
 */
function showAssignedPersonsInitial(element){
  let persons = document.getElementById(`assignedPerson-${element['idNumber']}`);
  persons.innerHTML ='';
  let assignedPersons = element['assigned'];
  assignedPersons = assignedPersons.filter(assignedPerson => contacts.some(contact => contact.name === assignedPerson.name));
  for(j=0; j < Math.min(assignedPersons.length, 4); j++){
    persons.innerHTML += showAssignedPersonsInitialHTMLOne(assignedPersons);
  }
  if(assignedPersons.length>4){
    persons.innerHTML += showAssignedPersonsInitialHTMLTwo(assignedPersons);
  }
  element['assigned'] = assignedPersons;
}

/**
 * This function is intended to change the background color of the categories div depending on the category
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
 * In this function, the initials of the contacts are filtered out and played back
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
 * This function is used to toggle the menu, where the states can be changed in the responsive view.
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
 * In this function, the status in the Firebase is changed for the respective task.
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
 *  In this function, the status of the respective task is changed to todo.
 * @param {*} id 
 */
async function changeStatusToTodo(id){
  tasks[id]['status'] = "todo";
  changeStatusPutData(id);
}

/**
 *  In this function, the status of the respective task is changed to inProgress.
 * @param {*} id 
 */
async function changeStatusToInProgress(id){
  tasks[id]['status'] = "inProgress";
  changeStatusPutData(id);
}

/**
 *  In this function, the status of the respective task is changed to awaitFeedback.
 * @param {*} id 
 */
async function changeStatusToAwaitFeedback(id){
  tasks[id]['status'] = "awaitFeedback";
  changeStatusPutData(id);
}

/**
 * /**
 *  In this function, the status of the respective task is changed to done.
 * @param {*} id 
 */
async function changeStatusToDone(id){
  tasks[id]['status'] = "done";
  changeStatusPutData(id);
}

/**
 * This function is intended to render the tasks with the status todo
 */
function todoBoard(filteredTasks){
  let status =[];
  if(filteredTasks && filteredTasks.length >= 1){
    status = filteredTasks.filter(t => t['status'] == 'todo');
  }else{
  status = tasks.filter(t => t['status'] == 'todo');}
    let content = document.getElementById('todoBoard');
    content.innerHTML='';
    if(status.length==0){
      content.innerHTML= todoBoardHTMLOne();
    }else{ 
      for(i=0; i<status.length;i++){
        content.innerHTML += boardHTML(i, status);
        elseForBoardInfo(status, i);
    }}
}

/**
 * This function describes the case of what happens when tasks are in this status.
 * @param {*} status 
 * @param {*} i 
 */
function elseForBoardInfo(status, i){
  let element = status[i]
  if (element['subtaskList'] && element['subtaskList'].length > 0) {
      let result = parseInt((element.checkedSubtasksCount / element['subtaskList'].length) * 100);
      let subtaskContent = document.getElementById(`subtaskLoadboardAndText-${element['idNumber']}`);
      subtaskContent.innerHTML = subtaskListHTML(status, i, result);
      subtaskContent.classList.remove('d-none');
    }
    if(element['assigned']){
    showAssignedPersonsInitial(element);  
  }
  elseForBoardInfoAfterAssignedPersons(status, i);
}

/**
 * This function describes the case of what happens when tasks are in this status. -continuation
 * @param {*} status 
 * @param {*} i 
 */
function elseForBoardInfoAfterAssignedPersons(status, i){
  let element = status[i];
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

/**
 * This function is intended to render the tasks with the status in Progress.
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
      content.innerHTML= inProgressBoardHTMLOne();
    }else{
      for(i=0; i<status.length;i++){
        content.innerHTML += boardHTML(i, status)
        elseForBoardInfo(status, i);
    }}
}

/**
 * This function is intended to render the tasks with the status awaitFeedback.
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
      content.innerHTML= awaitFeedbackBoardHTMLOne()
    }else{
    for(i=0; i<status.length;i++){
      content.innerHTML += boardHTML(i, status);
      elseForBoardInfo(status, i);
  }
  }
}

/**
 * This function is intended to render the tasks with the status done.
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
      content.innerHTML=doneBoardHTMLOne();
    }else{
      for(i=0; i<status.length;i++){
        content.innerHTML += boardHTML(i, status);
        elseForBoardInfo(status,i);
    }}
    
}

/**
 * This function ensures that the correct svg is rendered depending on the priority.
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
 * Is called as soon as you start grab the container.
 * The ID should be defined globally so that you can insert it into the next field.
 * @param {*} id 
 */
function startDragging(id) {
    currentDraggedElement = id;
    rotateCard(id); 
}

/**
 * This function is called when dragging ends.
 * @param {*} id 
 */
function endDragging(id) {
   rotateCard(id); // Karte zurückdrehen beim Beenden des Drag-Vorgangs
}

/**
 * This function is used to rotate the card while it is grabbed.
 * @param {*} id 
 */
function rotateCard(id) {
  const element = document.getElementById(`oneTaskDiv-${id}`);
  if (element) {
      element.classList.toggle('rotate-card');
  } else {
      console.error(`Element mit ID ${id} wurde nicht gefunden.`);
  }
}

/**
 * This function is intended to allow the element to go outside of the div.
 * @param {*} ev 
 */
function allowDrop(ev) {
    ev.preventDefault();
}

/**
 * This function is intended to adjust the status.
 * @param {*} category 
 */
async function moveTo(event) {
    let status = event.currentTarget.id.replace('Board', '');
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
 * This function is used to highlight the corresponding field
 * @param {*} id 
 */
function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}

/**
 * This function is used to remove highlights.
 * @param {*} id 
 */
function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}

/**
 * This function ensures that a random color is created.
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
