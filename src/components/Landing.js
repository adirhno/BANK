import React, { useEffect, useState } from "react";
import { API } from "../server/config";
import axios from "axios";
import { Snackbar } from "@material/react-snackbar";
import "@material/react-snackbar/dist/snackbar.css";

export default function Landing({ setCurrUser, fetchData, initBalance, fetchCategoriesSum }) {
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("")
	const [loginStatus, setLoginStatus] = useState("signIn")
	const [snackBar, setSnackBar] = useState("")

	useEffect(()=>{setSnackBar("")},[loginStatus])
	const isSigninValidate = function(){
		if(email === "" || password === ""){
			setSnackBar("validationErr")
			return false
		}else{
			return true
		}
		
	}
	const isSignupValidate = function(){
		if(email === "" || password === "" || userName ==""){
			setSnackBar("validationErr")
			return false
		}else{
			return true
		}
		
	}

	const signUp = () => {
		if(isSignupValidate()){
			axios.post(`${API}/signup`, { userName, password, email }).then((data) => {
			data.status === 200
				? setCurrUser({ userName, password, id:data.data.id, email })
				: console.log(data);
		});
		}
	};

	const signIn = () => {
		
		if(isSigninValidate()){
	axios.post(`${API}/signin`, { password, email }).then((response) => {
			if (response.data.status !== 200) {
				throw new Error(response.status);
			}else{
                setCurrUser({userName:response.data.userName, password, id:response.data.id, email})
				fetchData(email)
				initBalance(email)
				fetchCategoriesSum(email)
            }
		}).catch(()=>alert("password or user name is incorret"))
		}
	
	};

	return <>
	<div className="navbar"><p className="landingNavbar">Welcome To Your Transactions Manager</p></div>
		{loginStatus === "signIn"?  (<div className="loginContainer">
			<div className='loginForm'>
		<div className='inputs'>
   	 <input placeholder='email' onChange={(e)=>setEmail(e.target.value)}></input>
    <input type="password" placeholder='password' onChange={(e)=>setPassword(e.target.value)} required ></input>
    </div>
    <div className='loginBtns'>
       <button className="loginFormBtn" onClick={()=>{setLoginStatus("")}}>sign up</button>
    <button className="loginFormBtn" onClick={()=>signIn()}>sign in</button>
    </div>
  </div>
    </div>):(<div className="loginContainer">
     <div className='loginForm'>
	 <button className="backBtn" onClick={()=>setLoginStatus("signIn")}>back</button>
    <div className='inputs'>
    <input placeholder='user name' onChange={(e)=>setUserName(e.target.value)}></input>
    <input type="email" placeholder='email' onChange={(e)=>setEmail(e.target.value)} ></input>
    <input type="password" placeholder='password' onChange={(e)=>setPassword(e.target.value)} ></input>
    </div>
    <div className='loginBtns'>
      <button className="loginFormBtnSignUp" onClick={()=>{signUp()}}>sign up</button>
    </div>
  </div>
    </div>)}
		{snackBar === 'validationErr' ?<Snackbar
						message="Fill all the fields please!"
						actionText="dismiss"
					/>:<></>}
	</>
}
