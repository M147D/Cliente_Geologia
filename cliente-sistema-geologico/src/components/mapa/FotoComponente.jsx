import React, { useState, useEffect } from 'react';
import { CardMedia } from '@mui/material';
import api from '../../hooks/axiosConfig';

const FotoComponente = ({ fotoId, alt, height = "140" }) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await api.get(`/FotoElementos/imagen/${fotoId}`, {
          responseType: 'blob'
        });
        const imageUrl = URL.createObjectURL(response.data);
        setImageUrl(imageUrl);
      } catch (error) {
        console.error('Error al obtener la imagen:', error);
      }
    };

    fetchImage();

    // Cleanup function to revoke the object URL
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [fotoId]);

  return (
    <CardMedia
      component="img"
      height={height}
      image={imageUrl}
      alt={alt || "Imagen"}
    />
  );
};

export default FotoComponente;