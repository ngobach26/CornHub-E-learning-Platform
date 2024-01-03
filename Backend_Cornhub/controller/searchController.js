const Course = require("../models/course");
const express = require("express");
const mongoose = require("mongoose");
const Lesson = require("../models/lesson");

const getCourses = async (req, res) => {
    try {
        const PER_PAGE = 2
        const page = Number(req.query.page) || 1

        //filter
        let query = {}
        if (req.query.keyword) {
            query.$or = [
              { courseTitle: { $regex: req.query.keyword, $options: 'i' } },
              { description: { $regex: req.query.keyword, $options: 'i' } }
            ];
        }
        // Define a list of fields that can be queried by the user
        const fields = ['language', 'category', 'subcategory', 'level'];
        fields.forEach(field => {
            if (req.query[field]){
                query[field] = req.query[field];
            }
        })
        query.status = {$in: ['published', 'updated']}

        //price interval
        let minPrice = 0
        let maxPrice = Number.MAX_VALUE
        if (req.query.minPrice){
            minPrice = Number(req.query.minPrice)
        }
        if (req.query.maxPrice){
            maxPrice = Number(req.query.maxPrice)
        }
        query.price = {$gte: minPrice, $lte: maxPrice}
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
        const courses = await coursesQuery.limit(PER_PAGE).skip(PER_PAGE*(page-1));   
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

        res.status(200).json(userWithPurchasedCourses.joinedCourses);
    } catch (error) {
        console.error('Error searching courses:', error);
        res.status(500).json({
            message: error.message,
            error: error.name
        });
    }
}

module.exports = { getCourses, getPurchasedCourses }