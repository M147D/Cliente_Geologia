import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const App = () => {
  return (
    <GoogleOAuthProvider clientId="506361061694-g0boebgf42pv12sbj8bmgbnq2lobvpqg.apps.googleusercontent.com">
      <div>
        <h1>Inicio de sesión con Google</h1>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log('Credenciales:', credentialResponse);
            // Aquí puedes enviar el token al backend para verificarlo.
          }}
          onError={() => {
            console.error("Error al iniciar sesión con Google");
          }}
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default App;