function goToSummary() {
  window.location.href = "../html/summary.html?msg=";

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
  let passwortValue = document.getElementById("neuUserLoginPasswort").value.trim();
  let numberValue = "-";
  let colorValue = getRandomColor();
  let newContact = {name: nameValue, email: emailValue, passwort: passwortValue, phone: numberValue, color: colorValue,};
  nameValue = "";
  emailValue = "";
  passwortValue = "";
  contacts = [];
  await postData("/contacts", newContact);
  await loadContacts("/contacts");
  document.getElementById("contactDetailsBottom").innerHTML = "";
  console.log(contacts);
}

function getRandomColor() {
  const letters = "0123456789ABCDEF"; //jederBuchstabe des Farbstrings
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function login() {
  let email = document.getElementById("loginEmail").value.trim();
  let password = document.getElementById("loginPassword").value.trim();
  let user = user.find(
    (u) => u.email == email.value && u.password == password.value
  );
  console.log(user);
  if (user) {
    console.log("User gefunden");
  }
}
