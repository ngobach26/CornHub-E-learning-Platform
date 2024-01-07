const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const userController =  require("../controller/userController");

router.get("/getprofile", requireAuth, userController.getprofile);
router.patch("/updateprofile", requireAuth, userController.updateprofile);
router.patch("/changepassword", requireAuth, userController.changepassword);

module.exports = router;
