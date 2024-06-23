// const { calculateCategoryAmount, nodemailerFun } = require("../config");
const User = require("../models/User");
const nodemailer = require("nodemailer");

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
		try {
			// const nodemailerFun = function () {
			// 	const transporter = nodemailer.createTransport({
			// 		service: "gmail",
			// 		host: "adir.hino92@gmail.com",
			// 		port: 465,
			// 		secure: true,
			// 		auth: {
			// 			user: "adirhno@gmail.com",
			// 			pass: "gabx-ghcn-khxm-ylqg",
			// 		},
			// 	});

			// 	return transporter;
			// };

			const transporter = nodemailer.createTransport({
					service: "gmail",
					host: "adirhno@gmail.com",
					port: 465,
					secure: true,
					  secureConnection: false,
					auth: {
						user: "adirhno@gmail.com",
						pass: "csnk bgzl hkkh abpf",
					},
				
				});

			const info = {
				from: "adir",
				to: "itaymosh1324@gmail.com",
				subject: "sa",
				text: "ds",
			};

			transporter.sendMail(info, function(re){console.log(re)});

			res.sendStatus(201)
		} catch (err) {
			console.log(err);
		}
	}
}

const breakdownController = new BreakdownController();
module.exports = breakdownController;
