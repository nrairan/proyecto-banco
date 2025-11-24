import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api";

export default function Login() {
  const nav = useNavigate();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function login() {
    if (!correo || !password) {
      setError("Por favor llena todos los campos");
      return;
    }

    fetch(API + "/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correo, password })
    })
      .then(r => r.json())
      .then(res => {
        if (res.msg === "Código enviado al Telegram" || 
            res.msg === "Código enviado al correo" || 
            res.ok === true) {

          // Guardar correo temporal para validación 2FA
          localStorage.setItem("correo_temp", correo);

          // Ir a pantalla de código
          nav("/2fa");
        } else {
          setError(res.msg || "Error al iniciar sesión");
        }
      })
      .catch(() => setError("Error de conexión con el servidor"));
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Ingresar</h2>

      <input
        placeholder="Correo"
        onChange={e => setCorreo(e.target.value)}
      /><br />

      <input
        placeholder="Contraseña"
        type="password"
        onChange={e => setPassword(e.target.value)}
      /><br />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={login}>Siguiente</button><br /><br />

      <a href="/register">Crear cuenta</a>
    </div>
  );
}
