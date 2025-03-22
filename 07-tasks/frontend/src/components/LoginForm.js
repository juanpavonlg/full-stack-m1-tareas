import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await axios.post(
        "https://tasks-smil.onrender.com/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      navigate("/tasks");
    } catch (err) {
      setError(err.response?.data?.message ?? "Error al iniciar sesión");
    }
  };

  return (
    <div className="container">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="usuario@ejemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Iniciar sesión</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
