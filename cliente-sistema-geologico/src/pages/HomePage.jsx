// src/pages/HomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Paper, Button } from '@mui/material';
import Filtros from '../components/filters/Filtros.jsx';

const HomePage = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/mapa');
  };
  
  const handleApplyFilters = (filters) => {
    console.log('Filtros aplicados:', filters);
    // Aquí puedes manejar la lógica para aplicar los filtros
  };

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Página Principal
        </Typography>
        <Typography variant="body1" paragraph>
          Bienvenido a la página principal. Aquí puedes aplicar filtros y navegar a otras secciones de la aplicación.
        </Typography>
        <Filtros onApplyFilters={handleApplyFilters} />
        <Box sx={{ mt: 2 }}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleButtonClick}
          >
            Ir a la siguiente página
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default HomePage;