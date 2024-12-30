import React, { useState } from "react";
import { Link } from "react-router-dom";
import AutenticacionGmail from "./AutenticacionGmail";

const Login = ({ onLoginSuccess }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLoginSuccess();
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <section>
        <Link to="/register">Registrar</Link>
        <Link to="/forgot-password">Olvide mi contraseña</Link>
      </section>
      <AutenticacionGmail></AutenticacionGmail>
    </div>
  );
};

export default Login;