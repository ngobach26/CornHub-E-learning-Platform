const express = require("express");
const router = express.Router();

const { signup, login} =  require('../Controllers/AuthControllers');
const requireAuth = require("../middleware/requireAuth");

// router.use(requireAuth);

router.post('/signup', signup);
router.post('/login', login);


module.exports = router;