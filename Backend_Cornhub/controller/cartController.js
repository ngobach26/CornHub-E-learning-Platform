const express = require("express");
const mongoose = require("mongoose");
const Course = require("../models/course");


const addToCart = async (req, res) => {
    try {
        const courseId = req.params.id;

        // Retrieve user and course
        const user = req.user;
        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // Add course to user's cart
        user.cart.push(courseId); // Assuming 'cart' is an array of course IDs in the User model
        await user.save();

        res.status(200).json({ message: "Course added to cart"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const removeFromCart =  async (req, res) => {
    try {
        const courseId = req.params.id;

        // Retrieve user
        const user = req.user;
        
        // Remove course from cart
        const index = user.cart.indexOf(courseId);
        if (index > -1) {
            user.cart.splice(index, 1);
        } else {
            return res.status(404).json({ message: "Course not found in cart" });
        }

        await user.save();
        res.status(200).json({ message: "Course removed from cart", cart: user.cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const viewCart = async (req, res) => {
    try {
        const user = await req.user.populate({
            path: 'cart',
            select: '_id courseTitle description price category language author',
            populate: {
                path: 'author',
                select: 'firstName lastName' // Necessary to calculate fullName
            }
        });

        // Map cart items and include author's full name
        const cartItems = user.cart.map(course => ({
            _id: course._id,
            courseTitle: course.courseTitle,
            description: course.description,
            price: course.price,
            category: course.category,
            language: course.language,
            authorName: course.author ? course.author.fullName : 'Unknown' // Using the virtual 'fullName'
        }));

        res.status(200).json({ cart: cartItems });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};






const checkout = async (req, res) => {
    try {
        const user = req.user;
        if (!user.cart.length) {
            return res.status(400).json({ message: "No items in cart to checkout" });
        }

        // Add cart items to joinedCourses
        user.cart.forEach(courseId => {
            // Check if the course is already in joinedCourses
            const isCourseJoined = user.joinedCourses.some(joinedCourse => joinedCourse.courseId.equals(courseId));
            if (!isCourseJoined) {
                user.joinedCourses.push({ courseId });
            }
        });

        user.cart = [];
        await user.save();

        // Respond with order details
        res.status(200).json({ message: "Checkout successful", order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = {addToCart,removeFromCart,viewCart,checkout};