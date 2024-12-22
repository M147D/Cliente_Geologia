const addElemento = async (nuevoElemento, tipo) => {
    try {
      const endpoint = tipo === "fosil" ? "/api/fosil" : "/api/roca";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoElemento),
      });
  
      if (!response.ok) {
        throw new Error("Failed to add elemento");
      }
  
      const savedElemento = await response.json();
      return savedElemento;
    } catch (error) {
      console.error("Error adding elemento:", error);
      throw error;
    }
  };
  
  export default addElemento;