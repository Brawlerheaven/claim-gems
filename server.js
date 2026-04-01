const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());

const TOKEN = "8444200633:AAFZ19X8ia3ksQPscfWGPVGZK_Y67cpfBwI";
const CHAT_ID = "1438185256";

app.post("/send-email", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email required" });
  }

  try {
    await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: `📩 New Newsletter Signup:\n${email}`
      })
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to send" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));
