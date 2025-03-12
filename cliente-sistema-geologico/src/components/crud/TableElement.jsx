// scr/components/crud/TableElement.jsx
import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import { Link } from "react-router-dom";

const TableElement = ({ elementos }) => {
  if (!elementos || elementos.length === 0) {
    console.log("Elementos recuperados ene table element:"+elementos);
    return <p>No hay elementos disponibles.</p>;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Nombre</strong></TableCell>
            <TableCell><strong>Código</strong></TableCell>
            <TableCell><strong>Especie</strong></TableCell>
            <TableCell><strong>Periodo</strong></TableCell>
            <TableCell><strong>Ubicación</strong></TableCell>
            <TableCell><strong>Estado</strong></TableCell>
            <TableCell><strong>Acciones</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {elementos.map((elemento, index) => (
            <TableRow key={index}>
              <TableCell>{elemento.nombre}</TableCell>
              <TableCell>{elemento.codigo}</TableCell>
              <TableCell>{elemento.especie || "No disponible"}</TableCell>
              <TableCell>{elemento.periodo || "No disponible"}</TableCell>
              <TableCell>
                {elemento.ubicacion?.localidad}, {elemento.ubicacion?.provincia?.nombreProvincia}, {elemento.ubicacion?.pais?.nombrePais}
              </TableCell>
              <TableCell>{elemento.estadoElemento?.descripcionEstado || "No disponible"}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to={{ pathname: `/detalle/${elemento.id}`, state: { elemento } }}
                >
                  Ver Detalle
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableElement;