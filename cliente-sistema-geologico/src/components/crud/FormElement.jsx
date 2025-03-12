import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axiosConfig from "../../hooks/axiosConfig";
import {
  Paper,
  Typography,
  Divider,
} from "@mui/material";
import BasicInfoSection from './BasicInfoSection';
import LocationSection from './LocationSection';
import PhotoSection from './PhotoSection';
import SubmitButton from './SubmitButton';
import Notifications from './Notifications';

const FormElement = ({ tipo }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      especie: "",
      periodo: "",
      tipoRoca: "",
      litologia: "",
      nombre: "",
      edad: 0,
      donante: "",
      codigo: "",
      ejemplares: 0,
      documentosRelacionados: "",
      laminaURL: "",
      laminaExiste: false,
      latitud: "",
      longitud: "",
      localidad: "",
      leyenda: "",
      nombreProvincia: "",
      nombrePais: "",
    },
  });

  useEffect(() => {
    reset();
    setPreviewImage(null);
    setSelectedFile(null);
  }, [tipo, reset]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        setError(`El archivo es demasiado grande. El tamaño máximo es ${maxSize / (1024 * 1024)}MB`);
        return;
      }

      setSelectedFile(file);
      
      const objectUrl = URL.createObjectURL(file);
      setPreviewImage(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  };

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  const prepareDataForAPI = (data) => {
    const usuarioId = getCookie('user_id') || 1;
    
    const baseData = {
      nombre: data.nombre,
      edad: data.edad,
      donante: data.donante,
      codigo: data.codigo,
      ejemplares: data.ejemplares,
      documentosRelacionados: data.documentosRelacionados,
      laminaURL: data.laminaURL,
      laminaExiste: data.laminaExiste,
      latitud: data.latitud,
      longitud: data.longitud,
      localidad: data.localidad,
      leyenda: data.leyenda,
      nombreProvincia: data.nombreProvincia,
      nombrePais: data.nombrePais,
      usuarioId: parseInt(usuarioId),
    };
    
    if (tipo === "fosil") {
      return {
        ...baseData,
        especie: data.especie,
        periodo: data.periodo
      };
    } else {
      return {
        ...baseData,
        tipoRoca: data.tipoRoca,
        litologia: data.litologia
      };
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    try {
      if ((tipo === 'fosil' && !data.especie) || 
          (tipo === 'roca' && !data.tipoRoca) ||
          !data.nombre) {
        throw new Error('Faltan campos requeridos');
      }
      
      const apiData = prepareDataForAPI(data);
      console.log('Enviando elemento:', JSON.stringify(apiData, null, 2));
      
      const endpoint = tipo === 'fosil' ? '/Fosiles' : '/Rocas';
      const response = await axiosConfig.post(endpoint, apiData);
      
      console.log('Respuesta del servidor:', response.data);
      setSuccess(true);
      
      reset();
      setPreviewImage(null);
      setSelectedFile(null);
    } catch (error) {
      console.error(`Error al crear ${tipo}:`, error);
      setError(error.message || `Error al crear ${tipo}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4" component="h2" gutterBottom>
          Agregar {tipo === "fosil" ? "Fósil" : "Roca"}
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <BasicInfoSection 
          tipo={tipo} 
          register={register} 
          errors={errors} 
          control={control} 
        />
        <LocationSection register={register} />
        <PhotoSection 
          register={register} 
          handleFileChange={handleFileChange} 
          selectedFile={selectedFile} 
          previewImage={previewImage} 
          tipo={tipo} 
        />
        <SubmitButton loading={loading} tipo={tipo} />
      </form>
      
      <Notifications 
        success={success} 
        setSuccess={setSuccess} 
        error={error} 
        setError={setError} 
        tipo={tipo} 
      />
    </Paper>
  );
};

export default FormElement;