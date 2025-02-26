// src/pages/PageTable.jsx
import React from 'react';
import useElementos from '../hooks/useElementos.js';
import { Box, CircularProgress, Alert } from '@mui/material';
import TableElement from '../components/crud/TableElement.jsx';

const PageTable = () => {
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
        <TableElement elementos={elementos} />
      )}
    </Box>
  );
};

export default PageTable;