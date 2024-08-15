/**
 * Diese Funktion dient zum rendern der HTML der einzelnen Aufgaben.
 * @param {*} i 
 * @param {*} status 
 * @returns 
 */
function boardHTML(i, status){
    let element = status[i];
    return/*html*/`
          <div class="one-task-div" draggable="true" ondragstart="startDragging(${element['idNumber']})">
             <div class="toggle-content-change-status"style="display:none;" id="changeStatusMenu-${element['idNumber']}" >
                <button onclick="changeStatusToTodo(${element['idNumber']})">Todo</button>
                <button onclick="changeStatusToInProgress(${element['idNumber']})">In Progress</button>
                <button onclick="changeStatusToAwaitFeedback(${element['idNumber']})">Await Feedback</button>
                <button onclick="changeStatusToDone(${element['idNumber']})">Done</button>
              </div>
              <div class="category-div">
              <div class="category-div-child"id="categorySign-${element['idNumber']}">${element['category']}</div>
             
              <div class="change-status-menu" id="changeStatusMenu" onclick="changeStatusToggle(${element['idNumber']})">:
              </div>
              
            </div>
            <div class="task-headline" onclick="openDetailedTaskOverlay(${element['idNumber']})">${element['title']}</div>
            <div class="task-description"id="descriptionSign-${element['idNumber']}">${element['description']}</div>
            <div id="subtaskLoadboardAndText-${element['idNumber']}"class="subtask-loadboard-and-text d-none">
            </div>
            <div class="assigned-and-priority">
              <div class="assigned-persons-initals"id="assignedPerson-${element['idNumber']}"></div>
              <div id="prioritySVG-${element['idNumber']}"></div>
            </div> 
          </div>
    `
  }