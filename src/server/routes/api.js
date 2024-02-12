const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");
const axios = require("axios");
const { calculateCategoryAmount } = require("../config");

router.get("/", async function (req, res) {
	Transaction.find({})
		.exec()
		.then((transactions) => res.send({ transactions }));
});

router.post("/transaction", function (req, res) {
	let transacion = req.body;
	const t1 = new Transaction(transacion);
	t1.save();
	res.send("transaction added!");
});

router.get("/transaction/:id", function (req, res) {
	let transacionId = req.params.id;
	console.log(transacionId);
	Transaction.findByIdAndDelete(transacionId).exec();
	res.send("transaction deleted succeffuly");
});

router.get("/breakdown", async function (req, res) {
	let categoriesObj = {};
	let categoriesArr = [];
	await Transaction.find({}).then((transactions) => {
			transactions.map((t) => (categoriesObj[t.category] = t.category));}).then(async () => {
				for (let i of Object.keys(categoriesObj)) {
				let temCategory = {};
				await Transaction.find({ category: categoriesObj[i] }).then((result) => {
						temCategory["name"] = categoriesObj[i] 
						temCategory["sum"] = calculateCategoryAmount(result)
						categoriesArr.push(temCategory);
					}
				);
			}
			res.send(categoriesArr);
		});
});

router.get("/sum", function (req, res) {
	Transaction.find({}).then((data) => {
		let allCategories = data;
		let sum = 0;
		allCategories.map((c) => (sum += c.amount));
		res.send({ sum: sum });
	});
});
module.exports = router;
