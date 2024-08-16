let assignedPersons=[];
let category;
let priority;
let subtaskList=[];
let taskInformation=[];
let initials=[];
let initialsAssignedPersons=[];
let checkedSubtasks=[];

/**
 * Diese Funktion ist zum rendern der Hauptbausteine.
 */
function initAddTask() {
    renderMainForm(); 
    setMinDate();
}

/**
 * Diese Funktion soll das aktuelle Datum holen und im Inputfeld min einstellen.
 */
function setMinDate(){
    // Hole das heutige Datum
    let today = new Date().toISOString().split('T')[0];
    console.log(today);
    // Setze das min-Attribut auf das heutige Datum
    document.getElementById('dateOfTask').setAttribute('min', today);
}

/**
 * Diese Funktion sorgt dafür, dass die Funktionen für den Hauptteil geladen werden.
 */
async function renderMainForm(){
    await loadContacts();
}

/**
 * Diese Funktion soll die Personen, die einen Haken in der Checkbox erhalten feststellen und im Array assignedPersons abspeichern.
 * @param {*} i 
 */
function addAssignedPersons(i){
    let inputCheckbox = document.getElementById(`inputCheckbox-${i}`);
    let personName = contacts[i].name;
    if (inputCheckbox.checked) {
        // Prüfen, ob die Person bereits im Array vorhanden ist, bevor sie hinzugefügt wird
        if (!assignedPersons.includes(person => person.name === personName)) {
            let newAssign = { name: contacts[i].name, color: contacts[i].color };
            assignedPersons.push(newAssign);
        }
    } else {
        // Wenn die Checkbox nicht mehr ausgewählt ist, die Person aus dem Array entfernen
        assignedPersons = assignedPersons.filter(person => person.name !== personName);
    }
    showAssignedPersons();
}

/**
 * Diese Funktion dient dazu bei onclick die Liste der Kontakte mit den Initialien und der Checkbox zu rendern.
 */
function rollContactsList(){
    let assignContactsList = document.getElementById('assignContactsList');
    assignContactsList.classList.toggle('d-none');
    assignContactsList.innerHTML='';
    for(i=0; i<contacts.length; i++){
        let isChecked = assignedPersons.includes(contacts[i]['name']) ? 'checked' : '';
        assignContactsList.innerHTML +=`
        <div class="one-person-div">
            <div class="assigned-person-initials" style="background-color:${contacts[i]['color']}; color:white">${profileInitials(i)}</div>
            <div>${contacts[i]['name']}</div>
            <input id="inputCheckbox-${i}" class="assigen_checkbox" type="checkbox" onclick="addAssignedPersons(${i})" ${isChecked}>
        </div>`
    }
}

/**
 * Diese Funktion dient erstmal dazu, um im Inputfeld darzustellen, welche Personen zugeordnet worden.
 */
function showAssignedPersons() {
    let showAssignedPersons = document.getElementById('showAssignedPersonInitial');
    showAssignedPersons.innerHTML='';
    for(i=0;i<assignedPersons.length;i++){
        showAssignedPersons.innerHTML += `<div style="background-color:${assignedPersons[i]['color']}; color:white" class="selected-person-initals-div">${assignedPersonsInitials(i)}</div>`;
        // console.error('Contact not found for assigned person ID:', assignedPersons[i]);
}
} 

/**
 * Diese Funktion filtert die Initialien der für die jeweiligen Aufgaben ausgewählten Personen.
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
 * In dieser Funktion werden die Initialien der Kontakte rausgefiltert und wiedergegeben
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

/**
 * Diese Funktion soll dazu dienen, die Personen auszuwählen und die Personendaten 
 * sowie der Kreis mit den Initialien drin sollen gesehen werden, wenn man draufklickt.
 * @param {*} i 
 */
function selectPerson(i){
    let inputCheckbox = document.getElementById('inputCheckbox');
    inputCheckbox.innerHTML= assignedPersons += contacts[i]['name'];
    showAssignedPersons();
}

/**Diese Funktion soll den Wert für die Wichtigkeit abspeichern */
function selectPrio(x){
    if(x =='urgent'){
        document.getElementById('urgent').classList.add('urgentPrio_click');
        document.getElementById('urgent').classList.remove('urgentPrio');
        document.getElementById('medium').classList.add('mediumPrio');
        document.getElementById('medium').classList.remove('mediumPrio_click');
        document.getElementById('low').classList.add('lowPrio');
        document.getElementById('low').classList.remove('lowPrio_click');
    }else if(x =='medium'){
        document.getElementById('urgent').classList.add('urgentPrio');
        document.getElementById('urgent').classList.remove('urgentPrio_click');
        document.getElementById('medium').classList.add('mediumPrio_click');
        document.getElementById('medium').classList.remove('mediumPrio');
        document.getElementById('low').classList.add('lowPrio');
        document.getElementById('low').classList.remove('lowPrio_click');
    }else if(x =='low'){
        document.getElementById('urgent').classList.add('urgentPrio');
        document.getElementById('urgent').classList.remove('urgentPrio_click');
        document.getElementById('medium').classList.add('mediumPrio');
        document.getElementById('medium').classList.remove('mediumPrio_click');
        document.getElementById('low').classList.add('lowPrio_click');
        document.getElementById('low').classList.remove('lowPrio');
    }
    priority= x;
}

/**
 * Diese Funktion soll zum Toggeln der d-none Klasse bei dem Kategoriefeld sein
 */
function rollCategories(){
    let dropdownCategories = document.getElementById('dropdownCategories');
    dropdownCategories.classList.toggle('d-none');     
}

/**
 * Diese Funktion sorgt dafür, dass alle Inputfelder wieder geleert werden
 */
function clearForm(){
    assignedPersons=[];
    category='';
    subtaskList=[];
    priority='';
    document.getElementById('urgent').style.backgroundColor = "white";
    document.getElementById('medium').style.backgroundColor = "white";
    document.getElementById('low').style.backgroundColor = "white";
    document.getElementById('showAssignedPersonInitial').innerHTML='';
}

/**
 * Diese Funktion dient zum abspeichern einer Kategorie.
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
 * Diese Funktion dient dazu Unteraufgaben zu erstellen und speichern.
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
 * Diese Funktion soll die erstellten Unteraufgaben, die im array subtaskList gespeichert sind rendern.
 */
function renderSubtasks(){
    let subtaskListDiv= document.getElementById('subtaskList');
    subtaskListDiv.innerHTML='';
    for(i=0; i<subtaskList.length; i++){
        subtaskListDiv.innerHTML +=`
        <ul class="oneSubtask" id="oneSubtask-${i}" class="oneSubtask" onmouseover="subtaskHoverEffekt(${i})" onmouseout= "subtaskNoHoverEffekt(${i})">
            <li class="" id="subtaskListText-${i}">${subtaskList[i]}</li>
            <input class="d-none" value="${subtaskList[i]}" id="editInput-${i}">
            <div class="d-none editAndTrash" id="editAndTrash-${i}">
                <img src="../assets/img/editTask.png" id="leftImage-${i}" onclick="editSubtask(${i})">
                |
                <img src="../assets/img/deleteTask.png" id="rightImage-${i}" onclick="deleteSubtask(${i})">
            </div>
        </ul>
        `;
    }
}

/**
 * Mit dieser Funktion soll man die Subtask an genau der entsprechenden stelle ändern können.
 * @param {*} i 
 */
function editSubtask(i){
    let subtaskListText = document.getElementById(`subtaskListText-${i}`);
    subtaskListText.classList.add('d-none');
    let editInput = document.getElementById(`editInput-${i}`);
    editInput.classList.remove('d-none');
    let editAndTrash = document.getElementById(`editAndTrash-${i}`);
    editAndTrash.innerHTML='';
    editAndTrash.innerHTML= `
    <img src="../assets/img/deleteTask.png" id="leftImage-${i}" onclick="deleteSubtask(${i})">
    |
    <img src="../assets/img/checkTask.png" id="rightImage-${i}" onclick="saveChangedSubtask(${i})">
    `
}

/**
 * Durch Aktivierung dieser Funktion können Änderungen an Unteraufgaben gespeichert werden.
 * @param {*} i 
 */
function saveChangedSubtask(i){
    let editInput = document.getElementById(`editInput-${i}`).value.trim();
    subtaskList.splice(i,1, editInput);
    renderSubtasks();
}

/**
 * Diese Funktion dient zum Löschen von subtasks.
 * @param {*} i 
 */
function deleteSubtask(i){
    subtaskList.splice(i,1);
    renderSubtasks();
}

/**
 * Diese Funktion soll den onmouseover effekt wieder mit onmouseout rückgängig machen.
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
async function createTask(){
    let titleOfTask = document.getElementById('titleOfTask').value.trim();
    let descriptionOfTask = document.getElementById('descriptionOfTask').value.trim();
    let dateOfTask = document.getElementById('dateOfTask').value.trim();
    let newTaskInformation ={
        title: titleOfTask,
        description: descriptionOfTask,
        assigned: assignedPersons,
        dueDate: dateOfTask,
        category:category,
        priority:priority,
        subtaskList:subtaskList,
        status:"todo",
        checkedSubtasks:checkedSubtasks,
        checkedSubtasksCount: 0,
    }
    await postData("/tasks", newTaskInformation);
    clearForm();
    window.location.href ='../html/board.html?msg=Du hast eine neue Task erstellt';
}

/**
 * Diese Funktion dient zur Erstellung von Farben, falls die Kontakte keine zugeschriebenen Farben haben.
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

function addTaskBoard() {
    let element = document.getElementById("addTaskOverlayParent");
    element.classList.remove("d-none");
    console.log("Für AddTask");
    let content = document.getElementById('addTaskOverlay');
    content.innerHTML = `
            <div class="content" id="content">
                <form class="form-style" id="formId" onsubmit="createTask(); return false">
                    <div class="headlineBoard">
                        <h1>Add Task</h1>
                        <button onclick="cancelAddingBoard()"><img src="../assets/icon-overlay-contact/cancel.svg"></button>
                    </div>
                    <div class="form-style-top">
                        <div class="form-left" id="formLeft">
                            <div class="task-title">
                                <label>Title</label>
                                <input required placeholder="Title" id="titleOfTask" type="text" />
                            </div>
                            <div class="description-title">
                                <label for="story">Description</label>
                                <textarea placeholder="Enter your Description" id="descriptionOfTask"></textarea>
                            </div>
                            <div class="assign-to" id="assignDropdown">
                                <label>Assigned to</label>
                                <div onclick="rollContactsList()" class="assigned-to-input-and-button">
                                    <input class="assign-to-input" id="assignedPersons"
                                        value="Select Contacts to assign">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <mask id="mask0_210222_6030" style="mask-type:alpha" maskUnits="userSpaceOnUse"
                                            x="0" y="0" width="24" height="24">
                                            <rect width="24" height="24" fill="#D9D9D9" />
                                        </mask>
                                        <g mask="url(#mask0_210222_6030)">
                                            <path
                                                d="M11.3 14.3L8.69998 11.7C8.38331 11.3833 8.31248 11.0208 8.48748 10.6125C8.66248 10.2042 8.97498 10 9.42498 10H14.575C15.025 10 15.3375 10.2042 15.5125 10.6125C15.6875 11.0208 15.6166 11.3833 15.3 11.7L12.7 14.3C12.6 14.4 12.4916 14.475 12.375 14.525C12.2583 14.575 12.1333 14.6 12 14.6C11.8666 14.6 11.7416 14.575 11.625 14.525C11.5083 14.475 11.4 14.4 11.3 14.3Z"
                                                fill="#2A3647" />
                                        </g>
                                    </svg>
                                </div>
                                <div id="showAssignedPersonInitial" class="show-assigned-persons-initials"></div>
                                <div class="d-none assign-contacts-list" id="assignContactsList"></div>
                            </div>
                        </div>
                        <div class="form-right" id="formRight">
                            <div class="due-date">
                                <label>Due date</label>
                                <input required id="dateOfTask" type="date" id="start" name="trip-start"
                                    placeholder="dd/mm/jjjj">
                            </div>
                            <div class="prio-content-parent" id="prioContent">
                                <label>Prio</label>
                                <div class="prio-content">
                                    <a id='urgent' class="urgentPrio" href="#" onclick="selectPrio('urgent')">Urgent
                                        <svg class="svgUrgentPrio" width="21" height="16" viewBox="0 0 21 16" 
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M19.6528 15.2547C19.4182 15.2551 19.1896 15.1803 19.0007 15.0412L10.7487 8.958L2.49663 15.0412C2.38078 15.1267 2.24919 15.1887 2.10939 15.2234C1.96959 15.2582 1.82431 15.2651 1.68184 15.2437C1.53937 15.2223 1.40251 15.1732 1.27906 15.099C1.15562 15.0247 1.04801 14.927 0.96238 14.8112C0.876751 14.6954 0.814779 14.5639 0.780002 14.4243C0.745226 14.2846 0.738325 14.1394 0.759696 13.997C0.802855 13.7095 0.958545 13.4509 1.19252 13.2781L10.0966 6.70761C10.2853 6.56802 10.5139 6.49268 10.7487 6.49268C10.9835 6.49268 11.212 6.56802 11.4007 6.70761L20.3048 13.2781C20.4908 13.415 20.6286 13.6071 20.6988 13.827C20.7689 14.0469 20.7678 14.2833 20.6955 14.5025C20.6232 14.7216 20.4834 14.9124 20.2962 15.0475C20.1089 15.1826 19.8837 15.2551 19.6528 15.2547Z"
                                                fill="#currentColor" />
                                            <path
                                                d="M19.6528 9.50568C19.4182 9.50609 19.1896 9.43124 19.0007 9.29214L10.7487 3.20898L2.49663 9.29214C2.26266 9.46495 1.96957 9.5378 1.68184 9.49468C1.39412 9.45155 1.13532 9.29597 0.962385 9.06218C0.789449 8.82838 0.716541 8.53551 0.7597 8.24799C0.802859 7.96048 0.95855 7.70187 1.19252 7.52906L10.0966 0.958588C10.2853 0.818997 10.5139 0.743652 10.7487 0.743652C10.9835 0.743652 11.212 0.818997 11.4007 0.958588L20.3048 7.52906C20.4908 7.66598 20.6286 7.85809 20.6988 8.07797C20.769 8.29785 20.7678 8.53426 20.6955 8.75344C20.6232 8.97262 20.4834 9.16338 20.2962 9.29847C20.1089 9.43356 19.8837 9.50608 19.6528 9.50568Z"
                                                fill="#currentColor" />
                                        </svg>
                                    </a>
                                    <a id='medium' class="mediumPrio" href="#" onclick="selectPrio('medium')">Medium
                                        <svg class="svgMediumPrio" width="21" height="8" viewBox="0 0 21 8" 
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M19.1526 7.72528H1.34443C1.05378 7.72528 0.775033 7.60898 0.569514 7.40197C0.363995 7.19495 0.248535 6.91419 0.248535 6.62143C0.248535 6.32867 0.363995 6.0479 0.569514 5.84089C0.775033 5.63388 1.05378 5.51758 1.34443 5.51758H19.1526C19.4433 5.51758 19.722 5.63388 19.9276 5.84089C20.1331 6.0479 20.2485 6.32867 20.2485 6.62143C20.2485 6.91419 20.1331 7.19495 19.9276 7.40197C19.722 7.60898 19.4433 7.72528 19.1526 7.72528Z"
                                                fill="#currentColor" />
                                            <path
                                                d="M19.1526 2.48211H1.34443C1.05378 2.48211 0.775033 2.36581 0.569514 2.1588C0.363995 1.95179 0.248535 1.67102 0.248535 1.37826C0.248535 1.0855 0.363995 0.804736 0.569514 0.597724C0.775033 0.390712 1.05378 0.274414 1.34443 0.274414L19.1526 0.274414C19.4433 0.274414 19.722 0.390712 19.9276 0.597724C20.1331 0.804736 20.2485 1.0855 20.2485 1.37826C20.2485 1.67102 20.1331 1.95179 19.9276 2.1588C19.722 2.36581 19.4433 2.48211 19.1526 2.48211Z"
                                                fill="#currentColor" />
                                        </svg>
                                    </a>
                                    <a id='low' class="lowPrio" href="#" onclick="selectPrio('low')">Low
                                        <svg class="svgLowPrio" width="21" height="16" viewBox="0 0 21 16" 
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M10.2485 9.50589C10.0139 9.5063 9.7854 9.43145 9.59655 9.29238L0.693448 2.72264C0.57761 2.63708 0.47977 2.52957 0.405515 2.40623C0.33126 2.28289 0.282043 2.14614 0.260675 2.00379C0.217521 1.71631 0.290421 1.42347 0.463337 1.1897C0.636253 0.955928 0.895022 0.800371 1.18272 0.757248C1.47041 0.714126 1.76347 0.786972 1.99741 0.95976L10.2485 7.04224L18.4997 0.95976C18.6155 0.874204 18.7471 0.812285 18.8869 0.777538C19.0266 0.742791 19.1719 0.735896 19.3144 0.757248C19.4568 0.7786 19.5937 0.82778 19.7171 0.901981C19.8405 0.976181 19.9481 1.07395 20.0337 1.1897C20.1194 1.30545 20.1813 1.43692 20.2161 1.57661C20.2509 1.71629 20.2578 1.86145 20.2364 2.00379C20.215 2.14614 20.1658 2.28289 20.0916 2.40623C20.0173 2.52957 19.9195 2.63708 19.8036 2.72264L10.9005 9.29238C10.7117 9.43145 10.4831 9.5063 10.2485 9.50589Z"
                                                fill="#currentColor" />
                                            <path
                                                d="M10.2485 15.2544C10.0139 15.2548 9.7854 15.18 9.59655 15.0409L0.693448 8.47117C0.459502 8.29839 0.30383 8.03981 0.260675 7.75233C0.217521 7.46485 0.290421 7.17201 0.463337 6.93824C0.636253 6.70446 0.895021 6.54891 1.18272 6.50578C1.47041 6.46266 1.76347 6.53551 1.99741 6.7083L10.2485 12.7908L18.4997 6.7083C18.7336 6.53551 19.0267 6.46266 19.3144 6.50578C19.602 6.54891 19.8608 6.70446 20.0337 6.93824C20.2066 7.17201 20.2795 7.46485 20.2364 7.75233C20.1932 8.03981 20.0376 8.29839 19.8036 8.47117L10.9005 15.0409C10.7117 15.18 10.4831 15.2548 10.2485 15.2544Z"
                                                fill="#currentColor" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                            <div class="dropdown" id="categoryDropdown">
                                <label>Category</label>
                                <div class="assigned-to-input-and-button" onclick="rollCategories()">
                                    <input class="categoryInput" id="categoryInput" placeholder="Select Task Category"  pattern="Technical Task|User Story" required title="Bitte wähle eines der Kategorien aus.">
                                    <svg onclick="selectTaskCategory()" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <mask id="mask0_210222_6030" style="mask-type:alpha" maskUnits="userSpaceOnUse"
                                            x="0" y="0" width="24" height="24">
                                            <rect width="24" height="24" fill="#D9D9D9" />
                                        </mask>
                                        <g mask="url(#mask0_210222_6030)">
                                            <path
                                                d="M11.3 14.3L8.69998 11.7C8.38331 11.3833 8.31248 11.0208 8.48748 10.6125C8.66248 10.2042 8.97498 10 9.42498 10H14.575C15.025 10 15.3375 10.2042 15.5125 10.6125C15.6875 11.0208 15.6166 11.3833 15.3 11.7L12.7 14.3C12.6 14.4 12.4916 14.475 12.375 14.525C12.2583 14.575 12.1333 14.6 12 14.6C11.8666 14.6 11.7416 14.575 11.625 14.525C11.5083 14.475 11.4 14.4 11.3 14.3Z"
                                                fill="#2A3647" />
                                        </g>
                                    </svg>
                                </div>
                                <div class="d-none dropdownCategories" id="dropdownCategories">
                                    <div class="dropdown-categories" onclick="selectCategory('Technical Task')">
                                        <a id='category1' href="#" >Technical Task</a>
                                    </div>
                                    <div class="dropdown-categories" onclick="selectCategory('User Story')">
                                        <a id='category2' href="#" >User Story</a>
                                    </div>
                                    
                                    
                                </div>
                            </div>

                            <div class="subtask">
                                <label>Subtasks</label>
                                <div class="subtask-container">
                                    <input placeholder=" Add new task" class="subtask-input" id="subtask"
                                    type="text" />
                                <div class="subtask-add-button">
                                    <img onclick="addSubtask()" src="../assets/svg/addButton.svg" alt="">
                                </div>
                            </div>
                            <div class="subtask-list" id="subtaskList"></div>
                            </div>
                    </div>
                    </div>
            <div class="cancel-submit-buttons">
                <button class="clear-button" type="reset" onclick="clearForm()">
                    <p>Clear</p>
                    <img src="../assets/icon-overlay-contact/cancel.svg" alt="">
                </button>
                <button class="create-button" type="submit">
                    <p>Create Task</p>
                    <img src="../assets/icon-overlay-contact/check.svg" alt="">
                </button>
            </div>
            </form>
        </div>
    </div>
    </div>
    <div class="sidebar_mobile" w3-include-html="footerResponsive.html"></div>
    `;
}
  
