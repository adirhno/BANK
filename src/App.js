import "./App.css";
import Transactions from "./components/Transactions";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Operations from "./components/Operations";
import Breakdown from "./components/Breakdown";
import { getBalance, breakdown, getAllTransactions } from "../src/server/apiManager";
import Landing from "./components/Landing";
import Footer from "./components/Footer";
import axios from 'axios'
import { API } from "./server/config";

function App() {
	const [data, setData] = useState([]);
	const [categoriesSum, setCategoriesSum] = useState({});
	const [balance, setBalance] = useState(0);
	const [currUser, setCurrUser] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [auth, setAuth] = useState(false);

	useEffect(()=>{
		axios.get(`${API}/`, {withCredentials: true}).then((res)=>{	
		if(res.data.auth){
	    	fetchData(localStorage.getItem("userEmail"))
			setAuth(true)
		} else{setAuth(false)}}
		
		)},[])

	const initBalance = async function (userEmail) {
		await getBalance(userEmail).then((results) => {
			setBalance(results.data.sum);
		});
	};

	const fetchCategoriesSum = async function (userEmail) {
		await breakdown(userEmail).then((results) => {
				setCategoriesSum(results);
		});
	};

	const fetchData = async function (userEmail) {
		await getAllTransactions(userEmail).then(async (data) => {
			if (data.data == "Invalid JWT token!") {
				setAuth(false);
				alert("Invalid JWT token!");
			} else {
				setAuth(true)
				setData(data.data);
				await initBalance(userEmail);
				await fetchCategoriesSum(userEmail);
			}
		});
		setIsLoading(false);
	};

	return <div className="App">
	 {auth ? <Navbar setAuth={setAuth} userName={currUser.userName} balance={balance}/> :<></> }
   {auth?  <Routes>
    <Route path='/transactions' element={<Transactions currUser={currUser} setData={setData} fetchData={fetchData} transactions={data} />} />
    <Route path='/operations' element={ <Operations currUser={currUser} balance={balance} fetchData={fetchData} setBalance={setBalance} />} />
    <Route path='/breakdown' element={<Breakdown categoriesSum={categoriesSum} />} />
    </Routes>  : <Landing setAuth={setAuth} isLoading={isLoading} setIsLoading={setIsLoading} fetchCategoriesSum={fetchCategoriesSum} initBalance={initBalance} fetchData={fetchData} setCurrUser={setCurrUser}/>}
	<Footer />
	</div>;
}

export default App;
