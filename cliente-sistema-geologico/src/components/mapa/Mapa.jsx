import React, { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Marcadores from "./MarcaElemento";
import FiltroElementos from "./FiltroElementos";

const Mapa = ({ elementos }) => {

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todos");

  const elementosFiltrados =
    categoriaSeleccionada === "todos"
      ? elementos
      : elementos.filter((elemento) => elemento.tipo === categoriaSeleccionada);

  const positionCentro = [0, 0];

  return (
    <>
      <FiltroElementos onFilterChange={setCategoriaSeleccionada} />
      <MapContainer center={positionCentro} zoom={2} style={{ height: "90vh", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marcadores elementos={elementosFiltrados} />
      </MapContainer>
    </>
  );
};

export default Mapa;