import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, TextField, Button, CircularProgress } from '@mui/material';

const DataGeneratorForm = ({ tipo, setTipo, cantidad, setCantidad, loading, handleGenerate }) => {
  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>Tipo</InputLabel>
        <Select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          label="Tipo"
        >
          <MenuItem value="fosil">Fósil</MenuItem>
          <MenuItem value="roca">Roca</MenuItem>
        </Select>
      </FormControl>
      
      <TextField
        label="Cantidad"
        type="number"
        value={cantidad}
        onChange={(e) => setCantidad(Math.max(1, parseInt(e.target.value) || 1))}
        sx={{ width: 100 }}
      />
      
      <Button
        variant="contained"
        color="primary"
        onClick={handleGenerate}
        disabled={loading}
        fullWidth
      >
        {loading ? <CircularProgress size={24} /> : `Generar ${cantidad} ${tipo === 'fosil' ? 'Fósiles' : 'Rocas'}`}
      </Button>
    </Box>
  );
};

export default DataGeneratorForm;