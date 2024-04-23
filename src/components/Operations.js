import React, { useState } from "react";
import Button from "./Button";
import { addTransaction } from "../server/apiManager";
import { Snackbar } from "@material/react-snackbar";
import "@material/react-snackbar/dist/snackbar.css";

export default function Operations({ fetchData, balance }) {
	const [amount, setAmount] = useState(0);
	const [vendor, setVendor] = useState("");
	const [category, setCategory] = useState("");
	const [snackbarStatus, setSnackStatus] = useState("");
	const currUser = localStorage.getItem("userEmail")

	const refresh = () => {
		setAmount(0);
		setCategory("");
		setVendor("");
	};
	
	const handleAddTransaction = function (action) {
	let newTransaction = { amount, vendor, category };

	addTransaction({ newTransaction, balance, action, currUser }).then(
		async (result) => {
			if (result.data.err) {
				setSnackStatus("low balance");
				return;
			} else {
				refresh()
				await fetchData(currUser);
				setSnackStatus("added");
			}
		}
	);
};

	const checkValidation = (action) => {
		if (amount != 0 && vendor != "" && category != "") {
			handleAddTransaction(action);

		} else {
			setSnackStatus("validationErr");
		}
	};

	return (
		<div>
			<div className="operations">
				Insert Transacion
				<input className="operationsInput"
					placeholder="amount"
					onChange={(e) => setAmount(parseInt(e.target.value))}></input>
				<input className="operationsInput"
					placeholder="vendor"
					onChange={(e) => setVendor(e.target.value)}
					value={vendor}></input>
				<input className="operationsInput"
					placeholder="category"
					onChange={(e) => setCategory(e.target.value)}
					value={category}></input>
				<div className="operationsBtns">
					<Button
						checkValidation={checkValidation}
						className="operationsBtn"
						action={"Deposit"}
					/>
					<Button
						className="operationsBtn"
						checkValidation={checkValidation}
						action={"Withdraw"}
					/>
				</div>
				{snackbarStatus === "added" ? (
					<Snackbar message="Transaction added!" actionText="dismiss" />
				) : (
					<></>
				)}
				{snackbarStatus === "low balance" ? (
					<Snackbar message="Your balance is low!" actionText="dismiss" />
				) : (
					<></>
				)}
				{snackbarStatus === "validationErr" ? (
					<Snackbar
						message="Fill all the fields please!"
						actionText="dismiss"
					/>
				) : (
					<></>
				)}
			</div>
			
		</div>
	);
}
