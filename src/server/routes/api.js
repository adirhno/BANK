const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");
const User = require("../models/User");
const { calculateCategoryAmount } = require("../config");

router.get("/:user", async function (req, res) {
	const user = await User.findOne({ email: `${req.params.user}` })
		.select("transactions")
		.populate("transactions");

	res.send(user.transactions);
});

router.post("/transactions", function (req, res) {
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
		{ email: req.body.currUser.email },
		{ $push: { transactions: newTransaciona } }
	).then((e) => console.log("oushed", e));

	res.send({ newBalance: newBalance });
});

router.get("/transactions/:id", function (req, res) {
	let transacionId = req.params.id;

	Transaction.findByIdAndDelete(transacionId).exec();
	res.send("transaction deleted succeffuly");
});

router.post("/breakdown", function (req, res) {
	let date = req.body;
	Transaction.find({
		createdAt: {
			$gte: date.start,
			$lte: date.end,
		},
	}).then((transactions) => res.send(transactions));
});

router.get("/breakdown/:user", async function (req, res) {
	let categoriesObj = {};
	let categoriesArr = [];
	const transactions = await User.findOne({ email: req.params.user })
		.select("transactions")
		.populate("transactions");
	transactions.transactions.map(
		(t) => (categoriesObj[t.category] = t.category)
	);

	for (let i of Object.keys(categoriesObj)) {
		const category = await User.findOne({ email: req.params.user }).populate({
			path: "transactions",
			match: { category: categoriesObj[i] },
		});

		let temCategory = {};
		temCategory["name"] = categoriesObj[i];
		temCategory["sum"] = calculateCategoryAmount(category);
		categoriesArr.push(temCategory);
	}

	res.send(categoriesArr);
});

router.get("/balance/:user", async function (req, res) {
	const balance = await User.findOne({ email: req.params.user })
		.select("transactions")
		.populate("transactions");

	let allCategories = balance.transactions;
	let sum = 0;
	allCategories.map((c) => (sum += c.amount));
	res.send({ sum: sum });
});

router.post("/signup", function (req, res) {
	let userDetails = req.body;
	userDetails["transactions"] = [];
	userDetails["balance"] = 0;
	let u1 = new User(userDetails);
	u1.save();
	res.sendStatus(200);
});

router.post("/signin", function (req, res) {
	let user = req.body;
	User.find({ email: user.email }).then((data) => {
		data.length > 0
			? data[0].password == user.password
				? res.send({ status: 200, id: data[0]._id, userName: data[0].userName })
				: res.sendStatus(401)
			: res.sendStatus(401);
	});
});
module.exports = router;
