const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');
const requireAuth = require('../middleware/requireAuth'); 
const isAdmin = require('../middleware/isAdmin');

router.get('/users', requireAuth, isAdmin, adminController.listusers);
router.get('/courses', requireAuth, isAdmin, adminController.listcourses);
router.delete('/courses/:id', requireAuth, isAdmin, adminController.deletecourse);
router.patch('/courses/:id/accept', requireAuth, isAdmin, adminController.acceptcourse);
router.patch('/courses/:id/deny', requireAuth, isAdmin, adminController.denycourse);
module.exports = router;
