import React, { useState } from "react";
import Button from "./Button";
import {deleteTransaction} from '../server/apiManager'

export default function Transaction({ transaction, fetchData, currUser }) {

	const handleDeleteTransaction= async (id) =>{
		 await deleteTransaction(id).then(()=>fetchData(currUser.email))
	}
	return (
		<div className="transaction">
			<div className="leftContent">
			<span className="transactionVendor">{transaction.vendor}</span>
			{transaction.amount < 0? <span className="red">{transaction.amount}</span>:<span className="green">{transaction.amount}</span>}
			</div>
			<div className="rightContent">
			<span className="transactionCategory">{transaction.category}</span>
			<Button className='deleteBtn' transaction={transaction} handleDeleteTransaction={handleDeleteTransaction} action={'Delete'}></Button>
			</div>
			<div className="transactionDate"> {transaction.createdAt}</div>
		</div>
	);
}
