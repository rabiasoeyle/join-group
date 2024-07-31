<<<<<<< HEAD
function init() {
  renderMainDivs();
=======
function init(){
    renderMainDivs();
    renderContacts();
>>>>>>> 71e994bcdcb9f3ddc046b313e15e6ecc333fa2d4
}

function renderMainDivs() {
  let content = document.getElementById("content");
  console.log("funktioniert");
  content.innerHTML = "";
  content.innerHTML = `
    <div class="contacts-list" id="contactsList"></div>
<<<<<<< HEAD
    <div class="contact-details" id="contactDetails"></div`;
}
=======
    <div class="contact-details" id="contactDetails"></div`
}

function renderContacts(){
    let contactsList = document.getElementById('contactsList');
    contactsList.innerHTML='';
    contactsList.innerHTML += `
    <button type="button" class="add-contacts-button" onclick="openOverlay()">
    <span> Add new Contact </span>
    <img src="../assets/img/addPerson.png">
    </button>
    <div class="contacts-list-bottom" id="contactsListBottom"></div>`
}

function openOverlay(){
    console.log('overlayFunction');
}
>>>>>>> 71e994bcdcb9f3ddc046b313e15e6ecc333fa2d4
