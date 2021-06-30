const mongoose = require("mongoose");
require("dotenv").config();
const MONGODB_URI = process.env.MONGODB_URI;

const initializeDBConnection = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("mongoose connection failed: ", error);
  }
};

module.exports = { initializeDBConnection };
