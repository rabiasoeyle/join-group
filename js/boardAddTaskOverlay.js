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
    editAndTrash.innerHTML= getOverlayAddEditSubtaskTemplate(i);
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
    popup.innerHTML= getTaskAddedPopupTemplate()
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