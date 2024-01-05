const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');
const requireAuth = require('../middleware/requireAuth'); 
const isAdmin = require('../middleware/isAdmin');

router.get('/listusers', requireAuth, isAdmin, adminController.listusers);
router.get('/listcourses', requireAuth, isAdmin, adminController.listcourses);
router.patch('/acceptcourse/:id', requireAuth, isAdmin, adminController.acceptcourse);
router.patch('/denycourse/:id', requireAuth, isAdmin, adminController.denycourse);
module.exports = router;
