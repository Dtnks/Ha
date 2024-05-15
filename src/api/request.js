import axios from 'axios'
export const GetLoginInfo=async (logInRequest)=>{
    const res=await axios.post('/api/auth/logIn', logInRequest)
    console.log(res.data)
    return res.data
}
