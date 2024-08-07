let firebase_URL =
  "https://join-2-b992b-default-rtdb.europe-west1.firebasedatabase.app/";
let contacts=[];
let assignedPersons=[];
let category;
let priority;
let subtaskList=[];
let taskInformation=[];
let initials=[];

function initAddTask() {
    renderMainForm();
}

async function renderMainForm(){
    await loadContacts();
    // let content = document.getElementById('content');
    // content.innerHTML='';
    // content.innerHTML=``
    // assignedTo();
}

function showAssignedPersons(){
    if(this == clicked){
        let showAssignedPersons = document.getElementById('assignedPersons');
        showAssignedPersons.innerHTML='';
        for(i=0; i<assignedPersons.length; i++){
            showAssignedPersons.innerHTML+=`<div class="assigned-person-initials">${profileInitials(i)}</div>`
        }
    }else if(this !== clicked){

    }
}

function rollContactsList(){
    console.log('allesklar');
    let assignContactsList = document.getElementById('assignContactsList');
    assignContactsList.classList.remove('d-none');
    assignContactsList.innerHTML='';
    for(i=0; i<contacts.length; i++){
        assignContactsList.innerHTML +=`
        <div>
            <div class="assigned-person-initials">${profileInitials(i)}</div>
            <div>${contacts[i]['name']}</div>
            <input id="inputCheckbox"type="checkbox" onclick="showAssignedPersons(this, ${i})">
        </div>`
    }
}

/**
 * Diese Funktion rendert alle Personen aus der Kontaktliste, damit man sie im Projekt verbinden kann.
 */
function assignedTo(){
    let list = document.getElementById('dropdownAssignedTo');
    list.innerHTML='';
    for(i=0; i<contacts.length; i++){
        list.innerHTML+=`
            <a id='category1' href="#">${contacts[i]['name']}<input id="inputCheckbox"type="checkbox"></a>`
    }  
}
// onclick="selectPerson(${i})"
/**
 * In dieser Funktion werden die Initialien der Kontakte rausgefiltert und wiedergegeben
 *
 * @param {*} i
 * @returns
 */
function profileInitials(i) {
    let names = assignedPersons[i].split(" "),
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

    inputCheckbox.innerHTML=
    assignedPersons += contacts[i]['name'];
    showAssignedPersons();
}

/**Diese Funktion soll den Wert für die Wichtigkeit abspeichern */
function selectPrio(x){
    priority= x;
}
/**
 * Diese Funktion sorgt dafür, dass alle Inputfelder wieder geleert werden
 */
function clearForm(){
    assignedPersons=[];
    category='';
    subtaskList='';
    priority='';
    showAssignedPersons();
}

/**
 * Diese Funktion dient zum abspeichern einer Kategorie.
 * @param {*} x 
 */
function selectCategory(x){
    category=x;
}

function addSubtask(){
    let subtask= document.getElementById('subtask').value.trim();
    subtaskList += subtask;
    subtask.value='';
}
/**
 * Diese Funktion speichert die ausgewählten Daten in einem Array und schickt sie an die Funktion, die sie an den Server verschickt.
 */
async function createTask(){
    let titleOfTask = document.getElementById('titleOfTask').value.trim();
    let descriptionOfTask = document.getElementById('descriptionOfTask').value.trim();
    assignedPersons;
    let dateOfTask = document.getElementById('dateOfTask').value.trim();
    category;
    priority;
    subtaskList;
    let newTaskInformation ={
        title: titleOfTask,
        description: descriptionOfTask,
        assigned: assignedPersons,
        dueDate: dateOfTask,
        category:category,
        priority:priority,
        subtaskList:subtaskList,
    }
    await postData("/tasks", newTaskInformation);
    clearForm();
}

async function postData(path="", data){
    await fetch(firebase_URL + path + ".json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
}

/**
 * In dieser Funktion werden die Daten aus dem Firebase geladen.
 *
 * @param {*} path
 */
async function loadContacts(path = "/contacts") {
    let response = await fetch(firebase_URL + path + ".json");
    let responseToJson = await response.json();
    console.log(responseToJson);
    if (responseToJson) {
      Object.keys(responseToJson).forEach((key) => {
        contacts.push({
          id: key,
          name: responseToJson[key]["name"],
          email: responseToJson[key]["email"],
          phone: responseToJson[key]["phone"],
        });
      });
      // Sortiere die Kontakte alphabetisch nach Name
      contacts.sort((a, b) => a.name.localeCompare(b.name));
    }
  }