import axios from 'axios';


const axiosClient = axios.create({
    baseURL: 'http://api.algoheper.ga',
    withCredentials:true// cookie 받기 위해 설정
})

export default axiosClient;
