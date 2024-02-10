import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar({ balance}) {
  return (
  <div className='navbar'>
    <span className='cards'>
    <Link className='card' to={'/'} >
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
    {balance < 0? <span className='balance red'>BALANCE:{balance} </span>:<span className='balance green'>BALANCE:{balance} </span>}
  </div>
  )

}