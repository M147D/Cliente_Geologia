// src/router/AppRouter.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Mapa from "../components/mapa/Mapa";
import Sidebar from "../components/sidebar/Sidebar";
import useElementos from "../hooks/useElementos";

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
            <Route path="/" element={<Mapa elementos={elementos} />} />
            {/* Agrega más rutas aquí si es necesario */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default AppRouter;