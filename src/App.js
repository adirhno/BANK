import "./App.css";
import Transactions from "./components/Transactions";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Operations from "./components/Operations";
import Breakdown from "./components/Breakdown";
import {getBalance, breakdown, getAllTransactions} from './apiManager'
import Landing from "./components/Landing";


function App() {
	const [data, setData] = useState([]);
	const [categoriesSum, setCategoriesSum] = useState({});
	const [balance, setBalance] = useState(0);
	const [currUser, setCurrUser] = useState(false)

	const initBalance = function (userName) {
		getBalance(userName).then((results) => {
			setBalance(results.data.sum);
		});
	};

	const fetchCategoriesSum = function () {
		breakdown().then((results) => {
			setCategoriesSum(results.data);
		});
	};

	const fetchData = function (user) {
		console.log("from get all transactions",user)
			getAllTransactions(user).then((data) => {
			console.log("its the data", data)
			setData(data.data);
			initBalance(user)
		});
		
	};

	useEffect(() => fetchCategoriesSum(), [data]);
	
	

	return 	<div className="App">
   {currUser ? <Navbar userName={currUser.userName} balance={balance} />:<Navbar balance={balance} />}
   {currUser?    <Routes>
    <Route path='/' element={<Transactions currUser={currUser} setData={setData} fetchData={fetchData} transactions={data} />} />
    <Route path='/operations' element={ <Operations currUser={currUser} balance={balance} fetchData={fetchData} setBalance={setBalance} />} />
    <Route path='/breakdown' element={<Breakdown setCategoriesSum={setCategoriesSum} categoriesSum={categoriesSum} />} />
    </Routes>  : <Landing initBalance={initBalance} fetchData={fetchData} setCurrUser={setCurrUser}/>}
  
	</div>;
}

export default App;
