const { calculateCategoryAmount, transporter } = require("../config");
const User = require("../models/User");

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

	async sendEmail(req, res) {
		// const { name, email, sub, text } = req.body;
		try{
			const info = {
			from: "adir",
			to: "adirhno@gmail.com",
			subject: "sa",
			text: "ds",
		};

		const transporter = transporter;
		transporter.sendMail(info);

		} catch (err){
			console.log(err)
		}
	}
}

const breakdownController = new BreakdownController();
module.exports = breakdownController;
