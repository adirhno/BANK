
const authController = require("../controllers/auth.controller.js");
const router = require("express").Router()

router.post("/register", authController.register);
router.post("/signin", authController.signIn);
router.get("/home/:userEmail", authController.homePage);
router.get("/signout", authController.signOut);
router.post("/verification", authController.verification )

module.exports = router;