const { calculateCategoryAmount } = require("../server/config");
const User = require("../server/models/User");

class BreakdownController {

	async getBreakdown(req, res) {
		try {
			let categoriesObj = {};
			let categoriesArr = [];

			const transactions = await User.findOne({ email: req.params.email })
				.select("transactions")
				.populate("transactions");
			transactions.transactions.map(
				(t) => (categoriesObj[t.category] = t.category)
			);

			for (let i of Object.keys(categoriesObj)) {
				const category = await User.findOne({
					email: req.params.email,
				}).populate({
					path: "transactions",
					match: { category: categoriesObj[i] },
				});

				let temCategory = {};
				temCategory["name"] = categoriesObj[i];
				temCategory["sum"] = calculateCategoryAmount(category);
				categoriesArr.push(temCategory);
			}
			res.send(categoriesArr);
		} catch (err) {
			console.log(err);
		}
	}
}

const breakdownController = new BreakdownController();
module.exports = breakdownController;
