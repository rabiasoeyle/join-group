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

function signUp() {
  document.getElementById("login_Content").classList.toggle("d-none");
  document.getElementById("sign_up_content").classList.toggle("d-none");
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
  let confirmPasswordValue = document.getElementById("neuUserLoginConfirm_Passwort").value.trim();
  let numberValue = "-";
  let colorValue = getRandomColor();

  // Überprüfen, ob die Passwörter übereinstimmen
  if (passwordValue !== confirmPasswordValue) {
    showError("Die Passwörter stimmen nicht überein.", "passwordError");
    return;
  }

  // E-Mail-Format überprüfen
  if (!isValidEmail(emailValue)) {
    showError("Bitte geben Sie eine gültige E-Mail-Adresse ein.", "mailFormat-error");
    return;
  }

  try {
    let emailExists = await checkIfEmailExists(emailValue);
    if (emailExists) {
      showPopup("Diese E-Mail ist bereits registriert.");
      return;
    }

    let newLogin = {
      name: nameValue,
      email: emailValue,
      password: passwordValue,
      phone: numberValue,
      color: colorValue,
    };

    await postData("/login", newLogin);

    document.getElementById("neuUserLoginName").value = '';
    document.getElementById("neuUserLoginEmail").value = '';
    document.getElementById("neuUserLoginPasswort").value = '';
    document.getElementById("neuUserLoginConfirm_Passwort").value = '';

    signUp();
  } catch (error) {
    showError("Beim Erstellen des Benutzers ist ein Fehler aufgetreten.");
    console.error(error);
  }
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
  document.getElementById("sign_up_content").classList.add("d-none");
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
function showError(message, elementId = "error-message") {
  let errorMessageElement = document.getElementById(elementId);
  if (errorMessageElement) {
    errorMessageElement.textContent = message;
    errorMessageElement.classList.remove("d-none");
  } else {
    console.warn(`Element mit ID "${elementId}" wurde nicht gefunden.`);
  }
}

function isValidEmail(email) {
  // Regulärer Ausdruck zur Überprüfung des E-Mail-Formats
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function getRandomColor() {
  const letters = "0123456789ABCDEF"; // Jeder Buchstabe des Farbstrings
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

async function login(path = "login") {
  let emailValue = document.getElementById("loginEmail").value.trim();
  let passwordValue = document.getElementById("loginPasswort").value.trim();
  
  // Fehlermeldungen zurücksetzen
  document.getElementById("error-message").classList.add("d-none");
  document.getElementById("email-error").classList.add("d-none");
  document.getElementById("password-error").classList.add("d-none");

  // Überprüfen, ob die E-Mail-Adresse eingegeben wurde
  if (!emailValue) {
    document.getElementById("email-error").classList.remove("d-none");
    return;
  }

  // Überprüfen, ob das Passwort eingegeben wurde
  if (!passwordValue) {
    document.getElementById("password-error").classList.remove("d-none");
    return;
  }

  let response = await fetch(firebase_URL + path + ".json");
  let responseToJson = await response.json();
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
