import React, { useState } from "react";
import { API } from "../server/config";
import axios from "axios";

export default function Landing({ setCurrUser, fetchData, initBalance, fetchCategoriesSum, createUser }) {
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");

	const signUp = () => {
		let user={userName, password}
		createUser(user).then((data) => {
			data.status === 200
				? setCurrUser({ userName, password, id:data.data.id })
				: console.log(data);
		});
	};

	const signIn = () => {
		axios.post(`${API}/users`, { userName, password }).then((response) => {
            console.log(response)
			if (response.data.status !== 200) {
				throw new Error(response.status);
			}else{
                setCurrUser({userName, password, id:response.data.id})
				fetchData(userName)
				initBalance(userName)
				fetchCategoriesSum(userName)
            }
		}).catch(()=>alert("password or user name is incorret"))
	};

	return <div className="loginContainer">
     <div className='loginForm'>
    <div className='inputs'>
    <input placeholder='user name' onChange={(e)=>setUserName(e.target.value)}></input>
    <input type="password" placeholder='password' onChange={(e)=>setPassword(e.target.value)} ></input>
    </div>
    <div className='loginBtns'>
      <button className="loginFormBtn" onClick={()=>{signUp()}}>sign up</button>
    <button className="loginFormBtn" onClick={()=>signIn()}>sign in</button>
    </div>
  </div>
    </div>;
}
