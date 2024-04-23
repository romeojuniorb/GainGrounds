
document.addEventListener("DOMContentLoaded", function () {
  setupMenuToggle();
  setDateToToday();
  equalizeCardHeights();
  setupCardToggle();
  setupPopups();

  // Modular function examples
  function setupMenuToggle() {
    const menuShowBtn = document.getElementById("menu-show-btn");
    const menuHideBtn = document.getElementById("menu-hide-btn");
    const navOverlay = document.querySelector(".nav-overlay");

    if (menuShowBtn && menuHideBtn && navOverlay) {
      menuShowBtn.addEventListener("click", () =>
        navOverlay.classList.add("show-overlay")
      );
      menuHideBtn.addEventListener("click", () =>
        navOverlay.classList.remove("show-overlay")
      );
    }
  }

  function setDateToToday() {
    const today = new Date().toISOString().split("T")[0];
    const dateInput = document.getElementById("date");
    if (dateInput) {
      dateInput.value = today;
    }
  }

  function equalizeCardHeights() {
    const cards = document.querySelectorAll(".workout-container .card");
    let maxHeight = 0;
    cards.forEach((card) => {
      if (card.offsetHeight > maxHeight) maxHeight = card.offsetHeight;
    });
    cards.forEach((card) => {
      card.style.height = `${maxHeight}px`;
    });
  }

  function setupCardToggle() {
    document.querySelectorAll(".card .card-header").forEach((header) => {
      header.addEventListener("click", function () {
        const cardBody = this.nextElementSibling;
        cardBody.style.display =
          cardBody.style.display === "none" ? "block" : "none";
      });
  
      const cardBody = header.nextElementSibling;
      cardBody.style.display = "none";
    });
  }
  window.deleteWorkoutPlan = function (planId) {
    if (!confirm("Are you sure you want to delete this workout plan?")) return;

    fetch(`/workoutPlans/${planId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          document.getElementById(`card-${planId}`).remove();
          alert("Workout plan deleted successfully.");
        } else {
          alert("Failed to delete workout plan.");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  function setupPopups() {
    setupPopup("weightGoalsPopup", "button-31", "closeWeightGoal");
    setupPopup("liftsGoalsPopup", "button-32", "closeLiftsGoal");
  }

  function setupPopup(popupId, buttonClass, closeButtonId) {
    const popup = document.getElementById(popupId);
    const button = document.querySelector(`.${buttonClass}`);
    const closeButton = document.getElementById(closeButtonId);

    button?.addEventListener("click", function (event) {
      event.preventDefault();
      popup.style.display = "flex";
    });

    closeButton?.addEventListener("click", function () {
      popup.style.display = "none";
    });

    window.addEventListener("click", function (event) {
      if (event.target === popup) {
        popup.style.display = "none";
      }
    });
  }
});

