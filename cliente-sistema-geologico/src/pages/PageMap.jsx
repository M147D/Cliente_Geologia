// src/pages/PageMap.jsx
import React from 'react';
import CardMap from "../components/mapa/CardMap.jsx";
import useElementos from '../hooks/useElementos.js';
import { Box, CircularProgress, Alert } from '@mui/material';

const PageMap = () => {
  const { elementos, loading, error } = useElementos();

  return (
    <Box sx={{ padding: '1rem'}}>
      {loading ? (
        <Box display="flex" justifyContent="center" p={4}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <CardMap elementos={elementos} />
      )}
    </Box>
  );
};

export default PageMap;