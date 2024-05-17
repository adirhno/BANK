const User = require("../models/User");

class BalanceController {

	async getBalance(req, res) {
		try {
			const balance = await User.findOne({ email: req.params.email }).select("transactions").populate("transactions");
			let allCategories = balance.transactions;
			let sum = 0;
			allCategories.map((c) => (sum += c.amount));
			res.send({ sum });
		} catch (error) {
			res.sendStatus(400);
		}
	}
}

const balanceController = new BalanceController()
module.exports = balanceController
