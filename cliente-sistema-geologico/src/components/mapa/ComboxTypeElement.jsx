import React from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const ComboxTypeElement = ({ onFilterChange }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="categoria-label">Categoría</InputLabel>
      <Select
        labelId="categoria-label"
        defaultValue="todos"
        onChange={(e) => onFilterChange(e.target.value)}
        label="Categoría"
      >
        <MenuItem value="todos">Todos</MenuItem>
        <MenuItem value="fosil">Fósiles</MenuItem>
        <MenuItem value="roca">Rocas</MenuItem>
      </Select>
    </FormControl>
  );
};

export default ComboxTypeElement;