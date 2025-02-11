// scr/pages/PageForm.jsx
import React from 'react';
import CardMap from "../components/mapa/CardMap.jsx";
import FormElement from "../components/crud/FormElement.jsx";
import useElementos from '../hooks/useElementos.js';
import { Box } from '@mui/material';

const PageForm = () => {

    const elementos = useElementos();

    return (
        <Box sx={{ display: 'flex' }}>
            <div style={{ flex: '0 0 40%' }}>
                <FormElement />
            </div>
            <div style={{ flex: '1', marginInlineStart: '1rem', padding: '1rem' }}>
                <CardMap elementos={elementos} />
            </div>
        </Box>
    );
};

export default PageForm;