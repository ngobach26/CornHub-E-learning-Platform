const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const listUsers = async (req, res) => {
        try {
            const users = await User.find({}); // Modify as per your user model
            res.status(200).json(users);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    };

    // Other admin operations like deleting a user, editing user roles, etc.
    // ...

module.exports = listUsers;