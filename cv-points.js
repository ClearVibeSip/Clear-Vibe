// Load saved points or start at 0
let cvPoints = parseInt(localStorage.getItem("cvPoints")) || 0;
document.getElementById("points-balance").textContent = cvPoints;
document.getElementById("cvPointsValue").textContent = cvPoints;

// Function to save points
function savePoints() {
  localStorage.setItem("cvPoints", cvPoints);
}

// Redeem code button click
document.getElementById("redeemCodeBtn").addEventListener("click", async () => {
  const code = document.getElementById("redeemCode").value.trim().toUpperCase();
  const message = document.getElementById("redeem-message");

  if (!code) {
    message.textContent = "⚠️ Please enter a code.";
    message.style.color = "orange";
    return;
  }

  // Assign or get a unique user ID (stored locally)
  const userId = localStorage.getItem("userId") || crypto.randomUUID();
  localStorage.setItem("userId", userId);

  try {
    const response = await fetch("http://localhost:3000/redeem", { // CHANGE to your live server URL if hosted
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, userId })
    });

    const result = await response.json();
    message.textContent = result.message;
    message.style.color = result.success ? "lime" : "red";

    if (result.success) {
      cvPoints += result.points;
      savePoints();
      document.getElementById("points-balance").textContent = cvPoints;
      document.getElementById("cvPointsValue").textContent = cvPoints;
    }

    document.getElementById("redeemCode").value = "";
  } catch (err) {
    console.error(err);
    message.textContent = "❌ Server error. Please try again.";
    message.style.color = "red";
  }
});

// Redirect to rewards page when "Use CV Points" clicked
document.getElementById("usePointsBtn").addEventListener("click", () => {
  window.location.href = "rewards.html";
});
