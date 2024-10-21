let firebase_URL =
"https://join-group-e9a46-default-rtdb.europe-west1.firebasedatabase.app/";
/**
 * In this function the contacts data is loaded from the Firebase.
 *
 * @param {*} path
 */
async function loadContacts(path = "/contacts") {
  let response = await fetch(firebase_URL + path + ".json");
  let responseToJson = await response.json();
  if (responseToJson) {
    contacts = [];
    Object.keys(responseToJson).forEach((key) => {
      if (responseToJson[key]["color"]) {
        contacts.push({
          id: key,
          name: responseToJson[key]["name"],
          email: responseToJson[key]["email"],
          phone: responseToJson[key]["phone"],
          color: responseToJson[key]["color"],
        });
      } else {
        contacts.push({
          id: key,
          name: responseToJson[key]["name"],
          email: responseToJson[key]["email"],
          phone: responseToJson[key]["phone"],
          color: getRandomColor(),
        });
      }
    });
    contacts.sort((a, b) => a.name.localeCompare(b.name));
  }
}

/**
 * This function is used to load tasks from Firebase.
 * @param {*} path 
 */
async function loadTasks(path = "/tasks") {
  let response = await fetch(firebase_URL + path + ".json");
  let responseToJson = await response.json();
  idNumberStartValue = 0;
  if (responseToJson) {
    Object.keys(responseToJson).forEach((key) => {
      tasks.push({
        id: key,
        idNumber: idNumberStartValue,
        title: responseToJson[key]["title"],
        description: responseToJson[key]["description"],
        assigned: responseToJson[key]["assigned"],
        dueDate: responseToJson[key]["dueDate"],
        category: responseToJson[key]["category"],
        priority: responseToJson[key]["priority"],
        subtaskList: responseToJson[key]["subtaskList"],
        status: responseToJson[key]["status"],
        checkedSubtasks: responseToJson[key]["checkedSubtasks"],
        checkedSubtasksCount: responseToJson[key]["checkedSubtasksCount"],
      });
      idNumberStartValue++;
    });
  }
  idNumberStartValue = idNumberStartValue + 1;
}

/**
 * This function is responsible for loading the login data from the Firebase.
 * @param {*} path 
 */
async function loadLogin(path = "/login") {
  let response = await fetch(firebase_URL + path + ".json");
  let responseToJson = await response.json();
  if (responseToJson) {
    Object.keys(responseToJson).forEach((key) => {
      loginContact.push({
        name: responseToJson[key]["name"],
        email: responseToJson[key]["email"],
        password: responseTojson[key]["password"],
        phone: responseToJson[key]["phone"],
        color: responseToJson[key]["color"],
      });
    });
  }
}

/**
 * This function is intended to delete a contact from the Firebase and the contactsArray
 * @param {*} i
 */
async function deleteContact(path = "") {
  await fetch(firebase_URL + path + ".json", {
    method: "DELETE",
  });
  contacts = [];
  let rightContent = document.getElementById("contactInformations");
  rightContent.innerHTML = "";
  renderContactDetails();
  await loadContacts("/contacts");
  renderAllContacts();
  const popup = document.createElement('div');
  popup.classList.add('pop-up-added');
      popup.innerHTML=`
          <span>Contact successfully deleted</span>
      `
  document.body.appendChild(popup);
    setTimeout(() => {
      popup.remove();
  }, 2000); 
}

/**
 * This function is intended to delete a task from the Firebase and the tasksArray
 * @param {*} i
 */
async function deleteTask(path = "") {
  await fetch(firebase_URL + path + ".json", {
    method: "DELETE",
  });
  tasks = [];
  await loadTasks("/tasks");
  // Erstelle das Popup-Element
  const popup = document.createElement('div');
  popup.classList.add('pop-up-added');
      popup.innerHTML=`
          <span>Task successfully deleted</span>
      `
  document.body.appendChild(popup);
    setTimeout(() => {
      popup.remove(); 
  }, 2000); 
  closeDetailsOverlay();
  todoBoard();
  inProgressBoard();
  awaitFeedbackBoard();
  doneBoard();
}

/**
 * This function is used to save the newly received data in Firebase.
 *
 * @param {*} path
 * @param {*} data
 */
async function postData(path = "", data) {
  try {
    let response = await fetch(firebase_URL + path + ".json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok" + response.statusText);
    }
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

/**
 * This function is used to change the changed contact information in exactly the right place.
 *
 * @param {*} path
 * @param {*} data
 */
async function putData(path = "", data) {
  try {
    let response = await fetch(firebase_URL + path + ".json", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}
