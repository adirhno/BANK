
import { Link } from "react-router-dom";
import Transaction from "./Transaction";


export default function Transactions({ transactions, fetchData, currUser }) {
console.log("transaco", transactions)
	return (
		<>
		{transactions.length > 0?	<div className="transactions">
			{transactions.map((transaction, index) => (
				<Transaction
				currUser={currUser}
					key={index}
					fetchData={fetchData}
					transaction={transaction}
				/>
			))}
		</div>:<div className="addTransacionBtn" ><h2>No transaction Added</h2><Link className="addTransacionBtn" to={'/operations'}><button className="Deposit" >Add transacions</button></Link></div>}
		</>
	);
}
