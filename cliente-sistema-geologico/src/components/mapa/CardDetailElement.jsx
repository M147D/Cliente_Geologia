// scr/components/mapa/CardDetailElement.jsx
import React, { useState } from 'react';
import { useLocation, Link } from "react-router-dom";
import { 
  Card,
  CardContent, 
  CardHeader,
  Typography,
  Divider,
  Box,
  Chip,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Stack,
  CardMedia
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DescriptionIcon from '@mui/icons-material/Description';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import FotoModal from './FotoModal';

// Componente para renderizar fotos con control de acceso
const FotoComponente = ({ fotoId, alt, height = "200px", objectFit = "cover", onClick }) => {
  if (!fotoId) return null;
  
  // Construir URL para la imagen (usa el endpoint con control de acceso)
  const imageUrl = `/api/FotoElementos/imagen/${fotoId}`;
  
  return (
    <img
      src={imageUrl}
      alt={alt || "Imagen"}
      style={{ 
        width: "100%", 
        height: height, 
        objectFit: objectFit,
        display: "block",
        cursor: onClick ? "pointer" : "default"
      }}
      onClick={onClick}
    />
  );
};

// Función auxiliar para determinar el color del chip de estado
const getStatusColor = (estado) => {
  if (!estado) return "default";
  
  const estadoLower = estado.toLowerCase();
  if (estadoLower.includes("bueno") || estadoLower.includes("activo")) return "success";
  if (estadoLower.includes("deteriorado") || estadoLower.includes("pendiente")) return "warning";
  if (estadoLower.includes("malo") || estadoLower.includes("dañado")) return "error";
  
  return "default";
};

const CardDetailElement = () => {
  const theme = useTheme();
  const location = useLocation();
  const { elemento } = location.state || {};
  
  // Estado para controlar el modal de fotos
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // Funciones para manejar el modal
  const handleOpenModal = (index) => {
    setCurrentPhotoIndex(index);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  if (!elemento) {
    return (
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          maxWidth: '600px', 
          mx: 'auto', 
          mt: 4,
          textAlign: 'center',
          borderLeft: `4px solid ${theme.palette.error.main}`
        }}
      >
        <Typography variant="h5" color="error" gutterBottom>
          Error: No se proporcionó información del elemento
        </Typography>
        <Button 
          component={Link} 
          to="/mapa" 
          variant="contained" 
          startIcon={<ArrowBackIcon />} 
          sx={{ mt: 2 }}
        >
          Volver al mapa
        </Button>
      </Paper>
    );
  }

  // Obtener todas las fotos correctamente
  const fotos = elemento.galeria?.fotos || [];
  const hasPhotos = fotos.length > 0;

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 2 }}>
      <Button 
        component={Link} 
        to="/mapa" 
        startIcon={<ArrowBackIcon />} 
        sx={{ mb: 2 }}
      >
        Volver al mapa
      </Button>
      
      <Card elevation={3} sx={{ borderRadius: 2, overflow: 'visible' }}>
        <CardHeader
          title={
            <Typography variant="h5" component="h1" fontWeight="bold">
              {elemento.nombre}
            </Typography>
          }
          subheader={
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
              <Chip
                label={`Código: ${elemento.codigo}`}
                size="small"
                color="primary"
                sx={{ mr: 1 }}
              />
              {elemento.estadoElemento?.descripcionEstado && (
                <Chip 
                  label={elemento.estadoElemento.descripcionEstado} 
                  size="small" 
                  color={getStatusColor(elemento.estadoElemento.descripcionEstado)}
                />
              )}
            </Box>
          }
        />

        <Divider />
        
        <CardContent>
          <Stack 
            direction={{ xs: 'column', md: 'row' }} 
            spacing={3} 
            divider={<Divider orientation="vertical" flexItem />}
          >
            {/* Columna de información principal */}
            <Box sx={{ width: { xs: '100%', md: '50%' } }}>
              <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                Información General
              </Typography>
              
              <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" sx={{ fontWeight: 'bold', width: '40%' }}>Tipo</TableCell>
                      <TableCell>{elemento.tipoRoca || elemento.especie || "No disponible"}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" sx={{ fontWeight: 'bold' }}>Descripción</TableCell>
                      <TableCell>{elemento.descripcion || "No disponible"}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" sx={{ fontWeight: 'bold' }}>Donante</TableCell>
                      <TableCell>{elemento.donante || "No disponible"}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" sx={{ fontWeight: 'bold' }}>Edad</TableCell>
                      <TableCell>{elemento.edad ? `${elemento.edad} años` : "No disponible"}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" sx={{ fontWeight: 'bold' }}>Especie</TableCell>
                      <TableCell>{elemento.especie || "No disponible"}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" sx={{ fontWeight: 'bold' }}>Periodo</TableCell>
                      <TableCell>{elemento.periodo || "No disponible"}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocationOnIcon fontSize="small" sx={{ mr: 0.5 }} />
                  Ubicación
                </Box>
              </Typography>
              
              <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
                <Typography variant="body2" gutterBottom>
                  <strong>Localidad:</strong> {elemento.ubicacion?.localidad || "No disponible"}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Provincia:</strong> {elemento.ubicacion?.provincia?.nombreProvincia || "No disponible"}
                </Typography>
                <Typography variant="body2">
                  <strong>País:</strong> {elemento.ubicacion?.pais?.nombrePais || "No disponible"}
                </Typography>
              </Paper>
            </Box>
            
            {/* Columna de ubicación y fechas */}
            <Box sx={{ width: { xs: '100%', md: '50%' } }}>
              
              <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CalendarTodayIcon fontSize="small" sx={{ mr: 0.5 }} />
                  Información Temporal
                </Box>
              </Typography>
              
              <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
                <Typography variant="body2">
                  <strong>Fecha de ingreso:</strong> {elemento.fechaIngreso || "No disponible"}
                </Typography>
              </Paper>
              
              <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <DescriptionIcon fontSize="small" sx={{ mr: 0.5 }} />
                  Documentación
                </Box>
              </Typography>
              
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="body2" gutterBottom>
                  <strong>Documentos relacionados:</strong> {elemento.documentosRelacionados || "No disponible"}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <Typography variant="body2" sx={{ mr: 1 }}>
                    <strong>Lámina existente:</strong> {elemento.laminaExiste ? "Sí" : "No"}
                  </Typography>
                  {elemento.laminaExiste && elemento.laminaURL && (
                    <Button 
                      variant="outlined" 
                      size="small"
                      startIcon={<PictureAsPdfIcon />}
                      href={elemento.laminaURL}
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Ver lámina
                    </Button>
                  )}
                </Box>
              </Paper>
            </Box>
          </Stack>
          
          {/* Sección de fotografías */}
          {hasPhotos && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <ImageIcon fontSize="small" sx={{ mr: 0.5 }} />
                  Fotografías
                </Box>
              </Typography>
              
              <Box sx={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: 2 
              }}>
                {fotos.map((foto, index) => (
                  <Box 
                    key={foto.id || index} 
                    sx={{ 
                      width: { xs: '100%', sm: 'calc(50% - 8px)', md: 'calc(33.333% - 11px)' }
                    }}
                  >
                    <Paper 
                      elevation={2} 
                      sx={{ 
                        overflow: 'hidden',
                        borderRadius: 2,
                        height: '100%',
                        transition: 'transform 0.3s',
                        '&:hover': {
                          transform: 'scale(1.02)',
                          cursor: 'pointer'
                        }
                      }}
                      onClick={() => handleOpenModal(index)}
                    >
                      {/* Componente para mostrar la foto con control de acceso */}
                      <FotoComponente 
                        fotoId={foto.id}
                        alt={`${elemento.nombre} - Foto ${index + 1}`}
                        onClick={() => handleOpenModal(index)}
                      />
                      
                      <Box sx={{ p: 1 }}>
                        <Typography variant="caption" color="text.secondary">
                          {foto.tipoFoto || `Foto ${index + 1}`}
                        </Typography>
                        {foto.descripcionEspecifica && (
                          <Typography variant="caption" display="block" color="text.secondary">
                            {foto.descripcionEspecifica}
                          </Typography>
                        )}
                      </Box>
                    </Paper>
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>
      
      {/* Modal para ver fotos en grande */}
      <FotoModal 
        open={modalOpen}
        handleClose={handleCloseModal}
        fotos={fotos}
        currentIndex={currentPhotoIndex}
        setCurrentIndex={setCurrentPhotoIndex}
        elemento={elemento}
      />
    </Box>
  );
};

export default CardDetailElement;