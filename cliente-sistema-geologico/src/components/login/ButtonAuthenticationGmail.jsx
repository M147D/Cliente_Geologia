import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext.jsx';

const ButtonAuthenticationGmail = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  // Usar useCallback para estabilizar la función
  const handleGoogleCredentialResponse = useCallback(async (response) => {
    try {
      console.log("Enviando token a backend...");
      
      // Usar el método de login del contexto
      await login(response.credential);
      
      // Navegar al mapa después del login exitoso
      navigate('/home');
    } catch (error) {
      console.error('Error en login:', error);
      alert(`Error de autenticación: ${error.message}`);
    }
  }, [login, navigate]);

  useEffect(() => {
    // Cargar el script de Google solo una vez
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

    const scriptCleanup = loadGoogleScript();

    // Configurar el callback global para Google
    window.handleGoogleCredentialResponse = handleGoogleCredentialResponse;

    // Inicializar el cliente de Google Sign-In
    const initializeGoogleSignIn = () => {
      if (window.google?.accounts?.id) {
        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: window.handleGoogleCredentialResponse,
          ux_mode: 'popup',
        });
      }
    };

    // Usar un timeout para asegurar que el script de Google se cargue
    const initTimeout = setTimeout(initializeGoogleSignIn, 50);

    // Limpiar al desmontar
    return () => {
      clearTimeout(initTimeout);
      scriptCleanup();
      delete window.handleGoogleCredentialResponse;
    };
  }, [handleGoogleCredentialResponse]); // Dependencia estable

  const handleGoogleSignIn = () => {
    if (window.google?.accounts?.id) {
      window.google.accounts.id.prompt();
    } else {
      console.error('Google Sign-In script not loaded');
      alert('Error al cargar el inicio de sesión de Google');
    }
  };

  return (
    <div>
      <Button
        variant="outlined"
        fullWidth
        startIcon={<GoogleIcon />}
        onClick={handleGoogleSignIn}
      >
        Continuar con Google
      </Button>
    </div>
  );
};

export default ButtonAuthenticationGmail;