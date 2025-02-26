// src/components/crud/SelectTipoElement.jsx
import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';

const SelectTipoElement = ({ tipo, onChange }) => {
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
      <Tabs 
        value={tipo} 
        onChange={(e, newValue) => onChange(newValue)}
        aria-label="Tipo de elemento"
      >
        <Tab label="Fósil" value="fosil" />
        <Tab label="Roca" value="roca" />
      </Tabs>
    </Box>
  );
};

export default SelectTipoElement;