/**
 * Diese Funktion dient dazu alle Funktionen, die für das Rendern verantwortlich sind, nach dem Laden der Seite zu rendern
 */
function initContacts(){
    renderMainContacts();
    renderContacts();
}

/**
 * Diese Funktion soll die beiden Container für den Content erstellen.
 */
function renderMainContacts(){
    let content = document.getElementById('content');
    console.log('funktioniert');
    content.innerHTML='';
    content.innerHTML=`
    <div class="contacts-list" id="contactsList"></div>
    <div class="contact-details" id="contactDetails"></div`
}

/**
 * Diese Funktion soll den Button und den unteren Container für die Kontakte erstellen
 */
function renderContacts(){
    let contactsList = document.getElementById('contactsList');
    contactsList.innerHTML='';
    contactsList.innerHTML += `
    <button type="button" class="add-contacts-button" onclick="openNewContactOverlay()">
    <span> Add new Contact </span>
    <img src="../assets/img/addPerson.png">
    </button>
    <div class="contacts-list-bottom" id="contactsListBottom"></div>`
}

/**
 * Diese Funktion soll das Overlay für Kontakte hinzufügen öffnen
 */
function openNewContactOverlay(){
    console.log('overlayFunction');
}

