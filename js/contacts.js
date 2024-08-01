let firebase_URL = "https://join-2-b992b-default-rtdb.europe-west1.firebasedatabase.app/";
let contacts=[];

/**
 * Diese Funktion dient dazu alle Funktionen, die für das Rendern verantwortlich sind, nach dem Laden der Seite zu rendern
 */
function initContacts(){
    renderMainContacts();
    renderContacts(); 
}

/**
 * Diese Funktion soll die beiden Container für den Content erstellen.
 */
function renderMainContacts(){
    let content = document.getElementById('content');
    console.log('funktioniert');
    content.innerHTML='';
    content.innerHTML=`
    <div class="contacts-list" id="contactsList"></div>
    <div class="contact-details" id="contactDetails"></div`
}

/**
 * Diese Funktion soll den Button und den unteren Container für die Kontakte erstellen
 */
async function renderContacts(){
    let contactsList = document.getElementById('contactsList');
    contactsList.innerHTML='';
    contactsList.innerHTML += `
    <button  type="button" class="add-contacts-button" onclick="openNewContactOverlay()">
    <span> Add new Contact </span>
    <img class="icon" src="../assets/img/addPerson.png">
    </button>
    <div class="contacts-list-bottom" id="contactsListBottom"></div>`
    await loadContacts('/contacts');
    renderAllContacts();
}

async function loadContacts(path="/contacts"){
    let response = await fetch(firebase_URL + path + '.json');
    let responseToJson = await response.json();
    console.log(responseToJson);
    if (responseToJson) {
        Object.keys(responseToJson).forEach(key => {
            contacts.push({
                id: key,
                name: responseToJson[key]['name'],
                email: responseToJson[key]['phone'],
                phone: responseToJson[key]['email'],
            })
        });
        console.log(contacts);
    }
}

function renderAllContacts(){
    let contactsListBottom = document.getElementById('contactsListBottom');
    contactsListBottom.innerHTML =''
    for(i=0; i<contacts.length; i++){
        contactsListBottom.innerHTML +=`
        <div class="one-contact-container">
            <span>${contacts[i]['name']}</span>
            <span>${contacts[i]['email']}</span>
            <span>${contacts[i]['phone']}</span>
        </div>
        `
    }
}

/**
 * Diese Funktion soll das Overlay für "Kontakte hinzufügen" öffnen
 */
function openNewContactOverlay(){
    console.log('overlayFunction');
    let overlay = document.getElementById('overlayNewContact');
    overlay.classList.remove('d-none');
    overlay.classList.add('d-flex');
    overlay.innerHTML='';
    overlay.innerHTML=`
    <div class="add-contact-left" id="addContactLeft">
        <h2>Add Contact</h2>
    </div>
    <div class="add-contact-right" id="addContactRight">
        <div class="input-new-contact">
            <input type="text" placeholder="Name"class="input-field" id="inputFieldName">
            <input type="email" placeholder="E-Mail"class="input-field" id="inputFieldEmail">
            <input type="number" placeholder="Telefonnummer"class="input-field" id="inputFieldNumber">
        </div>
        <div class="save-or-delete-buttons">
            <button class="save-button" onclick="addContact()">Speichern</button>
            <button class=""onclick="cancelAdding()"> x Abbrechen</button>
        </div>
    </div>`

}

/**
 * Diese Funktion dient dazu, die Werte aus den Inputfeldern für den neuen Kontakt auszulesen und sie an die postData() weiterzugeben
 */
async function addContact(){
    let nameValue = document.getElementById('inputFieldName').value;
    let emailValue = document.getElementById('inputFieldEmail').value;
    let numberValue = document.getElementById('inputFieldNumber').value;
    let newContact = { name: nameValue, email:emailValue, phone: numberValue };
    nameValue = '';
    emailValue = '';
    numberValue =''; 
    console.log(newContact);
    await postData('/contacts', newContact);
    await loadContacts('/contacts');
    renderAllContacts();
}

/**
 * Falls der Kontakt doch nicht mehr gespeichert werden soll, wird das Overlay geschlossen
 */
function cancelAdding(){
    let nameValue = document.getElementById('inputFieldName').value;
    let emailValue = document.getElementById('inputFieldEmail').value;
    let numberValue = document.getElementById('inputFieldNumber').value;
    nameValue = '';
    emailValue = '';
    numberValue =''; 
    let overlay = document.getElementById('overlayNewContact');
    overlay.classList.add('d-none');
    overlay.classList.remove('d-flex');
}

/**
 * Diese Funktion dient dazu um die neu erhaltenen Daten im Fiebase zu speichern
 * @param {*} path 
 * @param {*} data 
 */
async function postData(path='', data){
    await fetch(firebase_URL + path + '.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
}

