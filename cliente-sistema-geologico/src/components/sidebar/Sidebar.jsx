// src/components/sidebar/Sidebar.jsx
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <nav style={{ width: "250px", background: "#f4f4f4", padding: "1rem" }}>
      <h3>Sistema Geológico</h3>
      <ul>
        <li>
          <Link to="/">Mapa</Link>
        </li>
        {/* Agrega más enlaces aquí */}
      </ul>
    </nav>
  );
};

export default Sidebar;