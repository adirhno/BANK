
const transactionsController = require("../controllers/transactions.controller.js");
const router = require("express").Router()

router.post("/transaction", transactionsController.addTransaction);
router.delete("/transaction/:id", transactionsController.deleteTransaction);

module.exports = router;