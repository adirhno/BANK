import React, { useEffect, useState } from "react";
import Button from "./Button";
import { addTransaction } from "../apiManager";
import { Snackbar } from "@material/react-snackbar";
import "@material/react-snackbar/dist/snackbar.css";

export default function Operations({ setBalance, fetchData, balance }) {
	const [amount, setAmount] = useState(0);
	const [vendor, setVendor] = useState("");
	const [category, setCategory] = useState("");
	const [snackbarStatus, setSnackStatus] = useState("");

	const refresh = () => {
		setAmount(0);
		setCategory("");
		setVendor("");
	};

	const checkValidation = (action) => {
		if (amount != 0 && vendor != "" && category != "") {
			handleAddTransaction(action);
		} else {
			setSnackStatus("validationErr");
		}
	};

	const handleAddTransaction = function (action) {
		let newTransaction = { amount, vendor, category };
		console.log(action);
		if (action === "Withdraw") {
			if (balance - amount >= 500) {
				setBalance((pre) => pre - amount);
				newTransaction["amount"] = amount * -1;
			} else {
				setSnackStatus("low balance");
				return;
			}
		} else {
			refresh();
			setBalance((pre) => pre + amount);
		}
		setSnackStatus("added");
		addTransaction(newTransaction).then((e) => fetchData());
	};
	console.log(snackbarStatus);

	return <div>
				<div className='operations'>
					Insert Transacions
					<input placeholder='Transaction amount' onChange={(e)=>setAmount(parseInt(e.target.value))}></input>
					<input placeholder='Transaction vendor' onChange={(e)=>setVendor(e.target.value)} value={vendor}></input>
					<input placeholder='Transaction category' onChange={(e)=>setCategory(e.target.value)} value={category}></input>
					<div className='operationsBtns' ><Button checkValidation={checkValidation} className='operationsBtn' action={'Deposit'} />
					<Button className='operationsBtn' checkValidation={checkValidation} action={'Withdraw'}/></div>
					{snackbarStatus === "added"?<Snackbar message="Transaction added!" actionText="dismiss" />:<></>}
					{snackbarStatus === "low balance"?<Snackbar message="Your balance is low!" actionText='dismiss'/>:<></>}
					{snackbarStatus === "validationErr"?<Snackbar message="Fill all the fields please!" actionText='dismiss'/>:<></>}
				</div>
			</div>;
}
