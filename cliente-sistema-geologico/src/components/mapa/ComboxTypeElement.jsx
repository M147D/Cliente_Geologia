import React from "react";
import { FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";

const ComboxTypeElement = ({ onFilterChange }) => {
  const handleChange = (event) => {
    onFilterChange(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120, mt: 2 }}>
      <FormControl fullWidth>
        <InputLabel id="filtro-categoria-label">Categoría</InputLabel>
        <Select
          labelId="filtro-categoria-label"
          id="filtro-categoria"
          defaultValue="none"
          label="Categoría"
          onChange={handleChange}
        >
          <MenuItem value="none">Seleccione una categoría</MenuItem>
          <MenuItem value="todos">Todos los elementos</MenuItem>
          <MenuItem value="fosil">Fósiles</MenuItem>
          <MenuItem value="roca">Rocas</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default ComboxTypeElement;