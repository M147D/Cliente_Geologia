// scr/Login/AutenticacionGmail.jsx
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';


const AutenticacionGmail  = () => {
  const clientIdGoogle = import.meta.env.VITE_CLIENT_ID;
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      // Enviar el token de Google al backend
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          credential: credentialResponse.credential,
        }),
      });

      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }
    } catch (error) {
      console.error('Error al autenticar:', error);
    }
  };
  const handleGoogleError = () => {
    console.log('Error al iniciar sesión');
  };

  return (
    <GoogleOAuthProvider clientId={clientIdGoogle}>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}          
          onError={handleGoogleError}
        />
    </GoogleOAuthProvider>
  );
};

export default AutenticacionGmail;