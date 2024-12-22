import React, { useState } from "react";
import useElementos from "../../hooks/useElementos"; // Hook de obtención de datos
import addElemento from "../../hooks/addElemento"; // Función de agregar elemento
import Mapa from "../../components/mapa/Mapa";

const CrearFosil = () => {
    const elementos = useElementos(); // Obtiene los elementos de fósiles y rocas
    const [formData, setFormData] = useState({
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
        EstadoElemento: {
          DescripcionEstado: "",
        },
        Ubicacion: {
          Latitud: 0,
          Longitud: 0,
          Localidad: "",
          Leyenda: "",
          Provincia: {
            NombreProvincia: "",
          },
          Pais: {
            NombrePais: "",
          },
        },
        Fotos: [
          {
            TipoFoto: "",
            FechaSubida: "",
            CreadoPor: "",
            DescripcionEspecifica: "",
            Etiquetas: "",
            Imagen: "",
            Galeria: {
              DetalleGrupo: "",
            },
          },
        ],
      });

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
  
      const handleUbicacionChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          Ubicacion: {
            ...prevData.Ubicacion,
            [name]: value,
          },
        }));
      };
    
      const handleEstadoElementoChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          EstadoElemento: {
            ...prevData.EstadoElemento,
            [name]: value,
          },
        }));
      };
  
        // Función para manejar la carga de la imagen y convertirla a base64
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Selecciona el primer archivo
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result.split(",")[1]; // Extrae solo la parte base64
        setFormData((prevData) => ({
          ...prevData,
          Fotos: [
            {
              ...prevData.Fotos[0],
              Imagen: base64Image, // Almacena la imagen convertida
            },
          ],
        }));
      };
      reader.readAsDataURL(file); // Lee el archivo como una URL de datos (Base64)
    }
  };
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await addElemento(formData, "fosil");
        alert("Fossil created successfully!");
      } catch (error) {
        console.error("Error creating fossil:", error);
        alert("Failed to create fossil");
      }
    };
  
    return (
      <div className="crear-fosil-container">
         <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>Agregar Fosil</h2>
          <label>
            Especie:
            <input
              type="text"
              name="Especie"
              value={formData.Especie}
              onChange={handleInputChange}
            />
          </label>

          <label>
            Periodo:
            <input
              type="text"
              name="Periodo"
              value={formData.Periodo}
              onChange={handleInputChange}
            />
          </label>

          <label>
            Nombre:
            <input
              type="text"
              name="Nombre"
              value={formData.Nombre}
              onChange={handleInputChange}
            />
          </label>

          <label>
            Edad:
            <input
              type="number"
              name="Edad"
              value={formData.Edad}
              onChange={handleInputChange}
            />
          </label>

          <label>
            Donante:
            <input
              type="text"
              name="Donante"
              value={formData.Donante}
              onChange={handleInputChange}
            />
          </label>

          <label>
            Fecha de Ingreso:
            <input
              type="date"
              name="FechaIngreso"
              value={formData.FechaIngreso}
              onChange={handleInputChange}
            />
          </label>

          <label>
            Código:
            <input
              type="text"
              name="Codigo"
              value={formData.Codigo}
              onChange={handleInputChange}
            />
          </label>

          <label>
            Ejemplares:
            <input
              type="number"
              name="Ejemplares"
              value={formData.Ejemplares}
              onChange={handleInputChange}
            />
          </label>

          <label>
            Documentos Relacionados:
            <input
              type="text"
              name="DocumentosRelacionados"
              value={formData.DocumentosRelacionados}
              onChange={handleInputChange}
            />
          </label>

          <label>
            URL Lamina:
            <input
              type="text"
              name="LaminaURL"
              value={formData.LaminaURL}
              onChange={handleInputChange}
            />
          </label>

          <label>
            ¿Lamina Existe?:
            <input
              type="checkbox"
              name="LaminaExiste"
              checked={formData.LaminaExiste}
              onChange={(e) => {
                setFormData((prevData) => ({
                  ...prevData,
                  LaminaExiste: e.target.checked,
                }));
              }}
            />
          </label>

          <label>
            Estado:
            <input
              type="text"
              name="DescripcionEstado"
              value={formData.EstadoElemento.DescripcionEstado}
              onChange={handleEstadoElementoChange}
            />
          </label>

          <h3>Ubicación:</h3>
          <label>
            Latitud:
            <input
              type="number"
              name="Latitud"
              value={formData.Ubicacion.Latitud}
              onChange={handleUbicacionChange}
            />
          </label>

          <label>
            Longitud:
            <input
              type="number"
              name="Longitud"
              value={formData.Ubicacion.Longitud}
              onChange={handleUbicacionChange}
            />
          </label>

          <label>
            Localidad:
            <input
              type="text"
              name="Localidad"
              value={formData.Ubicacion.Localidad}
              onChange={handleUbicacionChange}
            />
          </label>

          <label>
            Leyenda:
            <input
              type="text"
              name="Leyenda"
              value={formData.Ubicacion.Leyenda}
              onChange={handleUbicacionChange}
            />
          </label>

          <label>
            Provincia:
            <input
              type="text"
              name="NombreProvincia"
              value={formData.Ubicacion.Provincia.NombreProvincia}
              onChange={handleUbicacionChange}
            />
          </label>

          <label>
            País:
            <input
              type="text"
              name="NombrePais"
              value={formData.Ubicacion.Pais.NombrePais}
              onChange={handleUbicacionChange}
            />
          </label>

          {/* Aquí puedes agregar más campos si lo deseas */}
          <label>
            Foto (Imagen):
            <input type="file" onChange={handleFileChange} />
            {formData.Fotos[0].Imagen && (
              <p>Imagen cargada correctamente.</p> // Muestra un mensaje si la imagen se cargó
            )}
          </label>

          <button type="submit">Submit</button>
        </form>
      </div>
  
        <div className="map-container">
          {/* Aquí pasamos los elementos para visualizarlos en el mapa */}
          <Mapa elementos={elementos} />
        </div>
      </div>
    );
  };
  
  export default CrearFosil;