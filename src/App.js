import "./App.css";
import Transactions from "./components/Transactions";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Operations from "./components/Operations";
import Breakdown from "./components/Breakdown";
import React from 'react';





function App() {
	const [data, setData] = useState([]);
	const [categoriesSum, setCategoriesSum] = useState({});
	const [balance, setBalance] = useState(0);

	const initBalance = function () {
		axios.get("http://localhost:3001/sum").then((results) => {
			setBalance(results.data.sum);
		});
	};

	const fetchCategoriesSum = function () {
		axios.get("http://localhost:3001/breakdown").then((results) => {
			setCategoriesSum(results.data);
		});
	};

	const fetchData = function () {
		axios.get("http://localhost:3001/").then((data) => {
			setData(data.data.transactions);
		});
	};

	useEffect(() => fetchCategoriesSum(), [data]);
	useEffect(() => initBalance(), [categoriesSum]);
	useEffect(() => fetchData(), [balance]);

	return <div className="App">
   <Navbar balance={balance} />
 
    <Routes>
    <Route path='/' element={<Transactions fetchData={fetchData} transactions={data} />} />
    <Route path='/operations' element={ <Operations balance={balance} fetchData={fetchData} setBalance={setBalance} />} />
    <Route path='/breakdown' element={<Breakdown categoriesSum={categoriesSum} />} />
    </Routes></div>;
}

export default App;
