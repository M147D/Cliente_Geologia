// src/components/sidebar/Sidebar.jsx
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Mapa from "../mapa/Mapa";
import DetalleElemento from "../mapa/DetalleElemento";
import CrearFosil from "../crud/CrearFosil";

const Sidebar = () => {
  return (
    <>
      <nav>
        <h3>Sistema Geológico</h3>
        <ul>
          <li>
            <Link to="/mapa">Mapa</Link>
          </li>
          <li>
            <Link to="/crear-fosil">Crear</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;