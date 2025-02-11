// scr/hook/axiosConfig.js
import axios from "axios";

const api = axios.create({
  baseURL: "/api", // Puedes cambiar esto si usas un servidor externo
  withCredentials: true, // Para incluir cookies en las solicitudes
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
