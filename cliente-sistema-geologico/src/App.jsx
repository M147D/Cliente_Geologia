// src/App.jsx
import React from "react";
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/RootLayout.jsx";
import Login from "./components/login/Login.jsx";
import Mapa from "./components/mapa/Mapa.jsx";
import CrearFosil from "./components/crud/CrearFosil.jsx";
import useElementos from './hooks/useElementos.js';
import DetalleElemento from "./components/mapa/DetalleElemento.jsx";

const App = () => {
  
  const elementos = useElementos()

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />} >
        <Route index element={<Login />} />
        <Route path='mapa' element={<Mapa elementos={elementos} />} />
        <Route path='crear-fosil' element={<CrearFosil />} />
        <Route path="detalle/:id" element={<DetalleElemento />} />
      </Route>
    )
  )

  return (
    <RouterProvider router={(router)}/>
  )
}

export default App;
