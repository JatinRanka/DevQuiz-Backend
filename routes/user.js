const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { User } = require("../models");
const { generateAuthToken } = require("../helper");

router.post("/", async (req, res, next) => {
  try {
    const user = req.body;
    const newUser = new User(user);

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);

    const savedUser = await newUser.save();

    const token = generateAuthToken(savedUser);

    res
      .status(201)
      .header({
        Authorization: token,
        "access-control-expose-headers": "Authorization",
      })
      .json({
        success: true,
        message: "User created successfully.",
        user: savedUser,
      });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    let isValidPassword;

    user && (isValidPassword = await bcrypt.compare(password, user.password));

    if (!user || !isValidPassword) {
      return res.status(404).json({
        success: false,
        message: "Invalid credentials!",
      });
    }

    const token = generateAuthToken(user);

    res
      .header({
        Authorization: token,
        "access-control-expose-headers": "Authorization",
      })
      .json({ success: true, user });
  } catch (error) {
    next(error);
  }
});

module.exports = { router };
