import axios from 'axios'
export const GetLoginInfo=async (logInRequest)=>{
    const res=await axios.post('/api/auth/logIn', logInRequest)
    return res.data.success
}
export const GetSignInfo=async (signInRequest)=>{
    const res=await axios.post('/api/auth/signUp', signInRequest)
    return res.data.success
}
export const GetOrder=async (GetOrderRequest)=>{
    const res=await axios.get('/api/order/admin/conditionSearch', GetOrderRequest)
    return res.data
}
export const GetOrderDetail=async (id)=>{
    const res=await axios.get(`/api/order/admin/details/${id}`)
    return res.data.data
}