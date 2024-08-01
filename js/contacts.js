let firebase_URL =
  "https://join-2-b992b-default-rtdb.europe-west1.firebasedatabase.app/";
let contacts = [];
let initialArray =[];

/**
 * Diese Funktion dient dazu alle Funktionen, die für das Rendern verantwortlich sind, nach dem Laden der Seite zu rendern
 */
function initContacts() {
  renderMainContacts();
  renderContacts();
}

/**
 * Diese Funktion soll die beiden Container für den Content erstellen.
 */
function renderMainContacts() {
  let content = document.getElementById("content");
  console.log("funktioniert");
  content.innerHTML = "";
  content.innerHTML = `
    <div class="contacts-list" id="contactsList"></div>
    <div class="contact-details" id="contactDetails"></div`;
}

/**
 * Diese Funktion soll den Button und den unteren Container für die Kontakte erstellen
 */
async function renderContacts() {
  let contactsList = document.getElementById("contactsList");
  contactsList.innerHTML = "";
  contactsList.innerHTML += `
    <button  type="button" class="add-contacts-button" onclick="openNewContactOverlay()">
    <span> Add new Contact </span>
    <img class="icon" src="../assets/img/addPerson.png">
    </button>
    <div class="contacts-list-bottom" id="contactsListBottom"></div>`;
  await loadContacts("/contacts");
  renderAllContacts();
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
    console.log(contacts);
  }
}

/**
 * In dieser Funktion werden alle Kontakte gerendert.
 */
function renderAllContacts() {
  let contactsListBottom = document.getElementById("contactsListBottom");
  contactsListBottom.innerHTML = "";
  for (i = 0; i < contacts.length; i++) {
    contactsListBottom.innerHTML += `
        <div class="one-contact-container">
            <dir>
                <span class="profil_replacement_img">${profileInitials(i)}</span>
            </dir>
            <div class="two-contact-container">
                <span class="contact_font">${contacts[i]["name"]}</span>
                <span class="contact_link">${contacts[i]["email"]}</span>
            </div>
        </div>
        `;
  }  
}

/**
 * In dieser Funktion werden die Initialien der Kontakte rausgefiltert und wiedergegeben
 * 
 * @param {*} i 
 * @returns 
 */
function profileInitials(i){
        let names = contacts[i]['name'].split(' '),
            initials = names[0].substring(0, 1).toUpperCase();
        if (names.length > 1) {
            initials += names[names.length - 1].substring(0, 1).toUpperCase();
        }
        return initials;

};

/**
 * Diese Funktion soll das Overlay für "Kontakte hinzufügen" öffnen
 */
function openNewContactOverlay(){
    console.log('overlayFunction');
    let overlay = document.getElementById('overlayNewContact');
    overlay.classList.remove('d-none');
    overlay.classList.add('d-flex');
    overlay.innerHTML='';
    overlay.innerHTML= /*html*/`
    <div class="add-contact-container" id="addContactContainer">
      <div class="add-contact-left" id="addContactLeft">
        <img src="../assets/icon-overlay-contact/Join Logo.svg" alt="">
        <h2>Add Contact</h2>
        <p>Tasks are better with a team!</p>
        <img src="../assets/icon-overlay-contact/underline.svg" alt="">
      </div>
      <div class="add-contact-right" id="addContactRight">
        <div class="add-contact-right-left">
        <div class="profile-picture">
        </div>
        </div>
            <img src="..//assets/icon-overlay-contact/profile-big.svg" alt="">
        </div>
        <div class="add-contact-right-right">
        <div class="input-new-contact">
            <input type="text" placeholder="Name"class="input-field-name" id="inputFieldName">
            <input type="email" placeholder="E-Mail"class="input-field-mail" id="inputFieldEmail">
            <input type="tel" placeholder="Telefonnummer"class="input-field-phone" id="inputFieldNumber">
        </div>
        <div class="save-or-delete-buttons">
            <button class="delete-button" onclick="cancelAdding()">
            <p>Cancel</p>
            <img src="../assets/icon-overlay-contact/cancel.svg" alt="">
            
            </button>
            <button class="save-button" onclick="addContact()">
                <p>Create contact</p>
                <img src="../assets/icon-overlay-contact/check.svg" alt="">
            </button>
            
        </div>
        </div>
    </div>
    </div>
    `
}

/**
 * Diese Funktion dient dazu, die Werte aus den Inputfeldern für den neuen Kontakt auszulesen und sie an die postData() weiterzugeben
 */
async function addContact() {
  let nameValue = document.getElementById("inputFieldName").value.trim();
  let emailValue = document.getElementById("inputFieldEmail").value.trim();
  let numberValue = document.getElementById("inputFieldNumber").value.trim();
  if(nameValue&& emailValue&&numberValue){
    let newContact = { name: nameValue, email: emailValue, phone: numberValue };
  nameValue = "";
  emailValue = "";
  numberValue = "";
  console.log(newContact);
  await postData("/contacts", newContact);
  await loadContacts("/contacts");
  renderAllContacts();
  }
cancelAdding();
}

/**
 * Falls der Kontakt doch nicht mehr gespeichert werden soll, wird das Overlay geschlossen
 */
function cancelAdding() {
  let nameValue = document.getElementById("inputFieldName").value;
  let emailValue = document.getElementById("inputFieldEmail").value;
  let numberValue = document.getElementById("inputFieldNumber").value;
  nameValue = "";
  emailValue = "";
  numberValue = "";
  let overlay = document.getElementById("overlayNewContact");
  overlay.classList.add("d-none");
  overlay.classList.remove("d-flex");
}

/**
 * Diese Funktion dient dazu um die neu erhaltenen Daten im Fiebase zu speichern.
 * 
 * @param {*} path
 * @param {*} data
 */
async function postData(path = "", data) {
  await fetch(firebase_URL + path + ".json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

