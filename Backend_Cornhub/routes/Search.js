const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const searchController =  require("../controller/searchController");

router.get("/", searchController.getCourses);
router.get("/purchasedCourses", requireAuth, searchController.getPurchasedCourses);
router.get("/:id", searchController.getCourseById);
router.post("/rating/:id",requireAuth, searchController.updateRating);

module.exports = router;
