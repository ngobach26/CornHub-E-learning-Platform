const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentsSchema = new Schema({
    content: {
      type: String,
      trim: true,
    },
    belongedCourse:{
        type: Schema.Types.ObjectId,
        ref: "Course"
    },
    belongedUser:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    replies:[this]
  },
  { timestamps: true });

  module.exports = mongoose.model("Comments", commentsSchema);