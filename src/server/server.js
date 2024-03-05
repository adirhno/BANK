const express=require('express')
const app=express()
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const api=require('./routes/api')
 require('dotenv').config();
 
mongoose.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
	})
	//  "mongodb://localhost:27017/bank"
	.then(() => console.log("conneted to DB"))
	.catch((err) => console.log(err));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
    next()
})
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(api);

const PORT = 3001;
app.listen( PORT, function () {
	console.log("Server up and running on port ",PORT);
});
