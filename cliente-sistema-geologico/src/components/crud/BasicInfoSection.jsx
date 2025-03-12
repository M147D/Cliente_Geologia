import React from 'react';
import { TextField, Stack, Typography, Box, FormControlLabel, Checkbox } from '@mui/material';
import { Controller } from 'react-hook-form';

const BasicInfoSection = ({ tipo, register, errors, control }) => (
  <div>
    <Typography variant="h6" gutterBottom>
      Información Básica
    </Typography>
    
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
      {tipo === "fosil" ? (
        <>
          <TextField
            label="Especie"
            fullWidth
            {...register("especie", { required: "Este campo es obligatorio" })}
            error={!!errors.especie}
            helperText={errors.especie ? errors.especie.message : ""}
          />
          <TextField
            label="Periodo"
            fullWidth
            {...register("periodo", { required: "Este campo es obligatorio" })}
            error={!!errors.periodo}
            helperText={errors.periodo ? errors.periodo.message : ""}
          />
        </>
      ) : (
        <>
          <TextField
            label="Tipo de Roca"
            fullWidth
            {...register("tipoRoca", { required: "Este campo es obligatorio" })}
            error={!!errors.tipoRoca}
            helperText={errors.tipoRoca ? errors.tipoRoca.message : ""}
          />
          <TextField
            label="Litología"
            fullWidth
            {...register("litologia", { required: "Este campo es obligatorio" })}
            error={!!errors.litologia}
            helperText={errors.litologia ? errors.litologia.message : ""}
          />
        </>
      )}
    </Stack>

    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
      <TextField
        label="Nombre"
        fullWidth
        {...register("nombre", { required: "Este campo es obligatorio" })}
        error={!!errors.nombre}
        helperText={errors.nombre ? errors.nombre.message : ""}
      />
      <TextField
        label="Edad"
        type="number"
        fullWidth
        {...register("edad", { 
          valueAsNumber: true,
          validate: value => 
            value === null || value === undefined || value === 0 || 
            (value <= 2147483647 && value >= -2147483648) || 
            "El valor debe estar entre -2,147,483,648 y 2,147,483,647"
        })}
        error={!!errors.edad}
        helperText={errors.edad ? errors.edad.message : "Para edades muy grandes, considere usar notación científica (ej: 1.5e6 para 1,500,000)"}
      />
    </Stack>

    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
      <TextField
        label="Donante"
        fullWidth
        {...register("donante")}
      />
      <TextField
        label="Código"
        fullWidth
        {...register("codigo")}
      />
    </Stack>

    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
      <TextField
        label="Ejemplares"
        type="number"
        fullWidth
        {...register("ejemplares", { valueAsNumber: true })}
      />
      <TextField
        label="Documentos Relacionados"
        fullWidth
        {...register("documentosRelacionados")}
      />
    </Stack>

    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
      <TextField
        label="URL Lámina"
        fullWidth
        {...register("laminaURL")}
      />
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <Controller
          name="laminaExiste"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="¿Lámina Existe?"
            />
          )}
        />
      </Box>
    </Stack>
  </div>
);

export default BasicInfoSection;