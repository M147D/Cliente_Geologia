// src/App.jsx
import React from "react";
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/RootLayout.jsx";
import PageLogin from "./pages/PageLogin.jsx";
import PageMap from "./pages/PageMap.jsx";
import PageForm from "./pages/PageForm.jsx";
import CardDetailElement from "./components/mapa/CardDetailElement.jsx";
import CardNotFound from "./components/CardNotFound.jsx";
import PageTable from "./pages/PageTable.jsx";

const App = () => {
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
        <Route index element={<PageLogin />} />
        <Route path='mapa' element={<PageMap />} />
        <Route path='crear-fosil' element={<PageForm />} />
        <Route path='listar-elementos' element={<PageTable />} />
        <Route path="detalle/:id" element={<CardDetailElement />} />
        <Route path='*' element={<CardNotFound/>} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;