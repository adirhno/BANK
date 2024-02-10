import React from 'react'
import Transaction from './Transaction'

export default function Transactions({transactions, fetchData}) {
  return (
    <div className='transactions'>
    {transactions.map((transaction,index)=> <Transaction key={index}  fetchData={fetchData} transaction={transaction} />)}
    </div>
  )
}
