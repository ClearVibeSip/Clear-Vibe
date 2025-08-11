// Initial points from localStorage or 0
let cvPoints = parseInt(localStorage.getItem("cvPoints")) || 0;
const pointsDisplay = document.getElementById("cvPoints");
const redeemInput = document.getElementById("redeemCode");
const redeemBtn = document.getElementById("redeemBtn");
const redeemMessage = document.getElementById("redeemMessage");

pointsDisplay.textContent = cvPoints;


let cvPoints = 0;

const codes = {
  "WELCOME10": 10,
  "CLEARVIBEMINT": 50,
  "SHRI0703": 500,
  "CLEARVIBESIP": 25,  // Gives 25 CV points
  "VIPCV": 200,   // Gives 200 CV points
  "FREEDAY5": 5    // Gives 5 CV points
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



// Redeem Code
document.getElementById("redeemCodeBtn").addEventListener("click", () => {
  const codeInput = document.getElementById("redeem-code").value.trim().toUpperCase();
    const message = document.getElementById("redeem-message");

    if (codes[codeInput]) {
        cvPoints += codes[codeInput];
        document.getElementById("points-balance").textContent = cvPoints;
        message.textContent = `🎉 You earned ${codes[codeInput]} CV points!`;
        document.getElementById("redeem-code").value = "";
    } else {
        message.textContent = "❌ Invalid code. Try again.";
    }
});

// Redeem Rewards
document.querySelectorAll(".redeemReward").forEach(button => {
  button.addEventListener("click", () => {
    let cost = parseInt(button.dataset.points);
    if (getCVPoints() >= cost) {
      setCVPoints(getCVPoints() - cost);
      alert(`You redeemed ${cost} CV Points for this reward!`);
    } else {
      alert("Not enough CV Points!");
    }
  });
});




document.addEventListener("DOMContentLoaded", () => {
  const pointsValue = document.getElementById("cvPointsValue");

  function updatePointsDisplay() {
    pointsValue.textContent = getCVPoints();
  }

  // Listen for live updates
  window.addEventListener("cvPointsUpdated", updatePointsDisplay);

  // Initial load
  updatePointsDisplay();

  // Example redeem button logic
  document.getElementById("redeemBtn").addEventListener("click", () => {
    let currentPoints = getCVPoints();
    if (currentPoints >= 10) {
      setCVPoints(currentPoints - 10);
      alert("Redeemed 10 CV Points!");
    } else {
      alert("Not enough points to redeem.");
    }
  });
});





