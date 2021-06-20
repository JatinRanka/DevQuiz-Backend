const express = require("express");
const router = express.Router();

const { router: quizRouter } = require("./quiz");
const { router: userRouter } = require("./user");

router.use("/quizzes", quizRouter);
router.use("/users", userRouter);

router.get("/", (req, res) => {
  console.log("Server is up and running.");
  res.json({
    success: true,
    message: "Server is up and running successfully.",
  });
});

module.exports = { router };
