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