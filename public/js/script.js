document.addEventListener("DOMContentLoaded", function () {
  var menuShowBtn = document.getElementById("menu-show-btn");
  var menuHideBtn = document.getElementById("menu-hide-btn");
  var navOverlay = document.querySelector(".nav-overlay");

  menuShowBtn.addEventListener("click", function () {
    navOverlay.classList.add("show-overlay");
  });

  menuHideBtn.addEventListener("click", function () {
    navOverlay.classList.remove("show-overlay");
  });
});

document.addEventListener("DOMContentLoaded", (event) => {
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("date").value = today;
});
