let firebase_URL =
  "https://join-2-b992b-default-rtdb.europe-west1.firebasedatabase.app/";
let contacts = [];
let initialArray = [];


/**
 * Dieser eventListener dient dazu, dass das rechte Feld wieder display none und flex erhält bei der entsprechenden Width.
 */
window.addEventListener("resize", function(){
  // fire when above 1203
    let rightSide = document.getElementById('contactDetails');
    let leftSide = document.getElementById('contactsList');
    if(document.documentElement.clientWidth > 840) {
      rightSide.style.display = "flex";
      rightSide.style.flexDirection = "column";
      leftSide.style.display = "flex";
    }
    else {
        rightSide.style.display = "none";
        leftSide.style.display = "flex";
      }
}, true);

/**
 * Diese Funktion dient dazu alle Funktionen, die für das Rendern verantwortlich sind, nach dem Laden der Seite zu rendern
 */
function initContacts() {
  renderMainContacts();
  renderContacts();
  renderContactDetails();
  checkWindowWidth()
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
  overlay.innerHTML = openNewContactOverlayHTML();
  openNewContactOverlayRight(); 
}

function openNewContactOverlayRight(){
  let addContactRight = document.getElementById('addContactRight');
  addContactRight.innerHTML='';
  addContactRight.innerHTML= openNewContactOverlayRightHTML();
}


/**
 * In dieser Funktion werden Kontakte bearbeitet
 * @param {*} i
 */
function editContactOverlay(i) {
  let menu = document.getElementById('editOrDeleteMenu');
  menu.style.display = "none";
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
 * Diese Funktion dient dazu, die Werte aus den Inputfeldern für den neuen Kontakt auszulesen und sie an die postData() weiterzugeben.
 */
async function addContact() {
  let nameValue = document.getElementById('inputFieldName').value.trim();
  let emailValue = document.getElementById('inputFieldEmail').value.trim();
  let numberValue = document.getElementById('inputFieldNumber').value.trim();
  let colorValue = getRandomColor();
    let newContact = { name: nameValue, email: emailValue, phone: numberValue, color: colorValue};
    nameValue = "";
    emailValue = "";
    numberValue = "";
    contacts = [];
    await postData("/contacts", newContact);
    await loadContacts("/contacts");
    renderAllContacts();
    cancelAdding();
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';//jederBuchstabe des Farbstrings
  let color = '#';
  for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

/**
 * Falls der Kontakt doch nicht mehr gespeichert werden soll, wird das Overlay geschlossen
 */
function cancelAdding() {
  let nameValue = document.getElementById('inputFieldName').value;
  let emailValue = document.getElementById('inputFieldEmail').value;
  let numberValue = document.getElementById('inputFieldNumber').value;
  nameValue = "";
  emailValue = "";
  numberValue = "";
  let overlay = document.getElementById('overlayNewContact');
  overlay.classList.add("d-none");
  overlay.classList.remove("d-flex");
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
  return groupedContacts;
}

/**
 * Die Funktion dient zur Öffnung der Details von Kontakten
 *
 * @param {*} i
 */
function contactDetails(i) {
  let rightSide = document.getElementById('contactDetails');
  let leftSide = document.getElementById('contactsList');
  if(document.documentElement.clientWidth > 840) {
    rightSide.style.display = "flex";
    rightSide.style.flexDirection = "column";
    leftSide.style.display = "flex";
  }
    else {
      rightSide.style.display = "flex";
      rightSide.style.flexDirection = "column";
      leftSide.style.display = "none";
    }
  
  //hier muss das so eingestellt werden, dass der obere teil erst ab einer width von 840px geht
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
 * Diese Funktion dient zum toggeln des edit und delete Menus
 */
function toggleEditOrDelete(){
  let menu = document.getElementById('editOrDeleteMenu');
  if (menu.style.display === "none" || menu.style.display === "") {
      menu.style.display = "flex";
  } else {
      menu.style.display = "none";
  }
}

/* Die functon schaut nach wie die Breiter des gesamt Fenster ist und ändern einige klassen.*/

function checkWindowWidth() {
  let windowWidth = window.innerWidth;
  let contactID = document.getElementById('contactsList');
  if (windowWidth > 1019) {
    contactID.classList.add('contacts-list-desktop');
    contactID.classList.remove('contacts-list-mobile');
  } else {
    contactID.classList.add('contacts-list-mobile');
    contactID.classList.remove('contacts-list-desktop');
  }
}

/** addEventListener Schaut noch ob die Breite sich verändert hat. */

window.addEventListener('resize', checkWindowWidth);
