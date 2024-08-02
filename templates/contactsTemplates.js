function contactDetails(contacts, index) {
  return `
    <div class="contact_details">
        <h2 class="contact_details_H2">Contacts</h2>
        <div class="stroke"></div>
        <samp class="contact_details_span">Better with a team</samp>
    </div>
    <div>
        <div class="one-contact-container">
            <div>
                <span class="profil_replacement_img_big">${profileInitials(index)}</span>
            </div>
            <div class="two-contact-container">
                <span class="contact_font_big">${contacts[index]["name"]}</span>
                <div class="edit_delete_icon">
                    <img class="margin_left" src="../assets/img/editColor.png" alt="Edit Icon">
                    <span class="margin_left">Edit</span>
                    <img class="margin_left" src="../assets/img/delete.png" alt="Delete Icon">
                    <span class="margin_left">Delete</span>
                </div>
            </div>
        </div>
    </div>
    <p class="font_span">Contact Information</p>
    <p class="font_span_big">Email</p>
    <p class="contact_link">${contacts[index]["email"]}</p>
    <p class="font_span_big">Phone</p>
    <p class="contact_font">${contacts[index]["phone"]}</p>
    `;
}
