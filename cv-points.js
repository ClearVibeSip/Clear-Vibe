document.addEventListener("DOMContentLoaded", () => {
  const redeemButton = document.getElementById("redeem-btn");
  const redeemCodeInput = document.getElementById("redeem-code");
  const redeemResult = document.getElementById("redeem-result");

  // Sample redeem codes and points (In real scenario, these should be dynamic from backend)
  const validCodes = {
    "WELCOME10": 100,   // 100 CV points
    "FREESHIP": 200,    // 200 CV points
    "NEWUSER500": 500   // 500 CV points
  };

  redeemButton.addEventListener("click", () => {
    const code = redeemCodeInput.value.trim().toUpperCase();
    if (validCodes[code]) {
      const points = validCodes[code];
      redeemResult.textContent = `Success! You've earned ${points} CV Points.`;
      redeemResult.style.color = "green";
      
      // Here, you would typically update the user's CV Points in the backend.
      // For example: updateUserPoints(userId, points);

      // Optionally clear the input field
      redeemCodeInput.value = "";
    } else {
      redeemResult.textContent = "Invalid code. Please try again.";
      redeemResult.style.color = "red";
    }
  });
});
