// scr/Login/AutenticacionGmail.jsx
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import "../../styles/login.css";

const AutenticacionGmail  = () => {
  const clientIdGoogle = import.meta.env.VITE_CLIENT_ID;
  const handleGoogleSuccess = async (credentialResponse) => {
    /*console.log('Credencial de Google:', credentialResponse.credential);*/
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
      /*const data = await response.json();
      console.log('Respuesta del backend:', data);*/
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
          className="ustom-google-button"
        />
    </GoogleOAuthProvider>
  );
};

export default AutenticacionGmail;