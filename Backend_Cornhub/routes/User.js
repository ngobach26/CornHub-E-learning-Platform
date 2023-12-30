const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const userController =  require("../controller/userController");

router.patch("/updateprofile", requireAuth, userController.updateprofile);
router.post("/changepassword", requireAuth, userController.changepassword);

module.exports = router;
