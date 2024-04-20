import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { API } from '../server/config'

export default function Navbar({ balance, setAuth}) {
const userNameFromLclStrg = localStorage.getItem("user")
  const signOut = () =>{
       axios.get(`${API}/logout`, { withCredentials: true}).then(()=>{console.log("logout successfully")}).then(()=>{
        setAuth(false)
        localStorage.clear()
       });
  }
  
  return (
  <div className='navbar'>
    <span className='cards'>
    <Link className='card' to={'/transactions'} >
    <div>
    TRANSACTIONS
    </div>
    </Link>
    <Link className='card' to={'/operations'}>
    <div>
    OPERATIONS
    </div>
    </Link>
    <Link className='card' to={'breakdown'}>
    <div>
    BREAKDOWN
    </div>
    </Link>
    </span>
   {userNameFromLclStrg? <span>Welcome {userNameFromLclStrg}<p className='signOutBtn'><span onClick={()=>signOut()}> Sign Out</span></p></span>:<></>}
   {userNameFromLclStrg? ( balance < 0  ? <span className='balance red'>BALANCE:{balance} </span>:<span className='balance green'>BALANCE:{balance} </span>):<></>}
   
  </div>
  )

}