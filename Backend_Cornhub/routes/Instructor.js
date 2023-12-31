const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const courseController =  require("../controller/instructorController");

router.post("/createcourse",requireAuth, courseController.createCourse);
router.get("/getpublishedcourse",requireAuth, courseController.getPublishedCourse);
router.get("/getcourse/:id",requireAuth, courseController.getCourseById);
router.patch("/deletecourse/:id",requireAuth, courseController.deleteCourse);
router.patch("/updatecourse/:id",requireAuth, courseController.updateCourse);

module.exports = router;
