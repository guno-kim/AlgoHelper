import axios from 'axios';


const axiosClient = axios.create({
    baseURL: 'http://ec2-3-35-209-162.ap-northeast-2.compute.amazonaws.com'
})

export default axiosClient;
