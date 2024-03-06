import "./App.css";
import Transactions from "./components/Transactions";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Operations from "./components/Operations";
import Breakdown from "./components/Breakdown";
import { getBalance, breakdown, getAllTransactions } from "../src/server/apiManager";
import Landing from "./components/Landing";


function App() {
	const [data, setData] = useState([]);
	const [categoriesSum, setCategoriesSum] = useState({});
	const [balance, setBalance] = useState(0);
	const [currUser, setCurrUser] = useState(false);
	const [isLoading, setIsLoading] = useState(false)

	const initBalance = async function (userEmail) {
			await getBalance(userEmail).then((results) => {
			setBalance(results.data.sum);
		});
	};

	const fetchCategoriesSum =async function (userEmail) {
			await breakdown(userEmail).then((results) => {
			setCategoriesSum(results.data);
		});
	};

	const fetchData = async function (userEmail){
		await getAllTransactions(userEmail).then(async (data) => {
			 setData(data.data);
			await initBalance(userEmail);
			await fetchCategoriesSum(userEmail);
		});
		setIsLoading(false)
	};


	return <div className="App" >
	 {currUser ? <Navbar setCurrUser={setCurrUser} userName={currUser.userName} balance={balance}/> :<></> }
   {currUser?  <Routes>
    <Route path='/' element={<Transactions currUser={currUser} setData={setData} fetchData={fetchData} transactions={data} />} />
    <Route path='/operations' element={ <Operations currUser={currUser} balance={balance} fetchData={fetchData} setBalance={setBalance} />} />
    <Route path='/breakdown' element={<Breakdown setCategoriesSum={setCategoriesSum} categoriesSum={categoriesSum} />} />
    </Routes>  : <Landing isLoading={isLoading} setIsLoading={setIsLoading} fetchCategoriesSum={fetchCategoriesSum} initBalance={initBalance} fetchData={fetchData} setCurrUser={setCurrUser}/>}
  
	</div>;
}

export default App;
