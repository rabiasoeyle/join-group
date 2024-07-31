function init(){
    renderMainDivs();
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
    
}