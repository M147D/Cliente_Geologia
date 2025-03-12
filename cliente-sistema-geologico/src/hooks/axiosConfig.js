// src/hooks/axiosConfig.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5095/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.request.use(
  config => {
    console.log("Request config:", config);
    console.log("Document cookies:", document.cookie);
    return config;
  },
  error => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  response => {
    console.log("Successful Response:", response.status, response.data);
    return response;
  },
  error => {
    console.error("Full Error Response:", {
      status: error.response?.status,
      data: error.response?.data,
      headers: error.response?.headers,
      message: error.message
    });

    if (error.response?.status === 401) {
      console.error("Unauthorized Details:", {
        responseData: error.response.data,
        headers: error.response.headers
      });

      // Más información de depuración
      console.log("Current cookies:", document.cookie);
      
      // Redirigir al login si no está autenticado
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api;