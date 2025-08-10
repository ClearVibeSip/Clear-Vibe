document.addEventListener("DOMContentLoaded", () => {
  const userId = "user123";  // This would typically be dynamically set (e.g., from user session)

  // Elements from the DOM
  const redeemButton = document.getElementById("redeem-btn");
  const redeemCodeInput = document.getElementById("redeem-code");
  const redeemResult = document.getElementById("redeem-result");
  const cvPointsBalance = document.getElementById("cv-points-balance");

  // Fetch user CV Points from the backend when the page loads
  fetch(`http://localhost:3000/api/get-cv-points/${userId}`)
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        cvPointsBalance.textContent = data.cvPoints;
      } else {
        cvPointsBalance.textContent = "Error loading points";
      }
    });

  // Redeem code functionality
  redeemButton.addEventListener("click", () => {
    const code = redeemCodeInput.value.trim().toUpperCase();

    // Make API request to redeem the code
    fetch("http://localhost:3000/api/redeem-code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, code })
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          redeemResult.textContent = data.message;
          redeemResult.style.color = "green";
          // Update CV points balance
          cvPointsBalance.textContent = data.message.includes("earned") ? parseInt(cvPointsBalance.textContent) + parseInt(data.message.split(" ")[4]) : cvPointsBalance.textContent;
        } else {
          redeemResult.textContent = data.message;
          redeemResult.style.color = "red";
        }
      });
  });
});
