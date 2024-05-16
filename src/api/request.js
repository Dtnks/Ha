import axios from 'axios'
export const postLoginInfo=async (logInRequest)=>{
    const res=await axios.post('/api/auth/logIn', logInRequest)
    return res.data.success
}
export const postSignInfo=async (signInRequest)=>{
    const res=await axios.post('/api/auth/signUp', signInRequest)
    return res.data.success
}
export const getOrder=async (GetOrderRequest)=>{
    const res=await axios.get('/api/order/admin/conditionSearch', GetOrderRequest)
    return res.data
}
export const getOrderDetail=async (id)=>{
    const res=await axios.get(`/api/order/admin/details/${id}`)
    return res.data.data
}
export const postOrderDelete=async (id)=>{
    const res=await axios.post(`/api/order/admin/delete?id=${id}`)
    return res.data.data
}