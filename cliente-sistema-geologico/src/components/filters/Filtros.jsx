// scr/components/filters/Filtros.jsx
import React from 'react';
import { Box, TextField, Button, Stack, Typography } from '@mui/material';

const Filtros = ({ onApplyFilters }) => {
  const [filters, setFilters] = React.useState({
    nombre: '',
    tipo: '',
    periodo: '',
    edadMin: '',
    edadMax: '',
    pais: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleApplyFilters = () => {
    if (onApplyFilters) {
      onApplyFilters(filters);
    }
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Filtros
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
        <TextField
          label="Nombre"
          name="nombre"
          value={filters.nombre}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Tipo"
          name="tipo"
          value={filters.tipo}
          onChange={handleChange}
          fullWidth
        />
      </Stack>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
        <TextField
          label="Periodo"
          name="periodo"
          value={filters.periodo}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Edad Mínima"
          name="edadMin"
          type="number"
          value={filters.edadMin}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Edad Máxima"
          name="edadMax"
          type="number"
          value={filters.edadMax}
          onChange={handleChange}
          fullWidth
        />
      </Stack>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
        <TextField
          label="País"
          name="pais"
          value={filters.pais}
          onChange={handleChange}
          fullWidth
        />
      </Stack>
      <Box sx={{ mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleApplyFilters}
          fullWidth
        >
          Aplicar Filtros
        </Button>
      </Box>
    </Box>
  );
};

export default Filtros;