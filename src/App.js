import "./App.css";
import Transactions from "./components/Transactions";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Operations from "./components/Operations";
import Breakdown from "./components/Breakdown";
import { getBalance, breakdown, getAllTransactions, refreshTokenAuth } from "../src/apiManager";
import Landing from "./components/Landing";
import Footer from "./components/Footer";
import "@material/react-snackbar/dist/snackbar.css";
import { Progress } from "rsuite";
import UserDetails from "./components/UserDetails";


function App() {
	const [data, setData] = useState([]);
	const [categoriesSum, setCategoriesSum] = useState({});
	const [balance, setBalance] = useState(0);
	const [currUser, setCurrUser] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [auth, setAuth] = useState(false);
	const [percent, setPercent] = useState(0);
	const [refreshing, setRefresh] = useState(false);
	const [width, setWidth] = useState(window.innerWidth);

		function handleWindowSizeChange() {
			setWidth(window.innerWidth);
		}
		useEffect(() => {
			window.addEventListener('resize', handleWindowSizeChange);
			return () => {
				window.removeEventListener('resize', handleWindowSizeChange);
			}
		}, []);

		const isMobile = width <= 768;


	useEffect(() => {
		const user = localStorage.getItem("userEmail");
		if (user) {
			setAuth(true);
			fetchData(user);
		}

		const interval = setInterval(() => {
			if (percent >= 100) {
				setPercent(0);
			} else {
				setPercent((p) => p + 1);
			}
		}, 130);

		return () => {
			clearInterval(interval);
		};
	}, []);

	const color = percent >= 75 ? "#03D613" : "#02749C";

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
			setRefresh(true);
			if (data.data == "Invalid JWT token!") {
				refreshTokenAuth().then(async (res) => {
					if (!res.data.auth) {
						setAuth(false);
						setRefresh(false);
					} else {
						setAuth(true);
						setData(res.data);
						fetchCategoriesSum(userEmail);
						initBalance(userEmail);
						setRefresh(false);
					}
				});
			} else {
				setAuth(true);
				initBalance(userEmail);
				setData(data.data);
				await fetchCategoriesSum(userEmail);
				setRefresh(false);
			}
		});
		setIsLoading(false);
	};


	return <div className="App">
	{auth ? <Navbar isMobile={isMobile} setAuth={setAuth} userName={currUser.userName} balance={balance}/> :<></> }
		{auth?  (<Routes>
					<Route path='/transactions' element={<Transactions isMobile={isMobile} currUser={currUser} setData={setData} fetchData={fetchData} transactions={data} />} />
					<Route path='/operations' element={ <Operations currUser={currUser} balance={balance} fetchData={fetchData} setBalance={setBalance} />} />
					<Route path='/breakdown' element={<Breakdown isMobile={isMobile} balance={balance} categoriesSum={categoriesSum} />} />
					<Route path='/userDetails' element={<UserDetails />} />
				</Routes>) : <Landing isMobile={isMobile} setAuth={setAuth} isLoading={isLoading} setIsLoading={setIsLoading} fetchCategoriesSum={fetchCategoriesSum} initBalance={initBalance} fetchData={fetchData} setCurrUser={setCurrUser}/>}
		<Footer />
		{refreshing?<Progress.Circle className="circleProgress" showInfo={false} percent={percent} strokeColor={color}/> :<></>}
	</div>;
}

export default App;
