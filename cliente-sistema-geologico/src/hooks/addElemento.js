// src/hooks/addElemento.js
import api from "./axiosConfig.js";
import { useAuth } from "../context/AuthContext";

const useAddElemento = () => {
  const { user } = useAuth();
  
  const addElemento = async (nuevoElemento, tipo) => {
    try {
      // Verificar si hay usuario autenticado
      if (!user || !user.id) {
        throw new Error("Usuario no autenticado");
      }
      
      // Integrar ID del usuario autenticado
      const elementoConUsuario = {
        ...nuevoElemento,
        UsuarioId: user.id
      };
      
      // Usar endpoints correctos según controladores
      const endpoint = tipo === "fosil" ? "/api/Fosiles" : "/api/Rocas";
      const response = await api.post(endpoint, elementoConUsuario);
      
      return response.data;
    } catch (error) {
      console.error(`Error al agregar ${tipo}:`, error);
      throw error;
    }
  };
  
  return addElemento;
};

export default useAddElemento;