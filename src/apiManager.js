import axios from "axios";
import {API} from '../src/server/config'

const getBalance=function(user){
  return  axios.get(`${API}/balance/${user}`)
}

const breakdown=function(){
    return axios.get(`${API}/breakdown`)
}

const getAllTransactions=function(user){
    return axios.get(`http://localhost:3001/usert/${user}`)
}

const addTransaction= function(transaction){
    return axios.post("http://localhost:3001/transactions",transaction)
}

const deleteTransaction= function (transactionId){
    return axios.get(`http://localhost:3001/transactions/${transactionId}`)
}

export {getBalance, breakdown, getAllTransactions, addTransaction, deleteTransaction}