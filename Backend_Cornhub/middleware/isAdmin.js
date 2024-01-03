const jwt = require("jsonwebtoken");
const User = require("../models/user");

const isAdmin = (req, res, next) => {
    if (req.User && req.User.isAdmin) { // Adjust depending on your user model
        next();
    } else {
        res.status(403).json({ error: "Access denied. Admin credentials required." });
    }
};

module.exports = isAdmin;
