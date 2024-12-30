import { useState, useEffect } from "react";

const useElementos = () => {
  const [elementos, setElementos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fosilesResponse, rocasResponse] = await Promise.all([
          fetch("/api/fosil"),
          fetch("/api/roca"),
        ]);
       
        const fosilesData = await fosilesResponse.json();
        const rocasData = await rocasResponse.json();

        const fosilesConTipo = fosilesData.map((f) => ({ ...f, tipo: "fosil" }));
        const rocasConTipo = rocasData.map((r) => ({ ...r, tipo: "roca" }));

        const combinedData = [...fosilesConTipo, ...rocasConTipo];
        setElementos(combinedData);
        console.log(combinedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return elementos;
};

export default useElementos;