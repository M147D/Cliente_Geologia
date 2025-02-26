// src/components/login/ButtonAuthenticationGmail.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';
import axios from 'axios';

const ButtonAuthenticationGmail = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Cargar el script de Google
    const loadGoogleScript = () => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      
      return () => {
        document.body.removeChild(script);
      };
    };

    return loadGoogleScript();
  }, []);

  useEffect(() => {
    // Configurar el callback para Google
    window.handleGoogleCredentialResponse = async (response) => {
      try {
        const { data } = await axios.post('/api/auth/login/google', 
          { token: response.credential },
          { 
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true // Equivalente a credentials: 'include' en fetch
          }
        );
        console.log('Login exitoso:', data);
        navigate('/mapa');
      } catch (error) {
        console.error('Error en login:', error.response?.data || error.message);
      }
    };
  }, [navigate]);

  return (
    <div>
      <Button
        variant="outlined"
        fullWidth
        startIcon={<GoogleIcon />}
        onClick={() => {
          window.google?.accounts.id.initialize({
            client_id: import.meta.env.VITE_CLIENT_ID,
            callback: window.handleGoogleCredentialResponse,
            ux_mode: 'popup',
          });
          window.google?.accounts.id.prompt();
        }}
      >
        Continuar con Google
      </Button>
    </div>
  );
};

export default ButtonAuthenticationGmail;