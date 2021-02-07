import {AUTH_USER,LOGIN_USER,LOGOUT_USER} from './type'
import axios from 'axios'
export async function auth(){
    const req=await axios.get('/user/auth').then(res=>res.data)
    return{
        type:AUTH_USER,
        auth:req.auth,
        data:req.data
    }
}
export async function logout(){
    const req=await axios.get('/user/logout').then(res=>res.data)
    return{
        type:LOGOUT_USER,
        success:req.success
    }
}