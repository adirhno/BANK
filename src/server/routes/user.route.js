
const userController = require("../controllers/user.controller.js");
const router = require("express").Router()

router.patch("/", userController.updateUserDetails);

module.exports = router;