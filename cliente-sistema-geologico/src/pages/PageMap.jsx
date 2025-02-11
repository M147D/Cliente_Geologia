// src/pages/PageMap.jsx
import React from 'react';
import CardMap from "../components/mapa/CardMap.jsx";
import useElementos from '../hooks/useElementos.js';
import { Box } from '@mui/material';

const PageMap = () => {
  const elementos = useElementos();

  return (
    <Box sx={{ padding: '1rem'}}>
      <CardMap elementos={elementos} />
    </Box>
  );
};

export default PageMap;