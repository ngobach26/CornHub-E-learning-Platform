const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const requireAuth = require("../middleware/requireAuth");

const createToken = (_id) => {
    const JWT_SECRET = process.env.JWT_SECRET || "hello";
    return jwt.sign({ _id }, JWT_SECRET, { expiresIn: "3d" });
};


// Login route
router.post("/login", async (req, res) => {
    try {
        const { _id, firstName, lastName, email } = await User.login(req.body);

        // Create token
        const token = createToken(_id);

        res.status(200).json({ _id, firstName, lastName, email, token});
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Signup route
router.post("/signup", async (req, res) => {
    try {
        const { _id, firstName, lastName, email } = await User.signup(req.body);

        // Create token
        const token = createToken(_id);

        res.status(200).json({ _id, firstName, lastName, email, token});
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});
router.use(requireAuth);

module.exports = router;