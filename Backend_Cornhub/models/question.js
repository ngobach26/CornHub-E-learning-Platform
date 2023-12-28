const mongoose = require("mongoose");
const { Schema } = mongoose;


const questionSchema = Schema(
  {
    question: {
      type: String,
      required: true,
    },
    questionType: {
      type: String,
      enum: ["text", "photo"],
      required: true,
    },
    questionPic: String,
    answerSelectionType: {
      type: String,
      enum: ["single", "multiple"],
      required: true,
    },
    choices: {
      type: [String],
      default: [],
    },
    correctAnswer: [String],
    explanation: String,
    point: {
      type: String,
      required: true,
    },
    belongedCourse: {
      type: Schema.Types.ObjectId,
      ref: "Course"
    }

  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);