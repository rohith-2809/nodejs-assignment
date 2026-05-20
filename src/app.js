const express = require("express");
const schoolRoutes = require("./routes/schoolRoutes");

const app = express();

app.use(express.json());
app.use("/", schoolRoutes);

module.exports = app;
