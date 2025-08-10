// cv-shared.js

// Function to get CV Points
function getCVPoints() {
  return parseInt(localStorage.getItem("cvPoints")) || 0;
}

// Function to set CV Points
function setCVPoints(points) {
  localStorage.setItem("cvPoints", points);
  updateCVDisplay(points);
}

// Function to update all CV displays on the page
function updateCVDisplay(points) {
  document.querySelectorAll(".cv-points-display").forEach(el => {
    el.textContent = points;
  });
}

// Listen for changes from other tabs/pages
window.addEventListener("storage", (event) => {
  if (event.key === "cvPoints") {
    updateCVDisplay(getCVPoints());
  }
});

// Initial display update on page load
document.addEventListener("DOMContentLoaded", () => {
  updateCVDisplay(getCVPoints());
});
