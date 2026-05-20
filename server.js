require("dotenv").config();
const app = require("./src/app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// make a .env and add this into that !!
// PORT=3000
// DB_HOST=localhost
// DB_USER=root
// DB_PASSWORD=SarangDB@Secure2026
// DB_NAME=school_management
