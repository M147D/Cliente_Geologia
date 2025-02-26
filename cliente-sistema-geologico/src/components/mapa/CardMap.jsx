// src/components/mapa/CardMap.jsx
import React, { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MarkerElement from "./MarkerElement.jsx";
import ComboxTypeElement from "./ComboxTypeElement.jsx";
import { Box, CircularProgress, Alert } from "@mui/material";

const CardMap = ({ elementos = [], loading, error }) => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todos");

  // Verificar que elementos sea un array
  const elementosArray = Array.isArray(elementos) ? elementos : [];

  const elementosFiltrados =
    categoriaSeleccionada === "todos"
      ? elementosArray
      : elementosArray.filter((elemento) => elemento.tipo === categoriaSeleccionada);

  const positionCentro = [10, 5];

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={2}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

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