import React, { useEffect, useState } from "react";
import { API } from "../server/config";
import axios from "axios";
import { Snackbar } from "@material/react-snackbar";
import "@material/react-snackbar/dist/snackbar.css";
import { Progress } from "rsuite";
import LoadingBar from "./LoadingBar";


export default function Landing({ setCurrUser, fetchData, setIsLoading, isLoading }) {
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
			setIsLoading(true)			
		 axios.post(`${API}/signup`, { userName, password, email }).then(async(data) => {
			if(data.status === 200){
				await fetchData(email)
				console.log('user is:', data)
				 setCurrUser({userName, password, email})
			}else{
				console.log(data);
			}
		})
	}}

	const signIn = () => {
		setIsLoading(true)
		if(isSigninValidate()){
	axios.post(`${API}/signin`, { password, email }).then(async(response)  => {
			if (response.data.status !== 200) {
			
				throw new Error(response.status);
			}else{
			await fetchData(email)
				setCurrUser({userName:response.data.userName, password, id:response.data.id, email})	 
            }
		}).catch((e)=>{
			alert("password or user name is incorret")
			setIsLoading(false)
		})
		}
	};

	return <>
	<div className="navbar"><p className="landingNavbar">Welcome To Your Transactions Manager</p></div>
	
		{loginStatus === "signIn"? (<div className="loginContainer">
		
		{isLoading?<LoadingBar action={"signIn"} />:<></>}	
		 
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
	{isLoading?<LoadingBar action={"signUp"} />:<></>}	
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
