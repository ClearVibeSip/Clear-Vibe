let cvPoints = parseInt(localStorage.getItem("cvPoints")) || 0;
document.getElementById("points-balance").textContent = cvPoints;

// Function to save updated points
function savePoints() {
    localStorage.setItem("cvPoints", cvPoints);
}

// Handle reward redemption
document.querySelectorAll(".redeemReward").forEach(button => {
    button.addEventListener("click", () => {
        let cost = parseInt(button.dataset.points);
        if (cvPoints >= cost) {
            cvPoints -= cost;
            savePoints();
            document.getElementById("points-balance").textContent = cvPoints;
            alert(`🎉 You redeemed a reward for ${cost} CV Points!`);
        } else {
            alert("❌ Not enough CV Points!");
        }
    });
});
