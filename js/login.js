let firebase_URL =
  "https://join-2-b992b-default-rtdb.europe-west1.firebasedatabase.app/";

  function goToSummary() {
    window.location.href = "../html/summary.html?";
    localStorage.setItem('username', 'Guest User');
    localStorage.setItem('usernameInitial', 'GU');
    // Den Wert von nameElement in die URL-Parameter einfügen
    window.location.href = `../html/summary.html?msg=${encodeURIComponent(nameElement)}`;

  const urlParams = new URLSearchParams(window.location.search);
  const msg = urlParams.get("msg");
  if (msg) {
    console.log(msg);
  }
}

function singUp() {
  document.getElementById("login_Content").classList.toggle("d-none");
  document.getElementById("sing_up_content").classList.toggle("d-none");
  document.getElementById("help_initials").classList.toggle("d-none");
  document.getElementById("blue_signed_up").classList.toggle("d-none");
  document.getElementById("help_initials_mobile").classList.toggle("d-none");
}

/**
 * Diese Funktion dient dazu, die Werte aus den Inputfeldern für den neuen User auszulesen und sie an die postData() weiterzugeben.
 */

async function neuUser() {
  let nameValue = document.getElementById("neuUserLoginName").value.trim();
  let emailValue = document.getElementById("neuUserLoginEmail").value.trim();
  let passwordValue = document.getElementById("neuUserLoginPasswort").value.trim();
  let numberValue = "-";
  let colorValue = getRandomColor();

  // Überprüfen, ob die E-Mail bereits registriert ist
  let emailExists = await checkIfEmailExists(emailValue);
  if (emailExists) {
    // Popup anzeigen und Registrierung stoppen
    showPopup("Diese E-Mail ist bereits registriert.");
    return;
  }

  // Neues Nutzerobjekt erstellen
  let newLogin = {
    name: nameValue,
    email: emailValue,
    password: passwordValue,
    phone: numberValue,
    color: colorValue,
  };

  // Sende die Daten an den Server (Firebase) nur, wenn die E-Mail nicht existiert
  await postData("/login", newLogin);

  // Eingabefelder zurücksetzen
  document.getElementById("neuUserLoginName").value = '';
  document.getElementById("neuUserLoginEmail").value = '';
  document.getElementById("neuUserLoginPasswort").value = '';
  document.getElementById("neuUserLoginConfirm_Passwort").value = '';

  // Nach erfolgreichem Sign-up zur Login-Seite weiterleiten
  singUp();
}

// Funktion zur Anzeige des Popups
function showPopup(message) {
  let popupElement = document.getElementById("emailExistsPopup");
  popupElement.querySelector("p").textContent = message;
  popupElement.classList.add("popup");
  popupElement.classList.remove("d-none"); // Popup anzeigen
}

// Funktion zum Schließen des Popups
function closePopup() {
  // Popup schließen
  let popupElement = document.getElementById("emailExistsPopup");
  popupElement.classList.add("d-none"); // Popup ausblenden
  
  // Zur Login-Seite zurückkehren
  popupElement.classList.remove("popup");
  document.getElementById("login_Content").classList.remove("d-none");
  document.getElementById("sing_up_content").classList.add("d-none");
  document.getElementById("help_initials").classList.remove("d-none");
  document.getElementById("blue_signed_up").classList.add("d-none");
  document.getElementById("help_initials_mobile").classList.remove("d-none");
}


// Funktion zur Überprüfung, ob die E-Mail bereits existiert
async function checkIfEmailExists(email) {
  let response = await fetch(firebase_URL + "login.json");
  let responseToJson = await response.json();

  // Überprüfen, ob die E-Mail bereits in der Datenbank vorhanden ist
  return Object.keys(responseToJson).some(key => responseToJson[key].email === email);
}

// Funktion zur Anzeige von Fehlermeldungen
function showError(message) {
  let errorMessageElement = document.getElementById("error-message");
  errorMessageElement.textContent = message;
  errorMessageElement.classList.remove("d-none");
}

// Funktion zur Überprüfung, ob die E-Mail bereits existiert
async function checkIfEmailExists(email) {
  let response = await fetch(firebase_URL + "login.json");
  let responseToJson = await response.json();

  return Object.keys(responseToJson).some(key => responseToJson[key].email === email);
}

// Funktion zur Anzeige von Fehlermeldungen
function showError(message) {
  let errorMessageElement = document.getElementById("error-message");
  errorMessageElement.textContent = message;
  errorMessageElement.classList.remove("d-none");
}


function getRandomColor() {
  const letters = "0123456789ABCDEF"; //jederBuchstabe des Farbstrings
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

async function login(path = "login") {
  let response = await fetch(firebase_URL + path + ".json");
  let responseToJson = await response.json();
  let emailValue = document.getElementById("loginEmail").value.trim();
  let passwordValue = document.getElementById("loginPasswort").value.trim();
  let loginSuccessful = false;

  Object.keys(responseToJson).forEach((key) => {
    if (
      responseToJson[key]["email"] === emailValue &&
      responseToJson[key]["password"] === passwordValue
    ) {
      loginSuccessful = true;
      let nameElement = responseToJson[key]["name"];
      loginCorrect(nameElement);
    }
  });

  if (!loginSuccessful) {
    loginIncorrect();
  }
}

function loginCorrect(nameElement) {
  // Speichern des gesamten Namens unter 'username'
  localStorage.setItem('username', nameElement);

  // Split des Namens in Vorname und Nachname
  let names = nameElement.split(' ');
  
  // Anfangsbuchstaben der Namen extrahieren
  let initials = names.map(name => name.charAt(0).toUpperCase()).join('');
  
  // Speichern der Initialen unter 'usernameInitial'
  localStorage.setItem('usernameInitial', initials);

  // Weiterleiten zur Zusammenfassungsseite mit dem Namen als URL-Parameter
  window.location.href = `../html/summary.html?msg=${encodeURIComponent(nameElement)}`;
}

function loginIncorrect() {
  document.getElementById("error-message").classList.remove("d-none");
}