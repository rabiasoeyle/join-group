let firebase_URL =
  "https://join-2-b992b-default-rtdb.europe-west1.firebasedatabase.app/";
let contacts = [];
let initialArray = [];

/**
 * Diese Funktion dient dazu alle Funktionen, die für das Rendern verantwortlich sind, nach dem Laden der Seite zu rendern
 */
function initContacts() {
  renderMainContacts();
  renderContacts();
  renderContactDetails();
}

/**
 * Diese Funktion soll die beiden Container für den Content erstellen.
 */
function renderMainContacts() {
  let content = document.getElementById("content");
  content.innerHTML = "";
  content.innerHTML = renderMainContactsHTML();
}

/**
 * Diese Funktion dient zum rendern von der Überschrift des rechten Contact contents
 */
function renderContactDetails() {
  let content = document.getElementById("contactDetails");
  content.innerHTML = "";
  content.innerHTML = renderContactDetailsHTML();
}

/**
 * Diese Funktion soll den Button und den unteren Container für die Kontakte erstellen
 */
async function renderContacts() {
  let contactsList = document.getElementById("contactsList");
  contactsList.innerHTML = "";
  contactsList.innerHTML += renderContactsHTML();
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
  }
}

/**
 * In dieser Funktion werden alle Kontakte gerendert.
 */
function renderAllContacts() {
  let contactsListBottom = document.getElementById("contactsListBottom");
  contactsListBottom.innerHTML = "";
  // Kontakte nach Anfangsbuchstaben gruppieren
  let groupedContacts = groupContactsByInitial(contacts);
  // Durch die gruppierten Kontakte iterieren
  for (let initial in groupedContacts) {
    // Abstand und Border für den neuen Buchstaben
    contactsListBottom.innerHTML += renderAllGroupinitialsHTML(initial);
    // Kontakte dieser Gruppe rendern
    groupedContacts[initial].forEach((contact) => {
      contactsListBottom.innerHTML += renderAllContactsHTML(contact);
    });
  }
}

/**
 * In dieser Funktion werden die Initialien der Kontakte rausgefiltert und wiedergegeben
 *
 * @param {*} i
 * @returns
 */
function profileInitials(i) {
  let names = contacts[i]["name"].split(" "),
    initials = names[0].substring(0, 1).toUpperCase();
  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
}

/**
 * Diese Funktion soll das Overlay für "Kontakte hinzufügen" öffnen
 */
function openNewContactOverlay() {
  let overlay = document.getElementById("overlayNewContact");
  overlay.classList.remove("d-none");
  overlay.classList.add("d-flex");
  overlay.innerHTML = "";
  overlay.innerHTML = /*html*/ `
    <div class="add-contact-container" id="addContactContainer">
      <div class="add-contact-left" id="addContactLeft">
        <img class="add-contact-left-img" src="../assets/icon-overlay-contact/Join Logo.svg" alt="">
        <h2>Add Contact</h2>
        <p><span class="underline">Tasks are</span> better with a team!</p>
      </div>
      <div class="add-contact-right" id="addContactRight">
         <div class="add-contact-right-left">
            <img class="profile-picture" src="..//assets/icon-overlay-contact/profile-big.svg" alt="">
        </div>
        <div class="add-contact-right-right">
          <div class="input-new-contact">
            <div class="cancel-button">
              <button onclick="cancelAdding()"><img src="../assets/icon-overlay-contact/cancel.svg" alt=""></button>
            </div>
             <input type="text" placeholder="Name"class="input-field-name" id="inputFieldName">
             <input type="email" placeholder="E-Mail"class="input-field-mail" id="inputFieldEmail">
             <input type="tel" placeholder="Phone"class="input-field-phone" id="inputFieldNumber">
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
    </div>
    `;
}

/**
 * In dieser Funktion werden Kontakte bearbeitet
 * @param {*} i
 */
function editContactOverlay(i) {
  let overlay = document.getElementById("overlayNewContact");
  overlay.classList.remove("d-none");
  overlay.classList.add("d-flex");
  overlay.innerHTML = "";
  overlay.innerHTML = editContactOverlayHTML();
  editContactOverlayRight(i);
  editContactOverlayLeft();
}

/**
 * Diese Funktion soll die Linke Seite des editOverlays rendern
 */
function editContactOverlayLeft() {
  let editContactLeft = document.getElementById("addContactLeft");
  editContactLeft.innerHTML = "";
  editContactLeft.innerHTML = editContactOverlayLeftHTML();
}

/**
 * Diese Funktion soll die Rechte Seite des editOverlays rendern
 * @param {*} i
 */
function editContactOverlayRight(i) {
  let editContactRight = document.getElementById("addContactRight");
  editContactRight.innerHTML = "";
  editContactRight.innerHTML = editContactOverlayRightHTML(i);
}

/**
 * Diese Funktion soll dazu dienen, die veränderten Infos von den Kontakten auszulesen und an die putData() weiterzugeben.
 */
async function editContact(i) {
  let nameValue = document.getElementById("inputFieldName").value.trim();
  let emailValue = document.getElementById("inputFieldEmail").value.trim();
  let numberValue = document.getElementById("inputFieldNumber").value.trim();
  if (nameValue && emailValue && numberValue) {
    let updatedContact = {
      name: nameValue,
      email: emailValue,
      phone: numberValue,
    };
    nameValue = "";
    emailValue = "";
    numberValue = "";
    let id = contacts[i]["id"];
    await putData(`/contacts/${id}`, updatedContact);
    contacts = [];
    await loadContacts("/contacts/");
    renderAllContacts();
    contactDetails(i);
  }
  cancelAdding();
}

/**
 * Diese Funktion dient dazu, um die geänderten Kontaktinfos genau an der richtigen Stelle zu ändern.
 *
 * @param {*} path
 * @param {*} data
 */
async function putData(path = "", data) {
  await fetch(firebase_URL + path + ".json", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

/**
 * Diese Funktion dient dazu, die Werte aus den Inputfeldern für den neuen Kontakt auszulesen und sie an die postData() weiterzugeben.
 */
async function addContact() {
  let nameValue = document.getElementById("inputFieldName").value.trim();
  let emailValue = document.getElementById("inputFieldEmail").value.trim();
  let numberValue = document.getElementById("inputFieldNumber").value.trim();
  if (nameValue && emailValue && numberValue) {
    let newContact = { name: nameValue, email: emailValue, phone: numberValue };
    nameValue = "";
    emailValue = "";
    numberValue = "";
    console.log(newContact);
    contacts = [];
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
 * Diese Funktion dient dazu um die neu erhaltenen Daten im Firebase zu speichern.
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

/**
 * Diese Funktion soll dazu dienen, die Kontakte mithilfe der ersten Buchstaben in Kategorien anzuordnen
 * @param {*} contacts
 * @returns
 */
function groupContactsByInitial(contacts) {
  let groupedContacts = {};
  contacts.forEach((contact) => {
    let name = contact.name;
    let initial = name[0].toUpperCase();
    if (!groupedContacts[initial]) {
      groupedContacts[initial] = [];
    }
    groupedContacts[initial].push(contact);
  });
  console.log(groupedContacts);
  return groupedContacts;
}

/**
 * Die Funktion dient zur Öffnung der Details von Kontakten
 *
 * @param {*} i
 */
function contactDetails(i) {
  let rightSide = document.getElementById('contactDetails');
  rightSide.style.display = "flex";
  rightSide.style.flexDirection = "column";
  let leftSide = document.getElementById('contactsList');
  leftSide.style.display = "none";
  let rightContent = document.getElementById("contactDetailsBottom");
  rightContent.innerHTML = "";
  rightContent.innerHTML = contactDetailsHTML(i);
}

/**
 * Die Funktion dient zum schließen der contactDetails in der Responsive Ansicht.
 * 
 * @param {*} i 
 */
function closeContactDetails(){
  let rightSide = document.getElementById('contactDetails');
  rightSide.style.display = "none";
  let leftSide = document.getElementById('contactsList');
  leftSide.style.display = "flex";
}

/**
 * Diese Funktion soll dazu dienen, dass ein Kontakt aus der Firebase und dem contactsArray gelöscht wird
 * @param {*} i
 */
async function deleteContact(path = "") {
  console.log(`deleteContact-${path}`);
  await fetch(firebase_URL + path + ".json", {
    method: "DELETE",
  });
  contacts = [];
  let rightContent = document.getElementById("contactInformations");
  rightContent.innerHTML = "";
  renderContactDetails();
  await loadContacts("/contacts");
  renderAllContacts();
}
