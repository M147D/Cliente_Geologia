// src/components/sidebar/Sidebar.jsx
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <nav>
      <h3>Menú</h3>
      <ul>
          <NavLink to="/mapa"><li>Mapa</li></NavLink>
          <NavLink to="/crear-fosil"><li>Crear</li></NavLink>
      </ul>
    </nav>
  );
};

export default Sidebar;