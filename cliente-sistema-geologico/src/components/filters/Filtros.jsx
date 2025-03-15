import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Stack, Typography, FormControl, InputLabel, Select, MenuItem, Paper } from '@mui/material';
import api from '../../hooks/axiosConfig';

const Filtros = ({ onApplyFilters }) => {
  const [paises, setPaises] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [provinciasFiltradas, setProvinciasFiltradas] = useState([]);
  
  const [filters, setFilters] = useState({
    nombre: '',
    tipo: '',
    paisId: '',
    provinciaId: '',
    localidad: ''
  });

  // Cargar países al montar el componente
  useEffect(() => {
    const cargarPaises = async () => {
      try {
        const response = await api.get('/Paises');
        setPaises(response.data);
      } catch (error) {
        console.error('Error al cargar países:', error);
      }
    };

    cargarPaises();
  }, []);

  // Cargar provincias al montar el componente
  useEffect(() => {
    const cargarProvincias = async () => {
      try {
        const response = await api.get('/Provincias');
        setProvincias(response.data);
      } catch (error) {
        console.error('Error al cargar provincias:', error);
      }
    };

    cargarProvincias();
  }, []);

  // Filtrar provincias cuando cambia el país seleccionado
  useEffect(() => {
    if (filters.paisId) {
      const filtradas = provincias.filter(provincia => 
        provincia.paisId === parseInt(filters.paisId)
      );
      setProvinciasFiltradas(filtradas);
    } else {
      setProvinciasFiltradas([]);
    }
  }, [filters.paisId, provincias]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));

    // Si cambia el país, resetear la provincia
    if (name === 'paisId') {
      setFilters(prev => ({
        ...prev,
        provinciaId: ''
      }));
    }
  };

  const handleApplyFilters = () => {
    if (onApplyFilters) {
      // Eliminar propiedades vacías antes de enviar
      const filtrosLimpios = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== '')
      );
      onApplyFilters(filtrosLimpios);
    }
  };

  const handleReset = () => {
    setFilters({
      nombre: '',
      tipo: '',
      paisId: '',
      provinciaId: '',
      localidad: ''
    });
    
    // Aplicar filtros vacíos para mostrar todos los elementos
    if (onApplyFilters) {
      onApplyFilters({});
    }
  };

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Filtros
      </Typography>
      <Stack spacing={1}>
        <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={1}>
          <TextField
            label="Nombre"
            name="nombre"
            value={filters.nombre}
            onChange={handleChange}
            fullWidth
            size="small"
          />
          <FormControl fullWidth size="small">
            <InputLabel id="tipo-label">Tipo</InputLabel>
            <Select
              labelId="tipo-label"
              id="tipo"
              name="tipo"
              value={filters.tipo}
              label="Tipo"
              onChange={handleChange}
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="fosil">Fósil</MenuItem>
              <MenuItem value="roca">Roca</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={1}>
          <FormControl fullWidth size="small">
            <InputLabel id="pais-label">País</InputLabel>
            <Select
              labelId="pais-label"
              id="paisId"
              name="paisId"
              value={filters.paisId}
              label="País"
              onChange={handleChange}
            >
              <MenuItem value="">Todos</MenuItem>
              {paises.map(pais => (
                <MenuItem key={pais.id} value={pais.id}>
                  {pais.nombrePais}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth size="small" disabled={!filters.paisId}>
            <InputLabel id="provincia-label">Provincia</InputLabel>
            <Select
              labelId="provincia-label"
              id="provinciaId"
              name="provinciaId"
              value={filters.provinciaId}
              label="Provincia"
              onChange={handleChange}
            >
              <MenuItem value="">Todas</MenuItem>
              {provinciasFiltradas.map(provincia => (
                <MenuItem key={provincia.id} value={provincia.id}>
                  {provincia.nombreProvincia}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <TextField
          label="Localidad"
          name="localidad"
          value={filters.localidad}
          onChange={handleChange}
          fullWidth
          size="small"
        />
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            onClick={handleApplyFilters}
            size="small"
          >
            Aplicar Filtros
          </Button>
          <Button 
            variant="outlined" 
            color="secondary" 
            fullWidth 
            onClick={handleReset}
            size="small"
          >
            Limpiar Filtros
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default Filtros;