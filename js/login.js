let firebase_URL =
  "https://join-30b43-default-rtdb.europe-west1.firebasedatabase.app/";

 // Event Listener für das Fenster-Resize-Event
  window.addEventListener("resize", toggleHelpInitialsMobile);

/**
 * This function ensures that the Sign Up div only appears in the login in the responsive view.
 */
  function toggleHelpInitialsMobile() {
    let signUpContent = document.getElementById('sign_up_content');
    let helpInitialsMobile = document.getElementById('help_initials_mobile');
    // Überprüfe, ob die Fensterbreite kleiner als 850px ist und die Klasse 'd-none' vorhanden ist
    if (document.documentElement.clientWidth < 850 && signUpContent.classList.contains('d-none')) {
      helpInitialsMobile.style.display = "flex"; // Zeige das Element an
    } else {
      helpInitialsMobile.style.display = "none"; // Verberge das Element
    }
  }

/**
 * links summary.html based on user name, if none given, uses Guest User and GU Initials
 */
function goToSummary() {
  window.location.href = "../html/summary.html?";
  localStorage.setItem("username", "Guest User");
  localStorage.setItem("usernameInitial", "GU");
  window.location.href = `../html/summary.html?msg=${encodeURIComponent(
    nameElement
  )}`;
  const urlParams = new URLSearchParams(window.location.search);
  const msg = urlParams.get("msg");
}

/**
 * toggles Classes to Ids
 */
function signUp() {
  document.getElementById("login_Content").classList.toggle("d-none");
  document.getElementById("sign_up_content").classList.toggle("d-none");
  document.getElementById("help_initials").classList.toggle("d-none");
  document.getElementById("blue_signed_up").classList.toggle("d-none");
  document.getElementById("help_initials_mobile").classList.toggle("d-none");
  toggleHelpInitialsMobile()
}

/**
 * resets error message ids
 */
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

/**
 * validates user input and gives back error messages if they are wrong
 * @param {*} name 
 * @param {*} email 
 * @param {*} password 
 * @param {*} confirmPassword 
 * @returns 
 */
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
    document.getElementById("wrongPasswordKey").classList.remove("d-none");
    return false;
  }
  const checkbox = document.getElementById("acceptTermsCheckbox");
  if (!checkbox.checked) {
    document.getElementById("notCheckedBox").classList.remove("d-none");
    return false;
  }

  return true;
}

/**
 * clears Input and registers new Login
 * @param {*} newLogin 
 */
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

/**
 * checks if users e-mail has been registered and pops error message
 * @param {*} email 
 * @param {*} newLogin 
 * @returns 
 */
async function checkEmailAndRegister(email, newLogin) {
  let emailExists = await checkIfEmailExists(email);
  if (emailExists) {
    document.getElementById("emailExists").classList.remove("d-none");
    return;
  }
  await processRegistration(newLogin);
}

/**
 * clears inputfields
 */
function clearInputFields() {
  document.getElementById("neuUserLoginName").value = "";
  document.getElementById("neuUserLoginEmail").value = "";
  document.getElementById("neuUserLoginPasswort").value = "";
  document.getElementById("neuUserLoginConfirm_Passwort").value = "";
}

/**
 * Adds new User to Firebase
 * @returns 
 */
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

/**
 * shows popup 
 * @param {*} message 
 */
function showPopup(message) {
  let popupElement = document.getElementById("emailExistsPopup");
  popupElement.querySelector("p").textContent = message;
  popupElement.classList.add("popup");
  popupElement.classList.remove("d-none");
}

/**
 * closes popup
 */
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

/**
 * checks if email is existing
 */
async function checkIfEmailExists(email) {
  let response = await fetch(firebase_URL + "login.json");
  let responseToJson = await response.json();
  return Object.keys(responseToJson).some(
    (key) => responseToJson[key].email === email
  );
}

/**
 * shows error message
 * @param {*} message 
 * @param {*} elementId 
 */
function showError(message, elementId = "error-message") {
  let errorMessageElement = document.getElementById(elementId);
  if (errorMessageElement) {
    errorMessageElement.textContent = message;
    errorMessageElement.classList.remove("d-none");
  } else {
    console.warn(`Element mit ID "${elementId}" wurde nicht gefunden.`);
  }
}

/**
 * checks if e-mail input is in correct format
 * @param {*} email 
 * @returns 
 */
function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

/**
 * checks if password is safe enough
 * @param {*} password 
 * @returns 
 */
function isValidPassword(password) {
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.,:;!?'"@#$%^&*()_+\-=\[\]{}\\|`~<>\/€£¥₿©®™§°†‡¶‰•])[A-Za-z\d.,:;!?'"@#$%^&*()_+\-=\[\]{}\\|`~<>\/€£¥₿©®™§°†‡¶‰•]{8,}$/;
  return passwordPattern.test(password);
}

/**
 * adds random color to new user
 * @returns 
 */
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

/**
 * checks if user data is correct
 * @param {*} path 
 * @returns 
 */
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

/**
 * validates email and password
 * @param {*} emailValue 
 * @param {*} passwordValue 
 * @returns 
 */
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

/**
 * compares user data with firebase data
 * @param {*} emailValue 
 * @param {*} passwordValue 
 * @param {*} path 
 * @returns 
 */
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

/**
 * leads user to summary.html if login is correct
 * @param {*} nameElement 
 */
function loginCorrect(nameElement) {
  localStorage.setItem("username", nameElement);
  let names = nameElement.split(" ");
  let initials = names.map((name) => name.charAt(0).toUpperCase()).join("");
  localStorage.setItem("usernameInitial", initials);
  window.location.href = `../html/summary.html?msg=${encodeURIComponent(
    nameElement
  )}`;
}

/**
 * error message if login is incorrect, nulls error messages if user starts new input
 */
function loginIncorrect() {
  document.getElementById("error-message").classList.remove("d-none");
  document.getElementById("email-errorSignUp").classList.add("d-none");
  document.getElementById("emailExists").classList.add("d-none");
  document.getElementById("password-field-error").classList.add("d-none");
  document.getElementById("password-mismatch-error").classList.add("d-none");
  document.getElementById("wrongPasswordKey").classList.add("d-none");
  document.getElementById("password-mismatch-error").classList.add("d-none");
  document.getElementById("notCheckedBox").classList.add("d-none");
}
