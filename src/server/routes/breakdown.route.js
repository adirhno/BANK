
const breakdownController = require("../controllers/breakdown.controller.js");
const router = require("express").Router()

router.get("/:email", breakdownController.getBreakdown);

module.exports = router;