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
    overlayChild.innerHTML = getOverlayAddTaskTemplate();
    overlayAddSetMinDate();
}

/**
 * Diese Funktion soll das aktuelle Datum holen und im Inputfeld min einstellen.
 */
function overlayAddSetMinDate(){
    // Hole das heutige Datum
    let today = new Date().toISOString().split('T')[0];
    // Setze das min-Attribut auf das heutige Datum
    document.getElementById('overlayAddDateOfTask').setAttribute('min', today);
}

/**
 * Diese Funktion dient dazu, um das Startdesign bei den Prioritätsbutton bei clear wieder auf den Startzustand zu setzen.
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
 * Diese Funktion dient dazu bei onclick die Liste der Kontakte mit den Initialien und der Checkbox zu rendern.
 */
function overlayAddRollContactsList(){
    let assignContactsList = document.getElementById('overlayAddAssignContactsList');
    assignContactsList.classList.toggle('d-none');
    // Update true or false
    overlayAddIsDropDownOpenAssigned = !assignContactsList.classList.contains('d-none');
    assignContactsList.innerHTML='';
    if(overlayAddIsDropDownOpenAssigned){
         for(let i=0; i<contacts.length; i++){
        // Überprüfen, ob der Kontakt bereits zugewiesen wurde
        //some, weil assignedPerson objekte beeinhaltet und nicht nur namen
        let isChecked = overlayAddAssignedPersons.some(person => person.name === contacts[i]['name']) ? 'checked' : '';
        assignContactsList.innerHTML += getOverlayAddPersonTemplate(i, contacts, isChecked)
        let input = document.getElementById(`overlayAddInputCheckbox-${i}`);
        if(input.checked){
            document.getElementById(`overlayAddOnePersonDiv-${i}`).style.backgroundColor = "#2a3647";
            document.getElementById(`overlayAddOnePersonDiv-${i}`).style.color = "white";
        }
    }
         // Add event listener to close the dropdown when clicking outside
         document.addEventListener('click', overlayAddCloseDropdownOnOutsideClickAssigned);
        } else {
            // Remove event listener if dropdown is closed
            document.removeEventListener('click', overlayAddCloseDropdownOnOutsideClickAssigned);
        }
}

/**
 * Diese Funktion ist dazu da, um auf das Dokument einen event listener hinzuzufügen oder wegzunehmen.
 * @param {*} event 
 */
function overlayAddCloseDropdownOnOutsideClickAssigned(event) {
    // Reference to the dropdown and toggle button
    const assignContactsList = document.getElementById('overlayAddAssignContactsList');
    const toggleButton = document.querySelector('.overlay-add-assigned-to-input-and-button');
    // Check if the clicked element is not the dropdown or the toggle button
    if (!assignContactsList.contains(event.target) && !toggleButton.contains(event.target)) {
        // Close the dropdown
        assignContactsList.classList.add('d-none');
        // Update the flag
        overlayAddIsDropDownOpenAssigned = false;
        // Remove the event listener
        document.removeEventListener('click', overlayAddCloseDropdownOnOutsideClickAssigned);
    }
}

/**
 * Diese Funktion soll die Personen, die einen Haken in der Checkbox erhalten feststellen und im Array assignedPersons abspeichern.
 * @param {*} i 
 */
function overlayAddAddAssignedPersons(i){
    let inputCheckbox = document.getElementById(`overlayAddInputCheckbox-${i}`);
    let personName = contacts[i].name;
    inputCheckbox.checked =!inputCheckbox.checked; 
    if (inputCheckbox.checked) {
        document.getElementById(`overlayAddOnePersonDiv-${i}`).style.backgroundColor = "#2a3647";
        document.getElementById(`overlayAddOnePersonDiv-${i}`).style.color = "white";
        // Prüfen, ob die Person bereits im Array vorhanden ist, bevor sie hinzugefügt wird
        if (!overlayAddAssignedPersons.includes(person => person.name === personName)) {
            let newAssign = { name: contacts[i].name, color: contacts[i].color };
            overlayAddAssignedPersons.push(newAssign);
        }
    } else {
        // Wenn die Checkbox nicht mehr ausgewählt ist, die Person aus dem Array entfernen
        overlayAddAssignedPersons = overlayAddAssignedPersons.filter(person => person.name !== personName);
        document.getElementById(`overlayAddOnePersonDiv-${i}`).style.backgroundColor = "white";
        document.getElementById(`overlayAddOnePersonDiv-${i}`).style.color = "black";
    }
    overlayAddShowAssignedPersons();
}

/**
 * Diese Funktion dient erstmal dazu, um im Inputfeld darzustellen, welche Personen zugeordnet worden.
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
 * Diese Funktion filtert die Initialien der für die jeweiligen Aufgaben ausgewählten Personen.
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
 * In dieser Funktion werden die Initialien der Kontakte rausgefiltert und wiedergegeben
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
 * Diese Funktion soll dazu dienen, die Personen auszuwählen und die Personendaten 
 * sowie der Kreis mit den Initialien drin sollen gesehen werden, wenn man draufklickt.
 * @param {*} i 
 */
function overlayAddSelectPerson(i){
    let inputCheckbox = document.getElementById('overlayAddInputCheckbox');
    inputCheckbox.innerHTML= assignedPersons += contacts[i]['name'];
    overlayAddShowAssignedPersons();
}

/**Diese Funktion soll den Wert für die Wichtigkeit abspeichern */
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
 * Diese Funktion soll zum Toggeln der d-none Klasse bei dem Kategoriefeld sein
 */
function overlayAddRollCategories(){
    let dropdownCategories = document.getElementById('overlayAddDropdownCategories');
    dropdownCategories.classList.toggle('d-none');  
    isDropDownOpenCategory = !dropdownCategories.classList.contains('d-none');   
    if(isDropDownOpenCategory){
         // Add event listener to close the dropdown when clicking outside
         document.addEventListener('click', overlayAddCloseDropdownOnOutsideClickCategory);
        } else {
            // Remove event listener if dropdown is closed
            document.removeEventListener('click', overlayAddCloseDropdownOnOutsideClickCategory);
    }
}

/**
 * Diese Funktion ist dazu da, um auf das Dokument einen event listener hinzuzufügen oder wegzunehmen.
 * @param {*} event 
 */
function overlayAddCloseDropdownOnOutsideClickCategory(event) {
    // Reference to the dropdown and toggle button
    const categories = document.getElementById('overlayAddDropdownCategories');
    const toggleButton = document.querySelector('.overlay-add-dropdown');
    // Check if the clicked element is not the dropdown or the toggle button
    if (!categories.contains(event.target) && !toggleButton.contains(event.target)) {
        // Close the dropdown
        categories.classList.add('d-none');
        // Update the flag
        overlayAddIsDropDownOpenCategory = false;
        // Remove the event listener
        document.removeEventListener('click', overlayAddCloseDropdownOnOutsideClickCategory);
    }
}

/**
 * Diese Funktion dient zum abspeichern einer Kategorie.
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
 * Diese Funktion dient dazu Unteraufgaben zu erstellen und speichern.
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
 * Diese Funktion soll die erstellten Unteraufgaben, die im array subtaskList gespeichert sind rendern.
 */
function overlayAddRenderSubtasks(){
    let subtaskListDiv = document.getElementById('overlayAddSubtaskList');
    subtaskListDiv.innerHTML='';
    for(i=0; i<overlayAddSubtaskList.length; i++){
        subtaskListDiv.innerHTML += getOverlayAddSubtaskTemplate(i, overlayAddSubtaskList);
    }
}

/**
 * Mit dieser Funktion soll man die Subtask an genau der entsprechenden stelle ändern können.
 * @param {*} i 
 */
function overlayAddEditSubtask(i){
    let subtaskListText = document.getElementById(`overlayAddSubtaskListText-${i}`);
    subtaskListText.classList.add('d-none');
    let editInput = document.getElementById(`overlayAddEditInput-${i}`);
    editInput.classList.remove('d-none');
    let editAndTrash = document.getElementById(`overlayAddEditAndTrash-${i}`);
    editAndTrash.innerHTML='';
    editAndTrash.innerHTML= `
    <img src="../assets/img/deleteTask.png" id="overlayAddLeftImage-${i}" onclick="overlayAddDeleteSubtask(${i})"class="overlay-add-deleteSubtask">
    |
    <img src="../assets/img/checkTask.png" id="overlayAddRightImage-${i}" onclick="overlayAddSaveChangedSubtask(${i})"class="overlay-add-saveSubtask">
    `
}

/**
 * Durch Aktivierung dieser Funktion können Änderungen an Unteraufgaben gespeichert werden.
 * @param {*} i 
 */
function overlayAddSaveChangedSubtask(i){
    let editInput = document.getElementById(`overlayAddEditInput-${i}`).value.trim();
    overlayAddSubtaskList.splice(i,1, editInput);
    overlayAddRenderSubtasks();
}

/**
 * Diese Funktion dient zum Löschen von subtasks.
 * @param {*} i 
 */
function overlayAddDeleteSubtask(i){
    overlayAddSubtaskList.splice(i,1);
    overlayAddRenderSubtasks();
}

/**
 * Diese Funktion soll den onmouseover effekt wieder mit onmouseout rückgängig machen.
 * @param {*} i 
 */
function overlayAddSubtaskNoHoverEffekt(i){
    let trashAndEdit = document.getElementById(`overlayAddEditAndTrash-${i}`);
    trashAndEdit.classList.add('d-none');
}

/**
 * Diese Funktion soll den onmouseover effekt hinzufügen.
 * @param {*} i 
 */
function overlayAddSubtaskHoverEffekt(i){
    let trashAndEdit = document.getElementById(`overlayAddEditAndTrash-${i}`);
    trashAndEdit.classList.remove('d-none');
}

/**
 * Diese Funktion speichert die ausgewählten Daten in einem Array und schickt sie an die Funktion, die sie an den Server verschickt.
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
    popup.innerHTML=`
        <span>Task added to board</span>
        <svg class="pop-up-added-svg"width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.9575 5.73855L22.9575 26.1929C22.9569 26.7955 22.7173 27.3732 22.2912 27.7993C21.8651 28.2253 21.2874 28.465 20.6848 28.4656L16.1394 28.4656C15.5368 28.465 14.9591 28.2253 14.533 27.7993C14.1069 27.3732 13.8673 26.7955 13.8667 26.1929L13.8667 5.73855C13.8673 5.13597 14.1069 4.55825 14.533 4.13217C14.9591 3.70608 15.5368 3.46644 16.1394 3.46584L20.6848 3.46584C21.2874 3.46644 21.8651 3.70608 22.2912 4.13217C22.7173 4.55825 22.9569 5.13597 22.9575 5.73855ZM16.1394 26.1929L20.6848 26.1929L20.6848 5.73855L16.1394 5.73855L16.1394 26.1929ZM16.1394 5.73855L16.1394 26.1929C16.1388 26.7955 15.8992 27.3731 15.4731 27.7992C15.047 28.2253 14.4693 28.4649 13.8667 28.4655L9.32128 28.4655C8.71871 28.4649 8.14099 28.2253 7.7149 27.7992C7.28882 27.3731 7.04918 26.7954 7.04858 26.1928L7.04858 5.73852C7.04918 5.13595 7.28882 4.55823 7.7149 4.13214C8.14099 3.70606 8.71871 3.46642 9.32128 3.46582L13.8667 3.46582C14.4693 3.46642 15.047 3.70606 15.4731 4.13214C15.8992 4.55823 16.1388 5.13597 16.1394 5.73855ZM9.32128 26.1928L13.8667 26.1929L13.8667 5.73855L9.32128 5.73852L9.32128 26.1928ZM9.32128 5.73852L9.32128 26.1928C9.32068 26.7954 9.08104 27.3731 8.65496 27.7992C8.22887 28.2253 7.65115 28.4649 7.04858 28.4656L2.50317 28.4656C1.9006 28.4649 1.32288 28.2253 0.896793 27.7992C0.470708 27.3731 0.23107 26.7954 0.230469 26.1928L0.230468 5.73852C0.231069 5.13595 0.470707 4.55823 0.896792 4.13214C1.32288 3.70606 1.9006 3.46642 2.50317 3.46582L7.04858 3.46582C7.65115 3.46642 8.22887 3.70606 8.65496 4.13214C9.08104 4.55823 9.32068 5.13595 9.32128 5.73852ZM2.50317 26.1928L7.04858 26.1928L7.04858 5.73852L2.50317 5.73852L2.50317 26.1928Z" fill="white"/>
            <path d="M29.7756 5.7388L29.7756 26.1931C29.775 26.7957 29.5354 27.3734 29.1093 27.7995C28.6832 28.2256 28.1055 28.4652 27.5029 28.4658L22.9575 28.4658C22.3549 28.4652 21.7772 28.2256 21.3511 27.7995C20.925 27.3734 20.6854 26.7955 20.6848 26.1929L20.6848 5.73855C20.6854 5.13597 20.925 4.5585 21.3511 4.13242C21.7772 3.70633 22.3549 3.4667 22.9575 3.46609L27.5029 3.46609C28.1055 3.4667 28.6832 3.70633 29.1093 4.13242C29.5354 4.5585 29.775 5.13622 29.7756 5.7388ZM22.9575 26.1929L27.5029 26.1931L27.5029 5.7388L22.9575 5.73855L22.9575 26.1929Z" fill="white"/>
        </svg>
    `
    // Füge das Popup-Element zum body hinzu
document.body.appendChild(popup);
    overlayAddClearForm();
    closeAddOverlay();
    tasks =[];
    await loadTasks(); 
    todoBoard();
    inProgressBoard();
    awaitFeedbackBoard();
    doneBoard();
     // Warte 5 Sekunden, bevor das Popup verschwindet
     setTimeout(() => {
        popup.remove(); // Entfernt das Popup nach 5 Sekunden
    }, 2000);
}

/**
 * Diese Funktion sorgt dafür, dass alle Inputfelder wieder geleert werden
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
    // document.getElementById('showAssignedPersonInitial').innerHTML='';
}

function closeAddOverlay(){
    overlayAddClearForm();
    let overlay = document.getElementById('atOaddTaskOverlayParent');
    overlay.classList.add('d-none');
    let overlayChild = document.getElementById('addTaskOverlay');
    overlayChild.innerHTML=``;
}