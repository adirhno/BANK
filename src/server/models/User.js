/** @format */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	userName: String,
	password: String,
	balance:Number,
	transactions:[{ type: mongoose.Schema.Types.ObjectId, ref: "Transaction" }]
});

const User = mongoose.model("User", userSchema);
module.exports = User;
