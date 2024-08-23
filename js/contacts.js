let firebase_URL =
  "https://join-2-b992b-default-rtdb.europe-west1.firebasedatabase.app/";
let contacts = [];
let initialArray = [];
let previouslyHighlighted;
let previouslyHighlightedName;

/**
 * 
This eventListener is used to ensure that the right field receives display none and flex again at the corresponding Width
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
 * This function is used to render all functions responsible for rendering after the page has loaded
 */
function initContacts() {
  renderMainContacts();
  renderContacts();
  renderContactDetails();
}

/**
 * This function should create the two containers for the content.
 */
function renderMainContacts() {
  let content = document.getElementById("content");
  content.innerHTML = "";
  content.innerHTML = renderMainContactsHTML();
}

/**
 * This function is used to render the heading of the right contact content
 */
function renderContactDetails() {
  let content = document.getElementById("contactDetails");
  content.innerHTML = "";
  content.innerHTML = renderContactDetailsHTML();
}

/**
 * This function should create the button and the lower container for the contacts
 */
async function renderContacts() {
  let contactsList = document.getElementById("contactsList");
  contactsList.innerHTML = "";
  contactsList.innerHTML += renderContactsHTML();
  await loadContacts("/contacts");
  renderAllContacts();
}

/**
 * In this function all contacts are rendered.
 */
function renderAllContacts() {
  let contactsListBottom = document.getElementById("contactsListBottom");
  contactsListBottom.innerHTML = "";
  // Group contacts by first letter
  let groupedContacts = groupContactsByInitial(contacts);
  // Iterate through the grouped contacts
  for (let initial in groupedContacts) {
    // Spacing and border for the new letter
    contactsListBottom.innerHTML += renderAllGroupinitialsHTML(initial);
    // Render contacts of this group
    groupedContacts[initial].forEach((contact) => {
      contactsListBottom.innerHTML += renderAllContactsHTML(contact);
    });
  }
}

/**
 * In this function, the initials of the contacts are filtered out and displayed
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
 * This function should open the overlay for "Add Contacts"
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
 * In this function contacts are edited
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
 * This function should render the left side of the editOverlay
 */
function editContactOverlayLeft() {
  let editContactLeft = document.getElementById("addContactLeft");
  editContactLeft.innerHTML = "";
  editContactLeft.innerHTML = editContactOverlayLeftHTML();
}

/**
 * This function should render the right side of the editOverlay
 * @param {*} i
 */
function editContactOverlayRight(i) {
  let editContactRight = document.getElementById("addContactRight");
  editContactRight.innerHTML = "";
  editContactRight.innerHTML = editContactOverlayRightHTML(i);
}

/**
 *  This function is used to read the changed information from the contacts and pass it on to putData().
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
      color: contacts[i]['color'],
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
  cancelEdit();
}

function cancelEdit(){
  let overlay = document.getElementById('overlayNewContact');
  overlay.classList.add("d-none");
  overlay.classList.remove("d-flex");
}

/**
 * This function is used to read the values ​​from the input fields for the new contact and pass them on to postData().
 */

// This function collects the values ​​of the input fields and returns an object with these values.
function getContactInputValues() {
  let nameValue = document.getElementById('inputFieldName').value.trim();
  let emailValue = document.getElementById('inputFieldEmail').value.trim();
  let numberValue = document.getElementById('inputFieldNumber').value.trim();
  
  return { name: nameValue, email: emailValue, phone: numberValue };
}

// Diese Funktion setzt die Werte der Eingabefelder zurück.
function clearInputFields() {
  document.getElementById('inputFieldName').value = "";
  document.getElementById('inputFieldEmail').value = "";
  document.getElementById('inputFieldNumber').value = "";
}

// This function creates a contact object with a random color value.
function createContactObject(name, email, phone) {
  let colorValue = getRandomColor();
  return { name: name, email: email, phone: phone, color: colorValue };
}

// This function creates a popup, displays it and removes it after 2 seconds.
function showPopup(message) {
  const popup = document.createElement('div');
  popup.classList.add('pop-up-added');
  popup.innerHTML = `<span>${message}</span>`;
  document.body.appendChild(popup);
  
  setTimeout(() => {
    popup.remove(); // Entfernt das Popup nach 2 Sekunden
  }, 2000);
}

// This function empties the contents of the contact details bottom area.
function clearContactDetails() {
  document.getElementById('contactDetailsBottom').innerHTML = '';
}

// This is the restructured add Contact function that uses the helper functions defined above.
async function addContact() {
  const { name, email, phone } = getContactInputValues();
  const newContact = createContactObject(name, email, phone);
  
  clearInputFields();
  contacts = [];
  
  await postData("/contacts", newContact);
  showPopup('Contact successfully created');
  await loadContacts("/contacts");
  
  renderAllContacts();
  cancelAdding();
  clearContactDetails();
}


function getRandomColor() {
  const letters = '0123456789ABCDEF';//each letter of the color string
  let color = '#';
  for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

/**
 * If the contact is no longer to be saved, the overlay is closed
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
 * This function is intended to organize the contacts into categories using the first letters
 * @param {*} contacts
 * @returns
 */
function groupContactsByInitial(contacts) {
  let groupedContacts = {};
  contacts.forEach((contact) => {
    let name = contact.name;
    let initial = name[0].toUpperCase();
    if (!groupedContacts[initial]) {
      groupedContacts[initial] = [];}
    groupedContacts[initial].push(contact);
  });
  return groupedContacts;
}

/**
 * The function is used to open the details of contacts
 *
 * @param {*} i
 */

// This is the main function that calls other helper functions.
function contactDetails(i) {
  const elements = getContactElements(i);
  updateHighlight(elements.container, elements.name);
  adjustLayout();
  updateDetailsContent(i);
}

// This function fetches all required DOM elements and returns them as an object.
function getContactElements(i) {
  return {
    rightSide: document.getElementById('contactDetails'),
    leftSide: document.getElementById('contactsList'),
    container: document.getElementById(`contactsContainer-${i}`),
    name: document.getElementById(`contactFont-${i}`)
  };
}

// This function removes the highlight from the previous contact and sets the highlight on the current contact.
function updateHighlight(container, name) {
  if (previouslyHighlighted) {
    previouslyHighlighted.classList.remove('highlighted-p');
    previouslyHighlighted.classList.add('one-contact-container');
    previouslyHighlightedName.classList.remove('highlighted-name');
  }

  previouslyHighlighted = container;
  previouslyHighlightedName = name;
  previouslyHighlighted.classList.remove('one-contact-container');
  previouslyHighlighted.classList.add('highlighted-p');
  previouslyHighlightedName.classList.add('highlighted-name');
}

// This feature adjusts the layout based on the screen width.
function adjustLayout() {
  const rightSide = document.getElementById('contactDetails');
  const leftSide = document.getElementById('contactsList');

  if (document.documentElement.clientWidth > 840) {
    rightSide.style.display = "flex";
    rightSide.style.flexDirection = "column";
    leftSide.style.display = "flex";
  } else {
    rightSide.style.display = "flex";
    rightSide.style.flexDirection = "column";
    leftSide.style.display = "none";
  }
}

// This function updates the contents of the subrange based on the specified index i.
function updateDetailsContent(i) {
  const rightContent = document.getElementById("contactDetailsBottom");
  rightContent.innerHTML = "";
  rightContent.innerHTML = contactDetailsHTML(i);
}

/**
 * The function is used to close the contact details in the responsive view.
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
 * This function is used to toggle the edit and delete menu
 */
function toggleEditOrDelete(){
  let menu = document.getElementById('editOrDeleteMenu');
  if (menu.style.display === "none" || menu.style.display === "") {
      menu.style.display = "flex";
  } else {
      menu.style.display = "none";
  }
}
