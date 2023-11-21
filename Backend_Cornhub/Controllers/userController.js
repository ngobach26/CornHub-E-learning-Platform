const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const requireAuth = require("../middleware/requireAuth");

const createToken = (_id) => {
    const JWT_SECRET = process.env.JWT_SECRET || "hello";
    return jwt.sign({ _id }, JWT_SECRET, { expiresIn: "3d" });
};

//Profile Route
const profile = async (req, res) => {
    try {
    if (!req.user) {
      return res.status(404).json({ error: "No such user" });
    }
    res.status(200).json(req.user);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
  };
  
const profile = async (req, res) => {
    const { _id } = req.user;
  try {
    // Sử dụng findByIdAndUpdate để cập nhật thông tin người dùng
    const user = await User.findByIdAndUpdate(_id, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ error: "No such user" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = {profile};
