let firebase_URL =
  "https://join-2-b992b-default-rtdb.europe-west1.firebasedatabase.app/";
let contacts=[];
let assignedPersons=[];
let category;
let priority;
let subtaskList=[];
let taskInformation=[];

function initAddTask() {
    renderMainForm();
}

async function renderMainForm(){
    await loadContacts();
    let content = document.getElementById('content');
    content.innerHTML='';
    content.innerHTML=`
    <h1>Add Task</h1>
    <form class="form-style" id="formId" onsubmit="createTask()">
        <div class="form-style-top">
            <div class="form-left" id="formLeft">
                <div>
                    <label>Title</label>
                    <input required id="titleOfTask"type="name"/>
                </div>
                <div>
                    <label for="story">Tell us your story:</label>
                    <textarea id="descriptionOfTask"></textarea>
                </div>
                <div class="dropdown" id="categoryDropdown">
                    <span>Assigned to</span>
                    <span>${assignedPersons}</span>
                    <div class="dropdown-assigned-to dropdown-content" onclick="rollContactsList()" id="dropdownAssignedTo">  
                    </div>
                </div>
            </div>
            <div class="form-right" id="formRight">
                <div>
                    <label>Due date</label>
                    <input required id="dateOfTask"type="date" id="start" name="trip-start" value="2018-07-22" min="2018-01-01" max="2018-12-31"/>
                </div>
                <div class="prio-content-parent" id="prioContent">
                    <span>Prio</span>
                    <div class="prio-content">
                        <a id='category1' href="#" onclick="selectPrio('urgent')">Urgent</a>
                        <a id='category2' href="#" onclick="selectPrio('medium')">Medium</a>
                        <a id='category3'href="#" onclick="selectPrio('low')">Low</a>
                    </div>
                </div>
                <div class="dropdown" id="categoryDropdown">
                    <span>Category</span>
                    <div class="dropdown-content">
                        <a id='category1' href="#" onclick="selectCategory('Category 1')">Category 1</a>
                        <a id='category2' href="#" onclick="selectCategory('Category 2')">Category 2</a>
                        <a id='category3'href="#" onclick="selectCategory('Category 3')">Category 3</a>
                        <!-- Add more categories as needed -->
                    </div>
                </div>
                <div>
                    <label>Subtasks</label>
                    <input id="subtask"type="text"/>
                        <span onclick="addSubtask()">+</span>
                    </input>
                </div>
            </div>
        </div>
        <div class="cancel-submit-buttons">
            <button type="reset" onclick="clearForm()">x Cancel</button>
            <button type="submit">Create Task</button>
        </div>
    </form>
    `
    assignedTo();
}

/**
 * Diese Funktion rendert alle Personen aus der Kontaktliste, damit man sie im Projekt verbinden kann.
 */
function assignedTo(){
    let list = document.getElementById('dropdownAssignedTo');
    list.innerHTML='';
    for(i=0; i<contacts.length; i++){
        list.innerHTML+=`
            <a id='category1' href="#" onclick="selectPerson(${i})">${contacts[i]['name']}</a>`
    }  
}

/**
 * Diese Funktion soll dazu dienen, die Personen auszuwählen und die Personendaten 
 * sowie der Kreis mit den Initialien drin sollen gesehen werden, wenn man draufklickt.
 * @param {*} i 
 */
function selectPerson(i){
    assignedPersons += contacts[i]['name'];
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
}

/**
 * Diese Funktion soll dazu dienen, dass die Kontakte aufgezeigt werden
 */
function rollContactsList(){

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