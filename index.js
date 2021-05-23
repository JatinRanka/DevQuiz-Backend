const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const { router } = require("./routes");
const { initializeDBConnection } = require("./db/db.connect.js");
const PORT = process.env.PORT || 5000;
require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

// called before any route handler
initializeDBConnection();

app.use("/api/", router);

// 404 Route Handler
// Note: DO not MOVE. This should be the last route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "route not found on server, please check",
  });
});

// Error Handler
// Note: DO not MOVE. This should be the last route
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({
    success: false,
    message: error.message,
  });
});

app.listen(PORT, () => {
  console.log("Server started on port: ", PORT);
});
