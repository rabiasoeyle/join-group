let firebase_URL =
  "https://join-2-b992b-default-rtdb.europe-west1.firebasedatabase.app/";

function goToSummary() {
  window.location.href = "../html/summary.html?";
  localStorage.setItem("username", "Guest User");
  localStorage.setItem("usernameInitial", "GU");
  // Insert the value of nameElement into the URL parameters
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

/**
 * This function is used to read the values ​​from the input fields for the new user and pass them on to postData().
 */
async function neuUser() {
  let nameValue = document.getElementById("neuUserLoginName").value.trim();
  let emailValue = document.getElementById("neuUserLoginEmail").value.trim();
  let passwordValue = document.getElementById("neuUserLoginPasswort").value.trim();
  let confirmPasswordValue = document.getElementById("neuUserLoginConfirm_Passwort").value.trim();
  let numberValue = "-";
  let colorValue = getRandomColor();

  // Fehlermeldungen zurücksetzen
  document.getElementById("username-error").classList.add("d-none");
  document.getElementById("password-field-error").classList.add("d-none");
  document.getElementById("password-mismatch-error").classList.add("d-none");
  document.getElementById("mailFormat-error").classList.add("d-none");

  // Check if the username has been entered
  if (!nameValue) {
    document.getElementById("username-error").classList.remove("d-none");
    return;
  }
<<<<<<< HEAD
  // Check if the passwords match
=======

  // Überprüfen, ob die Passwörter eingegeben wurden
  if (!passwordValue || !confirmPasswordValue) {
    document.getElementById("password-field-error").classList.remove("d-none");
    return;
  }

  // Überprüfen, ob die Passwörter übereinstimmen
>>>>>>> 86841974ec687aac5525ef40766bae33f7666dfb
  if (passwordValue !== confirmPasswordValue) {
    document.getElementById("password-mismatch-error").classList.remove("d-none");
    return;
  }

  // Check email format
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

// Function to display the popup
function showPopup(message) {
  let popupElement = document.getElementById("emailExistsPopup");
  popupElement.querySelector("p").textContent = message;
  popupElement.classList.add("popup");
  popupElement.classList.remove("d-none"); // Show popup
}

// Function to close the popup
function closePopup() {
  // Close popup
  let popupElement = document.getElementById("emailExistsPopup");
  popupElement.classList.add("d-none"); // Hide popup

  // Return to login page
  popupElement.classList.remove("popup");
  document.getElementById("login_Content").classList.remove("d-none");
  document.getElementById("sign_up_content").classList.add("d-none");
  document.getElementById("help_initials").classList.remove("d-none");
  document.getElementById("blue_signed_up").classList.add("d-none");
  document.getElementById("help_initials_mobile").classList.remove("d-none");
}

// Function to check whether the email already exists
async function checkIfEmailExists(email) {
  let response = await fetch(firebase_URL + "login.json");
  let responseToJson = await response.json();

  // Check if the email already exists in the database
  return Object.keys(responseToJson).some(
    (key) => responseToJson[key].email === email
  );
}

// Function for displaying error messages
function showError(message, elementId = "error-message") {
  let errorMessageElement = document.getElementById(elementId);
  if (errorMessageElement) {
    // Check if the element exists
    errorMessageElement.textContent = message;
    errorMessageElement.classList.remove("d-none");
  } else {
    console.warn(`Element mit ID "${elementId}" wurde nicht gefunden.`);
  }
}

function isValidEmail(email) {
  // Regular expression to check email format
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function getRandomColor() {
  const letters = "0123456789ABCDEF"; // Each letter of the color string
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

async function login(path = "login") {
  let emailValue = document.getElementById("loginEmail").value.trim();
  let passwordValue = document.getElementById("loginPasswort").value.trim();

  // Reset error messages
  document.getElementById("error-message").classList.add("d-none");
  document.getElementById("email-error").classList.add("d-none");
  document.getElementById("password-error").classList.add("d-none");

  // Check if the email address has been entered
  if (!emailValue) {
    document.getElementById("email-error").classList.remove("d-none");
    return;
  }

  // Check if the password has been entered
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
  // Save the entire name as 'username'
  localStorage.setItem("username", nameElement);

  // Split the name into first name and last name
  let names = nameElement.split(" ");

  // Extract initial letters of names
  let initials = names.map((name) => name.charAt(0).toUpperCase()).join("");

  // Save the initials as 'usernameInitial'
  localStorage.setItem("usernameInitial", initials);

  // Redirect to the summary page with the name as a URL parameter
  window.location.href = `../html/summary.html?msg=${encodeURIComponent(
    nameElement
  )}`;
}

function loginIncorrect() {
  document.getElementById("error-message").classList.remove("d-none");
}
