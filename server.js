const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const DATA_FILE = "redeem-data.json";

// Load data
function loadData() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({ usageCount: {}, redeemedByUser: {} }, null, 2));
  }
  return JSON.parse(fs.readFileSync(DATA_FILE));
}

// Save data
function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// Codes and limits
const codes = {
  "WELCOME10": { points: 10, maxUses: 100 },
  "CLEARVIBEMINT": { points: 50, maxUses: 50 },
  "SHRI0703": { points: 500, maxUses: 5 },
  "CLEARVIBESIP": { points: 25, maxUses: 30 },
  "VIPCV": { points: 200, maxUses: 10 },
  "FREEDAY5": { points: 5, maxUses: 200 }
};

app.post("/redeem", (req, res) => {
  const { code, userId } = req.body;
  const data = loadData();

  if (!codes[code]) {
    return res.json({ success: false, message: "❌ Invalid code." });
  }

  // Already redeemed by this user?
  if (data.redeemedByUser[userId]?.includes(code)) {
    return res.json({ success: false, message: "⚠ You already redeemed this code." });
  }

  // Global usage limit reached?
  if ((data.usageCount[code] || 0) >= codes[code].maxUses) {
    return res.json({ success: false, message: "🚫 This code has reached its maximum redemptions." });
  }

  // Give points
  data.usageCount[code] = (data.usageCount[code] || 0) + 1;
  if (!data.redeemedByUser[userId]) data.redeemedByUser[userId] = [];
  data.redeemedByUser[userId].push(code);

  saveData(data);

  res.json({ success: true, points: codes[code].points, message: `🎉 You earned ${codes[code].points} CV points!` });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

