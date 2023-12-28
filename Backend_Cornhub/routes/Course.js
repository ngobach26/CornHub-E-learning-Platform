const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const courseController =  require("../controllers/courseControllers");

router.post("/createcourse",requireAuth, courseController.createCourse);


module.exports = router;
