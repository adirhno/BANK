
const breakdownController = require("../controllers/breakdown.controller.js");
const router = require("express").Router()

router.get("/d/:email", breakdownController.getBreakdown);
router.post("/pdf", breakdownController.createPdf);

module.exports = router;