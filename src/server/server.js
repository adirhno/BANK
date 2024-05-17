const express=require('express')
const app=express()
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const { API } = require('./config');


const routes = require('./routes')


const port = process.env.PORT || 3001 ;
 require('dotenv').config();
 
mongoose.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
	})
	//  "mongodb://localhost:27017/bank"
	.then(() => console.log("conneted to DB"))
	.catch((err) => console.log(err));
app.use(cors({ origin: `https://bank-transactions-xjkk.onrender.com`,credentials: true}))


app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
	res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
    next()
})
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/auth', routes.auth);
app.use('/balance', routes.balance);
app.use('/transactions', routes.transactions);
app.use('/breakdown', routes.breakdown);


app.listen(port, function () {
	console.log("Server up and running on port ",port);
});
