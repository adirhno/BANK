
const breakdownController = require("../controllers/breakdown.controller.js");
const router = require("express").Router()

router.get("/:email", breakdownController.getBreakdown);
router.post("/", breakdownController.sendEmail);

module.exports = router;