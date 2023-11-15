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
    duration: String,
    content: [Lesson.Schema],
  });

  module.exports = mongoose.model("Section", sectionSchema);