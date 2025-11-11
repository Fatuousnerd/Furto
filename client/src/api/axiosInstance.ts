import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:9876/api/v1'
});

export default axiosInstance;