const express = require("express");
const app = express();
const PORT = 3000;

// Dummy database for storing CV Points (you should use a real database in production)
let users = {
  "user123": { cvPoints: 500 },
};

// Middleware to parse JSON requests
app.use(express.json());

// Fetch User CV Points
app.get("/api/get-cv-points/:userId", (req, res) => {
  const userId = req.params.userId;
  if (users[userId]) {
    res.json({ success: true, cvPoints: users[userId].cvPoints });
  } else {
    res.json({ success: false, message: "User not found" });
  }
});

// Redeem Code Endpoint
app.post("/api/redeem-code", (req, res) => {
  const { userId, code } = req.body;

  if (!users[userId]) {
    return res.json({ success: false, message: "User not found" });
  }

  // Sample redeem codes and points
  const validCodes = {
    "WELCOME10": 100,   // 100 CV points
    "FREESHIP": 200,    // 200 CV points
    "NEWUSER500": 500   // 500 CV points
  };

  if (validCodes[code]) {
    users[userId].cvPoints += validCodes[code];
    return res.json({ success: true, message: `Success! You've earned ${validCodes[code]} CV Points.` });
  } else {
    return res.json({ success: false, message: "Invalid code." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
