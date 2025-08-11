// Get points from localStorage or 0
let cvPoints = parseInt(localStorage.getItem("cvPoints")) || 0;

// Match HTML IDs
const pointsDisplay = document.getElementById("points-balance");
const redeemInput = document.getElementById("redeemCode");
const redeemCodeBtn = document.getElementById("redeemCodeBtn");
const redeemMessage = document.getElementById("redeem-message");

// Function to animate number change + gold glow
function animatePoints(from, to) {
  const duration = 600; // animation duration in ms
  const start = performance.now();

  // Add glow effect
  pointsDisplay.classList.add("points-glow");

  function update(now) {
    let progress = Math.min((now - start) / duration, 1);
    let currentValue = Math.floor(from + (to - from) * progress);
    pointsDisplay.textContent = currentValue;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      pointsDisplay.textContent = to; // final value
      // Remove glow after a short delay
      setTimeout(() => pointsDisplay.classList.remove("points-glow"), 500);
    }
  }

  requestAnimationFrame(update);
}

// Display initial points
pointsDisplay.textContent = cvPoints;

// List of redeemable codes
const codes = {
  "WELCOME10": 10,
  "CLEARVIBEMINT": 50,
  "SHRI0703": 500,
  "CLEARVIBESIP": 25,
  "VIPCV": 200,
  "FREEDAY5": 5
};

// Redeem Code Button Click
redeemCodeBtn.addEventListener("click", () => {
  const code = redeemInput.value.trim().toUpperCase();

  if (codes[code]) {
    const oldPoints = cvPoints;
    cvPoints += codes[code];
    localStorage.setItem("cvPoints", cvPoints);
    animatePoints(oldPoints, cvPoints);

    redeemMessage.textContent = `🎉 Success! You received ${codes[code]} CV Points.`;
    redeemMessage.style.color = "lime";
  } else {
    redeemMessage.textContent = "❌ Invalid code. Please try again.";
    redeemMessage.style.color = "red";
  }

  redeemInput.value = "";
});

// Redeem Rewards Button Click
document.getElementById("redeemBtn").addEventListener("click", () => {
  if (cvPoints >= 10) {
    const oldPoints = cvPoints;
    cvPoints -= 10;
    localStorage.setItem("cvPoints", cvPoints);
    animatePoints(oldPoints, cvPoints);
    alert("Redeemed 10 CV Points!");
  } else {
    alert("Not enough points to redeem.");
  }
});
