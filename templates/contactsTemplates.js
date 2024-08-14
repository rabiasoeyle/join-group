function contactDetailsHTML(index) {
  return /*html*/ `
        <div id="contactInformations">
            <div class="one-contact-container">
                <div>
                    <span style="background-color:${contacts[index]['color']};"class="profil_replacement_img_big">${profileInitials(
                      index
                    )}</span>
                </div>
                <div class="two-contact-container">
                    <span class="contact_font_big">${
                      contacts[index]["name"]
                    }</span>
                    <div class="edit_delete_icon">
                      <div onclick="editContactOverlay(${index})">
                        <img class="margin_left" src="../assets/img/editColor.png" alt="Edit Icon">
                        <button class="margin_left edit-delete-contact-button">Edit</button>
                      </div>
                      <div onclick="deleteContact('contacts/${contacts[index]['id']}')">
                        <img class="margin_left" src="../assets/img/delete.png" alt="Delete Icon">
                        <button class="margin_left edit-delete-contact-button">Delete</button>
                      </div>
                    </div>
                </div>
            </div>
        </div>
        <p class="font_span">Contact Information</p>
        <p class="font_span_big margin_contact">Email</p>
        <p class="contact_link margin_contact">${contacts[index]["email"]}</p>
        <p class="font_span_big margin_contact">Phone</p>
        <p class="contact_font margin_contact">${contacts[index]["phone"]}</p>
        <div id="editOrDeleteMenu" class="edit-or-delete-toggle-div"style="display: none;">
        <!-- Inhalt des Toggle-Menüs -->
        <button onclick="editContactOverlay(${index})">Edit</button>
        <button onclick="deleteContact('contacts/${contacts[index]['id']}')">Delete</button>
      </div>
        `;
}

function renderMainContactsHTML() {
  return `
      <div class="contacts-list-desktop" id="contactsList"></div>
      <div class="contact-details" id="contactDetails"></div
      `;
}

function renderContactDetailsHTML() {
  return `
      <div class="contact_details" id="contactDetailsTop">
        <h2 class="contact_details_H2">Contacts</h2>
        <div class="stroke"></div>
        <span class="contact_details_span">Better with a team</span>
        <button onclick="closeContactDetails()" id="goBackToContacts"class="go-back-to-contacts">
        <img src="../assets/img/blueArrow.png"></button>
      </div>
      <div id="contactDetailsBottom"></div>
      <button onclick="toggleEditOrDelete()" type="button" class="add-contacts-button-mobile" onclick="editOrDeleteBar()">
      <img class="icon-mobile" src="../assets/img/threeDots.png">
      </button>
      `;
}

function renderContactsHTML() {
  return `
      <button  type="button" class="add-contacts-button" onclick="openNewContactOverlay()">
      <span> Add new Contact </span>
      <img class="icon" src="../assets/img/addPerson.png">
      </button>
      <div class="contacts-list-bottom" id="contactsListBottom"></div>
      <button  type="button" class="add-contacts-button-mobile" onclick="openNewContactOverlay()">
      <img class="icon-mobile" src="../assets/img/addPerson.png">
      </button>`;
}

function renderAllGroupinitialsHTML(initial) {
  return `
        <div class="group-initial-container">
            <div class="group-initial">${initial}</div>
            <div class="group-border"></div>
        </div>
        `;
}

function renderAllContactsHTML(contact) {
  return `
        <div class="one-contact-container"  onclick="contactDetails(${contacts.indexOf(
          contact
        )})">
            <div>
                <span style="background-color:${contacts[contacts.indexOf(contact)]['color']}; color:white" class="profil_replacement_img">${profileInitials(
                  contacts.indexOf(contact)
                )}</span>
            </div>
            <div class="two-contact-container">
                <span class="contact_font">${contact.name}</span>
                <span class="contact_link">${contact.email}</span>
            </div>
        </div>
            `;
}

function editContactOverlayHTML() {
  return `
        <div class="add-contact-container" id="addContactContainer">
            <div class="add-contact-left" id="addContactLeft"></div>
            <div class="add-contact-right" id="addContactRight"></div>
        </div>
          `;
}

function editContactOverlayLeftHTML() {
  return `
        <div class="cancel-button-top">
          <button onclick="cancelAdding()"><img class="icon-cancel" src="../assets/icon-overlay-contact/cancel.svg" alt=""></button>
        </div>
        <img class="add-contact-left-img" src="../assets/icon-overlay-contact/Join Logo.svg" alt="">
        <h2>Edit Contact</h2>
        `;
}

function editContactOverlayRightHTML(i) {
  return /*html*/ `
  <div class="cancel-button-over">
    <button onclick="cancelAdding()"><img src="../assets/icon-overlay-contact/cancel.svg" alt=""></button>
  </div>
  <div class="add-contact-right-left">
      <span class="profil_replacement_img_big_edit" style="background-color:${contacts[i]['color']};">${profileInitials(i)}</span>
  </div>
  <div class="add-contact-right-right">
      <div class="input-new-contact">
          <div class="cancel-button">
              <button onclick="cancelAdding()"><img src="../assets/icon-overlay-contact/cancel.svg" alt=""></button>
          </div>
          <form class="add-contact-form" id="addContactForm" onsubmit="editContact(${i}); return false">
              <input required type="text" placeholder="Name" class="input-field-name" id="inputFieldName" value="${contacts[i]["name"]}">
              <input required type="email" placeholder="E-Mail" class="input-field-mail" id="inputFieldEmail" value="${contacts[i]["email"]}">
              <input required type="tel" placeholder="Phone" class="input-field-phone" id="inputFieldNumber" value="${contacts[i]["phone"]}">
              <div class="save-or-delete-buttons">
                <button class="delete-button" onclick="cancelAdding()" type="button">
                  <p>Cancel</p>
                  <img src="../assets/icon-overlay-contact/cancel.svg" alt="">
                </button>
                <button class="save-button" type="submit">
                  <p>Save</p>
                  <img src="../assets/icon-overlay-contact/check.svg" alt="">
                </button> 
              </div>
          </form>
          <p id="error-message" style="color: red; display: none;">Please fill in all required fields.</p>
      </div>
  </div>`
}

function openNewContactOverlayHTML() {
  return /*html*/ `
    <div class="add-contact-container" id="addContactContainer">
            <div class="add-contact-left" id="addContactLeft">
              <div class="cancel-button-top">
                <button onclick="cancelAdding()"><img class="icon-cancel" src="../assets/icon-overlay-contact/cancel.svg" alt=""></button>
              </div>
              <img class="add-contact-left-img" src="../assets/icon-overlay-contact/Join Logo.svg" alt="">
              <h2>Add Contact</h2>
              <p><span class="underline">Tasks are</span> better with a team!</p>
            </div>
            <div class="add-contact-right" id="addContactRight">
            </div>
      </div>
    `;
}

function openNewContactOverlayRightHTML() {
  return /*html*/ `
  <div class="cancel-button-over">
    <button onclick="cancelAdding()"><img src="../assets/icon-overlay-contact/cancel.svg" alt=""></button>
  </div>
  <div class="add-contact-right-left">
          <img class="profile-picture" src="../assets/icon-overlay-contact/profile-big.svg" alt="">
      </div>
      <div class="add-contact-right-right">
          <div class="input-new-contact">
              <div class="cancel-button">
                  <button onclick="cancelAdding()"><img src="../assets/icon-overlay-contact/cancel.svg" alt=""></button>
              </div>
              <form class="add-contact-form" id="addContactForm" onsubmit="addContact(); return false">
                  <input required type="text" placeholder="Name" class="input-field-name" id="inputFieldName">
                  <input required type="email" placeholder="E-Mail" class="input-field-mail" id="inputFieldEmail">
                  <input required type="tel" placeholder="Phone" class="input-field-phone" id="inputFieldNumber">
                  <div class="save-or-delete-buttons">
                      <button type="button" class="delete-button" onclick="cancelAdding()">
                          <p>Delete</p>
                          <img src="../assets/icon-overlay-contact/cancel.svg" alt="">
                      </button>
                      <button type="submit" class="save-button" id="createContactButton">
                          <p>Create contact</p>
                          <img src="../assets/icon-overlay-contact/check.svg" alt="">
                      </button> 
                  </div>
              </form>
              <p id="error-message" style="color: red; display: none;">Please fill in all required fields.</p>
          </div>
      </div>
  `;
}
