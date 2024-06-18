const { default: axios } = require("axios");
const API = "https://bank-g61v.onrender.com";

const calculateCategoryAmount = function (category) {
	let sum = 0;
	for (let i = 0; i < category.transactions.length; i++) {
		sum += category.transactions[i].amount;
	}
	return sum;
};

const calculateBalance = function (allCategories) {
	let sum = 0;
	for (let i of Object.keys(allCategories)) {
		sum += allCategories[i];
	}
	return sum;
};



module.exports = { calculateCategoryAmount, calculateBalance, API };
