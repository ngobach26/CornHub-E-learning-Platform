const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

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

const changepassword = async (req, res) => {
  const {_id} = req.user;
  try {
    const { username } = req.user; // Extract username from token payload
    const { oldPassword, newPassword } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send('User not found');
    }

    // Check if old password is correct
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).send('Old password is incorrect');
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    res.send('Password changed successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
module.exports = {updateprofile, changepassword};

