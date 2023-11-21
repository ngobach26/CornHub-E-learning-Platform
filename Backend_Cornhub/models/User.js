const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");
const validator = require('validator');

const userSchema = Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        birthday: {
            type: Date,
        },
        interests: [{type: String}],
        joinedCourses: {
            type: [
                {
                    courseId: {
                        type: Schema.Types.ObjectId,
                        ref: "Course",
                    },
                    currentLesson: {
                        type: Schema.Types.ObjectId,
                        ref: "Lesson",
                    },
                    completedLessons: [
                        {
                            type: Schema.Types.ObjectId,
                            ref: "Lesson",
                        },
                    ],
                },
            ],
            default: [],
        },
        cart:[{
            type: Schema.Types.ObjectId,
            ref: "Course",
            default: [],
        }],
        publishedCourse:[{
            type: Schema.Types.ObjectId,
            ref:"Course",
            default: [],
        }],
    },
    { timestamps: true }
);

userSchema.statics.signup = async function (data) {
    const { email, password } = data;

    if (!email || !password) {
        throw Error("All fields must be filled");
    }
    if (!validator.isEmail(email)) {
        throw Error("Email is not valid");
    }
    // if (!validator.isStrongPassword(password)) {
    //     throw Error("Password not strong enough");
    // }

    const exists = await this.findOne({ email });

    if (exists) {
        throw Error("Email already in use");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ ...data, password: hash });

    return user;
};

userSchema.statics.login = async function (data) {
    const { email, password } = data;

    if (!email || !password) {
        throw Error("All fields must be filled");
    }

    const user = await this.findOne({ email });
    if (!user) {
        throw Error("Email not found");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw Error("Incorrect password");
    }

    return user;
};

module.exports = mongoose.model("User", userSchema);