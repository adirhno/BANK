import React, { useEffect, useState } from "react";
import { API } from "../server/config";
import axios from "axios";
import { Snackbar } from "@material/react-snackbar";
import "@material/react-snackbar/dist/snackbar.css";
import { Progress } from "rsuite";
import LoadingBar from "./LoadingBar";
import { signInWithGoogle } from '../server/firebase/firebase'
 

export default function Landing({ setCurrUser, fetchData, setIsLoading, isLoading }) {
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("")
	const [loginStatus, setLoginStatus] = useState("signIn")
	const [snackBar, setSnackBar] = useState("")


	useEffect(()=>{setSnackBar("")},[loginStatus])
	const signInWithGooglea = function(){
		signInWithGoogle().then(({_tokenResponse})=>{
			setIsLoading(true)			
		    axios.post(`${API}/signup`, { withGoogle:true, userName: _tokenResponse.displayName, password: "", email: _tokenResponse.email }).then(async(response) => {
				await fetchData(_tokenResponse.email)
				 setCurrUser({userName:_tokenResponse.displayName, email:_tokenResponse.email})

				}).catch((error)=>{
					setIsLoading(false)	
					alert(error)})


		})
	}

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
		    axios.post(`${API}/signup`, { userName, password, email }).then(async(response) => {
				await fetchData(email)
				 setCurrUser({userName, password, email})
		}).catch((error)=>{
			setIsLoading(false)	
			console.log(error)
			alert(error.response.data)})
	}}

	const signIn = () => {
		if(isSigninValidate()){
			setIsLoading(true)
			axios.post(`${API}/signin`, { password, email }).then(async(response)  => {
				await fetchData(email)
				setCurrUser({userName:response.data[0].userName, password, id:response.data[0].id, email})	  
		}).catch((error)=>{
			setIsLoading(false)
			console.log(error)
			if(error.response){
				if(error.response.data === "Bad Request"){
					alert("user not found")
				}else if(error.response.data === "Unauthorized"){
					alert("invalid password")
				}
			}
			
		})
		}
	};

	return <>
	<div className="navbar"><p className="landingNavbar">Welcome To Your Transactions Manager</p></div>
		{loginStatus === "signIn"? (<div className="loginContainer">
		
		{isLoading?<LoadingBar action={"signIn"} />:<></>}	
		 
			<div className='loginForm'>
		<div className='inputs'>
   	 <input className="emailInput" placeholder='email' onChange={(e)=>setEmail(e.target.value)}></input>
    <input type="password" placeholder='password' onChange={(e)=>setPassword(e.target.value)} required ></input>
    </div>
    <div className='loginBtns'>
       <button className="loginFormBtn" onClick={()=>{setLoginStatus("")}}>sign up</button>
    <button className="loginFormBtn" onClick={()=>signIn()}>sign in</button>
    <button className="loginFormBtn" onClick={()=>signInWithGooglea()}>Google</button>
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
