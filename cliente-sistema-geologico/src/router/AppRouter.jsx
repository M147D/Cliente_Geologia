// src/router/AppRouter.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Mapa from "../components/mapa/Mapa";
import DetalleElemento from "../components/mapa/DetalleElemento";
import CrearFosil from "../components/crud/CrearFosil";
import Sidebar from "../components/sidebar/Sidebar";
import useElementos from "../hooks/useElementos";
import AutenticacionGmail from "../components/login/AutenticacionGmail";
const AppRouter = () => {

  const elementos = useElementos();

  return (
    <Router>
      <div style={{ display: "flex" }}>
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div style={{ flex: 1, padding: "1rem" }}>
          <Routes>
            <Route path="/" element={<AutenticacionGmail />} />
            <Route path="/mapa" element={<Mapa elementos={elementos} />} />
            <Route path="/detalle/:id" element={<DetalleElemento />} />
            <Route path="/crear-fosil" element={<CrearFosil />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default AppRouter;