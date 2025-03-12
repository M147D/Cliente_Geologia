import React, { useState } from 'react';
import { Typography, Divider, Paper, Box, Stepper, Step, StepLabel, Button } from '@mui/material';
import api from '../../hooks/axiosConfig';
import DataGeneratorForm from './DataGeneratorForm';
import DataGeneratorMessages from './DataGeneratorMessages';
import FotoUploader from './FotoUploader'; // Importar el componente
import { generarFosil, generarRoca } from './dataGeneratorUtils';

const DataGenerator = () => {
  const [tipo, setTipo] = useState('fosil');
  const [cantidad, setCantidad] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [createdElements, setCreatedElements] = useState([]);

  // Pasos del proceso
  const steps = ['Generar Elementos', 'Agregar Fotos'];

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    const generados = [];
    
    try {
      const cookies = document.cookie.split('; ');
      const userIdCookie = cookies.find(cookie => cookie.startsWith('user_id='));
      
      if (!userIdCookie) {
        throw new Error("Usuario no autenticado");
      }
      const userId = parseInt(userIdCookie.split('=')[1]);
      
      const generadorFuncion = tipo === 'fosil' ? generarFosil : generarRoca;
      
      for (let i = 0; i < cantidad; i++) {
        const elementoGenerado = generadorFuncion();
        
        const payload = {
          ...elementoGenerado,
          usuarioId: userId
        };
  
        try {
          if ((tipo === 'fosil' && !payload.especie) || 
              (tipo === 'roca' && !payload.tipoRoca) ||
              !payload.latitud || !payload.longitud || 
              !payload.nombrePais) {
            throw new Error('Faltan campos requeridos');
          }
  
          console.log('Payload enviado:', JSON.stringify(payload, null, 2));
          
          const response = await api.post(
            tipo === 'fosil' ? 'Fosiles' : 'Rocas', 
            payload
          );
          
          console.log(`Elemento ${i+1} generado:`, response.data);
          generados.push(response.data);
        } catch (reqError) {
          console.error('Error detallado:', {
            status: reqError.response?.status,
            data: JSON.stringify(reqError.response?.data, null, 2),
            message: reqError.message,
            payload: JSON.stringify(payload, null, 2)
          });
          
          const errorMessage = reqError.response?.data?.message || 
                               (typeof reqError.response?.data === 'string' 
                                 ? reqError.response.data 
                                 : reqError.message);
          
          setError(`Error al generar datos: ${errorMessage}`);
          throw reqError;
        }
        if (cantidad > 1 && i < cantidad - 1) {
          await new Promise(resolve => setTimeout(resolve, 300));
        }
      }
      setCreatedElements(generados);
      setSuccess(true);
    } catch (err) {
      console.error('Error al generar datos:', err);
      setError(err.message || 'Error al generar datos');
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setSuccess(false);
    setCreatedElements([]);
  };

  const handleFotoUploaded = (foto) => {
    console.log("Foto subida correctamente:", foto);
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6">Generador de Datos</Typography>
      <Typography variant="body2" color="textSecondary">
        Genera datos falsos para pruebas y demostraciones.
      </Typography>
      
      <Divider sx={{ my: 2 }} />

      <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
      {activeStep === 0 ? (
        <>
          <DataGeneratorForm 
            tipo={tipo} 
            setTipo={setTipo} 
            cantidad={cantidad} 
            setCantidad={setCantidad} 
            loading={loading} 
            handleGenerate={handleGenerate} 
          />
          
          <DataGeneratorMessages 
            success={success} 
            setSuccess={setSuccess} 
            error={error} 
            setError={setError} 
          />
          
          {success && createdElements.length > 0 && (
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button 
                variant="contained" 
                onClick={handleNext}
              >
                Agregar Fotos
              </Button>
            </Box>
          )}
        </>
      ) : (
        <>
          <Typography variant="subtitle1" gutterBottom>
            Elementos Generados: {createdElements.length}
          </Typography>
          
          {createdElements.map((elemento, index) => {
            // Verificar todas las posibles propiedades que podrían contener el ID de la galería
            const galeriaId = elemento.galeriaId || 
                            elemento.galeriaElementoGeologicoId || 
                            (elemento.galeria ? elemento.galeria.id : null);
            
            // Mostrar información de depuración
            console.log(`Elemento #${index + 1} - Propiedades:`, {
              id: elemento.id,
              nombre: elemento.nombre,
              galeriaId: elemento.galeriaId,
              galeriaElementoGeologicoId: elemento.galeriaElementoGeologicoId,
              galeria: elemento.galeria,
              "ID usado": galeriaId
            });
            
            return (
              <Box key={elemento.id} sx={{ mb: 3 }}>
                <Typography variant="h6">
                  {tipo === 'fosil' ? 'Fósil' : 'Roca'} #{index + 1}: {elemento.nombre}
                </Typography>
                
                {galeriaId ? (
                  <FotoUploader 
                    galeriaId={galeriaId} 
                    onFotoUploaded={handleFotoUploaded}
                  />
                ) : (
                  <Typography color="error">
                    No se pudo determinar el ID de la galería para este elemento. 
                    Consulta la consola para más detalles.
                  </Typography>
                )}
                
                <Divider sx={{ my: 2 }} />
              </Box>
            );
          })}
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button onClick={handleBack}>
              Volver
            </Button>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleReset}
            >
              Finalizar
            </Button>
          </Box>
        </>
      )}
    </Paper>
  );
};

export default DataGenerator;