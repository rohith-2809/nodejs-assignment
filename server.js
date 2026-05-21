require("dotenv").config();
const app = require("./src/app");
const pool = require("./src/config/db");

const PORT = process.env.PORT || 3000;

app.get("/keep-alive", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.status(200).json({ message: "Keep-alive ping successful" });
  } catch (error) {
    console.error("Keep-alive DB ping failed:", error);
    res.status(500).json({ error: "Database ping failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

  const serverUrl = process.env.SERVER_URL || `http://localhost:${PORT}`;
  const protocol = serverUrl.startsWith("https") ? require("https") : require("http");

  setInterval(() => {
    protocol.get(`${serverUrl}/keep-alive`, (res) => {
      console.log(`Keep-alive ping status: ${res.statusCode}`);
    }).on("error", (err) => {
      console.error("Keep-alive ping error:", err.message);
    });
  }, 10 * 60 * 1000); // 10 minutes
});

// make a .env and add this into that !!
// PORT=3000
// DB_HOST=localhost
// DB_USER=root
// DB_PASSWORD=SarangDB@Secure2026
// DB_NAME=school_management
