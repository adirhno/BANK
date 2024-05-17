const Transaction = require("../models/Transaction");
const User = require("../models/User");

class TransactionsController {

	async addTransaction(req, res) {
		let transacion = req.body;
		let balance = req.body.balance;
		let amount = transacion.newTransaction.amount;
		let newBalance = balance;

		if (transacion.action === "Withdraw") {
			if (balance - amount >= 500) {
				newBalance -= amount;
				transacion.newTransaction["amount"] = amount * -1;
			} else {
				res.send({ err: "low balance" });
				return;
			}
		} else {
			newBalance += amount;
		}

		const newTransaciona = new Transaction(transacion.newTransaction);
		newTransaciona.save();

		User.findOneAndUpdate(
			{ email: req.body.currUser },
			{ $push: { transactions: newTransaciona } }
		).exec();

		res.send({ newBalance: newBalance });
	}

	async deleteTransaction(req, res) {
		const transacionId = req.params.id;
		Transaction.findByIdAndDelete(transacionId).exec();
		res.sendStatus(201);
	}
}

const transactionsController = new TransactionsController();
module.exports = transactionsController;
