const express=require('express')
const app=express()
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const api=require('./routes/api')
const cors = require('cors');
const cookieParser = require("cookie-parser");
const { API } = require('./config');

const port = process.env.PORT || 3001 ;
 require('dotenv').config();
 
mongoose.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
	})
	//  "mongodb://localhost:27017/bank"
	.then(() => console.log("conneted to DB"))
	.catch((err) => console.log(err));

app.use(cookieParser());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
    next()
})
app.use(cors({credentials: true, origin: `http://localhost:3000`}))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(api);


app.listen(port, function () {
	console.log("Server up and running on port ",port);
});
