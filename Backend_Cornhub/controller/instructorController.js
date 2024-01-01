const express = require("express");
const mongoose = require("mongoose");
const Course = require("../models/course");
const Section = require("../models/section");
const Lesson = require("../models/lesson");

const createCourse = async (req, res) => {
    try {
        const existingCourse = await Course.findOne({ courseTitle: req.body.courseTitle });

        if (existingCourse) {
            return res.status(409).json("Course name existed");
        }

        // Define a list of fields that can be set by the user
        const creatableFields = ['courseTitle', 'description', 'price', 'level', 'language', 'category', 'subcategory', 'objectives', 'coverImage', 'contents'];

        // Create a new course object with only the allowed fields
        let courseData = {};
        creatableFields.forEach(field => {
            if (req.body[field] !== undefined) {
                courseData[field] = req.body[field];
            }
        });

        // Set the status to "waiting_ac"
        courseData.status = "waiting_ac";

        const course = new Course(courseData);
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

        // Populate the publishedCourse array with Course data and select only basic fields
        const userWithCourses = await req.user.populate({
            path: 'publishedCourse',
            model: 'Course',
            select: '_id courseTitle description status category level totalRating coverImage totalLengthSeconds' // Adjust the fields as per your requirements
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
};


const deleteCourse = async (req, res) => {
    try {
        const courseID = req.params.id;

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
        await course.save();

        res.status(200).json({ message: "Course marked for deletion", courseTitle: course.courseTitle });
    } catch (error) {
        console.error('Error updating course:', error);
        res.status(500).json({
            message: error.message,
            error: error.name
        });
    }
};


const updateCourse = async (req, res) => {
    try {
        const courseID = req.params.id;
        const updates = req.body.updates;
        const deletions = req.body.delete;
        const additions = req.body.add; // Assuming additions are provided in this field
        const updatableFields = ['courseTitle', 'description', 'price', 'level', 'language', 'category', 'subcategory', 'objectives', 'coverImage', 'totalLengthSeconds', 'status'];

        // Fetch the course to be updated
        const course = await Course.findById(courseID);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        if (course.status == "banned" || course.status == "waiting_del") {
            return res.status(403).json({ message: "Course is banned or waiting delete" });
        }

        // Check if the course is published by the user
        const isCoursePublishedByUser = req.user.publishedCourse.some(course => course.equals(courseID));
        if (!isCoursePublishedByUser) {
            return res.status(403).json({ message: "Unauthorized to update this course" });
        }

        // Handle top-level course field updates
        if (updates) {
            Object.keys(updates).forEach(key => {
                if (updatableFields.includes(key) && updates[key] !== undefined) {
                    course[key] = updates[key];
                }
            });
        }

        // Handle updates and additions to contents (sections and lessons)
        if (updates && updates.contents) {
            updates.contents.forEach(updateSection => {
                let section = course.contents.id(updateSection._id);
                if (section) {
                    // Update existing section
                    Object.keys(updateSection).forEach(key => {
                        if (key !== 'content' && updateSection[key] !== undefined) {
                            section[key] = updateSection[key];
                        }
                    });

                    // Update lessons within the section
                    if (updateSection.content) {
                        updateSection.content.forEach(updateLesson => {
                            let lesson = section.content.id(updateLesson._id);
                            if (lesson) {
                                // Update existing lesson
                                Object.keys(updateLesson).forEach(lessonKey => {
                                    if (updateLesson[lessonKey] !== undefined) {
                                        lesson[lessonKey] = updateLesson[lessonKey];
                                    }
                                });
                            }
                        });
                    }
                }
            });
        }

        if (additions && additions.contents) {
            additions.contents.forEach(addition => {
                let existingSection = course.contents.find((section, index) => {
                    if (section.sectionTitle === addition.sectionTitle) {
                        sectionIndex = index;
                        return true;
                    }
                    return false;
                });
        
                if (existingSection) {
                    // Handle ordered addition of new lessons
                    if (addition.content) {
                        addition.content.forEach(lesson => {
                            const newLesson = new Lesson(lesson);
                            // If position is specified, insert at that position; otherwise, append
                            if (typeof lesson.position === 'number') {
                                existingSection.content.splice(lesson.position, 0, newLesson);
                            } else {
                                existingSection.content.push(newLesson);
                            }
                        });
                    }
                } else {
                    // Create a new section with its lessons
                    const newSection = new Section({
                        sectionTitle: addition.sectionTitle,
                        duration: addition.duration,
                        content: addition.content ? addition.content.map(lesson => new Lesson(lesson)) : []
                    });
                    // If position is specified for the section, insert at that position; otherwise, append
                    if (typeof addition.position === 'number') {
                        course.contents.splice(addition.position, 0, newSection);
                    } else {
                        course.contents.push(newSection);
                    }
                }
            });
        
        }
        

        // Handle deletions
        if (deletions) {
            // Delete specific sections
            if (deletions.sections) {
                deletions.sections.forEach(sectionId => {
                    const sectionIndex = course.contents.findIndex(section => section._id.toString() === sectionId);
                    if (sectionIndex !== -1) {
                        course.contents.splice(sectionIndex, 1);
                    }
                });
            }
        
            // Delete specific lessons in multiple sections
            if (deletions.sectionLessons) {
                deletions.sectionLessons.forEach(sectionLesson => {
                    const section = course.contents.id(sectionLesson.sectionId);
                    if (section && section.content) {
                        sectionLesson.lessons.forEach(lessonId => {
                            const lessonIndex = section.content.findIndex(lesson => lesson._id.toString() === lessonId);
                            if (lessonIndex !== -1) {
                                section.content.splice(lessonIndex, 1);
                            }
                        });
                    }
                });
            }
        }
        
        // Mark the contents array as modified
        course.markModified('contents');
        
        // Save the updated course
        course.status = 'updated';
        await course.save();
        res.status(200).json({ message: "Course updated successfully", course });
    } catch (error) {
        console.error('Error updating course:', error);
        res.status(500).json({
            message: error.message,
            error: error.name
        });
    }
};

const getCourseById = async (req, res) => {
    try {
        const courseId = req.params.id; // Assuming the ID is passed as a URL parameter

        // Fetch the course from the database
        const course = await Course.findById(courseId);

        // Check if the course was found
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // Return the course data
        res.status(200).json(course);
    } catch (error) {
        console.error('Error fetching course:', error);
        res.status(500).json({
            message: "An error occurred while retrieving the course",
            error: error.message
        });
    }
};


module.exports = { createCourse, getPublishedCourse, deleteCourse, updateCourse, getCourseById };
