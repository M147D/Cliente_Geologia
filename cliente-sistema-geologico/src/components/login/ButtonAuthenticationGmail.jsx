// scr/components/login/ButtonAuthenticationGmail.jsx
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import api from "../../hooks/axiosConfig.js";

const ButtonAuthenticationGmail = () => {
  const clientIdGoogle = import.meta.env.VITE_CLIENT_ID;

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await api.post("/auth/login", {
        credential: credentialResponse.credential,
      });

      console.log("Token recibido:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error al autenticar:", error.response?.data?.message || error.message);
    }
  };

  const handleGoogleError = () => {
    console.log("Error al iniciar sesión");
  };

  return (
    <GoogleOAuthProvider clientId={clientIdGoogle}>
      <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} />
    </GoogleOAuthProvider>
  );
};

export default ButtonAuthenticationGmail;