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
      .then(async r => {
        const res = await r.json();

        if (!r.ok) {
          setError(res.msg);
          return;
        }

        // GUARDAR correo para validar 2FA
        localStorage.setItem("correo_temp", correo);

        // IR a TwoFA
        nav("/TwoFA");
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
