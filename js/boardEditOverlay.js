/**
 * Diese Funktion dient zum rendern des Edit Overlays der Aufgaben
 * @param {*} i 
 */
function openEditTaskOverlay(i){
    let editTaskOverlayContent = document.getElementById('editTaskOverlayContent');
    editTaskOverlayContent.classList.remove('edit-task-overlay-content');
    editTaskOverlayContent.classList.add('edit-task-overlay-edit');
    editTaskOverlayContent.innerHTML='';
    editTaskOverlayContent.innerHTML= openEditTaskOverlayHTML(i);
    if(tasks[i]['priority']){
         colorOfPriority(i);
    }else{
        noChosenPriority(i);
    }if(tasks[i]['subtaskList']){
        renderAllAvaillableSubtasks(i);
    }if(tasks[i]['assigned']){
        editOvShowAssignedPersons(i);
    }
}

/**
 * Diese Funktion soll das aktuelle Datum holen und im Inputfeld min einstellen.
 */
function setMinDate(i){
    // Hole das heutige Datum
    let today = new Date().toISOString().split('T')[0];
    // Setze das min-Attribut auf das heutige Datum
    document.getElementById(`editOverlayDueDate-${i}`).setAttribute('min', today);
}

/**
 * Diese Funktion fügt die passenden Klassen für die PriorityButtons hinzu, wenn keine Priorität vorliegt
 */
function noChosenPriority(){
    let urgent = document.getElementById('urgentButtonOverlay');
    let medium = document.getElementById('mediumButtonOverlay');
    let low = document.getElementById('lowButtonOverlay');
    let urgentSVG = document.getElementById('svgUrgentPrio');
    let mediumSVG = document.getElementById('svgMediumPrio');
    let lowSVG = document.getElementById('svgLowPrio');
        urgentSVG.classList.add('svgUrgentPrio');
        mediumSVG.classList.add('svgMediumPrio');
        lowSVG.classList.add('svgLowPrio');
        urgent.classList.add('urgentPrio');
        medium.classList.add('mediumPrio');
        low.classList.add('lowPrio');
}

/**
 * Diese Funktion dient dazu im Overlay neue subtasks hinzufügen zu können.
 * @param {*} i 
 */
function editAddSubtask(i){
    let subtask = document.getElementById(`subtaskInput-${i}`).value.trim();
    if (subtask) {
        // Initialisiere subtaskList, falls es nicht existiert
    if (!tasks[i].hasOwnProperty('subtaskList') || !Array.isArray(tasks[i]['subtaskList'])) {
        tasks[i]['subtaskList'] = [];
    }
        tasks[i]['subtaskList'].push(subtask);
        document.getElementById(`subtaskInput-${i}`).value = "";
    }
    renderAllAvaillableSubtasks(i);
}

/**
 * Diese Funktion dient dazu, dass alle Subtasks der Task gerendert werden
 * @param {*} i 
 */
function renderAllAvaillableSubtasks(i){
    let subtaskListDiv= document.getElementById('editOverlaySubtaskList');
    subtaskListDiv.innerHTML='';
    for(j=0; j<tasks[i]['subtaskList'].length; j++){
        subtaskListDiv.innerHTML +=renderAllAvaillableSubtasksHTML(i, j)
    }
}

/**
 * Diese Funktion soll den onmouseover effekt wieder mit onmouseout rückgängig machen.(Bei den Subtasks)
 * @param {*} i 
 */
function editSubtaskNoHoverEffekt(j){
    let trashAndEdit = document.getElementById(`editEditAndTrash-${j}`);
    trashAndEdit.classList.add('d-none');
}

/**
 * Diese Funktion soll den onmouseover effekt hinzufügen.(Bei den Subtasks)
 * @param {*} i 
 */
function editSubtaskHoverEffekt(j){
    let trashAndEdit = document.getElementById(`editEditAndTrash-${j}`);
    trashAndEdit.classList.remove('d-none');
}
/**
 * Mit dieser Funktion soll man die Subtask an genau der entsprechenden stelle ändern können.
 * @param {*} i 
 */
function editEditSubtask(i ,j ){
    let subtaskListText = document.getElementById(`editSubtaskListText-${i}-${j}`);
    subtaskListText.classList.add('d-none');
    let editInput = document.getElementById(`editInput-${j}-${i}`);
    editInput.classList.remove('d-none');
    let editAndTrash = document.getElementById(`editEditAndTrash-${j}`);
    editAndTrash.innerHTML='';
    editAndTrash.innerHTML= `
    <img src="../assets/img/deleteTask.png" id="leftImage-${j}" onclick="editOverlayDeleteSubtask(${i},${j})">
    |
    <img src="../assets/img/checkTask.png" id="rightImage-${j}" onclick="saveChangedSubtask(${j},${i})">
    `
}

/**
 * Durch Aktivierung dieser Funktion können Änderungen an Unteraufgaben gespeichert werden.
 * @param {*} i 
 */
function saveChangedSubtask(j,i){
    let editInput = document.getElementById(`editInput-${j}-${i}`).value.trim();
    tasks[i]['subtaskList'].splice(j,1, editInput);
    renderAllAvaillableSubtasks(i);
}

/**
 * Diese Funktion dient zum Löschen von subtasks.
 * @param {*} i 
 */
function editOverlayDeleteSubtask(i,j){
    if (tasks[i]['checkedSubtasks']){
        let index = tasks[i]['checkedSubtasks'].indexOf(tasks[i]['subtaskList'][j]);
    if(index !=-1){
        tasks[i]['checkedSubtasks'].splice(index,1);
    }}
    tasks[i]['checkedSubtasksCount']= tasks[i]['checkedSubtasks'].length;
    tasks[i]['subtaskList'].splice(j,1);
    renderAllAvaillableSubtasks(i);
}

/**Diese Funktion soll den Wert für die Wichtigkeit abspeichern */
function selectPrio(i,x){
    let urgent = document.getElementById('urgentButtonOverlay');
    let medium = document.getElementById('mediumButtonOverlay');
    let low = document.getElementById('lowButtonOverlay');
    let urgentSVG = document.getElementById('svgUrgentPrio');
    let mediumSVG = document.getElementById('svgMediumPrio');
    let lowSVG = document.getElementById('svgLowPrio');
    if(x =='urgent'){
        urgentSVG.classList.add('svg-prio-click');
        urgentSVG.classList.remove('svgUrgentPrio');
        mediumSVG.classList.remove('svg-prio-click');
        mediumSVG.classList.add('svgMediumPrio');
        lowSVG.classList.remove('svg-prio-click');
        lowSVG.classList.add('svgLowPrio');
        urgent.classList.add('urgentPrio_click');
        urgent.classList.remove('urgentPrio');
        medium.classList.add('mediumPrio');
        medium.classList.remove('mediumPrio_click');
        low.classList.add('lowPrio');
        low.classList.remove('lowPrio_click');
    }else if(x =='medium'){
        urgentSVG.classList.remove('svg-prio-click');
        urgentSVG.classList.add('svgUrgentPrio');
        mediumSVG.classList.add('svg-prio-click');
        mediumSVG.classList.remove('svgMediumPrio');
        lowSVG.classList.remove('svg-prio-click');
        lowSVG.classList.add('svgLowPrio');
        urgent.classList.add('urgentPrio');
        urgent.classList.remove('urgentPrio_click');
        medium.classList.add('mediumPrio_click');
        medium.classList.remove('mediumPrio');
        low.classList.add('lowPrio');
        low.classList.remove('lowPrio_click');
    }else if(x =='low'){
        urgentSVG.classList.remove('svg-prio-click');
        urgentSVG.classList.add('svgUrgentPrio');
        mediumSVG.classList.remove('svg-prio-click');
        mediumSVG.classList.add('svgMediumPrio');
        lowSVG.classList.add('svg-prio-click');
        lowSVG.classList.remove('svgLowPrio');
        urgent.classList.add('urgentPrio');
        urgent.classList.remove('urgentPrio_click');
        medium.classList.add('mediumPrio');
        medium.classList.remove('mediumPrio_click');
        low.classList.add('lowPrio_click');
        low.classList.remove('lowPrio');
    }
    tasks[i]['priority'] = x;
}

/**
 * Diese Funktion dient dazu, dass beim laden des edit Overlays bereits eine Farbe bei der bereits bekannten prio ist.
 * @param {*} i 
 */
function colorOfPriority(i){
    let prio = tasks[i]['priority'];
    let urgent = document.getElementById('urgentButtonOverlay');
    let medium = document.getElementById('mediumButtonOverlay');
    let low = document.getElementById('lowButtonOverlay');
    if(prio){
    if(prio == "urgent"){
        urgent.classList.add('urgentPrio_click');
        urgent.classList.remove('urgentPrio');
        medium.classList.add('svgMediumPrio');
        low.classList.add('svgLowPrio');
    }else if(prio =="medium"){
        medium.classList.add('mediumPrio_click');
        medium.classList.remove('mediumPrio');
        urgent.classList.add('svgUrgentPrio');
        low.classList.add('svgLowPrio');
    }else if(prio == "low"){
        low.classList.add('lowPrio_click');
        low.classList.remove('svglowPrio');
        medium.classList.add('svgMediumPrio');
        urgent.classList.add('svgUrgentPrio');
    }}else{}
}

/**
 * In dieser Funktion soll der Titel geändert und gespeichert werden.
 * @param {*} i 
 */
function changeTitle(i){
 let editTaskOverlayTitle = document.getElementById(`editTaskOverlayTitle-${i}`).value.trim();
 tasks[i]['title'] =  editTaskOverlayTitle;
}

/**
 * In dieser Funktion soll die Description geändert werden können.
 * @param {*} i 
 */
function changeDescription(i){
    let editTaskOverlayDescription = document.getElementById(`editTaskOverlayDescription-${i}`).value.trim();
    tasks[i]['description'] = editTaskOverlayDescription;
}

/**
 * In dieser Funktion soll das Datum geändert werden.
 * @param {*} i 
 */
function changeDueDate(i){
    let editOverlayDueDate = document.getElementById(`editOverlayDueDate-${i}`).value;
    tasks[i]['dueDate']= editOverlayDueDate;
}

/**
 * Diese Funktion dient dazu bei onclick die Liste der Kontakte mit den Initialien und der Checkbox zu rendern.
 */
function rollContactsListEdit(i){
    let assignContactsList = document.getElementById(`edit-assignContactsList-${i}`);
    assignContactsList.classList.toggle('d-none');
    assignContactsList.innerHTML='';
    for(j=0; j<contacts.length; j++){
        // let isChecked = tasks[i]['assigned'].includes(contacts[j]['name']) ? 'checked' : '';
        if (tasks[i]['assigned']) {
            isChecked = tasks[i]['assigned'].some(person => person.name === contacts[j]['name']) ? 'checked' : '';
        }
        assignContactsList.innerHTML += /*html*/ `
            <div class="one-person-div-edit" onclick="editAddAssignedPersons(${j}, ${i})" id="onePersonDivEdit-${j}">
                <div class="one-person-div-edit-left">
                    <div class="assigned-person-initials-edit" style="background-color:${contacts[j]['color']}; color:white">${profileInitials(contacts[j]['name'])}</div>
                    <div>${contacts[j]['name']}</div>
                </div>
                <input id="editInputCheckbox-${j}" class="assigen_checkbox" type="checkbox" ${isChecked}>
            </div>`;
            let input= document.getElementById(`editInputCheckbox-${j}`);
            if(input.checked){
                document.getElementById(`onePersonDivEdit-${j}`).style.backgroundColor = "#2a3647";
                document.getElementById(`onePersonDivEdit-${j}`).style.color = "white";
            }
}
}

/**
 * Diese Funktion soll die Div Container für die Initalien der ausgewählten Personen rendern.
 * @param {*} i 
 */
function editOvShowAssignedPersons(i) {
    let showAssignedPersons = document.getElementById(`showAssignedPersonInitial-${i}`);
    showAssignedPersons.innerHTML='';
    for(j=0;j<Math.min(tasks[i]['assigned'].length, 5);j++){
        showAssignedPersons.innerHTML += `
        <div style="background-color:${tasks[i]['assigned'][j]['color']}; color:white" class="selected-person-initals-div">${editAssignedPersonsInitials(i, j)}</div>`;
}
if(tasks[i]['assigned'].length>5){
    showAssignedPersons.innerHTML+= `
    <div style="background-color:white; color:black" class="selected-person-initals-div">+${tasks[i]['assigned'].length-5}</div>`;
}
} 

/**
 * Diese Funktion rendert die initalien der ausgewählten Personen
 * @param {*} i 
 * @param {*} j 
 * @returns 
 */
function editAssignedPersonsInitials(i,j){
    let names = tasks[i]['assigned'][j].name.split(" "),
      initialsAssignedPersons = names[0].substring(0, 1).toUpperCase();
    if (names.length > 1) {
        initialsAssignedPersons += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initialsAssignedPersons;
}

/**
 * In dieser Funktion werden Personen zur Task hinzugefügt.
 * @param {*} j 
 * @param {*} i 
 */
function editAddAssignedPersons(j, i){
    if (!tasks[i].hasOwnProperty('assigned') || !Array.isArray(tasks[i]['assigned'])) {
        tasks[i]['assigned'] = [];
    }
     // Referenz zur Checkbox abrufen
     let checkbox = document.getElementById(`editInputCheckbox-${j}`);
    checkbox.checked =!checkbox.checked
    // Der Kontakt, der zugewiesen oder entfernt werden soll
    let contact = contacts[j];
    if (checkbox.checked) {
        document.getElementById(`onePersonDivEdit-${j}`).style.backgroundColor = "#2a3647";
        document.getElementById(`onePersonDivEdit-${j}`).style.color = "white";
        // Überprüfen, ob der Kontakt bereits zugewiesen ist
        let alreadyAssigned = tasks[i]['assigned'].some(person => person.name === contact.name);
        if (!alreadyAssigned) {
            tasks[i]['assigned'].push(contact);
        }
    } else {
        // Entferne den Kontakt aus dem assigned-Array
        tasks[i]['assigned'] = tasks[i]['assigned'].filter(person => person.name !== contact.name);
        document.getElementById(`onePersonDivEdit-${j}`).style.backgroundColor = "white";
        document.getElementById(`onePersonDivEdit-${j}`).style.color = "black";
        // checkbox.checked = false;
    }
    editOvShowAssignedPersons(i);
    saveNewAssignedPerson(i);
    showAssignedPersonsInitial(tasks[i]);
}

/**
 * Diese Funktion dient dazu, die Profilinitalien der Kontakte zu erstellen.
 * @param {*} i 
 * @returns 
 */
function editOverlayProfileInitials(i){
    let names = contacts[i]['name'].split(" "),
    initials = names[0].substring(0, 1).toUpperCase();
  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
}

// function closeContactsList(event){
//     let assignContactsList = document.getElementById(`edit-assignContactsList-${i}`);
//     assignContactsList.classList.toggle('d-none');
// }

/**
 * Dies ist die abschließende Speicherfunktion beim Edit-Overlay, die dafür sorgt, dass alle bisher geänderten Infos auch gespeichert werden.
 * @param {*} i 
 */
async function saveTasksChanges(i){
    changeTitle(i);
    changeDescription(i);
    changeDueDate(i);
    await putData(`/tasks/${tasks[i]['id']}`, tasks[i]);
    tasks=[];
    await loadTasks();
    todoBoard();
    inProgressBoard();
    awaitFeedbackBoard();
    doneBoard();
    openDetailedTaskOverlay(i);
}

async function saveNewAssignedPerson(i){
    await putData(`/tasks/${tasks[i]['id']}`, tasks[i]);
    tasks=[];
    await loadTasks();
}