import axios from 'axios';


const axiosClient = axios.create({
    baseURL: 'http://ec2-3-35-209-162.ap-northeast-2.compute.amazonaws.com',
    withCredentials:true// cookie 받기 위해 설정
})

export default axiosClient;
