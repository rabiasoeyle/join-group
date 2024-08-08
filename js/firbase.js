/**
 * In dieser Funktion werden die Daten aus dem Firebase geladen.
 *
 * @param {*} path
 */
async function loadContacts(path = "/contacts") {
    let response = await fetch(firebase_URL + path + ".json");
    let responseToJson = await response.json();
    if (responseToJson) {
        contacts = [];
      Object.keys(responseToJson).forEach((key) => {
        contacts.push({
          id: key,
          name: responseToJson[key]["name"],
          email: responseToJson[key]["email"],
          phone: responseToJson[key]["phone"],
          color: responseToJson[key]["color"] || getRandomColor(),
        });
      });
      // Sortiere die Kontakte alphabetisch nach Name
      contacts.sort((a, b) => a.name.localeCompare(b.name));
    }
  }

  async function loadTasks(path="/tasks"){
    let response = await fetch(firebase_URL + path + ".json");
    let responseToJson = await response.json();
    idNumberStartValue =0;
    if (responseToJson) {
      Object.keys(responseToJson).forEach((key) => {
        tasks.push({
            id:key,
            idNumber:idNumberStartValue,
            title:responseToJson[key]["title"],
            description: responseToJson[key]["description"],
            assigned: responseToJson[key]["assigned"],
            dueDate: responseToJson[key]["dueDate"],
            category:responseToJson[key]["category"],
            priority:responseToJson[key]["priority"],
            subtaskList:responseToJson[key]["subtaskList"],
            status:responseToJson[key]["status"],
        });
        idNumberStartValue ++;
      });
  }
  idNumberStartValue = idNumberStartValue + 1;
}

/**
 * Diese Funktion soll dazu dienen, dass ein Kontakt aus der Firebase und dem contactsArray gelöscht wird
 * @param {*} i
 */
async function deleteContact(path = "") {
    await fetch(firebase_URL + path + ".json", {
      method: "DELETE",
    });
    contacts = [];
    let rightContent = document.getElementById('contactInformations');
    rightContent.innerHTML = "";
    renderContactDetails();
    await loadContacts("/contacts");
    renderAllContacts();
  }

  /**
 * Diese Funktion soll dazu dienen, dass eine Task aus der Firebase und dem tasksArray gelöscht wird
 * @param {*} i
 */
async function deleteTask(path = "") {
  await fetch(firebase_URL + path + ".json", {
    method: "DELETE",
  });
  tasks = [];
  await loadTasks("/tasks");
  closeDetailsOverlay();
  todoBoard();
  inProgressBoard();
  awaitFeedbackBoard();
  doneBoard();
}

/**
 * Diese Funktion dient dazu um die neu erhaltenen Daten im Firebase zu speichern.
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
    });if (!response.ok) {
      throw new Error('Network response was not ok' + response.statusText);
    }
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
  }

/**
 * Diese Funktion dient dazu, um die geänderten Kontaktinfos genau an der richtigen Stelle zu ändern.
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
        throw new Error('Network response was not ok ' + response.statusText);
      }
      console.log('Data successfully updated:', response);
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
}