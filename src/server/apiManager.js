import axios from "axios";
import {API} from '../server/config'

const getBalance=function(user){
  return  axios.get(`${API}/balance/${user}`)
}

const breakdown=function(user){
    return axios.get(`${API}/breakdown/${user}`)
}

const getAllTransactions=function(user){
    return axios.get(`${API}/home/${user}`)
}

const addTransaction= function(transaction){
    return axios.post(`${API}/transactions`,transaction)
}

const deleteTransaction= function (transactionId){
    return axios.get(`${API}/transactions/${transactionId}`)
}

export {getBalance, breakdown, getAllTransactions, addTransaction, deleteTransaction}