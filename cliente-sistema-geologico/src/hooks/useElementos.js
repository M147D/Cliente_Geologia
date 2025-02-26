// src/hooks/useElementos.js
import { useState, useEffect, useCallback } from "react";
import api from "./axiosConfig.js";

const useElementos = () => {
  const [elementos, setElementos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchElementos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [fosilesResponse, rocasResponse] = await Promise.all([
        api.get("/Fosiles"),
        api.get("/Rocas"),
      ]);

      // Asegurarse de que ambas respuestas contienen arrays
      const fosiles = Array.isArray(fosilesResponse.data) ? fosilesResponse.data : [];
      const rocas = Array.isArray(rocasResponse.data) ? rocasResponse.data : [];

      const fosilesData = fosiles.map((f) => ({ ...f, tipo: "fosil" }));
      const rocasData = rocas.map((r) => ({ ...r, tipo: "roca" }));

      setElementos([...fosilesData, ...rocasData]);
    } catch (error) {
      console.error("Error al obtener elementos:", error);
      setError("No se pudieron cargar los elementos");
      setElementos([]); // Siempre asegurar un array vacío en caso de error
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchElementos();
  }, [fetchElementos]);

  return { elementos, loading, error, refetch: fetchElementos };
};

export default useElementos;