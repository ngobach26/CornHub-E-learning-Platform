const mongoose = require("mongoose");
const { Schema } = mongoose;
const Section = require("./section");

const courseSchema = Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            default: "",
        },
        category: [
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
            type: Number,
            default: 0,
        },
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