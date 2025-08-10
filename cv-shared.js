// cv-shared.js

// Function to get CV Points
function getCVPoints() {
  return parseInt(localStorage.getItem("cvPoints")) || 0;
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


function setCVPoints(points) {
  localStorage.setItem("cvPoints", points);
  // Trigger a custom event for live updates
  window.dispatchEvent(new Event("cvPointsUpdated"));
}

function updateExploreMenuPoints() {
  const explorePointsElement = document.getElementById("exploreCvPoints");
  if (explorePointsElement) {
    explorePointsElement.textContent = getCVPoints();
  }
}

// Listen for changes and update menu
window.addEventListener("cvPointsUpdated", updateExploreMenuPoints);

// Also run on load
document.addEventListener("DOMContentLoaded", updateExploreMenuPoints);
