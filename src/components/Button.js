import React from 'react'

export default function Button({name, handleAddTransaction, handleDeleteTransaction, transaction}) {
  
  return (
  <>
  {handleDeleteTransaction?<button className={`${name}`} onClick={()=>handleDeleteTransaction(transaction._id)}>{name}</button>:<button className={`btn ${name}`} onClick={()=>handleAddTransaction(name)}>{name}</button> } 
  </>
  )
}
