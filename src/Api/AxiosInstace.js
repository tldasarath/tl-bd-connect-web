import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_SUB_URL = process.env.REACT_APP_API_SUB_URL;


const axiosInstance = axios.create({
  baseURL: API_BASE_URL + API_SUB_URL,
});

export default axiosInstance