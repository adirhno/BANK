
const breakdownController = require("../../controllers/breakdown.controller");
const router = require("express").Router()

router.get("/:email", breakdownController.getBreakdown);

module.exports = router;