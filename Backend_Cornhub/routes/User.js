const express = require("express");
const router = express.Router();

const { profile } =  require("../Controllers/userController");

router.get('/profile', profile);
router.patch('/login', profile);


module.exports = router;
