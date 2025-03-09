import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://timetable-production-a1c9.up.railway.app:5000",
  withCredentials: true, // Important for sending cookies
});

export default axiosInstance;
