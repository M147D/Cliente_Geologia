import { useLocation, Link } from "react-router-dom";

const DetalleElemento = () => {
  const location = useLocation();
  const { elemento } = location.state || {};

  if (!elemento) {
    return <p>Error: No se proporcionó información del elemento.</p>;
  }

  return (
    <section>
      <h2>{elemento.Nombre}</h2>
      <span className="line-details"><strong>Código:</strong> {elemento.Codigo}</span>
      <span className="line-details"><strong>Tipo:</strong> {elemento.tipo}</span>
      <span className="line-details"><strong>Descripción:</strong> {elemento.Descripcion || "No disponible"}</span>
      <span className="line-details"><strong>Donante:</strong> {elemento.Donante || "No disponible"}</span>
      <span className="line-details"><strong>Edad:</strong> {elemento.Edad ? `${elemento.Edad} años` : "No disponible"}</span>
      <span className="line-details"><strong>Estado:</strong> {elemento.EstadoElemento.DescripcionEstado || "No disponible"}</span>
      <span className="line-details"><strong>Especie:</strong> {elemento.Especie || "No disponible"}</span>
      <span className="line-details"><strong>Periodo:</strong> {elemento.Periodo || "No disponible"}</span>
      <span className="line-details"><strong>Localidad:</strong> {elemento.Ubicacion.Localidad || "No disponible"}</span>
      <span className="line-details"><strong>Provincia:</strong> {elemento.Ubicacion.Provincia.NombreProvincia || "No disponible"}</span>
      <span className="line-details"><strong>País:</strong> {elemento.Ubicacion.Pais.NombrePais || "No disponible"}</span>
      <span className="line-details"><strong>Fecha de ingreso:</strong> {elemento.FechaIngreso || "No disponible"}</span>
      <span className="line-details"><strong>Documentos relacionados:</strong> {elemento.DocumentosRelacionados || "No disponible"}</span>
      <span className="line-details"><strong>Lámina existente:</strong> {elemento.LaminaExiste ? "Sí" : "No"}</span>
      {elemento.LaminaURL && (
        <span><strong>URL de la lámina:</strong> <a href={elemento.LaminaURL} target="_blank" rel="noopener noreferrer">Ver lámina</a></span>
      )}
      {elemento.Fotos?.map((foto, index) => (
        <img
          key={index}
          src={`data:image/jpeg;base64,${foto.Imagen}`}
          alt={`${elemento.Nombre} - Foto ${index + 1}`}
          style={{ width: "100%", height: "auto", borderRadius: "5px", marginBottom: "10px" }}
        />
      ))}
      <Link to="/mapa">Volver al mapa</Link>
    </section>
  );
};

export default DetalleElemento;
