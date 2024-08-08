const urlParams = new URLSearchParams(window.location.search);
const msg = urlParams.get('msg');
if(msg){
    console.log(msg);
} 
let firebase_URL =
  "https://join-2-b992b-default-rtdb.europe-west1.firebasedatabase.app/";
let tasks =[];

async function initBoard() {
    await loadTasks()
    todoBoard();
    inProgressBoard();
    awaitFeedbackBoard();
    doneBoard();
}

async function loadTasks(path="/tasks"){
    let response = await fetch(firebase_URL + path + ".json");
    let responseToJson = await response.json();
    if (responseToJson) {
      Object.keys(responseToJson).forEach((key) => {
        tasks.push({
            id:key,
            title:responseToJson[key]["title"],
            description: responseToJson[key]["decription"],
            assigned: responseToJson[key]["assigned"],
            dueDate: responseToJson[key]["dueDate"],
            category:responseToJson[key]["category"],
            priority:responseToJson[key]["priority"],
            subtaskList:responseToJson[key]["subtaskList"],
            status:responseToJson[key]["status"],
        });
      });
  }
}
 
function todoBoard(){
    
}
function inProgressBoard(){

}
function awaitFeedbackBoard(){

}
function doneBoard(){

}
function changeFillColor(){

}
function changeFillColorBack(){

}