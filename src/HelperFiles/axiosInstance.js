import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://timetable-production-f2ec.up.railway.app:5000",
  withCredentials: true, // Important for sending cookies
});

export default axiosInstance;
