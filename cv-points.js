

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
document.getElementById("redeemCodeBtn").addEventListener("click", async () => {
  const code = document.getElementById("redeemCode").value.trim().toUpperCase();
  const userId = localStorage.getItem("userId") || crypto.randomUUID(); // Generate and store a unique user ID
  localStorage.setItem("userId", userId);

  const response = await fetch("http://localhost:3000/redeem", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code, userId })
  });

  const result = await response.json();
  const message = document.getElementById("redeem-message");

  message.textContent = result.message;
  message.style.color = result.success ? "lime" : "red";

  if (result.success) {
    let currentPoints = getCVPoints();
    setCVPoints(currentPoints + result.points);
  }
});

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


