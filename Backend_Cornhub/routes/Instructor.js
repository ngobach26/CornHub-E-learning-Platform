const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const requireAuth = require("../middleware/requireAuth");
const courseController =  require("../controller/instructorController");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    }, 
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
})

const upload = multer({storage})

router.post("/createcourse",requireAuth, courseController.createCourse);
router.get("/getpublishedcourse",requireAuth, courseController.getPublishedCourse);
router.get("/getcourse/:id",requireAuth, courseController.getCourseById);
router.patch("/deletecourse/:id",requireAuth, courseController.deleteCourse);
router.patch("/updatecourse/:id",requireAuth, courseController.updateCourse);
router.patch("/updatewithimage/:id", requireAuth, upload.single('coverImage'), courseController.updateWithImage)

module.exports = router;
