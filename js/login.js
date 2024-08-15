function goToSummary() {
  window.location.href = "../html/summary.html?msg=";

  const urlParams = new URLSearchParams(window.location.search);
  const msg = urlParams.get("msg");
  if (msg) {
    console.log(msg);
  }
}

function singUp() {
  document.getElementById("login_Content").classList.toggle("d-none");
  document.getElementById("sing_up_content").classList.toggle("d-none");
  document.getElementById("help_initials").classList.toggle("d-none");
  document.getElementById("blue_signed_up").classList.toggle("d-none");
  document.getElementById("help_initials_mobile").classList.toggle("d-none");
}