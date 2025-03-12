import React, { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MarkerElement from "./MarkerElement.jsx";
import ComboxTypeElement from "./ComboxTypeElement.jsx";
import { Box, CircularProgress, Alert, Typography, Paper } from "@mui/material";

const CardMap = ({ elementos = [], loading, error }) => {
  // Inicializamos con "none" en lugar de "todos"
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("none");

  // Verificar que elementos sea un array
  const elementosArray = Array.isArray(elementos) ? elementos : [];

  // Filtrar elementos según la categoría seleccionada
  const elementosFiltrados = 
    categoriaSeleccionada === "none" 
      ? [] // Array vacío si no hay selección
      : categoriaSeleccionada === "todos"
        ? elementosArray
        : elementosArray.filter((elemento) => elemento.tipo === categoriaSeleccionada);

  const positionCentro = [10, 5];

  // Función para manejar el cambio de filtro
  const handleFilterChange = (nuevaCategoria) => {
    setCategoriaSeleccionada(nuevaCategoria);
  };

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
      <ComboxTypeElement onFilterChange={handleFilterChange} />
      
      {categoriaSeleccionada === "none" ? (
        <Paper 
          elevation={3} 
          sx={{ 
            p: 3, 
            mt: 2, 
            height: "calc(100vh - 14rem)", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center" 
          }}
        >
          <Typography variant="h6" color="text.secondary" align="center">
            Por favor, seleccione una categoría para visualizar los elementos en el mapa
          </Typography>
        </Paper>
      ) : (
        <MapContainer
          center={positionCentro}
          zoom={1.2}
          style={{ flex: 1, height: "calc(100vh - 14rem)", width: "100%", marginTop: "0.5rem"}} 
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <MarkerElement elementos={elementosFiltrados} />
        </MapContainer>
      )}
    </>
  );
};

export default CardMap;