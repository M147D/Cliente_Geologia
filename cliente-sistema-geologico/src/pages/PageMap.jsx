// src/pages/PageMap.jsx
import React, { useState } from 'react';
import CardMap from "../components/mapa/CardMap.jsx";
import Filtros from "../components/filters/Filtros.jsx";
import useElementos from '../hooks/useElementos.js';
import { Box, CircularProgress, Alert, Paper } from '@mui/material';

const PageMap = () => {
  const { elementos, loading, error } = useElementos();
  const [elementosFiltrados, setElementosFiltrados] = useState([]);

  const handleApplyFilters = (filtros) => {
    const elementosFiltrados = elementos.filter((elemento) => {
      return Object.entries(filtros).every(([key, value]) => {
        if (key === "tipo") {
          return elemento[key] === value;
        }
        return elemento[key].toString().toLowerCase().includes(value.toString().toLowerCase());
      });
    });
    setElementosFiltrados(elementosFiltrados);
  };

  return (
    <Box sx={{ padding: '1rem'}}>
      {loading ? (
        <Box display="flex" justifyContent="center" p={4}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Paper>
        <Filtros onApplyFilters={handleApplyFilters} />
        <CardMap elementos={elementosFiltrados.length > 0 ? elementosFiltrados : elementos} />
        </Paper>
      )}
    </Box>
  );
};

export default PageMap;