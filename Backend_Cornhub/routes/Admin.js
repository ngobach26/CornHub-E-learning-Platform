const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');
const requireAuth = require('../middleware/requireAuth'); 
const isAdmin = require('../middleware/isAdmin');

router.get('/users', requireAuth, isAdmin, adminController.listusers);
router.get('/course', requireAuth, isAdmin, adminController.listcourses);
router.patch('/course/accept/:id', requireAuth, isAdmin, adminController.acceptcourse);
router.patch('/course/banned/:id', requireAuth, isAdmin, adminController.denycourse);
router.delete('/course/:id', requireAuth, isAdmin, adminController.deletecourse);
router.get("/user/:id",requireAuth, isAdmin, adminController.getUserById)

module.exports = router;
