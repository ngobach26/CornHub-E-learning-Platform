const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const courseController =  require("../controller/courseController");

router.get("/", courseController.getCourses);
router.get("/purchasedCourses", requireAuth, courseController.getPurchasedCourses);
router.get("/:id", courseController.getCourseById);
router.post("/rating/:id",requireAuth, courseController.updateRating);

module.exports = router;
