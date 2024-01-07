const mongoose = require("mongoose");
const { Schema } = mongoose;

function atLeastOneCorrect(choices) {
  return choices.some(choice => choice.correct);
}

const choiceSchema = new Schema({
  text: { type: String, required: true },
  correct: { type: Boolean, required: true, default: false }
});

const questionSchema = Schema(
  {
    question: {
      type: String,
      required: true,
    },
    questionType: {
      type: String,
      enum: ['single', 'multiple', 'written']
    },
    questionPic: String,
    choices: {
      type: [choiceSchema],
      validate: [atLeastOneCorrect, 'At least one choice must be marked as correct'],
      required: true,
    },
    explanation: String,
    point: {
      type: Number,
      default: 1,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);