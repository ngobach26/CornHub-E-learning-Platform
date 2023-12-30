const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const courseController =  require("../controller/instructorController");

router.post("/createcourse",requireAuth, courseController.createCourse);
router.get("/getpublishedcourse",requireAuth, courseController.getPublishedCourse);
router.patch("/deletecourse",requireAuth, courseController.deleteCourse);

module.exports = router;