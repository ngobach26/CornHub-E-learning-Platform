const mongoose = require("mongoose");
const { Schema } = mongoose;
const Section = require("./section");
const Comments = require("./comments");

const courseSchema = Schema(
    {
        courseTitle: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        status:{
            type: String,
            enum: ['waiting_ac','published','banned','waiting_del'],
        },
        category:{
            type: String,
            required: true
        },
        subcategory: [
            {
                type: String
            }
        ],
        language: {
            type: String,
        },
        level: {
            type: String,
            enum: ['Beginner', 'Intermediate', 'Expert', 'All Levels'],
          },
        price: {
            type: Number,
        },
        contents: [Section.schema],
        totalRating: {
            type: Number,
            default: 0,
        },
        numRating: {
            type: Number,
            default: 0,
        },
        studentsEnrolled: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        comments:[Comments.schema],
        objectives: {
            type: String,
        },
        coverImage: {
            type: String,
        },
        totalLengthSeconds: {
            type: Number,
        },
    },
    { timestamps: true }
);

courseSchema.index({ name: "text", description: "text" });

module.exports = mongoose.model("Course", courseSchema);