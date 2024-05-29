import React from 'react'

export default function Button({ action, checkValidation, handleDeleteTransaction, transaction}) {
  
  return (
  <>
  {action == "Update"?<buttom>ds</buttom>:<></>}
  {handleDeleteTransaction?<button className={`${action}`} onClick={()=>handleDeleteTransaction(transaction._id)}>{action}</button>:<button className={`btn ${action}`} onClick={()=>checkValidation(action)}>{action}</button> } 
  </>
  )
}
