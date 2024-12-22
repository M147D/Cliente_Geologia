import { useLocation, Link } from "react-router-dom";

const DetalleElemento = () => {
  const location = useLocation();
  const { elemento } = location.state || {}; // Obtener el elemento desde el estado

  if (!elemento) {
    return <p>Error: No se proporcionó información del elemento.</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>{elemento.Nombre}</h2>
      <p><strong>Código:</strong> {elemento.Codigo}</p>
      <p><strong>Tipo:</strong> {elemento.tipo}</p>
      <p><strong>Descripción:</strong> {elemento.Descripcion || "No disponible"}</p>
      <p><strong>Donante:</strong> {elemento.Donante || "No disponible"}</p>
      <p><strong>Edad:</strong> {elemento.Edad ? `${elemento.Edad} años` : "No disponible"}</p>
      <p><strong>Estado:</strong> {elemento.EstadoElemento?.DescripcionEstado || "No disponible"}</p>
      <p><strong>Especie:</strong> {elemento.Especie || "No disponible"}</p>
      <p><strong>Periodo:</strong> {elemento.Periodo || "No disponible"}</p>
      <p><strong>Localidad:</strong> {elemento.Ubicacion.Localidad || "No disponible"}</p>
      <p><strong>Provincia:</strong> {elemento.Ubicacion.Provincia?.NombreProvincia || "No disponible"}</p>
      <p><strong>País:</strong> {elemento.Ubicacion.Pais.NombrePais || "No disponible"}</p>
      <p><strong>Fecha de ingreso:</strong> {new Date(elemento.FechaIngreso).toLocaleDateString() || "No disponible"}</p>
      <p><strong>Documentos relacionados:</strong> {elemento.DocumentosRelacionados || "No disponible"}</p>
      <p><strong>Lámina existente:</strong> {elemento.LaminaExiste ? "Sí" : "No"}</p>
      {elemento.LaminaURL && (
        <p><strong>URL de la lámina:</strong> <a href={elemento.LaminaURL} target="_blank" rel="noopener noreferrer">Ver lámina</a></p>
      )}
      {elemento.Fotos?.map((foto, index) => (
        <img
          key={index}
          src={`data:image/jpeg;base64,${foto.Imagen}`}
          alt={`${elemento.Nombre} - Foto ${index + 1}`}
          style={{ width: "100%", height: "auto", borderRadius: "5px", marginBottom: "10px" }}
        />
      ))}
      <Link to="/">Volver al mapa</Link>
    </div>
  );
};

export default DetalleElemento;
