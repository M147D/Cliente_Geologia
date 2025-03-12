import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  TextField, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  IconButton, 
  CircularProgress, 
  Snackbar, 
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../../hooks/axiosConfig';

const FotoUploader = ({ galeriaId, onFotoUploaded }) => {
  const [fotos, setFotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ open: false, type: 'info', message: '' });

  // Agregar una foto a la lista temporal
  const handleAddFoto = () => {
    setFotos([
      ...fotos,
      {
        id: Date.now(), // ID temporal
        file: null,
        preview: null,
        tipoFoto: '',
        descripcionEspecifica: '',
        etiquetas: ''
      }
    ]);
  };

  // Eliminar una foto de la lista temporal
  const handleRemoveFoto = (id) => {
    setFotos(fotos.filter(foto => foto.id !== id));
  };

  // Actualizar la imagen seleccionada
  const handleFileChange = (id, e) => {
    if (!e.target.files || !e.target.files[0]) return;
    
    const file = e.target.files[0];
    const preview = URL.createObjectURL(file);
    
    setFotos(fotos.map(foto => 
      foto.id === id 
        ? { ...foto, file, preview } 
        : foto
    ));
  };

  // Actualizar los campos de texto
  const handleInputChange = (id, field, value) => {
    setFotos(fotos.map(foto => 
      foto.id === id 
        ? { ...foto, [field]: value } 
        : foto
    ));
  };

  // Subir las fotos al servidor
  const handleUploadFotos = async () => {
    if (fotos.length === 0) {
      setFeedback({
        open: true,
        type: 'warning',
        message: 'Agregue al menos una foto para subir'
      });
      return;
    }

    setLoading(true);
    let uploadedCount = 0;
    let errors = [];

    for (const foto of fotos) {
      if (!foto.file) {
        errors.push(`Falta seleccionar archivo para la foto ${uploadedCount + 1}`);
        continue;
      }

      const formData = new FormData();
      formData.append('imagenFile', foto.file);
      formData.append('tipoFoto', foto.tipoFoto || 'General');
      formData.append('descripcionEspecifica', foto.descripcionEspecifica || '');
      formData.append('etiquetas', foto.etiquetas || '');

      try {
        const response = await api.post(`FotoElementos/galeria/${galeriaId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        
        console.log('Foto subida:', response.data);
        uploadedCount++;
        
        if (onFotoUploaded) {
          onFotoUploaded(response.data);
        }
      } catch (error) {
        console.error('Error al subir foto:', error);
        const errorMsg = error.response?.data || error.message || 'Error desconocido';
        errors.push(`Error al subir foto ${uploadedCount + 1}: ${errorMsg}`);
      }
    }

    setLoading(false);
    
    if (errors.length > 0) {
      setFeedback({
        open: true,
        type: 'error',
        message: `Se encontraron errores: ${errors.join(', ')}`
      });
    } else {
      setFeedback({
        open: true,
        type: 'success',
        message: `${uploadedCount} foto(s) subidas correctamente`
      });
      setFotos([]);
    }
  };

  const handleCloseFeedback = () => {
    setFeedback({ ...feedback, open: false });
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Agregar Fotos a la Galería
      </Typography>
      
      <Button 
        variant="outlined" 
        startIcon={<PhotoCamera />} 
        onClick={handleAddFoto}
        sx={{ mb: 2 }}
      >
        Agregar Foto
      </Button>

      <Grid container spacing={2}>
        {fotos.map((foto) => (
          <Grid item xs={12} sm={6} md={4} key={foto.id}>
            <Card sx={{ position: 'relative' }}>
              <IconButton
                sx={{ position: 'absolute', top: 5, right: 5, backgroundColor: 'rgba(255,255,255,0.7)' }}
                onClick={() => handleRemoveFoto(foto.id)}
              >
                <DeleteIcon />
              </IconButton>
              
              {foto.preview ? (
                <CardMedia
                  component="img"
                  height="200"
                  image={foto.preview}
                  alt="Vista previa"
                />
              ) : (
                <Box 
                  sx={{ 
                    height: 200, 
                    backgroundColor: '#f5f5f5', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center'
                  }}
                >
                  <Button
                    variant="contained"
                    component="label"
                    startIcon={<PhotoCamera />}
                  >
                    Seleccionar Imagen
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={(e) => handleFileChange(foto.id, e)}
                    />
                  </Button>
                </Box>
              )}
              
              <CardContent>
                <FormControl fullWidth margin="normal" size="small">
                  <InputLabel>Tipo de Foto</InputLabel>
                  <Select
                    value={foto.tipoFoto}
                    label="Tipo de Foto"
                    onChange={(e) => handleInputChange(foto.id, 'tipoFoto', e.target.value)}
                  >
                    <MenuItem value="General">General</MenuItem>
                    <MenuItem value="Detalle">Detalle</MenuItem>
                    <MenuItem value="Macro">Macro</MenuItem>
                    <MenuItem value="Microscopia">Microscopia</MenuItem>
                  </Select>
                </FormControl>
                
                <TextField
                  fullWidth
                  label="Descripción"
                  margin="normal"
                  size="small"
                  value={foto.descripcionEspecifica}
                  onChange={(e) => handleInputChange(foto.id, 'descripcionEspecifica', e.target.value)}
                />
                
                <TextField
                  fullWidth
                  label="Etiquetas (separadas por comas)"
                  margin="normal"
                  size="small"
                  value={foto.etiquetas}
                  onChange={(e) => handleInputChange(foto.id, 'etiquetas', e.target.value)}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {fotos.length > 0 && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleUploadFotos}
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : `Subir ${fotos.length} Foto(s)`}
        </Button>
      )}

      <Snackbar
        open={feedback.open}
        autoHideDuration={6000}
        onClose={handleCloseFeedback}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseFeedback} severity={feedback.type} sx={{ width: '100%' }}>
          {feedback.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default FotoUploader;