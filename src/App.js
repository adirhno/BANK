import "./App.css";
import Transactions from "./components/Transactions";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Operations from "./components/Operations";
import Breakdown from "./components/Breakdown";
import {getBalance, breakdown, getAllTransactions} from './apiManager'


function App() {
	const [data, setData] = useState([]);
	const [categoriesSum, setCategoriesSum] = useState({});
	const [balance, setBalance] = useState(0);

	const initBalance = function () {
		getBalance().then((results) => {
			setBalance(results.data.sum);
		});
	};

	const fetchCategoriesSum = function () {
		breakdown().then((results) => {
			setCategoriesSum(results.data);
		});
	};

	const fetchData = function () {
		getAllTransactions().then((data) => {
			setData(data.data.transactions);
		});
	};

	useEffect(() => fetchCategoriesSum(), [data]);
	useEffect(() => initBalance(), [categoriesSum]);
	useEffect(() => fetchData(), []);

	return 	<div className="App">
    <Navbar balance={balance} />
    <Routes>
    <Route path='/transactions' element={<Transactions setData={setData} fetchData={fetchData} transactions={data} />} />
    <Route path='/operations' element={ <Operations balance={balance} fetchData={fetchData} setBalance={setBalance} />} />
    <Route path='/breakdown' element={<Breakdown setCategoriesSum={setCategoriesSum} categoriesSum={categoriesSum} />} />
    </Routes>
	</div>;
}

export default App;
