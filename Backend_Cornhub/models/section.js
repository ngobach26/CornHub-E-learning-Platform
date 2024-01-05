const mongoose = require("mongoose");
const { Schema } = mongoose;
const Lesson = require("./lesson");

const sectionSchema = new Schema({
    sectionTitle: {
      type: String,
      trim: true,
      minlength: 3,
      maxLength: 80,
      required: true,
    },
    duration: {
      type: Number,
      min: 0,
      default: 0,
    },
    content: [Lesson.schema],
  },
  );

  module.exports = mongoose.model("Section", sectionSchema);