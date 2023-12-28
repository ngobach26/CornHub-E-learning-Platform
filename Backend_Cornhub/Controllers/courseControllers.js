const express = require("express");
const mongoose = require("mongoose");
const Course = require("../models/course");

const createCourse = async (req, res) => {
    try {
        const existingCourse = await Course.findOne({ courseTitle: req.body.courseTitle });

        if (existingCourse) {
            return res.status(409).json("Course name existed");
        }

        const course = new Course({
            ...req.body,
            status: "waiting"
        });

        const newCourse = await course.save();

        // Add the new course's ID to the user's publishedCourse array
        req.user.publishedCourse.push(newCourse._id);
        await req.user.save();

        res.status(201).json(newCourse);
    } catch (error) {
        console.error('Error creating course:', error);
        res.status(500).json({
            message: error.message,
            error: error.name
        });
    }
};
module.exports = { createCourse };
