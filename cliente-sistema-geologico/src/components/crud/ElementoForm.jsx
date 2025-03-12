// src/components/crud/ElementoForm.jsx
import React, { useState } from 'react';
import { Container, Paper } from '@mui/material';
import SelectTipoElement from './SelectTipoElement';
import FormElement from './FormElement';

const ElementoForm = () => {
  // Estado para almacenar el tipo seleccionado
  const [tipoSeleccionado, setTipoSeleccionado] = useState('fosil');

  // Manejador para el cambio de tipo
  const handleTipoChange = (nuevoTipo) => {
    setTipoSeleccionado(nuevoTipo);
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
        {/* Selector de tipo (fósil/roca) */}
        <SelectTipoElement 
          tipo={tipoSeleccionado} 
          onChange={handleTipoChange} 
        />
        
        {/* Formulario dinámico según tipo */}
        <FormElement tipo={tipoSeleccionado} />
      </Paper>
    </Container>
  );
};

export default ElementoForm;