// src/components/mapa/MarkerElement.jsx
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Link } from "react-router-dom";
import { Card, CardContent, Typography, CardMedia } from "@mui/material";

const customIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
});

const MarkerElement = ({ elementos = [] }) => {
  // Verificar que elementos sea un array
  if (!Array.isArray(elementos)) {
    console.error("elementos no es un array:", elementos);
    return null;
  }

  return (
    <>
      {elementos.map((elemento, index) => (
        <Marker
          key={index}
          position={[elemento.Ubicacion.Latitud, elemento.Ubicacion.Longitud]}
          icon={customIcon}
        >
          <Popup>
            <Card sx={{ width: 200 }}>
              <CardContent>
                <Typography variant="h6">{elemento.Nombre}</Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Tipo:</strong> {elemento.Tipo || elemento.tipo || "Desconocido"}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Localidad:</strong> {elemento.Ubicacion.Localidad}
                </Typography>
                {elemento.Fotos?.[0]?.Imagen && (
                  <CardMedia
                    component="img"
                    height="140"
                    image={`data:image/jpeg;base64,${elemento.Fotos[0].Imagen}`}
                    alt={elemento.Nombre}
                  />
                )}
                <Link to={`/detalle/${elemento.Id}`} state={{ elemento }}>
                  Ver detalles
                </Link>
              </CardContent>
            </Card>
          </Popup>
        </Marker>
      ))}
    </>
  );
};

export default MarkerElement;