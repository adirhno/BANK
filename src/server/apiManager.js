import axios from "axios";
import {API} from '../server/config'

const getBalance=function(email){
  return axios.get(`${API}/balance/${email}`,{ withCredentials: true })
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
    return axios.post(`${API}/auth/signin`, { password, email},  { withCredentials: true })
}

const getAllTransactions=function(user){
    console.log(user)
    return axios.get(`${API}/auth/home/${user}`,{
    withCredentials: true
})
}

const addTransaction= function(transaction){
    return axios.post(`${API}/transactions/transaction`,transaction, {
    withCredentials: true
})
}

const deleteTransaction= function (transactionId){
    return axios.delete(`${API}/transactions/transaction/${transactionId}`,{
    withCredentials: true
})
}

const createUser = (user) =>{
   return axios.post(`${API}/auth/register`,user)
}

export {getBalance, breakdown, getAllTransactions, addTransaction, deleteTransaction, createUser, signInReq, refreshTokenAuth}