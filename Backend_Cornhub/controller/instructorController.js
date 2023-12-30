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
            status: "waiting_ac",
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

const getPublishedCourse = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Populate the publishedCourse array with Course data
        const userWithCourses = await req.user.populate({
            path: 'publishedCourse',
            model: 'Course'
        });

        // Check if user has published courses
        if (!userWithCourses.publishedCourse.length) {
            return res.status(404).json({ message: "No published courses found" });
        }

        // Send the populated data as response
        res.status(200).json(userWithCourses.publishedCourse);
    } catch (error) {
        console.error('Error getting course:', error);
        res.status(500).json({
            message: error.message,
            error: error.name
        });
    }
}

const deleteCourse = async (req, res) => {
    try {
        const courseID = req.body._id;

        // Check if the course is published by the user
        const isCoursePublishedByUser = req.user.publishedCourse.some(course => course.equals(courseID));
        if (!isCoursePublishedByUser) {
            return res.status(403).json({ message: "Unauthorized to delete this course" });
        }

        // Find the course and check its current status
        const course = await Course.findById(courseID);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        if (course.status === 'waiting_del') {
            return res.status(400).json({ message: "Course is already marked for deletion" });
        }

        // Update the course status to 'waiting_del'
        course.status = 'waiting_del';
        const updatedCourse = await course.save();

        res.status(200).json({ message: "Course marked for deletion", courseTitle: updatedCourse.courseTitle });
    } catch (error) {
        console.error('Error updating course:', error);
        res.status(500).json({
            message: error.message,
            error: error.name
        });
    }
};

module.exports = { createCourse,getPublishedCourse, deleteCourse };