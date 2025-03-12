// src/App.jsx
import React from "react";
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import RootLayout from "./layout/RootLayout.jsx";
import HomePage from "./pages/HomePage.jsx";
import PageLogin from "./pages/PageLogin.jsx";
import PageMap from "./pages/PageMap.jsx";
import PageForm from "./pages/PageForm.jsx";
import CardDetailElement from "./components/mapa/CardDetailElement.jsx";
import CardNotFound from "./components/CardNotFound.jsx";
import PageTable from "./pages/PageTable.jsx";
import DataGeneratorPage from './pages/DataGeneratorPage';
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
        <Route index element={<PageLogin />} />
        <Route path='home' element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } />
        <Route path='mapa' element={
          <ProtectedRoute>
            <PageMap />
          </ProtectedRoute>
        } />
        <Route path='crear-elementos' element={
          <ProtectedRoute>
            <PageForm />
          </ProtectedRoute>
        } />
        <Route path='listar-elementos' element={
          <ProtectedRoute>
            <PageTable />
          </ProtectedRoute>
        } />
        <Route path="detalle/:id" element={
         <ProtectedRoute>
            <CardDetailElement />
         </ProtectedRoute>
        } />
        <Route path='generador-datos' element={
          <ProtectedRoute>
            <DataGeneratorPage />
          </ProtectedRoute>
        } />
        <Route path='*' element={<CardNotFound/>} />
      </Route>
    )
  );

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;