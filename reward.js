function getCVPoints() {
  return parseInt(localStorage.getItem("cvPoints")) || 0;
}

function setCVPoints(points) {
  localStorage.setItem("cvPoints", points);
  document.getElementById("points-balance").textContent = points;
}

function animatePointsGlow(elementId) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.style.transition = "text-shadow 0.3s ease, transform 0.3s ease";
  el.style.textShadow = "0 0 10px gold, 0 0 20px gold";
  el.style.transform = "scale(1.1)";
  setTimeout(() => {
    el.style.textShadow = "";
    el.style.transform = "scale(1)";
  }, 600);
}

document.addEventListener("DOMContentLoaded", () => {
  setCVPoints(getCVPoints());

  document.querySelectorAll(".redeemReward").forEach(button => {
    button.addEventListener("click", () => {
      let cost = parseInt(button.dataset.points);
      if (getCVPoints() >= cost) {
        setCVPoints(getCVPoints() - cost);
        animatePointsGlow("points-balance");
        alert(`🎉 You redeemed ${cost} CV Points!`);
      } else {
        alert("❌ Not enough CV Points.");
      }
    });
  });
});
