import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MarkerElement from "./MarkerElement.jsx";
import { Box, Alert } from "@mui/material";

const CardMap = ({ elementos = [], error }) => {
  // Verificar que elementos sea un array
  const elementosArray = Array.isArray(elementos) ? elementos : [];

  // Coordenadas del centro de Ecuador
  const positionCentro = [-1.8312, -80.1834];
  const zoomNivel = 6;

  if (error) {
    return (
      <Box p={2}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <MapContainer
      center={positionCentro}
      zoom={zoomNivel}
      style={{ flex: 1, height: "calc(100vh - 14rem)", width: "100%", marginTop: "0.5rem"}} 
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <MarkerElement elementos={elementosArray} />
    </MapContainer>
  );
};

export default CardMap;