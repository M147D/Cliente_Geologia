import React, { useState } from "react";
import { Link } from "react-router-dom";
import AutenticacionGmail from "./AutenticacionGmail";
import "../../styles/login.css";

const Login = ({ onLoginSuccess }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLoginSuccess();
  };

  return (
    <div className="card-login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <span>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </span>
        <span>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </span>
        <button type="submit">Login</button>
      </form>
      <Link to="/register">Registrar</Link>
      <Link to="/forgot-password">Olvide mi contraseña</Link>
      <span>      
        <AutenticacionGmail />      
      </span>
    </div>
  );
};

export default Login;