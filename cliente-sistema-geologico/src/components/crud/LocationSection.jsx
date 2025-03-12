import React from 'react';
import { TextField, Stack, Typography } from '@mui/material';

const LocationSection = ({ register }) => (
  <div>
    <Typography variant="h6" gutterBottom>
      Ubicación
    </Typography>

    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
      <TextField
        label="Latitud"
        fullWidth
        {...register("latitud")}
      />
      <TextField
        label="Longitud"
        fullWidth
        {...register("longitud")}
      />
    </Stack>

    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
      <TextField
        label="Localidad"
        fullWidth
        {...register("localidad")}
      />
      <TextField
        label="Leyenda"
        fullWidth
        {...register("leyenda")}
      />
    </Stack>

    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
      <TextField
        label="Provincia"
        fullWidth
        {...register("nombreProvincia")}
      />
      <TextField
        label="País"
        fullWidth
        {...register("nombrePais")}
      />
    </Stack>
  </div>
);

export default LocationSection;