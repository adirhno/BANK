import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar({ balance, userName, setCurrUser}) {

  const signOut = () =>{
    setCurrUser(false)
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
   {userName? <span>Welcome {userName}<p className='signOutBtn'><span onClick={()=>signOut()}> Sign Out</span></p></span>:<></>}
   {userName? ( balance < 0  ? <span className='balance red'>BALANCE:{balance} </span>:<span className='balance green'>BALANCE:{balance} </span>):<></>}
   
  </div>
  )

}