import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Link } from "react-router-dom";

const customIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
});

const MarcaElemento = ({ elementos }) => {
  return (
    <>
      {elementos.map((elemento, index) => (
        <Marker
          key={index}
          position={[elemento.Ubicacion.Latitud, elemento.Ubicacion.Longitud]}
          icon={customIcon}
        >
          <Popup>
            <div style={{ width: "200px" }}>
              <h3>{elemento.Nombre}</h3>
              <p><strong>Tipo:</strong> {elemento.Tipo || "Desconocido"}</p>
              <p><strong>Localidad:</strong> {elemento.Ubicacion.Localidad}</p>
              {elemento.Fotos?.[0]?.Imagen && (
                  <img
                    src={`data:image/jpeg;base64,${elemento.Fotos[0].Imagen}`}
                    alt={elemento.Nombre}
                    style={{ width: "100%", height: "auto", borderRadius: "5px" }}
                  />
              )}
              <Link
                to={`/detalle/${elemento.Id}`}
                state={{ elemento }}
              >
                Ver detalles
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
};

export default MarcaElemento;