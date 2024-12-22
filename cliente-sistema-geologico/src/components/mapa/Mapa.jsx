import React, { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Marcadores from "./MarcaElemento";
import FiltroElementos from "./FiltroElementos";

const Mapa = ({ elementos }) => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todos");

  // Filtrar elementos por categoría
  const elementosFiltrados =
    categoriaSeleccionada === "todos"
      ? elementos
      : elementos.filter((elemento) => elemento.tipo === categoriaSeleccionada);

  const positionCentro = [0, 0]; // Centro inicial del mapa

  return (
    <div>
      {/* Componente de filtros */}
      <FiltroElementos onFilterChange={setCategoriaSeleccionada} />

      {/* Contenedor del mapa */}
      <MapContainer center={positionCentro} zoom={2} style={{ height: "90vh", width: "100%" }}>
        {/* Capa base de OpenStreetMap */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Renderizar marcadores con elementos filtrados */}
        <Marcadores elementos={elementosFiltrados} />
      </MapContainer>
    </div>
  );
};

export default Mapa;