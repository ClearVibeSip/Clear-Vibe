

// Function to animate number change + gold glow
function animatePoints(from, to) {
  const duration = 600; // animation duration in ms
  const start = performance.now();

 // Load saved points or start at 0
let cvPoints = parseInt(localStorage.getItem("cvPoints")) || 0;
const usedCodes = JSON.parse(localStorage.getItem("usedCodes")) || [];

const codes = {
  "WELCOME10": 10,
  "CLEARVIBEMINT": 50,
  "SHRI0703": 500,
  "CLEARVIBESIP": 25,
  "VIPCV": 200,
  "FREEDAY5": 5
};

// Update points on page load
document.getElementById("points-balance").textContent = cvPoints;
document.getElementById("cvPointsValue").textContent = cvPoints;

// Function to save points
function savePoints() {
  localStorage.setItem("cvPoints", cvPoints);
}

// Function to check if code is used
function hasUsedCode(code) {
  return usedCodes.includes(code);
}

// Function to mark a code as used
function markCodeUsed(code) {
  usedCodes.push(code);
  localStorage.setItem("usedCodes", JSON.stringify(usedCodes));
}

// Redeem code button click
document.getElementById("redeemCodeBtn").addEventListener("click", () => {
  const codeInput = document.getElementById("redeemCode").value.trim().toUpperCase();
  const message = document.getElementById("redeem-message");

  if (!codeInput) {
    message.textContent = "⚠️ Please enter a code.";
    message.style.color = "orange";
    return;
  }

  if (hasUsedCode(codeInput)) {
    message.textContent = "⚠️ You have already used this code.";
    message.style.color = "orange";
  } else if (codes[codeInput]) {
    cvPoints += codes[codeInput];
    savePoints();
    markCodeUsed(codeInput);

    document.getElementById("points-balance").textContent = cvPoints;
    document.getElementById("cvPointsValue").textContent = cvPoints;

    message.textContent = `🎉 You earned ${codes[codeInput]} CV Points!`;
    message.style.color = "lime";
  } else {
    message.textContent = "❌ Invalid code. Try again.";
    message.style.color = "red";
  }

  document.getElementById("redeemCode").value = "";
});

