

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
                    <span class="margin_left" onclick="editContact(${index})">Edit</span>
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

function renderAllContactsHTML(i){
    return  `
          <div class="one-contact-container" onclick="contactDetails(${i})">
              <div>
                  <span class="profil_replacement_img">${profileInitials(i)}
                  </span>
              </div>
              <div class="two-contact-container">
                  <span class="contact_font">${contacts[i]["name"]}</span>
                  <span class="contact_link">${contacts[i]["email"]}</span>
              </div>
          </div>
          `;
  }