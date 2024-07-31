function init(){
    renderMainDivs();
    renderContacts();
}

function renderMainDivs(){
    let content = document.getElementById('content');
    console.log('funktioniert');
    content.innerHTML='';
    content.innerHTML=`
    <div class="contacts-list" id="contactsList"></div>
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