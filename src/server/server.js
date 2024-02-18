const express=require('express')
const app=express()
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const api=require('./routes/api')
 require('dotenv').config();
 
mongoose.connect(process.env.MONGODB_URI , {
		useNewUrlParser: true,
	})
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
app.use(`https://bank-g61v.onrender.com${api}`);

const PORT = 3001;
app.listen(process.env.PORT || PORT, function () {
	console.log("Server up and running on port ",PORT);
});
