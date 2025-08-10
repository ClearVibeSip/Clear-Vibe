// Initial points from localStorage or 0
let cvPoints = parseInt(localStorage.getItem("cvPoints")) || 0;
const pointsDisplay = document.getElementById("cvPoints");
const redeemInput = document.getElementById("redeemCode");
const redeemBtn = document.getElementById("redeemBtn");
const redeemMessage = document.getElementById("redeemMessage");

pointsDisplay.textContent = cvPoints;

// Example valid codes
const codes = {
  "WELCOME100": 100,
  "BONUS500": 500,
  "VIP1000": 1000
};

redeemBtn.addEventListener("click", () => {
  const code = redeemInput.value.trim().toUpperCase();

  if (codes[code]) {
    cvPoints += codes[code];
    localStorage.setItem("cvPoints", cvPoints);
    pointsDisplay.textContent = cvPoints;
    redeemMessage.textContent = `🎉 Success! You received ${codes[code]} CV Points.`;
    redeemMessage.style.color = "lime";
  } else {
    redeemMessage.textContent = "❌ Invalid code. Please try again.";
    redeemMessage.style.color = "red";
  }

  redeemInput.value = "";
});
