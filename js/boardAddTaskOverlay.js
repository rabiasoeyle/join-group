let overlayAddAssignedPersons=[];
let overlayAddCategory;
let overlayAddPriority = "medium";
let overlayAddSubtaskList=[];
let overlayAddTaskInformation=[];
let overlayAddInitials=[];
let overlayAddInitialsAssignedPersons=[];
let overlayAddCheckedSubtasks=[];
let overlayAddIsDropDownOpenAssigned = false;
let overlayAddIsDropDownOpenCategory = false;
let overlayAddStatus;

/**
 * This function should open the overlay.
 * @param {*} status 
 */
function overlayAddTask(status){
    overlayAddStatus = status;
    let overlay = document.getElementById('atOaddTaskOverlayParent');
    overlay.classList.remove('d-none');
    let overlayChild = document.getElementById('addTaskOverlay');
    overlayChild.innerHTML=``;
    overlayChild.innerHTML = getOverlayAddTaskTemplate();
    overlayAddSetMinDate();
}

/**
 * This function should get the current date and set min in the input field.
 */
function overlayAddSetMinDate(){
    let today = new Date().toISOString().split('T')[0];
    document.getElementById('overlayAddDateOfTask').setAttribute('min', today);
}

/**
 * This function is used to set the start design for the priority buttons back to the start state when clear.
 */
function overlayAddRenderStartClassPrio(){
    document.getElementById('overlayAddUrgent').classList.add('overlay-add-urgentPrio');
    document.getElementById('overlayAddUrgent').classList.remove('overlay-add-urgentPrio_click');
    document.getElementById('overlayAddMedium').classList.remove('overlay-add-mediumPrio');
    document.getElementById('overlayAddMedium').classList.add('overlay-add-mediumPrio_click');
    document.getElementById('overlayAddLow').classList.remove('overlay-add-lowPrio_click');
    document.getElementById('overlayAddLow').classList.add('overlay-add-lowPrio');
    overlayAddPriority ='medium';
}

/**
 * This function is used to render the list of contacts with the initials and the checkbox on onclick.
 */
function overlayAddRollContactsList(){
    let assignContactsList = document.getElementById('overlayAddAssignContactsList');
    assignContactsList.classList.toggle('d-none');
    overlayAddIsDropDownOpenAssigned = !assignContactsList.classList.contains('d-none');
    assignContactsList.innerHTML='';
    if(overlayAddIsDropDownOpenAssigned){
         for(let i=0; i<contacts.length; i++){
        let isChecked = overlayAddAssignedPersons.some(person => person.name === contacts[i]['name']) ? 'checked' : '';
        assignContactsList.innerHTML += getOverlayAddPersonTemplate(i, contacts, isChecked)
        let input = document.getElementById(`overlayAddInputCheckbox-${i}`);
        if(input.checked){
            document.getElementById(`overlayAddOnePersonDiv-${i}`).style.backgroundColor = "#2a3647";
            document.getElementById(`overlayAddOnePersonDiv-${i}`).style.color = "white";
        }
    }
        document.addEventListener('click', overlayAddCloseDropdownOnOutsideClickAssigned);
        } else {
        document.removeEventListener('click', overlayAddCloseDropdownOnOutsideClickAssigned);
        }
}

/**
 * This function is used to add or remove an event listener from the document.
 * @param {*} event 
 */
function overlayAddCloseDropdownOnOutsideClickAssigned(event) {
    const assignContactsList = document.getElementById('overlayAddAssignContactsList');
    const toggleButton = document.querySelector('.overlay-add-assigned-to-input-and-button');
    if (!assignContactsList.contains(event.target) && !toggleButton.contains(event.target)) {
        assignContactsList.classList.add('d-none');
        overlayAddIsDropDownOpenAssigned = false;
        document.removeEventListener('click', overlayAddCloseDropdownOnOutsideClickAssigned);
    }
}

/**
 * This function is intended to identify the people who receive a tick in the checkbox and store them in the assignedPersons array.
 * @param {*} i 
 */
function overlayAddAddAssignedPersons(i){
    let inputCheckbox = document.getElementById(`overlayAddInputCheckbox-${i}`);
    let personName = contacts[i].name;
    inputCheckbox.checked =!inputCheckbox.checked; 
    if (inputCheckbox.checked) {
        document.getElementById(`overlayAddOnePersonDiv-${i}`).style.backgroundColor = "#2a3647";
        document.getElementById(`overlayAddOnePersonDiv-${i}`).style.color = "white";
        if (!overlayAddAssignedPersons.includes(person => person.name === personName)) {
            let newAssign = { name: contacts[i].name, color: contacts[i].color };
            overlayAddAssignedPersons.push(newAssign);
        }
    } else {
        overlayAddAssignedPersons = overlayAddAssignedPersons.filter(person => person.name !== personName);
        document.getElementById(`overlayAddOnePersonDiv-${i}`).style.backgroundColor = "white";
        document.getElementById(`overlayAddOnePersonDiv-${i}`).style.color = "black";
    }
    overlayAddShowAssignedPersons();
}

/**
 * This function is initially used to show which people have been assigned in the input field.
 */
function overlayAddShowAssignedPersons() {
    let showAssignedPersons = document.getElementById('overlayAddShowAssignedPersonInitial');
    showAssignedPersons.innerHTML='';
    for(i=0;i<Math.min(overlayAddAssignedPersons.length, 5);i++){
        showAssignedPersons.innerHTML += getAssignedPersonTemplate(overlayAddAssignedPersons[i], overlayAddAssignedPersonsInitials(i));       
} // Wenn es mehr als 6 zugewiesene Personen gibt, ein weiteres "Plus"-Div hinzufügen
if (overlayAddAssignedPersons.length > 6) {
    showAssignedPersons.innerHTML += getPlusDivTemplate(overlayAddAssignedPersons.length - 6);
}
} 

/**
 * This function filters the initials of the people selected for the respective tasks.
 * @param {*} i 
 * @returns 
 */
function overlayAddAssignedPersonsInitials(i){
    let names = overlayAddAssignedPersons[i].name.split(" "),
      overlayAddInitialsAssignedPersons = names[0].substring(0, 1).toUpperCase();
    if (names.length > 1) {
        overlayAddInitialsAssignedPersons += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return overlayAddInitialsAssignedPersons;
}
/**
 * In this function, the initials of the contacts are filtered out and played back
 *
 * @param {*} i
 * @returns
 */
function overlayAddProfileInitials(i) {
    let names = contacts[i]['name'].split(" "),
      overlayAddInitials = names[0].substring(0, 1).toUpperCase();
    if (names.length > 1) {
      overlayAddInitials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return overlayAddInitials;
  }

/**
 * This function is intended to be used to select people and personal data 
 * and the circle with the initials inside should be visible when you click on it.
 * @param {*} i 
 */
function overlayAddSelectPerson(i){
    let inputCheckbox = document.getElementById('overlayAddInputCheckbox');
    inputCheckbox.innerHTML= assignedPersons += contacts[i]['name'];
    overlayAddShowAssignedPersons();
}

/**This function is intended to store the importance value. */
function overlayAddSelectPrio(x){
    if(x =='urgent'){
        document.getElementById('overlayAddUrgent').classList.add('overlay-add-urgentPrio_click');
        document.getElementById('overlayAddUrgent').classList.remove('overlay-add-urgentPrio');
        document.getElementById('overlayAddMedium').classList.add('overlay-add-mediumPrio');
        document.getElementById('overlayAddMedium').classList.remove('overlay-add-mediumPrio_click');
        document.getElementById('overlayAddLow').classList.add('overlay-add-lowPrio');
        document.getElementById('overlayAddLow').classList.remove('overlay-add-lowPrio_click');
    }else if(x =='medium'){
        document.getElementById('overlayAddUrgent').classList.add('overlay-add-urgentPrio');
        document.getElementById('overlayAddUrgent').classList.remove('overlay-add-urgentPrio_click');
        document.getElementById('overlayAddMedium').classList.add('overlay-add-mediumPrio_click');
        document.getElementById('overlayAddMedium').classList.remove('overlay-add-mediumPrio');
        document.getElementById('overlayAddLow').classList.add('overlay-add-lowPrio');
        document.getElementById('overlayAddLow').classList.remove('overlay-add-lowPrio_click');
    }else if(x =='low'){
        document.getElementById('overlayAddUrgent').classList.add('overlay-add-urgentPrio');
        document.getElementById('overlayAddUrgent').classList.remove('overlay-add-urgentPrio_click');
        document.getElementById('overlayAddMedium').classList.add('overlay-add-mediumPrio');
        document.getElementById('overlayAddMedium').classList.remove('overlay-add-mediumPrio_click');
        document.getElementById('overlayAddLow').classList.add('overlay-add-lowPrio_click');
        document.getElementById('overlayAddLow').classList.remove('overlay-add-lowPrio');
    }
    overlayAddPriority= x;
}

/**
 * This function is intended for toggling the d-none class in the category field
 */
function overlayAddRollCategories(){
    let dropdownCategories = document.getElementById('overlayAddDropdownCategories');
    dropdownCategories.classList.toggle('d-none');  
    isDropDownOpenCategory = !dropdownCategories.classList.contains('d-none');   
    if(isDropDownOpenCategory){
        document.addEventListener('click', overlayAddCloseDropdownOnOutsideClickCategory);
        } else {
        document.removeEventListener('click', overlayAddCloseDropdownOnOutsideClickCategory);
    }
}

/**
 * This function is used to add or remove an event listener from the document.
 * @param {*} event 
 */
function overlayAddCloseDropdownOnOutsideClickCategory(event) {
    const categories = document.getElementById('overlayAddDropdownCategories');
    const toggleButton = document.querySelector('.overlay-add-dropdown');
    if (!categories.contains(event.target) && !toggleButton.contains(event.target)) {
        categories.classList.add('d-none');
        overlayAddIsDropDownOpenCategory = false;
        document.removeEventListener('click', overlayAddCloseDropdownOnOutsideClickCategory);
    }
}

/**
 * This function is used to save a category.
 * @param {*} x 
 */
function overlayAddSelectCategory(x){
    if(x =='Technical Task'){;
        document.getElementById('overlayAddCategoryInput').value = x;
    }else if(x=='User Story'){
        document.getElementById('overlayAddCategoryInput').value = x;
    }
    overlayAddCategory=x;
}

/**
 * 
This function is used to create and save subtasks.
 */
function overlayAddAddSubtask(){
    let subtask = document.getElementById('overlayAddSubtask').value.trim();
    if (subtask) {
        overlayAddSubtaskList.push(subtask);
        document.getElementById('overlayAddSubtask').value = "";
    }
    overlayAddRenderSubtasks();
}

/**
 * This function is intended to render the created subtasks stored in the subtaskList array.
 */
function overlayAddRenderSubtasks(){
    let subtaskListDiv = document.getElementById('overlayAddSubtaskList');
    subtaskListDiv.innerHTML='';
    for(i=0; i<overlayAddSubtaskList.length; i++){
        subtaskListDiv.innerHTML += getOverlayAddSubtaskTemplate(i, overlayAddSubtaskList);
    }
}

/**
 * With this function you should be able to change the subtask at exactly the appropriate point.
 * @param {*} i 
 */
function overlayAddEditSubtask(i){
    let subtaskListText = document.getElementById(`overlayAddSubtaskListText-${i}`);
    subtaskListText.classList.add('d-none');
    let editInput = document.getElementById(`overlayAddEditInput-${i}`);
    editInput.classList.remove('d-none');
    let editAndTrash = document.getElementById(`overlayAddEditAndTrash-${i}`);
    editAndTrash.innerHTML='';
    editAndTrash.innerHTML= getOverlayAddEditSubtaskTemplate(i);
}

/**
 * Enabling this feature allows changes to subtasks to be saved.
 * @param {*} i 
 */
function overlayAddSaveChangedSubtask(i){
    let editInput = document.getElementById(`overlayAddEditInput-${i}`).value.trim();
    overlayAddSubtaskList.splice(i,1, editInput);
    overlayAddRenderSubtasks();
}

/**
 * This function is used to delete subtasks.
 * @param {*} i 
 */
function overlayAddDeleteSubtask(i){
    overlayAddSubtaskList.splice(i,1);
    overlayAddRenderSubtasks();
}

/**
 * This function is intended to undo the onmouseover effect with onmouseout.
 * @param {*} i 
 */
function overlayAddSubtaskNoHoverEffekt(i){
    let trashAndEdit = document.getElementById(`overlayAddEditAndTrash-${i}`);
    trashAndEdit.classList.add('d-none');
}

/**
 * 
This function is intended to add the onmouseover effect.
 * @param {*} i 
 */
function overlayAddSubtaskHoverEffekt(i){
    let trashAndEdit = document.getElementById(`overlayAddEditAndTrash-${i}`);
    trashAndEdit.classList.remove('d-none');
}

/**
 * This function stores the selected data in an array and sends it to the function, which sends it to the server.
 */
async function overlayAddCreateTask(){
    let titleOfTask = document.getElementById('overlayAddTitleOfTask').value.trim();
    let descriptionOfTask = document.getElementById('overlayAddDescriptionOfTask').value.trim();
    let dateOfTask = document.getElementById('overlayAddDateOfTask').value.trim();
    let newTaskInformation ={
        title: titleOfTask,
        description: descriptionOfTask,
        assigned: overlayAddAssignedPersons,
        dueDate: dateOfTask,
        category:overlayAddCategory,
        priority:overlayAddPriority,
        subtaskList:overlayAddSubtaskList,
        status:overlayAddStatus,
        checkedSubtasks:overlayAddCheckedSubtasks,
        checkedSubtasksCount: 0,
    }
    await postData("/tasks", newTaskInformation);
    // Erstelle das Popup-Element
    const popup = document.createElement('div');
    popup.classList.add('pop-up-added-w-svg');
        popup.innerHTML= getTaskAddedPopupTemplate()
    document.body.appendChild(popup);
    overlayAddClearForm();
    closeAddOverlay();
    tasks =[];
    await loadTasks(); 
    todoBoard();
    inProgressBoard();
    awaitFeedbackBoard();
    doneBoard();
    setTimeout(() => {
        popup.remove();
    }, 2000);
}

/**
 * This function ensures that all input fields are emptied again
 */
function overlayAddClearForm(){
    overlayAddAssignedPersons=[];
    overlayAddCategory='';
    overlayAddSubtaskList=[];
    overlayAddPriority='';
    overlayAddRenderSubtasks();
    overlayAddRenderStartClassPrio();
    let showAssignedPersons = document.getElementById('overlayAddShowAssignedPersonInitial');
    showAssignedPersons.innerHTML='';
    document.getElementById('overlayAddUrgent').style.backgroundColor = "white";
    document.getElementById('overlayAddMedium').style.backgroundColor = "white";
    document.getElementById('overlayAddLow').style.backgroundColor = "white";
}

/**
 * This function is for closing the overlay.
 */
function closeAddOverlay(){
    overlayAddClearForm();
    let overlay = document.getElementById('atOaddTaskOverlayParent');
    overlay.classList.add('d-none');
    let overlayChild = document.getElementById('addTaskOverlay');
    overlayChild.innerHTML=``;
}