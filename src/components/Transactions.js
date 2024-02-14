
import { Link } from "react-router-dom";
import Transaction from "./Transaction";
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import axios from "axios";
import { API } from "../server/config";


export default function Transactions({ transactions, fetchData, setData }) {
	const [startDate, setStartDate] = useState(null)
	const [endDate, setEndDate] = useState(null)
	
	let date={
		start:startDate,
		end:endDate
	}
	if(startDate && endDate){
		console.log(startDate)
		axios.post(`${API}/breakdown`,date).then((transacions)=>setData(transacions))
	}

	return (
		<>
		{transactions.length > 0?	<div className="transactions">
			<p>Start date <DatePicker  value={startDate} onChange={(newDate)=>setStartDate(newDate.format('YYYY MM DD'))} /></p>
			<p>End date <DatePicker  value={endDate} onChange={(newDate)=>setEndDate(newDate.format('YYYY MM DD'))} /></p>
			{transactions.map((transaction, index) => (
				<Transaction
					key={index}
					fetchData={fetchData}
					transaction={transaction}
				/>
			))}
		</div>:<div className="addTransacionBtn" ><h2>No transaction Added</h2><Link className="addTransacionBtn" to={'/operations'}><button className="Deposit" >Add transacions</button></Link></div>}
		</>
	);
}
