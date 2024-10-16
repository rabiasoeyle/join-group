// let firebase_URL =
//   "https://join-e7072-default-rtdb.europe-west1.firebasedatabase.app/";
let contacts=[];
let assignedPersons=[];
let category;
let priority = 'medium';
let subtaskList=[];
let taskInformation=[];
let initials=[];
let initialsAssignedPersons=[];
let checkedSubtasks=[];
let isDropDownOpenAssigned = false;
let isDropDownOpenCategory = false;


window.addEventListener('load', () => {
    const circle = document.getElementById('circle');
    if (circle) {
        const userStatus = localStorage.getItem('userStatus');
        circle.textContent = userStatus || 'Not logged in';
    }
});

/**
 * This function is for rendering the main blocks.
 */
function initAddTask() {
    renderMainForm(); 
    setMinDate();
}

/**
 * This function should get the current date and set min in the input field.
 */
function setMinDate(){
    let today = new Date().toISOString().split('T')[0];
    document.getElementById('dateOfTask').setAttribute('min', today);
}

/**
 * This function ensures that the functions for the main part are loaded.
 */
async function renderMainForm(){
    await loadContacts();
}

/**
 * This function should determine the persons who receive a tick in the checkbox and save them in the assignedPersons array.
 * @param {*} i 
 */
function addAssignedPersons(i){
    let inputCheckbox = document.getElementById(`inputCheckbox-${i}`);
    let personName = contacts[i].name;
    inputCheckbox.checked =!inputCheckbox.checked; 
    if (inputCheckbox.checked) {
        document.getElementById(`onePersonDiv-${i}`).style.backgroundColor = "#2a3647";
        document.getElementById(`onePersonDiv-${i}`).style.color = "white";
        if (!assignedPersons.includes(person => person.name === personName)) {
            let newAssign = { name: contacts[i].name, color: contacts[i].color };
            assignedPersons.push(newAssign);
        }
    } else {
        assignedPersons = assignedPersons.filter(person => person.name !== personName);
        document.getElementById(`onePersonDiv-${i}`).style.backgroundColor = "white";
        document.getElementById(`onePersonDiv-${i}`).style.color = "black";
    }
    showAssignedPersons();
}

/**
 * This function is used to render the list of contacts with the initials and the checkbox for onclick.
 */
function rollContactsList() {
    let assignContactsList = document.getElementById('assignContactsList');
    assignContactsList.classList.toggle('d-none');
    isDropDownOpenAssigned = !assignContactsList.classList.contains('d-none');
    assignContactsList.innerHTML = '';
    if (isDropDownOpenAssigned) {
        for (let i = 0; i < contacts.length; i++) {
            let isChecked = assignedPersons.some(person => person.name === contacts[i]['name']) ? 'checked' : '';
            assignContactsList.innerHTML += generateContactItemHTML(i, contacts[i], isChecked);        
            let input = document.getElementById(`inputCheckbox-${i}`);
            if (input.checked) {
                document.getElementById(`onePersonDiv-${i}`).style.backgroundColor = "#2a3647";
                document.getElementById(`onePersonDiv-${i}`).style.color = "white";}
        }
        document.addEventListener('click', closeDropdownOnOutsideClickAssigned);
    } else {
        document.removeEventListener('click', closeDropdownOnOutsideClickAssigned);
    }
}

/**
 * This function is used to add or remove an event listener from the document.
 * @param {*} event 
 */
function closeDropdownOnOutsideClickAssigned(event) {
    const assignContactsList = document.getElementById('assignContactsList');
    const toggleButton = document.querySelector('.assigned-to-input-and-button');
    if (!assignContactsList.contains(event.target) && !toggleButton.contains(event.target)) {
        assignContactsList.classList.add('d-none');
        isDropDownOpenAssigned = false;
        document.removeEventListener('click', closeDropdownOnOutsideClickAssigned);
    }
}

/**
 * This function is first used to display in the input field which persons have been assigned.
 */
function showAssignedPersons() {
    let showAssignedPersons = document.getElementById('showAssignedPersonInitial');
    showAssignedPersons.innerHTML = '';
    for (let i = 0; i < Math.min(assignedPersons.length, 5); i++) {
        showAssignedPersons.innerHTML += assignedPersonTemplate(assignedPersons[i].color, assignedPersonsInitials(i));
    }
    if (assignedPersons.length > 6) {
        showAssignedPersons.innerHTML += additionalPersonsTemplate(assignedPersons.length - 6);
    }
}

/**
 * This function filters the initials of the persons selected for the respective tasks.
 * @param {*} i 
 * @returns 
 */
function assignedPersonsInitials(i){
    let names = assignedPersons[i].name.split(" "),
      initialsAssignedPersons = names[0].substring(0, 1).toUpperCase();
    if (names.length > 1) {
        initialsAssignedPersons += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initialsAssignedPersons;
}

/**
 * In this function, the initials of the contacts are filtered out and played back
 *
 * @param {*} i
 * @returns
 */
function profileInitials(i) {
    let names = contacts[i]['name'].split(" "),
      initials = names[0].substring(0, 1).toUpperCase();
    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
}

/**This function is intended to save the value for the importancen */
function selectPrio(x) {
    const priorities = ['urgent', 'medium', 'low'];
    priorities.forEach(prio => {
        const element = document.getElementById(prio);
        if (prio === x) {
            element.classList.add(`${prio}Prio_click`);
            element.classList.remove(`${prio}Prio`);
        } else {
            element.classList.add(`${prio}Prio`);
            element.classList.remove(`${prio}Prio_click`);
        }
    });
    priority = x;
}

/**
 * This function should be for toggling the d-none class in the category field
 */
function rollCategories(){
    let dropdownCategories = document.getElementById('dropdownCategories');
    dropdownCategories.classList.toggle('d-none');  
    isDropDownOpenCategory = !dropdownCategories.classList.contains('d-none');   
    if(isDropDownOpenCategory){
         document.addEventListener('click', closeDropdownOnOutsideClickCategory);
        } else {
            document.removeEventListener('click', closeDropdownOnOutsideClickCategory);
    }
}

/**
 * This function is used to add or remove an event listener from the document.
 * @param {*} event 
 */
function closeDropdownOnOutsideClickCategory(event) {
    const categories = document.getElementById('dropdownCategories');
    const toggleButton = document.querySelector('.dropdown');
    if (!categories.contains(event.target) && !toggleButton.contains(event.target)) {
        categories.classList.add('d-none');
        isDropDownOpenCategory = false;
        document.removeEventListener('click', closeDropdownOnOutsideClickCategory);
    }
}

/**
 * This function ensures that all input fields are emptied again
 */
function clearForm(){
    assignedPersons=[];
    category='';
    subtaskList=[];
    priority='';
    renderSubtasks();
    renderStartClassPrio();
    document.getElementById('urgent').style.backgroundColor = "white";
    document.getElementById('medium').style.backgroundColor = "white";
    document.getElementById('low').style.backgroundColor = "white";
    document.getElementById('showAssignedPersonInitial').innerHTML='';
}

/**
 * This function is used to reset the start design of the priority button to the start status when clear.
 */
function renderStartClassPrio(){
    document.getElementById('urgent').classList.add('urgentPrio');
    document.getElementById('urgent').classList.remove('urgentPrio_click');
    document.getElementById('medium').classList.remove('mediumPrio');
    document.getElementById('medium').classList.add('mediumPrio_click');
    document.getElementById('low').classList.remove('lowPrio_click');
    document.getElementById('low').classList.add('lowPrio');
    priority ='medium';
}

/**
 * This function is used to save a category.
 * @param {*} x 
 */
function selectCategory(x){
    if(x =='Technical Task'){;
        document.getElementById('categoryInput').value = x;
    }else if(x=='User Story'){
        document.getElementById('categoryInput').value = x;
    }
    category=x;
}

/**
 * This function is used to create and save subtasks.
 */
function addSubtask(){
    let subtask = document.getElementById('subtask').value.trim();
    if (subtask) {
        subtaskList.push(subtask);
        document.getElementById('subtask').value = "";
    }
    renderSubtasks();
}

/**
 * This function should render the created subtasks that are stored in the subtaskList array.
 */
function renderSubtasks() {
    let subtaskListDiv = document.getElementById('subtaskList');
    subtaskListDiv.innerHTML = '';
    for (let i = 0; i < subtaskList.length; i++) {
        subtaskListDiv.innerHTML += generateSubtaskHTML(i, subtaskList[i]);
    }
}

/**
 * With this function you should be able to change the subtask at exactly the corresponding point.
 * @param {*} i 
 */
function editSubtask(i) {
    let subtaskListText = document.getElementById(`subtaskListText-${i}`);
    subtaskListText.classList.add('d-none');
    let editInput = document.getElementById(`editInput-${i}`);
    editInput.classList.remove('d-none');
    let editAndTrash = document.getElementById(`editAndTrash-${i}`);
    editAndTrash.innerHTML = '';
    // Verwende die Template-Funktion
    editAndTrash.innerHTML = generateEditAndTrashHTML(i);
}

/**
 * By activating this function, changes to subtasks can be saved.
 * @param {*} i 
 */
function saveChangedSubtask(i){
    let editInput = document.getElementById(`editInput-${i}`).value.trim();
    subtaskList.splice(i,1, editInput);
    renderSubtasks();
}

/**
 * This function is used to delete subtasks.
 * @param {*} i 
 */
function deleteSubtask(i){
    subtaskList.splice(i,1);
    renderSubtasks();
}

/**
 * This function is intended to undo the onmouseover effect with onmouseout.
 * @param {*} i 
 */
function subtaskNoHoverEffekt(i){
    let trashAndEdit = document.getElementById(`editAndTrash-${i}`);
    trashAndEdit.classList.add('d-none');
}

/**
 * Diese Funktion soll den onmouseover effekt hinzufügen.
 * @param {*} i 
 */
function subtaskHoverEffekt(i){
    let trashAndEdit = document.getElementById(`editAndTrash-${i}`);
    trashAndEdit.classList.remove('d-none');
}

/**
 * Diese Funktion speichert die ausgewählten Daten in einem Array und schickt sie an die Funktion, die sie an den Server verschickt.
 */
async function createTask() {
    let createButton = document.getElementById('createTaskButton');
    createButton.disabled = true;
    let titleOfTask = document.getElementById('titleOfTask').value.trim();
    let descriptionOfTask = document.getElementById('descriptionOfTask').value.trim();
    let dateOfTask = document.getElementById('dateOfTask').value.trim();
    let newTaskInformation = {
        title: titleOfTask,
        description: descriptionOfTask,
        assigned: assignedPersons,
        dueDate: dateOfTask,
        category: category,
        priority: priority,
        subtaskList: subtaskList,
        status: "todo",
        checkedSubtasks: checkedSubtasks,
        checkedSubtasksCount: 0,
    };
    await postData("/tasks", newTaskInformation);
    clearForm();
    const popup = document.createElement('div');
    popup.classList.add('pop-up-added');
    popup.innerHTML = createTaskPopupTemplate(); // Verwende das Template hier
    document.body.appendChild(popup);
    setTimeout(() => {
        window.location.href = '../html/board.html?msg=Du hast eine neue Task erstellt';
    }, 2000);
    createButton.disabled = false;
}

/**
 * This function is used to create colors if the contacts do not have any assigned colors.
 * @returns 
 */
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}