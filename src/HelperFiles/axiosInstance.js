import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://bakend-production.up.railway.app:0.0.0.0",
  withCredentials: true, // Important for sending cookies
});

export default axiosInstance;
