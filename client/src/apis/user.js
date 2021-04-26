import axios from './axios'

const userAPI={
    logout:()=>{
        const url='/user/logout'
        return axios.get(url)
    },
    auth:()=>{
        const url='/user/auth'
        return axios.get(url)
    },
    update:(data)=>{
        const url='/user/profile'
        return axios.post(url,data)
    }
    
}

export default userAPI