const Course = require("../models/course");
const express = require("express");
const mongoose = require("mongoose");
const Lesson = require("../models/lesson");

const getCourses = async (req, res) => {
    try {
        const PER_PAGE = 100
        const page = Number(req.query.page) || 1

        //filter
        let query = {}
        if (req.query.keyword) {
            query.$or = [
              { courseTitle: { $regex: req.query.keyword, $options: 'i' } }
            ];
        }
        // Define a list of fields that can be queried by the user
        const fields = ['language', 'category', 'subcategory', 'level'];
        fields.forEach(field => {
            if (req.query[field]){
                query[field] = req.query[field];
            }
        })
        query.status = {$in: ['published', 'updated','waiting_del']}

        //price interval
        let minPrice = 0
        let maxPrice = Number.MAX_VALUE
        if (req.query.minPrice){
            minPrice = Number(req.query.minPrice)
        }
        if (req.query.maxPrice){
            maxPrice = Number(req.query.maxPrice)
        }
        //query.price = {$gte: minPrice, $lte: maxPrice}
        //minRatings
        if (req.query.ratings){
            query.totalRating = {$gte: Number(ratings)}
        } 
        let coursesQuery = Course.find(query);

        //sort
        let order=-1;
        if (req.query.ascending==="true") 
            order=1
        switch(req.query.sort){
            case "price":
                coursesQuery.sort({price: order});
                break;
            case "duration":
                coursesQuery.sort({totalLengthSeconds: order})
                break;
            default:
                coursesQuery.sort({totalRating: order})
        }
        const courses = await coursesQuery.limit(PER_PAGE).skip(PER_PAGE*(page-1)).populate({
            path: 'author',
            select: 'firstName lastName'
        });   
        res.json({courses})
    } catch(error) {
        console.error('Error searching courses:', error);
        res.status(500).json({
            message: error.message,
            error: error.name
        });
    }
}

const getPurchasedCourses = async (req, res) => {
    try {
        const userWithPurchasedCourses = await req.user.populate([{
                path: 'joinedCourses.courseId', 
                model: 'Course' 
            },
            {
                path: 'joinedCourses.currentLesson', 
                model: 'Lesson' 
            },
            {
                path: 'joinedCourses.completedLessons', 
                model: 'Lesson' 
            }
        ])

        res.status(200).json({purchasedCourses: userWithPurchasedCourses.joinedCourses});
    } catch (error) {
        console.error('Error searching courses:', error);
        res.status(500).json({
            message: error.message,
            error: error.name
        });
    }
}

const getCourseById = async (req, res) => {
    try {
        const courseId = req.params.id; // Assuming the ID is passed as a URL parameter

        // Fetch the course from the database
        const course = await Course.findById(courseId).populate({
            path: 'author',
            select: 'firstName lastName'
        });;

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
const updateRating = async (req, res) => {
  try {
      const courseId = req.params.id; // ID of the course to update
      const userRating = req.body.rating; // New rating provided by the user

      // Find the course and user by ID
      const course = await Course.findById(courseId);
      const user = req.user;

      if (!course || !user) {
          return res.status(404).send({ message: 'Course or User not found' });
      }

      // Check if user is enrolled in the course
      const isEnrolledInCourse = course.studentsEnrolled.includes(user._id);

      // Check if the course is in user's joinedCourses
      const hasJoinedCourse = user.joinedCourses.some(joinedCourse => joinedCourse.courseId.equals(courseId));

      if (!isEnrolledInCourse || !hasJoinedCourse) {
          return res.status(403).send({ message: 'User is not enrolled in this course' });
      }

      // Update course's total rating and number of ratings
      const oldRating = user.joinedCourses.find(rc => rc.courseId.equals(courseId))?.rating;
      if (oldRating !== undefined) {
          // Adjust total rating if user has already rated this course
          course.totalRating = ((course.totalRating * course.numRating) - oldRating + userRating) / course.numRating;
      } else {
          // Add new rating
          course.totalRating = ((course.totalRating * course.numRating) + userRating) / (course.numRating + 1);
          course.numRating += 1;
      }
      await course.save();

      // Update or add the course rating in user's joinedCourses
      const ratedCourseIndex = user.joinedCourses.findIndex(item => item.courseId.equals(courseId));
      if (ratedCourseIndex > -1) {
          // Update existing rating
          user.joinedCourses[ratedCourseIndex].rating = userRating;
      } else {
          // Add new rating
          user.joinedCourses.push({ courseId, rating: userRating });
      }
      await user.save();

      // Send a success response
      res.status(200).send({ message: 'Course rating updated successfully', course: course });
  } catch (error) {
      // Handle potential errors
      res.status(500).send({ message: 'Error updating course rating', error });
  }
};


module.exports = { getCourses, getPurchasedCourses, getCourseById,updateRating }