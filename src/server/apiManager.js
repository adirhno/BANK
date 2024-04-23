import axios from "axios";
import {API} from '../server/config'

const getBalance=function(user){
  return axios.get(`${API}/balance/${user}`,{ withCredentials: true })
  }

const refreshTokenAuth = function(){
  return axios.get(`${API}/auth`,{ withCredentials: true })
  }

const breakdown=function(user){
    return axios.get(`${API}/breakdown/${user}`,{
    withCredentials: true
})
}

const signInReq = function(password ,email){
    return axios.post(`${API}/signin`, { password, email},  { withCredentials: true })
}

const getAllTransactions=function(user){
    return axios.get(`${API}/home/${user}`,{
    withCredentials: true
})
}

const addTransaction= function(transaction){
    return axios.post(`${API}/transactions`,transaction, {
    withCredentials: true
})
}

const deleteTransaction= function (transactionId){
    return axios.get(`${API}/transactions/${transactionId}`,{
    withCredentials: true
})
}

const createUser = (user) =>{
   return axios.post(`${API}/signup`,user)
}

export {getBalance, breakdown, getAllTransactions, addTransaction, deleteTransaction, createUser, signInReq, refreshTokenAuth}