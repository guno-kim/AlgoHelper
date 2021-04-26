import axios from './axios'

const inputAPI={
    getExample: (data)=>{
        const url='/input'
        return axios.get(url,data)
    }
    
}

export default inputAPI