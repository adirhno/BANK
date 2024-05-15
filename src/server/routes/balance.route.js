
const balanceController = require("../../controllers/balance.controller.js");
const router = require("express").Router()

router.get("/:email", balanceController.getBalance);

module.exports = router;