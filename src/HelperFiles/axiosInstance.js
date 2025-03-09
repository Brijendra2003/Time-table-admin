import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://bakend-production.up.railway.app.app:5000",
  withCredentials: true, // Important for sending cookies
});

export default axiosInstance;
