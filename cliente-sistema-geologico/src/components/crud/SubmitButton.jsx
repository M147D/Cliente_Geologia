import React from 'react';
import { Button, CircularProgress, Box } from '@mui/material';

const SubmitButton = ({ loading, tipo }) => (
  <Box sx={{ mt: 3 }}>
    <Button 
      type="submit" 
      variant="contained" 
      color="primary" 
      fullWidth
      disabled={loading}
      sx={{ py: 1.5 }}
    >
      {loading ? <CircularProgress size={24} /> : `Guardar ${tipo === "fosil" ? "Fósil" : "Roca"}`}
    </Button>
  </Box>
);

export default SubmitButton;