const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Course = require("../models/course");
const jwt = require("jsonwebtoken");

const listusers = async (req, res) => {
        try {
            const users = await User.find({}); 
            res.status(200).json(users);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    };

const listcourses = async (req, res) => {
    try {
        const courses = await Course.find({});
        res.status(200).json(courses);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const deletecourse = async (req, res) => {
    try {
        const id = req.params.id; // the ID of the course to delete
        const course = await Course.findByIdAndDelete(id);

        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        res.status(200).json({ message: "Course successfully deleted", course });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const acceptcourse = async (req, res) => {
    try {
        const id = req.params.id;
        const course = await Course.findByIdAndUpdate(id, { status: 'accepted' }, { new: true });

        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        res.status(200).json({ message: "Course accepted", course });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const denycourse = async (req, res) => {
    try {
        const id = req.params.id;
        const course = await Course.findByIdAndUpdate(id, { status: 'denied' }, { new: true });

        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        res.status(200).json({ message: "Course denied", course });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
module.exports = {listusers, listcourses, deletecourse, acceptcourse, denycourse};