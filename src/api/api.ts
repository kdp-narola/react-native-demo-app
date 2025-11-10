import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: process.env.API_URL || "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
