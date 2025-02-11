// scr/hooks/useElementos.js
import { useState, useEffect } from "react";
import api from "./axiosConfig.js";

const useElementos = () => {
  const [elementos, setElementos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fosilesResponse, rocasResponse] = await Promise.all([
          api.get("/Fosils"),
          api.get("/Rocas"),
        ]);

        const fosilesData = fosilesResponse.data.map((f) => ({ ...f, tipo: "fosil" }));
        const rocasData = rocasResponse.data.map((r) => ({ ...r, tipo: "roca" }));

        setElementos([...fosilesData, ...rocasData]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return elementos;
};

export default useElementos;
