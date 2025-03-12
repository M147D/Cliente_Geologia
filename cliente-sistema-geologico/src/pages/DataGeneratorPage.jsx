// src/pages/DataGeneratorPage.jsx
import React from 'react';
import { Box, Container, Typography, Paper, Button } from '@mui/material';
import DataGenerator from '../components/dataGenerator/DataGenerator';
import { Link } from 'react-router-dom';

const DataGeneratorPage = () => {
  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Herramienta de Generación de Datos
        </Typography>
        <Typography variant="body1" paragraph>
          Esta herramienta te permite generar datos ficticios para pruebas y demostraciones de la aplicación.
          Los datos generados tienen propiedades realistas y se guardan en la base de datos.
        </Typography>
        <Button 
          component={Link} 
          to="/mapa" 
          variant="outlined" 
          sx={{ mr: 2 }}
        >
          Ver Mapa
        </Button>
        <Button 
          component={Link} 
          to="/listar-elementos" 
          variant="outlined"
        >
          Ver Tabla
        </Button>
      </Paper>
      
      <DataGenerator />
      
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="body2" color="textSecondary">
          Nota: Los datos generados se almacenan en la base de datos y son visibles por todos los usuarios.
        </Typography>
      </Box>
    </Container>
  );
};

export default DataGeneratorPage;