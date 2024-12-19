import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://192.168.1.8:3000/api',
    headers:{
        'Content-Type':'application/json'
    }
});

export default axiosInstance;