function goToSummary() {
  window.location.href = "../html/summary.html?msg=";

  const urlParams = new URLSearchParams(window.location.search);
  const msg = urlParams.get("msg");
  if (msg) {
    console.log(msg);
  }
}
