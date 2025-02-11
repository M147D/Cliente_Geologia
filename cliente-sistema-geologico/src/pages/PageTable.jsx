// src/pages/PageMap.jsx
import React from 'react';
import useElementos from '../hooks/useElementos.js';
import { Box } from '@mui/material';
import TableElement from '../components/crud/TableElement.jsx';

const PageMap = () => {
  const elementos = useElementos();

  return (
    <Box sx={{ padding: '1rem'}}>
      <TableElement elementos={elementos} />
    </Box>
  );
};

export default PageMap;