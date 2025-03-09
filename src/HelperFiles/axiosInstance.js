import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://bakend.up.railway.app",
  withCredentials: true, // Important for sending cookies
});

export default axiosInstance;
