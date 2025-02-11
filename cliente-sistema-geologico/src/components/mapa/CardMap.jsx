// scr/components/mapa/CardMap.jsx
import React, { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MarkerElement from "./MarkerElement.jsx";
import ComboxTypeElement from "./ComboxTypeElement.jsx";

const CardMap = ({ elementos }) => {

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todos");

  const elementosFiltrados =
    categoriaSeleccionada === "todos"
      ? elementos
      : elementos.filter((elemento) => elemento.tipo === categoriaSeleccionada);

  const positionCentro = [10, 5];

  return (
    <>
      <ComboxTypeElement onFilterChange={setCategoriaSeleccionada} />
      <MapContainer
        center={positionCentro}
        zoom={1.5}
        style={{ flex: 1, height: "calc(100vh - 14rem)", width: "100%" , marginTop: "0.5rem"}} 
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <MarkerElement elementos={elementosFiltrados} />
      </MapContainer>
    </>
  );
};

export default CardMap;