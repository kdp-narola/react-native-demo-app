import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || "https://react-native-backend-ublz.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
