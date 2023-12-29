const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

//Profile Route
const updateprofile = async (req, res) => {
    const { _id } = req.user;
  try {
    // Use findByIdAndUpdate to update user's information
    const user = await User.findByIdAndUpdate(_id, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ error: "No such user" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = {updateprofile};
