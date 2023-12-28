const mongoose = require("mongoose");
const { Schema } = mongoose;

const Course = require("./course");
const Question = require("./question");

const lessonSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["video", "quiz"],
      required: true,
    },
    description: {
      type: String,
    },
    lengthSeconds: {
      type: Number,
      min: 0,
      default: 0,
    },
    data: {
      type: Object,
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lesson", lessonSchema);