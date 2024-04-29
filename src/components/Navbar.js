import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { API } from '../server/config'

export default function Navbar({ balance, setAuth, isMobile }) {
const userNameFromLclStrg = localStorage.getItem("user")

  const signOut = () =>{
       axios.get(`${API}/logout`, { withCredentials: true}).then(()=>{localStorage.clear()}).then(()=>{
        setAuth(false)
        localStorage.clear()
       });
  }
  return (
  <>
    {isMobile?<div className='navbar'>
    <span className='cards'>
    <Link className='card' to={'/transactions'} >
    <div>
   <img width="23" height="23" src="https://img.icons8.com/tiny-glyph/16/bill.png" alt="bill"/>
    </div>
    </Link>
    <Link className='card' to={'/operations'}>
    <div>
    <img width="24" height="24" src="https://img.icons8.com/material/24/check-book.png" alt="check-book"/>
    </div>
    </Link>
    <Link className='card' to={'breakdown'}>
    <div>
    <img width="24" height="26" src="https://img.icons8.com/puffy/32/bookmark.png" alt="bookmark"/>
    </div>
    </Link>
    </span>
   {userNameFromLclStrg? <span className='mobileNavbar'><p className='signOutBtn'><span onClick={()=>signOut()}><img width="24" height="24" src="https://img.icons8.com/material-outlined/24/exit.png" alt="exit"/></span></p></span>:<></>}
   {userNameFromLclStrg? ( balance < 0  ? <span className='balance red'><img width="16" height="16" src="https://img.icons8.com/tiny-glyph/16/money.png" alt="money"/>:{balance} </span>:<span className='balance green'><img width="16" height="16" src="https://img.icons8.com/tiny-glyph/16/money.png" alt="money"/>:{balance} </span>):<></>}
  </div>:<div className='navbar'>
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
   {userNameFromLclStrg? <span>Welcome {userNameFromLclStrg}<p className='signOutBtn'><span onClick={()=>signOut()}>Sign Out</span></p></span>:<></>}
   {userNameFromLclStrg? ( balance < 0  ? <span className='balance red'>:BALANCE:{balance} </span>:<span className='balance green'>BALANCE: {balance} </span>):<></>}
  </div>}
  </>)
}