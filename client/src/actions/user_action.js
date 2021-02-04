import {AUTH_USER,LOGIN_USER} from './type'
import axios from 'axios'
export async function auth(){
    const req=await axios.get('/user/auth').then(res=>res.data)
    return{
        type:AUTH_USER,
        auth:req.auth,
        user:req.user
    }
}