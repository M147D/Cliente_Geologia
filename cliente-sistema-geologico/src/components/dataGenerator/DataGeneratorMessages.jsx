import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const DataGeneratorMessages = ({ success, setSuccess, error, setError }) => {
  return (
    <>
      <Snackbar 
        open={success} 
        autoHideDuration={5000} 
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success">
          Datos generados exitosamente
        </Alert>
      </Snackbar>
      
      <Snackbar 
        open={!!error} 
        autoHideDuration={5000} 
        onClose={() => setError(null)}
      >
        <Alert severity="error">
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default DataGeneratorMessages;