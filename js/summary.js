let tasks = [];
const BASE_URL = "https://join-2-b992b-default-rtdb.europe-west1.firebasedatabase.app/";
let statusCounts = {todo: 0, done: 0, inProgress: 0, awaitFeedback: 0};
let priorityCounts = {urgent: 0, low: 0, medium: 0};
let nearestFutureDate = null;
let nearestTask = null;
let displayedPriorityCount = 0;

/**
 * 
 * @param {*} task 
 */
function setAmountStatus(task){
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
}

/**
 * 
 * @param {*} task 
 */
function setAmountPriority(task){
    if (task.priority === "urgent") {
        priorityCounts.urgent++;
    }
    if (task.priority === "low") {
        priorityCounts.low++;
    }
    if (task.priority === "medium") {
        priorityCounts.medium++;
    }
}

function setAmountDate(task){
    let taskDueDate = new Date(task.dueDate);
        if (taskDueDate > new Date() && (!nearestFutureDate || taskDueDate < nearestFutureDate)) {
            nearestFutureDate = taskDueDate;
            nearestTask = task;
        }
}

function updateMetrike(tasksArray){
    document.getElementById('taskCount').textContent = tasksArray.length;
    document.getElementById('todoCount').textContent = statusCounts.todo;
    document.getElementById('doneCount').textContent = statusCounts.done;
    document.getElementById('inProgressCount').textContent = statusCounts.inProgress;
    document.getElementById('awaitingFeedbackCount').textContent = statusCounts.awaitFeedback;
}

function showPriorityIfUrgent(){
    let priorityIcon = document.getElementById('prioIcon'); 
    displayedPriorityCount = priorityCounts.urgent;
     priorityIcon.innerHTML =  showPriorityUrgentSVG();
     priorityIcon.style.backgroundColor = "red";
     document.getElementById('priority').textContent = "Urgent";
}

function showPriorityIfMedium(){
    let priorityIcon = document.getElementById('prioIcon'); 
    displayedPriorityCount = priorityCounts.medium;
     priorityIcon.innerHTML= showPriorityMediumSVG();
     priorityIcon.style.backgroundColor = "#ffa800";
     document.getElementById('priority').textContent = "Medium";
}

function showPriorityIfLow(){
    let priorityIcon = document.getElementById('prioIcon'); 
    displayedPriorityCount = priorityCounts.low;
     priorityIcon.innerHTML = showPriorityLowSVG(); 
     priorityIcon.style.backgroundColor = "#7ae229";
     document.getElementById('priority').textContent = "Low";
}

function showPriority(){
    let priorityIcon = document.getElementById('prioIcon'); 
    if (priorityCounts.urgent > 0) {
        showPriorityIfUrgent();
    } else if (priorityCounts.medium > 0) {
        showPriorityIfMedium();
    } else if (priorityCounts.low > 0) {
        showPriorityIfLow();}
    else {
        priorityIcon = "../assets/img/mail.png"; 
        document.getElementById('priority').textContent = "None";
    }
    document.getElementById('urgentCount').textContent = displayedPriorityCount;
    document.getElementById('prioIcon').src = priorityIcon;  
 }

async function initSummary() {
    let tasksData = await getAllTasks("tasks");
    let tasksArray = Object.keys(tasksData);
    for (let j = 0; j < tasksArray.length; j++) {
        let task = tasksData[tasksArray[j]];
        tasks.push({ id: tasksArray[j], ...task });
    setAmountStatus(task);
    setAmountPriority(task);
    setAmountDate(task);
    }
    updateMetrike(tasksArray);
    showPriority();
    showNextDueTaskDate();
}

function showNextDueTaskDate(){
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
    const userName = localStorage.getItem('username');
    const usernameInitial = localStorage.getItem('usernameInitial');
        document.querySelector('.user_name').textContent = userName;
        document.getElementById('circle').textContent = usernameInitial;
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

// für den done container
function highlightDone(){
    let div = document.getElementById('summaryPartTopDone');
    div.classList.add('summary-part-top-hover');
    let svg = document.getElementById('summaryPartTopSvgVector');
    svg.classList.add('summary-part-top-svg-vector-hover');
    let text = document.getElementById('summaryPartTextDone');
    text.style.color= "white";
}
function removeHighlightDone(){
    let div = document.getElementById('summaryPartTopDone');
    div.classList.remove('summary-part-top-hover');
    let svg = document.getElementById('summaryPartTopSvgVector');
    svg.classList.remove('summary-part-top-svg-vector-hover');
    let text = document.getElementById('summaryPartTextDone');
    text.style.color= "#2A3647";
}

//für den todo container
function highlightTodo(){
    let div = document.getElementById('summaryPartTopEdit');
    div.classList.add('summary-part-top-hover');
    let parent = document.getElementById('summaryPartTopSvgEditParent');
    parent.classList.add('summary-part-top-svg-parent-hover');
    let svg = document.getElementById('summaryPartTopSvgEdit');
    svg.classList.add('summary-part-top-svg-hover');
    let text = document.getElementById('summaryPartTextEdit');
    text.style.color="white";
}
function removeHighlightTodo(){
    let div = document.getElementById('summaryPartTopEdit');
    div.classList.remove('summary-part-top-hover');
    let parent = document.getElementById('summaryPartTopSvgEditParent');
    parent.classList.remove('summary-part-top-svg-parent-hover');
    let svg = document.getElementById('summaryPartTopSvgEdit');
    svg.classList.remove('summary-part-top-svg-hover');
    let text = document.getElementById('summaryPartTextEdit');
    text.style.color="#2A3647";
}

//für die priorität
function highlightPrio(){
let div = document.getElementById('summaryPrioParent');
div.classList.add('summary_prio_hover');
let date = document.getElementById('date');
date.style.setProperty('color', 'white', 'important');
let priority = document.getElementById('priority');
priority.style.setProperty('color', 'white', 'important');
}

function removeHighlightPrio(){
    let div = document.getElementById('summaryPrioParent');
    div.classList.remove('summary_prio_hover');
    let date = document.getElementById('date');
    date.style.removeProperty('color');
    let priority = document.getElementById('priority');
    priority.style.removeProperty('color');
}

function highlightStatus(x){
let div = document.getElementById(x);
div.classList.add('summary-part-top-hover');
}

function removeHighlightStatus(x){
    let div = document.getElementById(x);
    div.classList.remove('summary-part-top-hover');
}