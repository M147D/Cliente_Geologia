// scr/hooks/addElementos.js
import api from "./axiosConfig.js";

const addElemento = async (nuevoElemento, tipo) => {
  try {
    const endpoint = tipo === "fosil" ? "/api/fosil" : "/api/roca";
    const response = await api.post(endpoint, nuevoElemento);

    return response.data;
  } catch (error) {
    console.error("Error al agregar elemento:", error.message);
    return null;
  }
};

export default addElemento;
