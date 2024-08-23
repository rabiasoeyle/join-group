/**
 * This function is for including header, footer and sidebar in all Pages.
 * @returns 
 */
function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /*loop through a collection of all HTML elements:*/
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /*make an HTTP request using the attribute value as the file name:*/
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;
          }
          if (this.status == 404) {
            elmnt.innerHTML = "Page not found.";
          }
          /*remove the attribute, and call this function once more:*/
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      };
      xhttp.open("GET", file, true);
      xhttp.send();
      
      /*exit the function:*/
      return;
    }
  }
  const usernameInitial = localStorage.getItem('usernameInitial');
  document.getElementById('circle').textContent = usernameInitial;
}

/**
 * This function sends the user back to login
 */
function backToLogin() {
  window.location.href = "../html/index.html";
}

/**
 * This function is for the dropdown menu in the header
 * @param {*} event 
 */
function toggleDropdown(event) {
  event.stopPropagation();
  let dropdownMenuHeader = document.getElementById("dropdownMenuHeader");
  if (dropdownMenuHeader.style.display === "block") {
    dropdownMenuHeader.style.display = "none";
  } else {
    dropdownMenuHeader.style.display = "block";
  }
}

/**
 * This function sends the user back to login
 */
function logOut() {
  localStorage.clear();
  window.location.href = "../html/index.html";
}