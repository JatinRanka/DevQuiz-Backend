const mongoose = require("mongoose");

const OptionSchema = {
  text: { type: String, required: true },
  isRight: { type: Boolean, default: false },
};

const QuestionSchema = {
  questionText: { type: String, required: true },
  points: { type: Number, default: 1 },
  negativePoints: { type: Number, default: 0 },
  options: [OptionSchema],
};

const QuizSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    leaderboard: [
      {
        user: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
        score: { type: Number, required: true },
      },
    ],
    questions: [QuestionSchema],
  },
  {
    timestamps: true,
  }
);

const Quiz = mongoose.model("Quiz", QuizSchema);
module.exports = { Quiz };
