
function contactDetailsHTML(index) {
    return `
        <div id="contactInformations">
            <div class="one-contact-container">
                <div>
                    <span class="profil_replacement_img_big">${profileInitials(index)}</span>
                </div>
                <div class="two-contact-container">
                    <span class="contact_font_big">${contacts[index]["name"]}</span>
                    <div class="edit_delete_icon">
                        <img class="margin_left" src="../assets/img/editColor.png" alt="Edit Icon">
                        <span class="margin_left" onclick="editContactOverlay(${index})">Edit</span>
                        <img class="margin_left" src="../assets/img/delete.png" alt="Delete Icon">
                        <span class="margin_left" onclick="deleteContact('contacts/${contacts[index]['id']}')">Delete</span>
                    </div>
                </div>
            </div>
        </div>
        <p class="font_span">Contact Information</p>
        <p class="font_span_big margin_contact">Email</p>
        <p class="contact_link margin_contact">${contacts[index]["email"]}</p>
        <p class="font_span_big margin_contact">Phone</p>
        <p class="contact_font margin_contact">${contacts[index]["phone"]}</p>
        `;
}

function renderMainContactsHTML(){
    return `
      <div class="contacts-list" id="contactsList"></div>
      <div class="contact-details" id="contactDetails"></div
      `;
}

function renderContactDetailsHTML(){
    return `
      <div class="contact_details" id="contactDetailsTop">
        <h2 class="contact_details_H2">Contacts</h2>
        <div class="stroke"></div>
        <span class="contact_details_span">Better with a team</span>
      </div>
      <div id="contactDetailsBottom"></div>
      `
}

function renderContactsHTML(){
  return `
      <button  type="button" class="add-contacts-button" onclick="openNewContactOverlay()">
      <span> Add new Contact </span>
      <img class="icon" src="../assets/img/addPerson.png">
      </button>
      <div class="contacts-list-bottom" id="contactsListBottom"></div>`;
}

function renderAllGroupinitialsHTML(initial){
    return `
        <div class="group-initial-container">
            <div class="group-initial">${initial}</div>
            <div class="group-border"></div>
        </div>
        `;
  }

function renderAllContactsHTML(contact){
    return `
        <div class="one-contact-container" onclick="contactDetails(${contacts.indexOf(contact)})">
            <div>
                <span class="profil_replacement_img">${profileInitials(contacts.indexOf(contact))}</span>
            </div>
            <div class="two-contact-container">
                <span class="contact_font">${contact.name}</span>
                <span class="contact_link">${contact.email}</span>
            </div>
        </div>
            `;
}

function editContactOverlayHTML(){
    return `
        <div class="add-contact-container" id="addContactContainer">
            <div class="add-contact-left" id="addContactLeft"></div>
            <div class="add-contact-right" id="addContactRight"></div>
        </div>
          `;
}

function editContactOverlayLeftHTML(){
    return `
        <img class="add-contact-left-img" src="../assets/icon-overlay-contact/Join Logo.svg" alt="">
        <h2>Edit Contact</h2>
        <p><span class="underline">Tasks are</span> better with a team!</p>
        `;
}

function editContactOverlayRightHTML(i){
    return `
        <div class="add-contact-right-left">
            <img class="profile-picture" src="..//assets/icon-overlay-contact/profile-big.svg" alt="">
        </div>
        <div class="add-contact-right-right">
          <div class="input-new-contact">
            <div class="cancel-button"><button onclick="cancelAdding()"><img src="../assets/icon-overlay-contact/cancel.svg" alt=""></button></button></div>
             <input type="text" placeholder="Name"class="input-field-name" id="inputFieldName" value="${contacts[i]['name']}">
             <input type="email" placeholder="E-Mail"class="input-field-mail" id="inputFieldEmail" value="${contacts[i]['email']}">
             <input type="tel" placeholder="Phone"class="input-field-phone" id="inputFieldNumber" value="${contacts[i]['phone']}">
          </div>
          <div class="save-or-delete-buttons">
             <button class="delete-button" onclick="cancelAdding()">
             <p>Cancel</p>
             <img src="../assets/icon-overlay-contact/cancel.svg" alt="">
             </button>
             <button class="save-button" onclick="editContact(${i})">
                <p>Create contact</p>
                <img src="../assets/icon-overlay-contact/check.svg" alt="">
             </button> 
         </div>
        </div>
        `;
}