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
            default: "",
        },
        status:{
            type: String,
            enum: ['waiting','published'],
        },
        category:{
            type: String,
            default: "",
            required: true
        },
        subcategory: [
            {
                type: String
            }
        ],
        language: {
            type: String,
            default: "",
        },
        createdDate: { type: Date },
        updatedDate: { type: Date },
        level: {
            type: String,
            enum: ['Beginner', 'Intermediate', 'Expert', 'All Levels'],
          },
        price: {
            type: Number,
            required: true,
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
            required: true,
        },
        totalLengthSeconds: {
            type: Number,
        },
    },
    { timestamps: true }
);

courseSchema.index({ name: "text", description: "text" });

module.exports = mongoose.model("Course", courseSchema);