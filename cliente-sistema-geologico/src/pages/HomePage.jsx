import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Paper, Button, CircularProgress, Alert } from '@mui/material';
import Filtros from '../components/filters/Filtros.jsx';
import api from '../hooks/axiosConfig';

const HomePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resultados, setResultados] = useState([]);
  const [mostrarResultados, setMostrarResultados] = useState(false);

  const handleButtonClick = () => {
    navigate('/mapa');
  };
  
  const handleApplyFilters = async (filters) => {
    setLoading(true);
    setError(null);
    setMostrarResultados(false);
    
    try {
      // Construir los parámetros de consulta
      const queryParams = new URLSearchParams();
      
      if (filters.paisId) {
        queryParams.append('paisId', filters.paisId);
      }
      
      if (filters.provinciaId) {
        queryParams.append('provinciaId', filters.provinciaId);
      }
      
      if (filters.localidad) {
        queryParams.append('localidad', filters.localidad);
      }
      
      if (filters.nombre) {
        queryParams.append('nombre', filters.nombre);
      }
      
      if (filters.tipo) {
        queryParams.append('tipo', filters.tipo);
      }
      
      const queryString = queryParams.toString();
      
      let elementosCombinados = [];
      
      // Si no hay tipo específico o es "fosil", buscar fósiles
      if (!filters.tipo || filters.tipo === 'fosil') {
        const fosiles = await api.get(`/Fosiles/filtro?${queryString}`);
        elementosCombinados = [...elementosCombinados, ...fosiles.data];
      }
      
      // Si no hay tipo específico o es "roca", buscar rocas
      if (!filters.tipo || filters.tipo === 'roca') {
        const rocas = await api.get(`/Rocas/filtro?${queryString}`);
        elementosCombinados = [...elementosCombinados, ...rocas.data];
      }
      
      setResultados(elementosCombinados);
      setMostrarResultados(true);
      
      // Almacenar los resultados en sessionStorage para usarlos en el mapa
      sessionStorage.setItem('elementosFiltrados', JSON.stringify(elementosCombinados));
      
      console.log('Resultados de búsqueda:', elementosCombinados);
    } catch (error) {
      console.error('Error al aplicar filtros:', error);
      setError('Error al buscar elementos. Por favor, intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const irAlMapa = () => {
    navigate('/mapa', { state: { elementosFiltrados: resultados } });
  };

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Sistema de Geología
        </Typography>
        <Typography variant="body1" paragraph>
          Bienvenido al sistema de geología. Utilice los filtros para buscar elementos geológicos por ubicación o características.
        </Typography>
        <Filtros onApplyFilters={handleApplyFilters} />
        
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <CircularProgress />
          </Box>
        )}
        
        {error && (
          <Alert severity="error" sx={{ mt: 3 }}>
            {error}
          </Alert>
        )}
        
        {mostrarResultados && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6">
              Resultados: {resultados.length} elementos encontrados
            </Typography>
            
            {resultados.length > 0 ? (
              <Box sx={{ mt: 2 }}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={irAlMapa}
                  fullWidth
                >
                  Ver en el Mapa
                </Button>
              </Box>
            ) : (
              <Alert severity="info" sx={{ mt: 2 }}>
                No se encontraron elementos con los criterios especificados.
              </Alert>
            )}
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default HomePage;