import React from 'react';
import { TextField, Box, Button, Typography, Stack } from '@mui/material';

const PhotoSection = ({ register, handleFileChange, selectedFile, previewImage, tipo }) => (
  <div>
    <Typography variant="h6" gutterBottom>
      Fotografía
    </Typography>

    <Box sx={{ mb: 2 }}>
      <input 
        type="file" 
        onChange={handleFileChange} 
        accept="image/*"
        id="imagen-upload"
        style={{ display: 'none' }}
      />
      <label htmlFor="imagen-upload">
        <Button 
          variant="contained" 
          component="span"
        >
          Seleccionar Imagen
        </Button>
      </label>
      {selectedFile && (
        <Typography variant="body2" sx={{ mt: 1 }}>
          Archivo seleccionado: {selectedFile.name}
        </Typography>
      )}
    </Box>
    
    {previewImage && (
      <Box sx={{ mt: 2, mb: 2 }}>
        <img 
          src={previewImage} 
          alt="Vista previa" 
          style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '4px' }} 
        />
      </Box>
    )}

    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
      <TextField
        label="Descripción Específica"
        fullWidth
        {...register("fotos[0].descripcionEspecifica")}
      />
      <TextField
        label="Etiquetas"
        fullWidth
        {...register("fotos[0].etiquetas")}
      />
    </Stack>
    
    {tipo !== "fosil" && (
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Galería"
          fullWidth
          {...register("fotos[0].galeria")}
          defaultValue="Principal"
        />
      </Box>
    )}
  </div>
);

export default PhotoSection;