const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const userController =  require("../controller/userController");

router.patch("/updateprofile", requireAuth, userController.updateprofile);
router.post("/changepw", requireAuth, userController.changepw);

module.exports = router;
