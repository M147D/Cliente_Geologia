// scr/Login/AutenticacionGmail.jsx
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const handleGoogleSuccess = async (credentialResponse) => {
    console.log('Credencial de Google:', credentialResponse.credential);
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

      const data = await response.json();
      console.log('Respuesta del backend:', data);
      alert(`Bienvenido, ${data.email}`);
    } catch (error) {
      console.error('Error al autenticar:', error);
    }
  };
  const handleGoogleError = () => {
    console.log('Error al iniciar sesión');
  };

  return (
    <GoogleOAuthProvider clientId="506361061694-g0boebgf42pv12sbj8bmgbnq2lobvpqg.apps.googleusercontent.com">
      <div>
        <h1>Iniciar sesión con Google</h1>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}          
          onError={handleGoogleError}
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;