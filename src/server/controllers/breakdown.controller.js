const { calculateCategoryAmount } = require("../config");
const User = require("../models/User");
const PDFDocument = require('pdfkit');
const fs = require('fs');
const { buildPDF } = require("../services/pdf.service.js");


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

	async createPdf(req, res) {
		
		try {

			const userTransactions = await User.findOne({email: `${req.body.userDetails.userEmail}`}).select("transactions").populate("transactions");
			
			console.log(userTransactions)
			const fileName = "test";
			// const __filename = fileURLToPath(import.meta.url);
			// const __dirname = dirname(__filename);
			// const filePath = path.join(
			// 	resolve(__dirname, ".."),
			// 	"pdf",
			// 	fileName
			// );

			const pdfDoc = new PDFDocument({
				size: "A4",
				margin: "24",
				info: { Title: `test.pdf`, Author: "my bank" },
			});
			res.setHeader("Content-Type", "application/pdf");
			res.setHeader(
				"Content-Disposition",
				`inline; filename=${fileName}`
			);
		
			buildPDF(pdfDoc, req.body.userDetails.user,userTransactions.transactions );
			pdfDoc.pipe(fs.createWriteStream('transactions.pdf'));
			pdfDoc.save()
			// pdfDoc.pipe(fs.createWriteStream(filePath)); // save copy on the server: optional
			
			pdfDoc.end();
		} catch (err) {
			console.log(err)
		}
	}
}

const breakdownController = new BreakdownController();
module.exports = breakdownController;
