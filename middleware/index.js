const jwt = require("jsonwebtoken");
const { UnauthorizedUserError } = require("../helper/custom-errors");
const { User } = require("../models");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

const isUserLoggedIn = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) throw new UnauthorizedUserError();

    const { userId } = jwt.verify(token, SECRET_KEY);
    if (!userId) throw new UnauthorizedUserError();

    const user = await User.findById(userId);
    if (!user) throw new Error("User not found.");

    req.user = user;
    next();
  } catch (error) {
    return res.status(error.responseStatusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { isUserLoggedIn };
