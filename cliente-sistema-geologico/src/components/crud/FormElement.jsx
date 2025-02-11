// scr/components/crud/FormElement.jsx
import React from "react";
import { useForm, Controller } from "react-hook-form";
import addElemento from "../../hooks/addElemento";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  FormHelperText,
} from "@mui/material";

const FormElement = () => {
  // Definimos los valores por defecto para cada campo, incluso para propiedades anidadas.
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      UsuarioId: 2,
      Especie: "",
      Periodo: "",
      Nombre: "",
      Edad: 0,
      Donante: "",
      FechaIngreso: "",
      Codigo: "",
      Ejemplares: 0,
      DocumentosRelacionados: "",
      LaminaURL: "",
      LaminaExiste: false,
      EstadoElemento: { DescripcionEstado: "" },
      Ubicacion: {
        Latitud: 0,
        Longitud: 0,
        Localidad: "",
        Leyenda: "",
        Provincia: { NombreProvincia: "" },
        Pais: { NombrePais: "" },
      },
      Fotos: [{ Imagen: "" }],
    },
  });

  // Manejo del archivo (puedes integrarlo con react-hook-form usando Controller o hacerlo de forma separada)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result.split(",")[1];
        // Actualizamos el valor de Fotos usando setValue de react-hook-form
        setValue("Fotos", [{ Imagen: base64Image }]);
      };
      reader.readAsDataURL(file);
    }
  };

  // Función a ejecutar al enviar el formulario
  const onSubmit = async (data) => {
    try {
      await addElemento(data, "fosil");
      alert("Fósil creado exitosamente!");
    } catch (error) {
      console.error("Error al crear fósil:", error);
      alert("Error al crear fósil");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Agregar Fósil</h2>

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

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Enviar
        </Button>
      </form>
    </div>
  );
};

export default FormElement;