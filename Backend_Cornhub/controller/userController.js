const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');


//Profile Route
const updateprofile = async (req, res) => {
    const { _id } = req.User;
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

const getprofile = async (req, res) => {
  const {email, firstName, lastName, birthday, currentjob, website, twitter, facebook, linkedin, interests, introduction} = req.User;
  res.status(200).json({email, firstName, lastName, birthday, currentjob, website, twitter, facebook, linkedin, interests, introduction});
};

const changepassword = async (req, res) => {
  const {_id, password} = req.User;
  try {
    const { oldPassword, newPassword } = req.body;

    // Check if old password is correct
    const isMatch = await bcrypt.compare(oldPassword, password);
    if (!isMatch) {
      return res.status(400).json({error: "Old password is incorrect"});
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password
    req.user.password = hashedPassword;
    await req.User.save();

    res.status(200).json({success: 'Password changed successfully'});
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Internal Server Error'});
  }
};
module.exports = {getprofile, updateprofile, changepassword};

