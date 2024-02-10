import React, { useState } from 'react'
import Button from './Button'
import axios from 'axios'

export default function Operations({setBalance, fetchData, balance}) {
  const [amount, setAmount] = useState(0)
  const [vendor, setVendor] = useState("")
  const [category, setCategory] = useState("")

  const handleAddTransaction= function(deposit){
    let newTransaction={amount,vendor,category}

    if(deposit === "Withdraw"){
      if(balance-amount >= 500){
         setBalance((pre)=> pre-amount)
      newTransaction["amount"]=amount*(-1)
      
      }else{alert("your balance is low!")
      return}
     
    }else{
      setBalance((pre)=> pre+amount)
    }
       axios.post('http://localhost:3001/transaction',newTransaction).then((e)=> fetchData())
  }
 
  return (
    <div>
    <div className='operations'>
    Insert Transacions
    <input placeholder='Transaction amount' onChange={(e)=>setAmount(parseInt(e.target.value))} ></input>
    <input placeholder='Transaction vendor' onChange={(e)=>setVendor(e.target.value)} ></input>
    <input placeholder='Transaction category' onChange={(e)=>setCategory(e.target.value)}></input>
    <div className='operationsBtns' ><Button handleAddTransaction={handleAddTransaction} className='operationsBtn' name={'Deposit'} />
    <Button className='operationsBtn' handleAddTransaction={handleAddTransaction} name={'Withdraw'}/></div>
    </div>
    </div>
  )
}
