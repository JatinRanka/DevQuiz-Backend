const express = require("express");
const { Quiz } = require("../models");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const quizzes = await Quiz.find({});

    res.json({ success: true, quizzes });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const quiz = req.body;
    const newQuiz = new Quiz(quiz);
    const savedQuiz = await newQuiz.save();

    return res.status(201).json({
      success: true,
      message: "Quiz created successfully.",
      quiz: savedQuiz,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.param("quizId", async (req, res, next, id) => {
  try {
    const quiz = await Quiz.findById(id)
      .populate({
        path: "leaderboard.user",
        options: {
          limit: 5,
        },
      })
      .sort({ "leaderboard.score": "asc" });
    if (!quiz) {
      throw new Error("Quiz not found.");
    }

    req.quiz = quiz;
    next();
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
});

router.route("/:quizId").get((req, res) => {
  const { quiz } = req;
  res.json({ success: true, quiz });
});

router.post("/:quizId/leaderboard", async (req, res, next) => {
  try {
    const { quiz } = req;
    const { userId, score } = req.body;

    let doesUserExists = false;
    quiz.leaderboard.forEach((doc) => {
      if (doc.user._id == userId) {
        doesUserExists = true;
        doc.score = score;
      }
    });

    if (!doesUserExists) quiz.leaderboard.push({ user: userId, score });

    const updatedQuiz = await quiz.save();
    const populatedQuiz = await Quiz.findById(quiz._id)
      .populate({
        path: "leaderboard.user",
        options: {
          limit: 5,
        },
      })
      .sort({ "leaderboard.score": "asc" });

    return res.json({
      success: true,
      message: "User score added",
      quiz: populatedQuiz,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = { router };
