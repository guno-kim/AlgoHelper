import axios from 'axios';
import queryString from 'querystring';


const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_SERVER_API,
})

export default axiosClient;
