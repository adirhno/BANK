import React, { useEffect, useState } from "react";
import { Snackbar } from "@material/react-snackbar";
import "@material/react-snackbar/dist/snackbar.css";
import { updateUserDetails } from "../apiManager";

export default function UserDetails() {
	const [snackbarStatus, setSnackbarStatus] = useState("");
	const [userName, setUserName] = useState("");
	const [currPassword, setCurrPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
    const email = localStorage.getItem("userEmail");
    const user = localStorage.getItem("user");

	useEffect(()=>{setUserName(user)},[])


	const resetValues = function(){
		setCurrPassword("")
		setNewPassword("")
		setUserName("")
	}

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
		setTimeout(setSnackbarStatus(""), 4000);
		if(userName == "") setUserName(user)
        updateUserDetails({userName: userName == ""? user: userName, currPassword, newPassword, userEmail:email})
        .then((e)=> {if(e.status == 200){setSnackbarStatus("details updated"); resetValues(); console.log(e.data.userName);localStorage.setItem("user", e.data.userName)} })
		.catch((e)=> {if(e.response.status == 401){ setSnackbarStatus(e.response.data)}})
    }

	return (
		<div>
			<div className="operations">
				User Details
				<input className="operationsInput" placeholder="user name" value={userName} onChange={(e)=>handleUserName(e.target.value)}></input>
				<input type="password" className="operationsInput" placeholder="current password" value={currPassword} onChange={(e)=>handleCurrPassword(e.target.value)}></input>
				<input type="password" className="operationsInput" placeholder="new password" value={newPassword} onChange={(e)=>handleNewPassword(e.target.value)}></input>
				<div className="operationsBtns">
					<button className="update" onClick={()=>updateDetails()}>update</button>
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
						message="the password should be minimum of 8 characters!"
						actionText="dismiss"
					/>
				) : (
					<></>
				)}
			</div>
		</div>
	);
}
