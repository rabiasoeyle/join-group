let firebase_URL =
  "https://join-2-b992b-default-rtdb.europe-west1.firebasedatabase.app/";

  function goToSummary() {
    window.location.href = "../html/summary.html?";
    localStorage.setItem('username', 'Gasterino');
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
  let passwordValue = document
    .getElementById("neuUserLoginPasswort")
    .value.trim();
  let numberValue = "-";
  let colorValue = getRandomColor();
  let newLogin = {
    name: nameValue,
    email: emailValue,
    password: passwordValue,
    phone: numberValue,
    color: colorValue,
  };
  nameValue = "";
  emailValue = "";
  passwordValue = "";
  contacts = [];
  await postData("/login", newLogin);
  // Es Fehlt noch eine weiter leitung nach dem mein Sein Acc gemacht wurde
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
  // Den Wert von nameElement lokal speichern
  localStorage.setItem('username', nameElement);

  // Den Wert von nameElement in die URL-Parameter einfügen
  window.location.href = `../html/summary.html?msg=${encodeURIComponent(nameElement)}`;
}

function loginIncorrect() {
  document.getElementById("error-message").classList.remove("d-none");
}