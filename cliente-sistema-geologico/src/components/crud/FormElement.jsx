// src/components/crud/FormElement.jsx
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import addElemento from "../../hooks/addElemento";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  FormHelperText,
  Alert,
  Snackbar,
  CircularProgress
} from "@mui/material";

const FormElement = ({ tipo = "fosil" }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  // Definimos los valores por defecto para cada campo, incluso para propiedades anidadas.
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      // Campos comunes
      Nombre: "",
      Edad: 0,
      Donante: "",
      FechaIngreso: "",
      Codigo: "",
      Ejemplares: 0,
      DocumentosRelacionados: "",
      LaminaURL: "",
      LaminaExiste: false,
      EstadoElemento: { DescripcionEstado: "Activo" },
      Ubicacion: {
        Latitud: 0,
        Longitud: 0,
        Localidad: "",
        Leyenda: "",
        Provincia: { NombreProvincia: "" },
        Pais: { NombrePais: "" },
      },
      Fotos: [{ Imagen: "" }],
      
      // Campos específicos de fósil
      Especie: "",
      Periodo: "",
      
      // Campos específicos de roca
      TipoRoca: "",
      Litologia: ""
    },
  });

  // Limpiar formulario cuando cambia el tipo
  useEffect(() => {
    reset();
  }, [tipo, reset]);

  // Manejo del archivo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result.split(",")[1];
        // Actualizamos el valor de Fotos usando setValue
        setValue("Fotos", [{ 
          Imagen: base64Image,
          TipoFoto: "Principal",
          FechaSubida: new Date().toISOString(),
          CreadoPor: "Usuario Web"
        }]);
      };
      reader.readAsDataURL(file);
    }
  };

  // Función a ejecutar al enviar el formulario
  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    try {
      // Obtener la cookie user_id
      const cookies = document.cookie.split('; ');
      const userIdCookie = cookies.find(cookie => cookie.startsWith('user_id='));
      if (!userIdCookie) {
        throw new Error("Usuario no autenticado");
      }
      const userId = userIdCookie.split('=')[1];
      
      // Incluir ID de usuario
      const elementoConUsuario = {
        ...data,
        UsuarioId: parseInt(userId)
      };
      
      await addElemento(elementoConUsuario, tipo);
      setSuccess(true);
      reset();
    } catch (error) {
      console.error(`Error al crear ${tipo}:`, error);
      setError(error.message || `Error al crear ${tipo}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Agregar {tipo === "fosil" ? "Fósil" : "Roca"}</h2>

        {/* Campos específicos según el tipo */}
        {tipo === "fosil" ? (
          <>
            <TextField
              label="Especie"
              fullWidth
              margin="normal"
              {...register("Especie", { required: "Este campo es obligatorio" })}
              error={!!errors.Especie}
              helperText={errors.Especie ? errors.Especie.message : ""}
            />

            <TextField
              label="Periodo"
              fullWidth
              margin="normal"
              {...register("Periodo", { required: "Este campo es obligatorio" })}
              error={!!errors.Periodo}
              helperText={errors.Periodo ? errors.Periodo.message : ""}
            />
          </>
        ) : (
          <>
            <TextField
              label="Tipo de Roca"
              fullWidth
              margin="normal"
              {...register("TipoRoca", { required: "Este campo es obligatorio" })}
              error={!!errors.TipoRoca}
              helperText={errors.TipoRoca ? errors.TipoRoca.message : ""}
            />

            <TextField
              label="Litología"
              fullWidth
              margin="normal"
              {...register("Litologia", { required: "Este campo es obligatorio" })}
              error={!!errors.Litologia}
              helperText={errors.Litologia ? errors.Litologia.message : ""}
            />
          </>
        )}

        {/* Campos comunes */}
        <TextField
          label="Nombre"
          fullWidth
          margin="normal"
          {...register("Nombre", { required: "Este campo es obligatorio" })}
          error={!!errors.Nombre}
          helperText={errors.Nombre ? errors.Nombre.message : ""}
        />

        <TextField
          label="Edad"
          type="number"
          fullWidth
          margin="normal"
          {...register("Edad", { valueAsNumber: true })}
        />

        <TextField
          label="Donante"
          fullWidth
          margin="normal"
          {...register("Donante")}
        />

        <TextField
          label="Fecha de Ingreso"
          type="date"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          {...register("FechaIngreso")}
        />

        <TextField
          label="Código"
          fullWidth
          margin="normal"
          {...register("Codigo")}
        />

        <TextField
          label="Ejemplares"
          type="number"
          fullWidth
          margin="normal"
          {...register("Ejemplares", { valueAsNumber: true })}
        />

        <TextField
          label="Documentos Relacionados"
          fullWidth
          margin="normal"
          {...register("DocumentosRelacionados")}
        />

        <TextField
          label="URL Lámina"
          fullWidth
          margin="normal"
          {...register("LaminaURL")}
        />

        <Controller
          name="LaminaExiste"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="¿Lámina Existe?"
            />
          )}
        />

        <TextField
          label="Estado"
          fullWidth
          margin="normal"
          {...register("EstadoElemento.DescripcionEstado")}
        />

        <h3>Ubicación:</h3>
        <TextField
          label="Latitud"
          type="number"
          fullWidth
          margin="normal"
          {...register("Ubicacion.Latitud", { valueAsNumber: true })}
        />

        <TextField
          label="Longitud"
          type="number"
          fullWidth
          margin="normal"
          {...register("Ubicacion.Longitud", { valueAsNumber: true })}
        />

        <TextField
          label="Localidad"
          fullWidth
          margin="normal"
          {...register("Ubicacion.Localidad")}
        />

        <TextField
          label="Leyenda"
          fullWidth
          margin="normal"
          {...register("Ubicacion.Leyenda")}
        />

        <TextField
          label="Provincia"
          fullWidth
          margin="normal"
          {...register("Ubicacion.Provincia.NombreProvincia")}
        />

        <TextField
          label="País"
          fullWidth
          margin="normal"
          {...register("Ubicacion.Pais.NombrePais")}
        />

        <input type="file" onChange={handleFileChange} />
        <Controller
          name="Fotos"
          control={control}
          render={({ field: { value } }) =>
            value && value[0] && value[0].Imagen ? (
              <FormHelperText>Imagen cargada correctamente.</FormHelperText>
            ) : null
          }
        />

        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          fullWidth
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : `Guardar ${tipo === "fosil" ? "Fósil" : "Roca"}`}
        </Button>
      </form>
      
      <Snackbar 
        open={success} 
        autoHideDuration={6000} 
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success">{tipo === "fosil" ? "Fósil" : "Roca"} creado/a exitosamente</Alert>
      </Snackbar>
      
      <Snackbar 
        open={!!error} 
        autoHideDuration={6000} 
        onClose={() => setError(null)}
      >
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </div>
  );
};

export default FormElement;