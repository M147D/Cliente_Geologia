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
      {elementos
        .filter(elemento => {
          // Filtrar solo elementos con ubicación válida
          if (!elemento?.ubicacion?.latitud || !elemento?.ubicacion?.longitud) {
            console.warn("Elemento sin ubicación válida:", elemento);
            return false;
          }
          
          // Verificar que Latitud y Longitud sean valores parseables como números
          const lat = parseFloat(elemento.ubicacion.latitud);
          const lng = parseFloat(elemento.ubicacion.longitud);
          if (isNaN(lat) || isNaN(lng)) {
            console.warn("Coordenadas inválidas:", elemento.Ubicacion);
            return false;
          }
          
          return true;
        })
        .map((elemento, index) => {
          // Convertir string a número si es necesario
          const lat = parseFloat(elemento.ubicacion.latitud);
          const lng = parseFloat(elemento.ubicacion.longitud);
          
          return (
            <Marker
              key={index}
              position={[lat, lng]}
              icon={customIcon}
            >
              <Popup>
                  <CardContent sx={{ width: 200 }}>
                    <Typography variant="h6">{elemento.nombre || "Sin nombre"}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      <strong>Tipo:</strong> {elemento.tipo || elemento.tipo || "Desconocido"}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <strong>Localidad:</strong> {elemento.ubicacion.localidad || "Desconocida"}
                    </Typography>
                    {elemento.galeria.fotos?.[0]?.imagen && (
                      <CardMedia
                        component="img"
                        height="140"
                        image={`data:image/jpeg;base64,${elemento.galeria.fotos[0].imagen}`}
                        alt={elemento.nombre}
                      />
                    )}
                    <Link to={`/detalle/${elemento.id}`} state={{ elemento }}>
                      Ver detalles
                    </Link>
                  </CardContent>
              </Popup>
            </Marker>
          );
        })}
    </>
  );
};

export default MarkerElement;