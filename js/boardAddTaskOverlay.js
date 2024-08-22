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
    overlayChild.innerHTML=/*html*/`
    <form class="overlay-add-form-style" id="overlayAddFormId" onsubmit="overlayAddCreateTask(); return false">
                    <div class="overlay-add-headline">
                        <h1>Add Task</h1>
                         <div class="overlay-add-close-div" >
                            <button class="overlay-add-close-button" type="button" onclick="closeAddOverlay()">
                                <img src="../assets/img/close.png">
                            </button>
                        </div>
                    </div>
                    
                    <div class="overlay-add-form-style-top">
                        <div class="overlay-add-form-left" id="overlayAddFormLeft">
                            <div class="overlay-add-task-title">
                                <label>Title</label>
                                <input required placeholder="Title" id="overlayAddTitleOfTask" type="text" />
                            </div>
                            <div class="overlay-add-description-title">
                                <label for="story">Description</label>
                                <textarea placeholder="Enter your Description" id="overlayAddDescriptionOfTask"></textarea>
                            </div>
                            <div class="overlay-add-assign-to" id="overlayAddAssignDropdown">
                                <label>Assigned to</label>
                                <div onclick="overlayAddRollContactsList()" class="overlay-add-assigned-to-input-and-button">
                                    <input class="overlay-add-assign-to-input" id="overlayAddAssignedPersons"
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
                                <div id="overlayAddShowAssignedPersonInitial" class="overlay-add-show-assigned-persons-initials"></div>
                                <div class="d-none overlay-add-assign-contacts-list" id="overlayAddAssignContactsList"></div>
                            </div>
                        </div>
                        <div class="overlay-add-form-right" id="overlayAddFormRight">
                            <div class="overlay-add-due-date">
                                <label>Due date</label>
                                <input required id="overlayAddDateOfTask" type="date" id="overlayAddStart" name="trip-start"
                                    placeholder="dd/mm/jjjj">
                            </div>
                            <div class="overlay-add-prio-content-parent" id="overlayAddPrioContent">
                                <label>Prio</label>
                                <div class="overlay-add-prio-content">
                                    <a id='overlayAddUrgent' class="overlay-add-urgentPrio" href="#" onclick="overlayAddSelectPrio('urgent')">Urgent
                                        <svg id="overlayAddSvgUrgentPrio"class="overlay-add-svgUrgentPrio" width="21" height="16" viewBox="0 0 21 16" 
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M19.6528 15.2547C19.4182 15.2551 19.1896 15.1803 19.0007 15.0412L10.7487 8.958L2.49663 15.0412C2.38078 15.1267 2.24919 15.1887 2.10939 15.2234C1.96959 15.2582 1.82431 15.2651 1.68184 15.2437C1.53937 15.2223 1.40251 15.1732 1.27906 15.099C1.15562 15.0247 1.04801 14.927 0.96238 14.8112C0.876751 14.6954 0.814779 14.5639 0.780002 14.4243C0.745226 14.2846 0.738325 14.1394 0.759696 13.997C0.802855 13.7095 0.958545 13.4509 1.19252 13.2781L10.0966 6.70761C10.2853 6.56802 10.5139 6.49268 10.7487 6.49268C10.9835 6.49268 11.212 6.56802 11.4007 6.70761L20.3048 13.2781C20.4908 13.415 20.6286 13.6071 20.6988 13.827C20.7689 14.0469 20.7678 14.2833 20.6955 14.5025C20.6232 14.7216 20.4834 14.9124 20.2962 15.0475C20.1089 15.1826 19.8837 15.2551 19.6528 15.2547Z"
                                                fill="#currentColor" />
                                            <path
                                                d="M19.6528 9.50568C19.4182 9.50609 19.1896 9.43124 19.0007 9.29214L10.7487 3.20898L2.49663 9.29214C2.26266 9.46495 1.96957 9.5378 1.68184 9.49468C1.39412 9.45155 1.13532 9.29597 0.962385 9.06218C0.789449 8.82838 0.716541 8.53551 0.7597 8.24799C0.802859 7.96048 0.95855 7.70187 1.19252 7.52906L10.0966 0.958588C10.2853 0.818997 10.5139 0.743652 10.7487 0.743652C10.9835 0.743652 11.212 0.818997 11.4007 0.958588L20.3048 7.52906C20.4908 7.66598 20.6286 7.85809 20.6988 8.07797C20.769 8.29785 20.7678 8.53426 20.6955 8.75344C20.6232 8.97262 20.4834 9.16338 20.2962 9.29847C20.1089 9.43356 19.8837 9.50608 19.6528 9.50568Z"
                                                fill="#currentColor" />
                                        </svg>
                                    </a>
                                    <a id='overlayAddMedium' class="overlay-add-mediumPrio_click" href="#" onclick="overlayAddSelectPrio('medium')">Medium
                                        <svg id="overlayAddSvgMediumPrio"class="overlay-add-svgMediumPrio" width="21" height="8" viewBox="0 0 21 8" 
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M19.1526 7.72528H1.34443C1.05378 7.72528 0.775033 7.60898 0.569514 7.40197C0.363995 7.19495 0.248535 6.91419 0.248535 6.62143C0.248535 6.32867 0.363995 6.0479 0.569514 5.84089C0.775033 5.63388 1.05378 5.51758 1.34443 5.51758H19.1526C19.4433 5.51758 19.722 5.63388 19.9276 5.84089C20.1331 6.0479 20.2485 6.32867 20.2485 6.62143C20.2485 6.91419 20.1331 7.19495 19.9276 7.40197C19.722 7.60898 19.4433 7.72528 19.1526 7.72528Z"
                                                fill="#currentColor" />
                                            <path
                                                d="M19.1526 2.48211H1.34443C1.05378 2.48211 0.775033 2.36581 0.569514 2.1588C0.363995 1.95179 0.248535 1.67102 0.248535 1.37826C0.248535 1.0855 0.363995 0.804736 0.569514 0.597724C0.775033 0.390712 1.05378 0.274414 1.34443 0.274414L19.1526 0.274414C19.4433 0.274414 19.722 0.390712 19.9276 0.597724C20.1331 0.804736 20.2485 1.0855 20.2485 1.37826C20.2485 1.67102 20.1331 1.95179 19.9276 2.1588C19.722 2.36581 19.4433 2.48211 19.1526 2.48211Z"
                                                fill="#currentColor" />
                                        </svg>
                                    </a>
                                    <a id='overlayAddLow' class="overlay-add-lowPrio" href="#" onclick="overlayAddSelectPrio('low')">Low
                                        <svg id="overlayAddSvgLowPrio"class="overlay-add-svgLowPrio" width="21" height="16" viewBox="0 0 21 16" 
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
                            <div class="overlay-add-dropdown" id="overlayAddCategoryDropdown">
                                <label>Category</label>
                                <div class="overlay-add-assigned-to-input-and-button" onclick="overlayAddRollCategories()">
                                    <input class="overlay-add-categoryInput" id="overlayAddCategoryInput" placeholder="Select Task Category"  pattern="Technical Task|User Story" required title="Bitte wähle eines der Kategorien aus.">
                                    <svg width="24" height="24" viewBox="0 0 24 24"
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
                                <div class="d-none overlay-add-dropdownCategories" id="overlayAddDropdownCategories">
                                    <div class="overlay-add-dropdown-categories" onclick="overlayAddSelectCategory('Technical Task')">
                                        <a id='overlayAddCategory1' href="#" >Technical-Task</a>
                                    </div>
                                    <div class="overlay-add-dropdown-categories" onclick="overlayAddSelectCategory('User Story')">
                                        <a id='overlayAddCategory2' href="#" >User Story</a>
                                    </div>
                                    
                                    
                                </div>
                            </div>

                            <div class="subtask">
                                <label>Subtasks</label>
                                <div class="overlay-add-subtask-container">
                                    <input placeholder=" Add new task" class="overlay-add-subtask-input" id="overlayAddSubtask"
                                    type="text" />
                                <div onclick="overlayAddAddSubtask()" class="overlay-add-subtask-add-button">
                                    <img src="../assets/svg/addButton.svg" alt="">
                                </div>
                            </div>
                            <div class="overlay-add-subtask-list" id="overlayAddSubtaskList"></div>
                            </div>
                    </div>
                    </div>
            <div class="overlay-add-cancel-submit-buttons">
                <button class="overlay-add-clear-button" type="reset" onclick="overlayAddClearForm()">
                    <p>Clear</p>
                    <img src="../assets/icon-overlay-contact/cancel.svg" alt="">
                </button>
                <button class="overlay-add-create-button" type="submit">
                    <p>Create Task</p>
                    <img src="../assets/icon-overlay-contact/check.svg" alt="">
                </button>
            </div>
            </form>
    
    `;
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
        assignContactsList.innerHTML +=`
        <div class="overlay-add-one-person-div" onclick="overlayAddAddAssignedPersons(${i})" id="overlayAddOnePersonDiv-${i}">
            <div class="overlay-add-one-person-div-left">
                <div class="overlay-add-assigned-person-initials" style="background-color:${contacts[i]['color']}; color:white">${overlayAddProfileInitials(i)}</div>
                <div>${contacts[i]['name']}</div>
            </div>
            <input id="overlayAddInputCheckbox-${i}" class="overlay-add-assigen_checkbox" type="checkbox" ${isChecked}>
        </div>`;
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
        showAssignedPersons.innerHTML += `
        <div style="background-color:${overlayAddAssignedPersons[i].color}; color:white" class="overlay-add-selected-person-initals-div">${overlayAddAssignedPersonsInitials(i)}</div>`;
} // Wenn es mehr als 6 zugewiesene Personen gibt, ein weiteres "Plus"-Div hinzufügen
if (overlayAddAssignedPersons.length > 6) {
    showAssignedPersons.innerHTML += `
        <div style="background-color:white; color:black" class="overlay-add-selected-person-initals-div">
            +${overlayAddAssignedPersons.length - 6}
        </div>`;
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
    let subtaskListDiv= document.getElementById('overlayAddSubtaskList');
    subtaskListDiv.innerHTML='';
    for(i=0; i<overlayAddSubtaskList.length; i++){
        subtaskListDiv.innerHTML +=`
        <ul class="overlay-add-oneSubtask" id="overlayAddOneSubtask-${i}" onmouseover="overlayAddSubtaskHoverEffekt(${i})" onmouseout= "overlayAddSubtaskNoHoverEffekt(${i})">
            <li class="" id="overlayAddSubtaskListText-${i}">${overlayAddSubtaskList[i]}</li>
            <input class="d-none overlay-add-editInput" value="${overlayAddSubtaskList[i]}" id="overlayAddEditInput-${i}">
            <div class="d-none overlay-add-editAndTrash" id="overlayAddEditAndTrash-${i}">
                <img src="../assets/img/editTask.png" id="overlayAddLeftImage-${i}" onclick="overlayAddEditSubtask(${i})"class="overlay-add-editSubtask">
                |
                <img src="../assets/img/deleteTask.png" id="overlayAddRightImage-${i}" onclick="overlayAddDeleteSubtask(${i})"class="overlay-add-deleteSubtask">
            </div>
        </ul>
        `;
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
    overlayAddClearForm();
    closeAddOverlay();
    tasks =[];
    await loadTasks();
setTimeout(() => {    
    todoBoard();
    inProgressBoard();
    awaitFeedbackBoard();
    doneBoard();}, 2000);
     // Warte 5 Sekunden, bevor das Popup verschwindet
     setTimeout(() => {
        popup.remove(); // Entfernt das Popup nach 5 Sekunden
    }, 5000);
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
