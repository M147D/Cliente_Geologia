// src/hooks/addElemento.js
import api from "./axiosConfig.js";

// Función para obtener el ID de usuario de las cookies
const getUserIdFromCookies = () => {
  const cookies = document.cookie.split('; ');
  const userIdCookie = cookies.find(cookie => cookie.startsWith('user_id='));
  
  if (!userIdCookie) {
    throw new Error("Usuario no autenticado");
  }
  
  return parseInt(userIdCookie.split('=')[1]);
};

// Función principal
const addElemento = async (nuevoElemento, tipo) => {
  try {
    // Obtener ID de usuario
    const userId = getUserIdFromCookies();
    
    // Integrar ID del usuario
    const elementoConUsuario = {
      ...nuevoElemento,
      usuarioId: userId
    };
    
    // Determinar el formato correcto según el endpoint
    const endpoint = tipo === "fosil" ? "Fosiles" : "Rocas";
    
    // Configuración para debugging
    console.log(`Enviando a ${endpoint}:`, elementoConUsuario);
    
    // Determinar si necesitamos enviar con o sin wrapper DTO
    // Basado en el error que estás experimentando, parece que necesita estar dentro de un DTO
    const datosFormateados = {
      [`create${tipo.charAt(0).toUpperCase() + tipo.slice(1)}Dto`]: elementoConUsuario
    };
    
    console.log('Formato final enviado:', datosFormateados);
    
    const response = await api.post(endpoint, datosFormateados);
    
    return response.data;
  } catch (error) {
    console.error(`Error al agregar ${tipo}:`, error);
    throw error;
  }
};

export default addElemento;