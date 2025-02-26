// src/pages/PageForm.jsx
import React, { useState } from 'react';
import CardMap from "../components/mapa/CardMap.jsx";
import FormElement from "../components/crud/FormElement.jsx";
import useElementos from '../hooks/useElementos.js';
import { Box, Tabs, Tab, Paper } from '@mui/material';

const PageForm = () => {
    const [tipoElemento, setTipoElemento] = useState('fosil');
    const elementosData = useElementos(); // Obtiene todo el objeto
    
    // Extraer los elementos y estados correctamente
    const elementos = elementosData.elementos || [];
    const loading = elementosData.loading || false;
    const error = elementosData.error || null;
    const refetch = elementosData.refetch || (() => {});

    const handleTipoChange = (event, newValue) => {
        setTipoElemento(newValue);
    };

    // Función para recargar datos después de crear un elemento
    const handleElementoCreado = () => {
        refetch();
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
            <Paper sx={{ flex: '0 0 40%', p: 2 }}>
                {/* Selector de tipo de elemento */}
                <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                    <Tabs 
                        value={tipoElemento} 
                        onChange={handleTipoChange}
                        aria-label="Tipo de elemento"
                    >
                        <Tab label="Fósil" value="fosil" />
                        <Tab label="Roca" value="roca" />
                    </Tabs>
                </Box>
                
                {/* Formulario que recibe el tipo */}
                <FormElement tipo={tipoElemento} onSuccess={handleElementoCreado} />
            </Paper>
            
            <Box sx={{ flex: '1', ml: { xs: 0, md: 2 }, p: 2 }}>
                <CardMap elementos={elementos} loading={loading} error={error} />
            </Box>
        </Box>
    );
};

export default PageForm;