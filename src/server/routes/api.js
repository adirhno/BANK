const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");
const User = require("../models/User");
const { calculateCategoryAmount } = require("../config");
const validator = require("validator");

router.get("/home/:user", async function (req, res) {
	try {
		const user = await User.findOne({ email: `${req.params.user}` })
			.select("transactions")
			.populate("transactions");

		res.send(user.transactions);
	} catch (error) {
		res.sendStatus(400);
	}
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
		const category = await User.findOne({
			email: req.params.user,
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
});

router.get("/balance/:user", async function (req, res) {
	try {
		const balance = await User.findOne({ email: req.params.user })
			.select("transactions")
			.populate("transactions");
		let allCategories = balance.transactions;
		let sum = 0;
		allCategories.map((c) => (sum += c.amount));
		res.send({ sum: sum });
	} catch (error) {
		res.sendStatus(400);
	}
});

router.post("/signup", async function (req, res) {
	let userDetails = req.body;
	try {
		const user = await User.find({ email: userDetails.email });
		if (user.length > 0) {
			if (userDetails.withGoogle) {
				res.sendStatus(200);
			} else {
				throw "email already exist!";
			}
		} else {
			if (validator.isEmail(userDetails.email)) {
				userDetails["transactions"] = [];
				userDetails["balance"] = 0;
				let u1 = new User(userDetails);
				u1.save();
				res.sendStatus(200);
			} else {
				throw "invalid email!";
			}
		}
	} catch (error) {
		res.status(400).send(error);
	}
});

router.post("/signin", async function (req, res) {
	try {
		const user = await User.find({ email: req.body.email });
		if (user.length < 1) {
			throw new Error();
		} else if (user[0].password == req.body.password && !req.body.withGoogle) {
			res.json(user);
		} else {
			res.sendStatus(401);
		}
	} catch (error) {
		res.send(error);
	}
});
module.exports = router;
