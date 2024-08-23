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


function overlayAddTask(status){
    overlayAddStatus = status;
    let overlay = document.getElementById('atOaddTaskOverlayParent');
    overlay.classList.remove('d-none');
    let overlayChild = document.getElementById('addTaskOverlay');
    overlayChild.innerHTML=``;
    overlayChild.innerHTML= getAddTaskOverlayTemplate();
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
 * This function is used to reset the start design of the priority button to the start status when clear.
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
 * Toggles the display of the contacts list with initials and checkboxes on click.
 */
function overlayAddRollContactsList() {
    const assignContactsList = document.getElementById('overlayAddAssignContactsList');
    assignContactsList.classList.toggle('d-none');
    overlayAddIsDropDownOpenAssigned = !assignContactsList.classList.contains('d-none');
    assignContactsList.innerHTML = '';

    if (overlayAddIsDropDownOpenAssigned) {
        renderContactsList(assignContactsList);
        document.addEventListener('click', overlayAddCloseDropdownOnOutsideClickAssigned);
    } else {
        document.removeEventListener('click', overlayAddCloseDropdownOnOutsideClickAssigned);
    }
}

/**
 * Renders the contacts list with checkboxes and initials.
 * 
 * @param {HTMLElement} assignContactsList - The container element for the contacts list.
 */
function renderContactsList(assignContactsList) {
    for (let i = 0; i < contacts.length; i++) {
        const isChecked = overlayAddAssignedPersons.some(person => person.name === contacts[i].name) ? 'checked' : '';
        assignContactsList.innerHTML += overlayAddRollContactsListTemplate(i, contacts[i], isChecked);
        setPersonDivStyle(i);
    }
}

/**
 * Sets the background and text color of the person's div if the checkbox is checked.
 * 
 * @param {number} i - The index of the person in the contacts array.
 */
function setPersonDivStyle(i) {
    const input = document.getElementById(`overlayAddInputCheckbox-${i}`);
    if (input.checked) {
        const personDiv = document.getElementById(`overlayAddOnePersonDiv-${i}`);
        personDiv.style.backgroundColor = "#2a3647";
        personDiv.style.color = "white";
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
 * Toggles the assignment of a person based on the checkbox state and updates the UI.
 * 
 * @param {number} i - The index of the person in the contacts array.
 */
function overlayAddAddAssignedPersons(i) {
    const inputCheckbox = document.getElementById(`overlayAddInputCheckbox-${i}`);
    const personName = contacts[i].name;
    inputCheckbox.checked = !inputCheckbox.checked;

    if (inputCheckbox.checked) {
        setPersonDivStyle(i, "#2a3647", "white");
        addPersonToAssigned(contacts[i]);
    } else {
        removePersonFromAssigned(personName);
        setPersonDivStyle(i, "white", "black");
    }

    overlayAddShowAssignedPersons();
}

/**
 * Sets the background color and text color of the person's div.
 * 
 * @param {number} i - The index of the person in the contacts array.
 * @param {string} backgroundColor - The background color to set.
 * @param {string} color - The text color to set.
 */
function setPersonDivStyle(i, backgroundColor, color) {
    const personDiv = document.getElementById(`overlayAddOnePersonDiv-${i}`);
    personDiv.style.backgroundColor = backgroundColor;
    personDiv.style.color = color;
}

/**
 * Adds a person to the assigned persons array if they are not already included.
 * 
 * @param {Object} person - The person object to add.
 */
function addPersonToAssigned(person) {
    if (!overlayAddAssignedPersons.some(p => p.name === person.name)) {
        overlayAddAssignedPersons.push({ name: person.name, color: person.color });
    }
}

/**
 * Removes a person from the assigned persons array based on their name.
 * 
 * @param {string} personName - The name of the person to remove.
 */
function removePersonFromAssigned(personName) {
    overlayAddAssignedPersons = overlayAddAssignedPersons.filter(person => person.name !== personName);
}

/**
 * This function is first used to display in the input field which persons have been assigned.
 */
function overlayAddShowAssignedPersons() {
    let assignedPersons = document.getElementById('overlayAddAssignedPersons');
    assignedPersons.innerHTML = '';
    for (let i = 0; i < overlayAddAssignedPersons.length; i++) {
        assignedPersons.innerHTML += overlayAddShowAssignedPersonsTemplate(overlayAddAssignedPersons[i], i);
    }
} 

/**
 * This function filters the initials of the persons selected for the respective tasks.
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
 * Sets the classes for the priority elements based on the selected priority.
 * 
 * @param {string} priority - The selected priority ('urgent', 'medium', 'low').
 */
function overlayAddSelectPrio(priority) {
    /**
     * Helper function to add and remove classes for an element.
     * 
     * @param {string} elementId - The ID of the element.
     * @param {string} addClass - The class to be added.
     * @param {string} removeClass - The class to be removed.
     */
    function setPriorityClass(elementId, addClass, removeClass) {
        const element = document.getElementById(elementId);
        element.classList.add(addClass);
        element.classList.remove(removeClass);
    }

    if (priority === 'urgent') {
        setPriorityClass('overlayAddUrgent', 'overlay-add-urgentPrio_click', 'overlay-add-urgentPrio');
        setPriorityClass('overlayAddMedium', 'overlay-add-mediumPrio', 'overlay-add-mediumPrio_click');
        setPriorityClass('overlayAddLow', 'overlay-add-lowPrio', 'overlay-add-lowPrio_click');
    } else if (priority === 'medium') {
        setPriorityClass('overlayAddUrgent', 'overlay-add-urgentPrio', 'overlay-add-urgentPrio_click');
        setPriorityClass('overlayAddMedium', 'overlay-add-mediumPrio_click', 'overlay-add-mediumPrio');
        setPriorityClass('overlayAddLow', 'overlay-add-lowPrio', 'overlay-add-lowPrio_click');
    } else if (priority === 'low') {
        setPriorityClass('overlayAddUrgent', 'overlay-add-urgentPrio', 'overlay-add-urgentPrio_click');
        setPriorityClass('overlayAddMedium', 'overlay-add-mediumPrio', 'overlay-add-mediumPrio_click');
        setPriorityClass('overlayAddLow', 'overlay-add-lowPrio_click', 'overlay-add-lowPrio');
    }
    overlayAddPriority = priority;
}

/**
 * This function should be for toggling the d-none class in the category field
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
 * This function is used to create and save subtasks.
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
 * This function should render the created subtasks that are stored in the subtaskList array.
 */
function overlayAddRenderSubtasks() {
    let subtasksContainer = document.getElementById('subtasksContainer');
    subtasksContainer.innerHTML = '';
    for (let i = 0; i < subtasks.length; i++) {
        subtasksContainer.innerHTML += overlayAddRenderSubtasksTemplate(subtasks[i], i);
    }
}

/**
 * With this function you should be able to change the subtask at exactly the corresponding point.
 * @param {*} i 
 */
function overlayAddEditSubtask(i) {
    let subtaskListText = document.getElementById(`overlayAddSubtaskListText-${i}`);
    subtaskListText.classList.add('d-none');
    let editInput = document.getElementById(`overlayAddEditInput-${i}`);
    editInput.classList.remove('d-none');
    let editAndTrash = document.getElementById(`overlayAddEditAndTrash-${i}`);
    editAndTrash.innerHTML = overlayAddEditSubtaskTemplate(i);
}

/**
 * By activating this function, changes to subtasks can be saved.
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
 * This function is intended to add the onmouseover effect.
 * @param {*} i 
 */
function overlayAddSubtaskHoverEffekt(i){
    let trashAndEdit = document.getElementById(`overlayAddEditAndTrash-${i}`);
    trashAndEdit.classList.remove('d-none');
}

/**
 * Creates a new task and updates the UI accordingly.
 */
async function overlayAddCreateTask() {
    const newTaskInformation = gatherTaskInformation();
    await postData("/tasks", newTaskInformation);
    showPopup();
    clearFormAndCloseOverlay();
    await refreshTasksAndBoards();
}

/**
 * Gathers task information from the form.
 * 
 * @returns {Object} The task information.
 */
function gatherTaskInformation() {
    return {
        title: document.getElementById('overlayAddTitleOfTask').value.trim(),
        description: document.getElementById('overlayAddDescriptionOfTask').value.trim(),
        assigned: overlayAddAssignedPersons,
        dueDate: document.getElementById('overlayAddDateOfTask').value.trim(),
        category: overlayAddCategory,
        priority: overlayAddPriority,
        subtaskList: overlayAddSubtaskList,
        status: overlayAddStatus,
        checkedSubtasks: overlayAddCheckedSubtasks,
        checkedSubtasksCount: 0,
    };
}

/**
 * Displays a popup indicating the task was added.
 */
function showPopup() {
    const popup = document.createElement('div');
    popup.classList.add('pop-up-added-w-svg');
    popup.innerHTML = overlayAddCreateTaskPopupTemplate();
    document.body.appendChild(popup);
    setTimeout(() => {
        popup.remove();
    }, 2000);
}

/**
 * Clears the form and closes the overlay.
 */
function clearFormAndCloseOverlay() {
    overlayAddClearForm();
    closeAddOverlay();
}

/**
 * Refreshes the tasks and updates the boards.
 */
async function refreshTasksAndBoards() {
    tasks = [];
    await loadTasks();
    todoBoard();
    inProgressBoard();
    awaitFeedbackBoard();
    doneBoard();
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
 * This function closes the overlay.
 */
function closeAddOverlay(){
    overlayAddClearForm();
    let overlay = document.getElementById('atOaddTaskOverlayParent');
    overlay.classList.add('d-none');
    let overlayChild = document.getElementById('addTaskOverlay');
    overlayChild.innerHTML=``;
}