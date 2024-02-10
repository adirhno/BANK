const { default: axios } = require("axios");

const calculateCategoryAmount = function (category) {
	let sum = 0;
	for (let i = 0; i < category.length; i++) {
		sum += category[i].amount;
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

module.exports = { calculateCategoryAmount, calculateBalance };
