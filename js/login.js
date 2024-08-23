let firebase_URL =
  "https://join-2-b992b-default-rtdb.europe-west1.firebasedatabase.app/";

function goToSummary() {
  window.location.href = "../html/summary.html?";
  localStorage.setItem("username", "Guest User");
  localStorage.setItem("usernameInitial", "GU");
  window.location.href = `../html/summary.html?msg=${encodeURIComponent(
    nameElement
  )}`;

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

function resetErrorMessages() {
  document.getElementById("email-error").classList.add("d-none");
  document.getElementById("username-error").classList.add("d-none");
  document.getElementById("password-field-error").classList.add("d-none");
  document.getElementById("password-mismatch-error").classList.add("d-none");
  document.getElementById("wrongPasswordKey").classList.add("d-none");
  document.getElementById("email-errorSignUp").classList.add("d-none");
  document.getElementById("emailExists").classList.add("d-none");
  document.getElementById("notCheckedBox").classList.add("d-none");
}

function validateInputs(name, email, password, confirmPassword) {
  if (!name) {
    document.getElementById("username-error").classList.remove("d-none");
    return false;
  }
  if (!password || !confirmPassword) {
    document.getElementById("password-field-error").classList.remove("d-none");
    return false;
  }
  if (password !== confirmPassword) {
    document.getElementById("password-mismatch-error").classList.remove("d-none");
    return false;
  }
  if (!isValidEmail(email)) {
    document.getElementById("email-errorSignUp").classList.remove("d-none");
    return false;
  }
  if (!isValidPassword(password)) {
    showError("Falsches Passwortformat.", "wrongPasswordKey");
    return false;
  }

  const checkbox = document.getElementById("acceptTermsCheckbox");
  if (!checkbox.checked) {
    document.getElementById("notCheckedBox").classList.remove("d-none");
    return false;
  }

  return true;
}
async function processRegistration(newLogin) {
  try {
    await postData("/login", newLogin);
    clearInputFields();
    signUp();
  } catch (error) {
    showError("Beim Erstellen des Benutzers ist ein Fehler aufgetreten.");
    console.error(error);
  }
}

async function checkEmailAndRegister(email, newLogin) {
  let emailExists = await checkIfEmailExists(email);
  if (emailExists) {
    document.getElementById("emailExists").classList.remove("d-none");
    return;
  }
  await processRegistration(newLogin);
}

function clearInputFields() {
  document.getElementById("neuUserLoginName").value = "";
  document.getElementById("neuUserLoginEmail").value = "";
  document.getElementById("neuUserLoginPasswort").value = "";
  document.getElementById("neuUserLoginConfirm_Passwort").value = "";
}

async function neuUser() {
  resetErrorMessages();

  let nameValue = document.getElementById("neuUserLoginName").value.trim();
  let emailValue = document.getElementById("neuUserLoginEmail").value.trim();
  let passwordValue = document.getElementById("neuUserLoginPasswort").value.trim();
  let confirmPasswordValue = document.getElementById("neuUserLoginConfirm_Passwort").value.trim();
  let numberValue = "-";
  let colorValue = getRandomColor();

  if (!validateInputs(nameValue, emailValue, passwordValue, confirmPasswordValue)) {
    return;
  }

  let newLogin = {
    name: nameValue,
    email: emailValue,
    password: passwordValue,
    phone: numberValue,
    color: colorValue,
  };

  await checkEmailAndRegister(emailValue, newLogin);
}


function showPopup(message) {
  let popupElement = document.getElementById("emailExistsPopup");
  popupElement.querySelector("p").textContent = message;
  popupElement.classList.add("popup");
  popupElement.classList.remove("d-none");
}

function closePopup() {
  let popupElement = document.getElementById("emailExistsPopup");
  popupElement.classList.add("d-none");
  popupElement.classList.remove("popup");
  document.getElementById("login_Content").classList.remove("d-none");
  document.getElementById("sign_up_content").classList.add("d-none");
  document.getElementById("help_initials").classList.remove("d-none");
  document.getElementById("blue_signed_up").classList.add("d-none");
  document.getElementById("help_initials_mobile").classList.remove("d-none");
}

async function checkIfEmailExists(email) {
  let response = await fetch(firebase_URL + "login.json");
  let responseToJson = await response.json();

  return Object.keys(responseToJson).some(
    (key) => responseToJson[key].email === email
  );
}

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
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function isValidPassword(password) {
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordPattern.test(password);
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

async function login(path = "login") {
  resetErrorMessages();

  const emailValue = document.getElementById("loginEmail").value.trim();
  const passwordValue = document.getElementById("loginPasswort").value.trim();

  if (!validateInput(emailValue, passwordValue)) return;

  const loginSuccessful = await fetchAndValidateCredentials(
    emailValue,
    passwordValue,
    path
  );

  if (!loginSuccessful) {
    loginIncorrect();
  }
}

function resetErrorMessages() {
  document.getElementById("error-message").classList.add("d-none");
  document.getElementById("email-error").classList.add("d-none");
  document.getElementById("password-error").classList.add("d-none");
}

function validateInput(emailValue, passwordValue) {
  if (!emailValue) {
    document.getElementById("email-error").classList.remove("d-none");
    return false;
  }
  if (!passwordValue) {
    document.getElementById("password-error").classList.remove("d-none");
    return false;
  }
  return true;
}

async function fetchAndValidateCredentials(emailValue, passwordValue, path) {
  const response = await fetch(firebase_URL + path + ".json");
  const responseToJson = await response.json();
  let loginSuccessful = false;

  Object.keys(responseToJson).forEach((key) => {
    if (
      responseToJson[key]["email"] === emailValue &&
      responseToJson[key]["password"] === passwordValue
    ) {
      loginSuccessful = true;
      const nameElement = responseToJson[key]["name"];
      loginCorrect(nameElement);
    }
  });

  return loginSuccessful;
}

function loginCorrect(nameElement) {
  localStorage.setItem("username", nameElement);
  let names = nameElement.split(" ");
  let initials = names.map((name) => name.charAt(0).toUpperCase()).join("");
  localStorage.setItem("usernameInitial", initials);
  window.location.href = `../html/summary.html?msg=${encodeURIComponent(
    nameElement
  )}`;
}

function loginIncorrect() {
  document.getElementById("error-message").classList.remove("d-none");
}
