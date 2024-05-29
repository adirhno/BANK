import React, { useState } from "react";
import { Snackbar } from "@material/react-snackbar";
import "@material/react-snackbar/dist/snackbar.css";
import { updateUserDetails } from "../apiManager";

export default function UserDetails() {
	const [snackbarStatus, setSnackbarStatus] = useState("");
	const [userName, setUserName] = useState("");
	const [currPassword, setCurrPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
    const email = localStorage.getItem("userEmail");

    const handleUserName = function(e){
        setUserName(e)
    }

    const handleCurrPassword = function(e){
        setCurrPassword(e)
    }

    const handleNewPassword = function(e){
        setNewPassword(e)
    }

    const updateDetails = function(){
        updateUserDetails({userName, currPassword, newPassword, userEmail:email})
        .then((e)=> {if(e.status == 200){setSnackbarStatus("details updated"); localStorage.setItem("user", userName)} }).catch((e)=> {if(e.response.status == 401){ setSnackbarStatus("invalid password")}})
    }

	return (
		<div>
			<div className="operations">
				User Details
				<input className="operationsInput" placeholder="user name" value={userName} onChange={(e)=>handleUserName(e.target.value)}></input>
				<input className="operationsInput" placeholder="current password" value={currPassword} onChange={(e)=>handleCurrPassword(e.target.value)}></input>
				<input className="operationsInput" placeholder="new password" value={newPassword} onChange={(e)=>handleNewPassword(e.target.value)}></input>
				<div className="operationsBtns">
					<button className="update" onClick={()=>updateDetails()}>update</button>
					<button className="cancel">cancel</button>
				</div>
				{snackbarStatus === "invalid password" ? (
					<Snackbar
						message="invalid password!"
						actionText="dismiss"
					/>
				) : (
					<></>
				)}
				{snackbarStatus === "details updated" ? (
					<Snackbar
						message="details updated successfully!"
						actionText="dismiss"
					/>
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
