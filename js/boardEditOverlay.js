/**
 * This function is used to render the edit overlay of the tasks.
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
 * This function should get the current date and set min in the input field.
 */
function setMinDate(i){
    let today = new Date().toISOString().split('T')[0];
    document.getElementById(`editOverlayDueDate-${i}`).setAttribute('min', today);
}

/**
 * This function adds the appropriate classes for the PriorityButtons when there is no priority.
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
 * This function is used to add new subtasks to the overlay.
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
 * This function is used to render all subtasks of the task.
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
 * This function is intended to undo the onmouseover effect with onmouseout. (For the subtasks)
 * @param {*} i 
 */
function editSubtaskNoHoverEffekt(j){
    let trashAndEdit = document.getElementById(`editEditAndTrash-${j}`);
    trashAndEdit.classList.add('d-none');
}

/**
 * This function is intended to add the onmouseover effect. (For the subtasks)
 * @param {*} i 
 */
function editSubtaskHoverEffekt(j){
    let trashAndEdit = document.getElementById(`editEditAndTrash-${j}`);
    trashAndEdit.classList.remove('d-none');
}
/**
 * With this function you should be able to change the subtask at exactly the appropriate place.
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
 * Enabling this feature allows changes to subtasks to be saved.
 * @param {*} i 
 */
function saveChangedSubtask(j,i){
    let editInput = document.getElementById(`editInput-${j}-${i}`).value.trim();
    tasks[i]['subtaskList'].splice(j,1, editInput);
    renderAllAvaillableSubtasks(i);
}

/**
 * This function is used to delete subtasks.
 * @param {*} i 
 */
function editOverlayDeleteSubtask(i,j){
    if (tasks[i]['checkedSubtasks']){
        let index = tasks[i]['checkedSubtasks'].indexOf(tasks[i]['subtaskList'][j]);
    if(index !=-1){
        tasks[i]['checkedSubtasks'].splice(index,1);
    }tasks[i]['checkedSubtasksCount']= tasks[i]['checkedSubtasks'].length;
}
    tasks[i]['subtaskList'].splice(j,1);
    renderAllAvaillableSubtasks(i);
}

/**
 * This function is intended to save the value for the priority and add or remove the classes accordingly.
 * @param {*} i 
 * @param {*} x 
 */
function selectPrio(i,x){
    let urgent = document.getElementById('urgentButtonOverlay');
    let medium = document.getElementById('mediumButtonOverlay');
    let low = document.getElementById('lowButtonOverlay');
    let urgentSVG = document.getElementById('svgUrgentPrio');
    let mediumSVG = document.getElementById('svgMediumPrio');
    let lowSVG = document.getElementById('svgLowPrio');
    if(x =='urgent'){
        selectPrioUrgent(urgentSVG, mediumSVG,lowSVG, urgent, medium, low);
    }else if(x =='medium'){
        selectPrioMedium(urgentSVG, mediumSVG,lowSVG, urgent, medium, low);
    }else if(x =='low'){
        selectPrioLow(urgentSVG, mediumSVG,lowSVG, urgent, medium, low);
    }
    tasks[i]['priority'] = x;
}

/**
 * This function adds or removes the classes in the priority button.
 * @param {*} urgentSVG 
 * @param {*} mediumSVG 
 * @param {*} lowSVG 
 * @param {*} urgent 
 * @param {*} medium 
 * @param {*} low 
 */
function selectPrioUrgent(urgentSVG, mediumSVG,lowSVG, urgent, medium, low){
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
}

/**
 * This function adds or removes the classes in the priority button.
 * @param {*} urgentSVG 
 * @param {*} mediumSVG 
 * @param {*} lowSVG 
 * @param {*} urgent 
 * @param {*} medium 
 * @param {*} low 
 */
function selectPrioMedium(urgentSVG, mediumSVG,lowSVG, urgent, medium, low){
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
}

/**
 * This function adds or removes the classes in the priority button.
 * @param {*} urgentSVG 
 * @param {*} mediumSVG 
 * @param {*} lowSVG 
 * @param {*} urgent 
 * @param {*} medium 
 * @param {*} low 
 */
function selectPrioLow(urgentSVG, mediumSVG,lowSVG, urgent, medium, low){
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

/**
 * This function ensures that when the edit overlay is loaded, a color is already at the known priority.
 * @param {*} i 
 */
function colorOfPriority(i){
    let prio = tasks[i]['priority'];
    let urgent = document.getElementById('urgentButtonOverlay');
    let medium = document.getElementById('mediumButtonOverlay');
    let low = document.getElementById('lowButtonOverlay');
    if(prio){
    if(prio == "urgent"){
        colorOfPriorityUrgent( urgent, medium, low);  
    }else if(prio == "low"){
        colorOfPriorityLow(urgent, medium, low);
    }else{
        prio = "medium";
        colorOfPriorityMedium(urgent, medium, low);
    }}
}

/**
 * This function adds or removes the classes in the priority button.
 * @param {*} urgent 
 * @param {*} medium 
 * @param {*} low 
 */
function colorOfPriorityUrgent(urgent, medium, low){
    urgent.classList.add('urgentPrio_click');
    urgent.classList.remove('urgentPrio');
    medium.classList.add('svgMediumPrio');
    low.classList.add('svgLowPrio');
}

/**
 * This function adds or removes the classes in the priority button.
 * @param {*} urgent 
 * @param {*} medium 
 * @param {*} low 
 */
function colorOfPriorityLow(urgent, medium, low){
    low.classList.add('lowPrio_click');
    low.classList.remove('svglowPrio');
    medium.classList.add('svgMediumPrio');
    urgent.classList.add('svgUrgentPrio');
}

/**
 * This function adds or removes the classes in the priority button.
 * @param {*} urgent 
 * @param {*} medium 
 * @param {*} low 
 */
function colorOfPriorityMedium(urgent, medium, low){
    medium.classList.add('mediumPrio_click');
    medium.classList.remove('mediumPrio');
    urgent.classList.add('svgUrgentPrio');
    low.classList.add('svgLowPrio');
}

/**
 * In this function the title should be changed and saved.
 * @param {*} i 
 */
function changeTitle(i){
 let editTaskOverlayTitle = document.getElementById(`editTaskOverlayTitle-${i}`).value.trim();
 tasks[i]['title'] =  editTaskOverlayTitle;
}

/**
 * In this function the description should be able to be changed.
 * @param {*} i 
 */
function changeDescription(i){
    let editTaskOverlayDescription = document.getElementById(`editTaskOverlayDescription-${i}`).value.trim();
    tasks[i]['description'] = editTaskOverlayDescription;
}

/**
 * In this function the date should be changed.
 * @param {*} i 
 */
function changeDueDate(i){
    let editOverlayDueDate = document.getElementById(`editOverlayDueDate-${i}`).value;
    tasks[i]['dueDate']= editOverlayDueDate;
}

/**
 * This function is used to render the list of contacts with the initials and the checkbox on onclick.
 */
function rollContactsListEdit(i){
    let assignContactsList = document.getElementById(`edit-assignContactsList-${i}`);
    assignContactsList.classList.toggle('d-none');
    assignContactsList.innerHTML='';
    for(j=0; j<contacts.length; j++){
        if (tasks[i]['assigned']) {
        ifRollContactsListEdit(i, j, assignContactsList);}
        else{
        elseRollContactsListEdit(i,j , assignContactsList);}}
}

/**
 * This function should be carried out when the priority has already been determined.
 * @param {*} i 
 * @param {*} j 
 * @param {*} assignContactsList 
 */
function ifRollContactsListEdit(i, j , assignContactsList){
    isChecked = tasks[i]['assigned'].some(person => person.name === contacts[j]['name']) ? 'checked' : '';
    assignContactsList.innerHTML += /*html*/ `
        <div class="one-person-div-edit" onclick="editAddAssignedPersons(${j}, ${i})" id="onePersonDivEdit-${j}">
            <div class="one-person-div-edit-left">
                <div class="assigned-person-initials-edit" style="background-color:${contacts[j]['color']}; color:white">${profileInitials(contacts[j]['name'])}</div>
                <div>${contacts[j]['name']}</div>
            </div>
            <input id="editInputCheckbox-${j}" class="assigen_checkbox" type="checkbox" ${isChecked}>
            <label for="editInputCheckbox-${i}"></label>
        </div>`;
    let input= document.getElementById(`editInputCheckbox-${j}`);
    if(input.checked){
        document.getElementById(`onePersonDivEdit-${j}`).style.backgroundColor = "#2a3647";
        document.getElementById(`onePersonDivEdit-${j}`).style.color = "white";
    }
}

/**
 * This function should be carried out if the priority has not yet been determined.
 * @param {*} i 
 * @param {*} j 
 * @param {*} assignContactsList 
 */
function elseRollContactsListEdit(i,j, assignContactsList){
    assignContactsList.innerHTML += /*html*/ `
    <div class="one-person-div-edit" onclick="editAddAssignedPersons(${j}, ${i})" id="onePersonDivEdit-${j}">
        <div class="one-person-div-edit-left">
            <div class="assigned-person-initials-edit" style="background-color:${contacts[j]['color']}; color:white">${profileInitials(contacts[j]['name'])}</div>
            <div>${contacts[j]['name']}</div>
        </div>
        <input id="editInputCheckbox-${j}" class="assigen_checkbox" type="checkbox">
        <label for="inputCheckbox-${i}"></label>
    </div>`;
}

/**
 * This function is intended to render the div containers for the initials of the selected people.
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
 * This function renders the initials of the selected people.
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
 * In this function, people are added to the task.
 * @param {*} j 
 * @param {*} i 
 */
function editAddAssignedPersons(j, i){
    if (!tasks[i].hasOwnProperty('assigned') || !Array.isArray(tasks[i]['assigned'])) {
        tasks[i]['assigned'] = [];
    }
    let checkbox = document.getElementById(`editInputCheckbox-${j}`);
    checkbox.checked =!checkbox.checked
    let contact = contacts[j];
    if (checkbox.checked) {
        ifCheckboxIsCheckedEditAssignedPersons(i, j, contact);
    } else {
        ifCheckboxNotCheckedEditAssignedPersons(i, j, contact);
    }
    editOvShowAssignedPersons(i);
    saveNewAssignedPerson(i);
    showAssignedPersonsInitial(tasks[i]);
}

/**
 * This function is intended to describe what happens when the checkbox is checked.
 * @param {*} i 
 * @param {*} j 
 * @param {*} contact 
 */
function ifCheckboxIsCheckedEditAssignedPersons(i, j, contact){
    document.getElementById(`onePersonDivEdit-${j}`).style.backgroundColor = "#2a3647";
    document.getElementById(`onePersonDivEdit-${j}`).style.color = "white";
    let alreadyAssigned = tasks[i]['assigned'].some(person => person.name === contact.name);
    if (!alreadyAssigned) {
        tasks[i]['assigned'].push(contact);
    }
}

/**
 * This function is intended to describe what happens when the checkbox is not checked
 * @param {*} i 
 * @param {*} j 
 * @param {*} contact 
 */
function ifCheckboxNotCheckedEditAssignedPersons(i, j, contact){
    tasks[i]['assigned'] = tasks[i]['assigned'].filter(person => person.name !== contact.name);
    document.getElementById(`onePersonDivEdit-${j}`).style.backgroundColor = "white";
    document.getElementById(`onePersonDivEdit-${j}`).style.color = "black";
}

/**
 * This function is used to create the profile initials of the contacts.
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

/**
 * This is the final save function in the edit overlay, which ensures that all previously changed information is saved.
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

/**
 * This function saves the new assigned Persons or new deleted Persons in Firebase.
 * @param {*} i 
 */
async function saveNewAssignedPerson(i){
    await putData(`/tasks/${tasks[i]['id']}`, tasks[i]);
    tasks=[];
    await loadTasks();
}