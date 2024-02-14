
import { Link } from "react-router-dom";
import Transaction from "./Transaction";
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import axios from "axios";
import { API } from "../server/config";


export default function Transactions({ transactions, fetchData, setData }) {

	return (
		<>
		{transactions.length > 0?	<div className="transactions">
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
