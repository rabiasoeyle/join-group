/**
 * This function is intended to display the large view of the task.
 * @param {*} i 
 */
function openDetailedTaskOverlay(i){
  let editTaskOverlayContent = document.getElementById('editTaskOverlayContent');
  editTaskOverlayContent.classList.add('edit-task-overlay-content');
  editTaskOverlayContent.classList.remove('edit-task-overlay-edit');
  let editOverlayParent = document.getElementById('editOverlayParent');
  if(editOverlayParent.classList.contains('d-none')){
      editOverlayParent.classList.remove('d-none'); }
  editTaskOverlayContent.innerHTML='';
  editTaskOverlayContent.innerHTML= editTaskOverlayHTML(i);
  categorySignOverlay(i);
  if(tasks[i]['assigned']){
    showDetailTaskOverlayAssignedTo(i);}
  if(tasks[i]['subtaskList']){
     showDetailTaskOverlaySubtasks(i);}
  if(tasks[i]['priority']){
    prioritySignOverlay(i);}
}

/**
 * This function is used to forward the changed information about checkedSubtasks to Firebase and the page adapts accordingly.
 * @param {*} i
 */
async function saveCheckedsubtasks(i) {
  await putData(`/tasks/${tasks[i]["id"]}`, tasks[i]);
  tasks = [];
  await loadTasks();
  todoBoard();
  inProgressBoard();
  awaitFeedbackBoard();
  doneBoard();
  showDetailTaskOverlaySubtasks(i);
}

/**
 * This function ensures that depending on the priority, the correct svg is rendered - in large view
 * @param {*} i
 */
function prioritySignOverlay(i) {
  let priority = document.getElementById("prioritySVGOverlay");
  if (tasks[i]["priority"] == "urgent") {
    priority.innerHTML += prioritySignOverlayUrgentSvg();
  } else if (tasks[i]["priority"] == "medium") {
    priority.innerHTML += prioritySignOverlayMediumSvg();
  } else if (tasks[i]["priority"] == "low")
    priority.innerHTML += prioritySignOverlayLowSvg();
}

/**
 * This function is used to color the category div in the overlay depending on the category.
 * @param {*} i
 */
function categorySignOverlay(i) {
  let category = document.getElementById(`showDetailTaskOverlayCategory`);
  if (tasks[i]["category"] == "Technical Task") {
    category.style.backgroundColor = "#1FD7C1";
  } else if (tasks[i]["category"] == "User Story") {
    category.style.backgroundColor = "#0038FF";
  }
  category.style.color = "white";
}

/**
 * This function is intended to show in the overlay which people have been assigned to the task
 * @param {*} i
 */
function showDetailTaskOverlayAssignedTo(i) {
  let content = document.getElementById("showDetailTaskOverlayAssignedToChild");
  content.innerHTML = "";
  let element = tasks[i];
  for (j = 0; j < element["assigned"].length; j++) {
    content.innerHTML += showDetailTaskOverlayAssignedToHTML(j, i);
    showAssignedPersonsInitalsInOverlay(element, j);
  }
}

/**
 * This function shows the initials of the assigned people in the overlay
 * @param {*} element
 * @param {*} j
 */
function showAssignedPersonsInitalsInOverlay(element, j) {
  let personsOverlay = document.getElementById(`overlayInitials-${j}`);
  personsOverlay.innerHTML = "";
  assignedPersons = element["assigned"];
  personsOverlay.innerHTML += showAssignedPersonsInitalsInOverlayHTML(assignedPersons, j);
}

/**
 * This function renders the subtasks in the overlay.
 * @param {*} i
 */
function showDetailTaskOverlaySubtasks(i) {
  let content = document.getElementById("showDetailTaskOverlaySubtasksChild");
  content.innerHTML = "";
  for (j = 0; j < tasks[i]["subtaskList"].length; j++) {
    let subtask = tasks[i]["subtaskList"][j];
    let isChecked = tasks[i]["checkedSubtasks"] &&tasks[i]["checkedSubtasks"].includes(subtask) ? "checked" : "";
    content.innerHTML += showDetailTaskOverlaySubtasksHTML(isChecked, i, j)
  }
}

/**
 * This function is executed after a task has been checked off in subtasks.
 * @param {*} i
 * @param {*} j
 */
function addCheckedSubtasks(i, j) {
  let subtask = tasks[i]["subtaskList"][j];
  if (!tasks[i].checkedSubtasks) {
    tasks[i]["checkedSubtasks"] = []; //zum hinzufügen einer checkedsubtaskArrays
  }
  let checkbox = document.getElementById(`inputCheckbox-${i}-${j}`);
  checkbox.checked = !checkbox.checked;
  if (checkbox.checked) {
    if (!tasks[i].checkedSubtasks.includes(subtask)) {
      tasks[i]["checkedSubtasks"].push(subtask);}
  } else { 
    elseRemoveCheckedSubtasks(i, j);}
    tasks[i].checkedSubtasksCount = tasks[i].checkedSubtasks.length;
    saveCheckedsubtasks(i);
}

/**
 * This function is executed when the subtask is to be deleted from the checkedSubtasks array.
 * @param {*} i 
 * @param {*} j 
 */
function elseRemoveCheckedSubtasks(i, j){
  let subtask = tasks[i]["subtaskList"][j];
  let index = tasks[i].checkedSubtasks.indexOf(subtask);
    if (index > -1) {
      tasks[i].checkedSubtasks.splice(index, 1);}
}

/**
 * This function is used to close the overlay.
 */
function closeDetailsOverlay(event) {
  let editOverlayParent = document.getElementById("editOverlayParent");
  editOverlayParent.classList.add("d-none");
  isOverlayOpen = !isOverlayOpen;
}