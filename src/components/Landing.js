import React, { useEffect, useState } from "react";
import { API } from "../server/config";
import axios from "axios";
import { Snackbar } from "@material/react-snackbar";
import "@material/react-snackbar/dist/snackbar.css";
import LoadingBar from "./LoadingBar";
import { signInWithGoogle } from "../server/firebase/firebase";
import { signInReq } from "../server/apiManager";

export default function Landing({ fetchData, setIsLoading, isLoading, setAuth, isMobile }) {
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [loginStatus, setLoginStatus] = useState("signIn");
	const [snackBar, setSnackBar] = useState("");

	useEffect(() => {
		setSnackBar("");
	}, [loginStatus]);


	const isSignupValidate = function (email, password, userName) {
		if (email === "" || password === "" || userName === "") {
			setSnackBar("validationErr");
			return false;
		} else {
			return true;
		}
	};

	const isSigninValidate = function (email, password) {
	if (email === "" || password === "") {
		setSnackBar("validationErr");
		return false;
	} else {
		return true;
	}
};

	const signInWithGoogleFunc = function () {
		signInWithGoogle().then(({ _tokenResponse }) => {
			setIsLoading(true);
			axios.post(`${API}/signup`, {
					withGoogle: true,
					userName: _tokenResponse.displayName,
					password: "12345678",
					email: _tokenResponse.email,
				}, {withCredentials:true})
				.then(async () => {
					await fetchData(_tokenResponse.email);
					localStorage.setItem("user", _tokenResponse.displayName);
					localStorage.setItem("userEmail", _tokenResponse.email);
				
				})
				.catch((error) => {
					setIsLoading(false);
					alert(error);
				});
		});
	};

	const signUp = () => {
		if (isSignupValidate(email, password, userName)) {
			setIsLoading(true);
			axios.post(`${API}/signup`,{ userName, password, email },{ withCredentials: true })
				.then(async () => {
					localStorage.setItem("user", userName);
					localStorage.setItem("userEmail", email);
					await fetchData(email);
					setAuth(true)
				})
				.catch((error) => {
					setIsLoading(false);
					console.log(error.response.data);
				});
		}
	};

	const signIn = () => {
		if (isSigninValidate(email, password)) {
			setIsLoading(true);
			signInReq(password, email)
				.then(async (response) => {
					console.log(response);
					localStorage.setItem("userEmail", response.data.user[0].email);
					localStorage.setItem("user", response.data.user[0].userName);
					await fetchData(email);
				})
				.catch((error) => {
					setIsLoading(false);
					console.log(error);
					if (error.response) {
						if (error.response.data === "Bad Request") {
							alert("user not found");
						} else if (error.response.data === "Unauthorized") {
							alert("invalid password");
						}
					}
				});
		}
	};

	return <>
	<div className="navbar"><p className="landingNavbar">Expense Manager</p></div>
		{loginStatus === "signIn"? (<div className="loginContainer">
		{isLoading?<LoadingBar action={"signIn"} />:<></>}	
		 
			<div className={isMobile? 'loginFormMobile':'loginForm'}>
		<div className='inputs'>
   	 <input className="emailInput" placeholder='email' onChange={(e)=>setEmail(e.target.value)}></input>
    <input type="password" placeholder='password' onChange={(e)=>setPassword(e.target.value)} required ></input>
    </div>
    <div className={isMobile?'loginBtnsMobile':'loginBtns'}>
       <button className="loginFormBtn" onClick={()=>{setLoginStatus("")}}>sign up</button>
    <button className="loginFormBtn" onClick={()=>signIn()}>sign in</button>
    <button className="loginFormBtn " onClick={()=>signInWithGoogleFunc()}><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="30" viewBox="0 0 24 24">
    <path d="M12.545,12.151L12.545,12.151c0,1.054,0.855,1.909,1.909,1.909h3.536c-0.607,1.972-2.101,3.467-4.26,3.866 c-3.431,0.635-6.862-1.865-7.19-5.339c-0.34-3.595,2.479-6.62,6.005-6.62c1.002,0,1.946,0.246,2.777,0.679 c0.757,0.395,1.683,0.236,2.286-0.368l0,0c0.954-0.954,0.701-2.563-0.498-3.179c-1.678-0.862-3.631-1.264-5.692-1.038 c-4.583,0.502-8.31,4.226-8.812,8.809C1.945,16.9,6.649,22,12.545,22c6.368,0,8.972-4.515,9.499-8.398 c0.242-1.78-1.182-3.352-2.978-3.354l-4.61-0.006C13.401,10.24,12.545,11.095,12.545,12.151z"></path>
	
</svg></button>
    </div>
  </div>
    </div>):(<div className="loginContainer">
	{isLoading?<LoadingBar action={"signUp"} />:<></>}	
     <div className={isMobile? 'loginFormMobile':'loginForm'}>
	 <button className="backBtn" onClick={()=>setLoginStatus("signIn")}>back</button>
    <div className='inputs'>
    <input placeholder='user name' onChange={(e)=>setUserName(e.target.value)}></input>
    <input type="email" placeholder='email' onChange={(e)=>setEmail(e.target.value)} ></input>
    <input type="password" placeholder='password' onChange={(e)=>setPassword(e.target.value)} ></input>
    </div>
    <div className={isMobile?'loginBtnsMobile':'loginBtns'}>
      <button className="loginFormBtnSignUp" onClick={()=>{signUp()}}>sign up</button>
    </div>
  </div>
    </div>)}
		{snackBar === 'validationErr' ?<Snackbar message="Fill all the fields please!" actionText="dismiss"/>:<></>}
	</>;
}
