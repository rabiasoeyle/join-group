let tasks = [];
const BASE_URL = "https://join-2-b992b-default-rtdb.europe-west1.firebasedatabase.app/";

async function initSummary() {
    let tasksData = await getAllTasks("tasks");
    let tasksArray = Object.keys(tasksData);
    
    let statusCounts = {
        todo: 0,
        done: 0,
        inProgress: 0,
        awaitFeedback: 0
    };

    let priorityCounts = {
        urgent: 0,
        low: 0,
        medium: 0
    };

    let nearestFutureDate = null;
    let nearestTask = null;

    for (let j = 0; j < tasksArray.length; j++) {
        let task = tasksData[tasksArray[j]];
        tasks.push({ id: tasksArray[j], ...task });
        
        // Statuszählung
        switch (task.status) {
            case "todo":
                statusCounts.todo++;
                break;
            case "done":
                statusCounts.done++;
                break;
            case "inProgress":
                statusCounts.inProgress++;
                break;
            case "awaitFeedback":
                statusCounts.awaitFeedback++;
                break;
        }

        // Prioritätszählung
        if (task.priority === "urgent") {
            priorityCounts.urgent++;
        }
        if (task.priority === "low") {
            priorityCounts.low++;
        }
        if (task.priority === "medium") {
            priorityCounts.medium++;
        }

        // Fälligkeitsdatum Überprüfung
        let taskDueDate = new Date(task.dueDate);
        if (taskDueDate > new Date() && (!nearestFutureDate || taskDueDate < nearestFutureDate)) {
            nearestFutureDate = taskDueDate;
            nearestTask = task;
        }
    }

    // Metriken aktualisieren
    document.getElementById('taskCount').textContent = tasksArray.length - 1;
    document.getElementById('todoCount').textContent = statusCounts.todo;
    document.getElementById('doneCount').textContent = statusCounts.done;
    document.getElementById('inProgressCount').textContent = statusCounts.inProgress;
    document.getElementById('awaitingFeedbackCount').textContent = statusCounts.awaitFeedback;

    let displayedPriorityCount = 0;
    let priorityIcon = "../assets/img/Vector.png"; 

    if (priorityCounts.urgent > 0) {
        displayedPriorityCount = priorityCounts.urgent;
        priorityIcon = "../assets/img/Prio alta.png"; 
        document.getElementById('priority').textContent = "Urgent";
    } else if (priorityCounts.medium > 0) {
        displayedPriorityCount = priorityCounts.medium;
        priorityIcon = "../assets/img/Prio media.png"; 
        document.getElementById('priority').textContent = "Medium";
    } else if (priorityCounts.low > 0) {
        displayedPriorityCount = priorityCounts.low;
        priorityIcon = "../assets/img/Prio baja.png"; 
        document.getElementById('priority').textContent = "Low";
    }
    else {
        priorityIcon = "../assets/img/mail.png"; 
        document.getElementById('priority').textContent = "None";
    }

    document.getElementById('urgentCount').textContent = displayedPriorityCount;
    document.getElementById('prioIcon').src = priorityIcon; 

    // Datum des nächsten Fälligkeitsdatums in der Zukunft anzeigen
    if (nearestFutureDate) {
        const months = [
            'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
            'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
        ];

        let formattedDate = `${months[nearestFutureDate.getMonth()]} ${nearestFutureDate.getDate().toString().padStart(2, '0')}, ${nearestFutureDate.getFullYear()}`;
        document.getElementById('date').textContent = formattedDate;
    } else {
        document.getElementById('date').textContent = "Kein bevorstehendes Datum";
    }

    setDaytimeGreeting();

    // Name aus URL-Parameter auslesen und in die user_name-Div einfügen
    const urlParams = new URLSearchParams(window.location.search);
    const userName = urlParams.get("msg");
    if (userName) {
        document.querySelector('.user_name').textContent = userName;
    }
}

async function getAllTasks(path) {
    let response = await fetch(BASE_URL + path + ".json");
    return response.json();
}

function setDaytimeGreeting() {
    let now = new Date();
    let hours = now.getHours();
    let daytime;

    if (hours >= 6 && hours < 12) {
        daytime = "Good morning";
    } else if (hours >= 12 && hours < 20) {
        daytime = "Good day";
    } else {
        daytime = "Good evening";
    }

    document.getElementById('welcomeUser').textContent = daytime;
}
