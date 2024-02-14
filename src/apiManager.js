import axios from "axios";
import {API} from '../src/server/config'

const getBalance=function(){
  return  axios.get(`${API}/balance`)
}

const breakdown=function(){
    return axios.get(`${API}/breakdown`)
}

const getAllTransactions=function(){
    return axios.get("http://localhost:3001/")
}

const addTransaction= function(transaction){
    return axios.post("http://localhost:3001/transaction",transaction)
}

const deleteTransaction= function (transactionId){
    return axios.get(`http://localhost:3001/transaction/${transactionId}`)
}

export {getBalance, breakdown, getAllTransactions, addTransaction, deleteTransaction}