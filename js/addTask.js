let firebase_URL =
  "https://join-2-b992b-default-rtdb.europe-west1.firebasedatabase.app/";
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
    inputCheckbox.checked =!inputCheckbox.checked; 
    if (inputCheckbox.checked) {
        document.getElementById(`onePersonDiv-${i}`).style.backgroundColor = "#2a3647";
        document.getElementById(`onePersonDiv-${i}`).style.color = "white";
        // Prüfen, ob die Person bereits im Array vorhanden ist, bevor sie hinzugefügt wird
        if (!assignedPersons.includes(person => person.name === personName)) {
            let newAssign = { name: contacts[i].name, color: contacts[i].color };
            assignedPersons.push(newAssign);
        }
    } else {
        // Wenn die Checkbox nicht mehr ausgewählt ist, die Person aus dem Array entfernen
        assignedPersons = assignedPersons.filter(person => person.name !== personName);
        document.getElementById(`onePersonDiv-${i}`).style.backgroundColor = "white";
        document.getElementById(`onePersonDiv-${i}`).style.color = "black";
    }
    showAssignedPersons();
}

/**
 * Diese Funktion dient dazu bei onclick die Liste der Kontakte mit den Initialien und der Checkbox zu rendern.
 */
function rollContactsList() {
    let assignContactsList = document.getElementById('assignContactsList');
    assignContactsList.classList.toggle('d-none');

    // Update true or false
    isDropDownOpenAssigned = !assignContactsList.classList.contains('d-none');
    assignContactsList.innerHTML = '';

    if (isDropDownOpenAssigned) {
        for (let i = 0; i < contacts.length; i++) {
            // Überprüfen, ob der Kontakt bereits zugewiesen wurde
            let isChecked = assignedPersons.some(person => person.name === contacts[i]['name']) ? 'checked' : '';
            
            assignContactsList.innerHTML += /*html*/`
                <div class="one-person-div" onclick="addAssignedPersons(${i})" id="onePersonDiv-${i}">
                    <div class="one-person-div-left">
                        <div class="assigned-person-initials" style="background-color:${contacts[i]['color']}; color:white">
                            ${profileInitials(i)}
                        </div>
                        <div>${contacts[i]['name']}</div>
                    </div>
                    <input id="inputCheckbox-${i}" class="assign-checkbox" type="checkbox" ${isChecked}>
                    <label for="inputCheckbox-${i}"></label>
                </div>`;
            
            let input = document.getElementById(`inputCheckbox-${i}`);
            if (input.checked) {
                document.getElementById(`onePersonDiv-${i}`).style.backgroundColor = "#2a3647";
                document.getElementById(`onePersonDiv-${i}`).style.color = "white";
            }
        }

        // Add event listener to close the dropdown when clicking outside
        document.addEventListener('click', closeDropdownOnOutsideClickAssigned);
    } else {
        // Remove event listener if dropdown is closed
        document.removeEventListener('click', closeDropdownOnOutsideClickAssigned);
    }
}


/**
 * Diese Funktion ist dazu da, um auf das Dokument einen event listener hinzuzufügen oder wegzunehmen.
 * @param {*} event 
 */
function closeDropdownOnOutsideClickAssigned(event) {
    // Reference to the dropdown and toggle button
    const assignContactsList = document.getElementById('assignContactsList');
    const toggleButton = document.querySelector('.assigned-to-input-and-button');
    // Check if the clicked element is not the dropdown or the toggle button
    if (!assignContactsList.contains(event.target) && !toggleButton.contains(event.target)) {
        // Close the dropdown
        assignContactsList.classList.add('d-none');
        // Update the flag
        isDropDownOpenAssigned = false;
        // Remove the event listener
        document.removeEventListener('click', closeDropdownOnOutsideClickAssigned);
    }
}

/**
 * Diese Funktion dient erstmal dazu, um im Inputfeld darzustellen, welche Personen zugeordnet worden.
 */
function showAssignedPersons() {
    let showAssignedPersons = document.getElementById('showAssignedPersonInitial');
    showAssignedPersons.innerHTML='';
    for(i=0;i<Math.min(assignedPersons.length, 5);i++){
        showAssignedPersons.innerHTML += `
        <div style="background-color:${assignedPersons[i].color}; color:white" class="selected-person-initals-div">${assignedPersonsInitials(i)}</div>`;
} // Wenn es mehr als 6 zugewiesene Personen gibt, ein weiteres "Plus"-Div hinzufügen
if (assignedPersons.length > 6) {
    showAssignedPersons.innerHTML += `
        <div style="background-color:white; color:black" class="selected-person-initals-div">
            +${assignedPersons.length - 6}
        </div>`;
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

// /**
//  * Diese Funktion soll dazu dienen, die Personen auszuwählen und die Personendaten 
//  * sowie der Kreis mit den Initialien drin sollen gesehen werden, wenn man draufklickt.
//  * @param {*} i 
//  */
// function selectPerson(i){
//     let inputCheckbox = document.getElementById('inputCheckbox');
//     inputCheckbox.innerHTML= assignedPersons += contacts[i]['name'];
//     showAssignedPersons();
// }

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
    isDropDownOpenCategory = !dropdownCategories.classList.contains('d-none');   
    if(isDropDownOpenCategory){
         // Add event listener to close the dropdown when clicking outside
         document.addEventListener('click', closeDropdownOnOutsideClickCategory);
        } else {
            // Remove event listener if dropdown is closed
            document.removeEventListener('click', closeDropdownOnOutsideClickCategory);
    }
}

/**
 * Diese Funktion ist dazu da, um auf das Dokument einen event listener hinzuzufügen oder wegzunehmen.
 * @param {*} event 
 */
function closeDropdownOnOutsideClickCategory(event) {
    // Reference to the dropdown and toggle button
    const categories = document.getElementById('dropdownCategories');
    const toggleButton = document.querySelector('.dropdown');
    // Check if the clicked element is not the dropdown or the toggle button
    if (!categories.contains(event.target) && !toggleButton.contains(event.target)) {
        // Close the dropdown
        categories.classList.add('d-none');
        // Update the flag
        isDropDownOpenCategory = false;
        // Remove the event listener
        document.removeEventListener('click', closeDropdownOnOutsideClickCategory);
    }
}
/**
 * Diese Funktion sorgt dafür, dass alle Inputfelder wieder geleert werden
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
 * Diese Funktion dient dazu, um das Startdesign bei den Prioritätsbutton bei clear wieder auf den Startzustand zu setzen.
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
        subtaskListDiv.innerHTML +=/*html*/`
        <ul class="oneSubtask" id="oneSubtask-${i}" class="oneSubtask" onmouseover="subtaskHoverEffekt(${i})" onmouseout= "subtaskNoHoverEffekt(${i})">
            <li class="" id="subtaskListText-${i}">${subtaskList[i]}</li>
            <input class="d-none editInput" value="${subtaskList[i]}" id="editInput-${i}">
            <div class="d-none editAndTrash" id="editAndTrash-${i}">
                <img src="../assets/img/editTask.png" id="leftImage-${i}" onclick="editSubtask(${i})"class="editSubtask">
                |
                <img src="../assets/img/deleteTask.png" id="rightImage-${i}" onclick="deleteSubtask(${i})"class="deleteSubtask">
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
    <img src="../assets/img/deleteTask.png" id="leftImage-${i}" onclick="deleteSubtask(${i})"class="deleteSubtask">
    |
    <img src="../assets/img/checkTask.png" id="rightImage-${i}" onclick="saveChangedSubtask(${i})"class="saveSubtask">
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
    let createButton= document.getElementById('createTaskButton')
    createButton.disabled = true;
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
    // Erstelle das Popup-Element
const popup = document.createElement('div');
popup.classList.add('pop-up-added');
    popup.innerHTML=`
        <span>Task added to board</span>
        <svg class="pop-up-added-svg"width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.9575 5.73855L22.9575 26.1929C22.9569 26.7955 22.7173 27.3732 22.2912 27.7993C21.8651 28.2253 21.2874 28.465 20.6848 28.4656L16.1394 28.4656C15.5368 28.465 14.9591 28.2253 14.533 27.7993C14.1069 27.3732 13.8673 26.7955 13.8667 26.1929L13.8667 5.73855C13.8673 5.13597 14.1069 4.55825 14.533 4.13217C14.9591 3.70608 15.5368 3.46644 16.1394 3.46584L20.6848 3.46584C21.2874 3.46644 21.8651 3.70608 22.2912 4.13217C22.7173 4.55825 22.9569 5.13597 22.9575 5.73855ZM16.1394 26.1929L20.6848 26.1929L20.6848 5.73855L16.1394 5.73855L16.1394 26.1929ZM16.1394 5.73855L16.1394 26.1929C16.1388 26.7955 15.8992 27.3731 15.4731 27.7992C15.047 28.2253 14.4693 28.4649 13.8667 28.4655L9.32128 28.4655C8.71871 28.4649 8.14099 28.2253 7.7149 27.7992C7.28882 27.3731 7.04918 26.7954 7.04858 26.1928L7.04858 5.73852C7.04918 5.13595 7.28882 4.55823 7.7149 4.13214C8.14099 3.70606 8.71871 3.46642 9.32128 3.46582L13.8667 3.46582C14.4693 3.46642 15.047 3.70606 15.4731 4.13214C15.8992 4.55823 16.1388 5.13597 16.1394 5.73855ZM9.32128 26.1928L13.8667 26.1929L13.8667 5.73855L9.32128 5.73852L9.32128 26.1928ZM9.32128 5.73852L9.32128 26.1928C9.32068 26.7954 9.08104 27.3731 8.65496 27.7992C8.22887 28.2253 7.65115 28.4649 7.04858 28.4656L2.50317 28.4656C1.9006 28.4649 1.32288 28.2253 0.896793 27.7992C0.470708 27.3731 0.23107 26.7954 0.230469 26.1928L0.230468 5.73852C0.231069 5.13595 0.470707 4.55823 0.896792 4.13214C1.32288 3.70606 1.9006 3.46642 2.50317 3.46582L7.04858 3.46582C7.65115 3.46642 8.22887 3.70606 8.65496 4.13214C9.08104 4.55823 9.32068 5.13595 9.32128 5.73852ZM2.50317 26.1928L7.04858 26.1928L7.04858 5.73852L2.50317 5.73852L2.50317 26.1928Z" fill="white"/>
            <path d="M29.7756 5.7388L29.7756 26.1931C29.775 26.7957 29.5354 27.3734 29.1093 27.7995C28.6832 28.2256 28.1055 28.4652 27.5029 28.4658L22.9575 28.4658C22.3549 28.4652 21.7772 28.2256 21.3511 27.7995C20.925 27.3734 20.6854 26.7955 20.6848 26.1929L20.6848 5.73855C20.6854 5.13597 20.925 4.5585 21.3511 4.13242C21.7772 3.70633 22.3549 3.4667 22.9575 3.46609L27.5029 3.46609C28.1055 3.4667 28.6832 3.70633 29.1093 4.13242C29.5354 4.5585 29.775 5.13622 29.7756 5.7388ZM22.9575 26.1929L27.5029 26.1931L27.5029 5.7388L22.9575 5.73855L22.9575 26.1929Z" fill="white"/>
        </svg>
    `

// Füge das Popup-Element zum body hinzu
document.body.appendChild(popup);
   // Warte 5 Sekunden, bevor die Seite weitergeleitet wird
    setTimeout(() => {
    window.location.href = '../html/board.html?msg=Du hast eine neue Task erstellt';
  }, 2000); 
  createButton.disabled = false;
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