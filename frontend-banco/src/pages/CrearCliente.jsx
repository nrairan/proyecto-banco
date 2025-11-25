import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api";

export default function CrearCliente() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function registrar(e) {
    e.preventDefault();

    const resp = await fetch(API + "/clientes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, correo, password })
    });

    const data = await resp.json();

    if (resp.ok) {
      setMsg("Cliente creado correctamente.");
      setTimeout(() => navigate("/login"), 1500);
    } else {
      setMsg(data.msg);
    }
  }

  return (
    <div style={{ padding: 30 }}>
      <h2>Crear Cliente</h2>

      <form onSubmit={registrar}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
        /><br /><br />

        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={e => setCorreo(e.target.value)}
        /><br /><br />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
        /><br /><br />

        <button type="submit">Crear Cliente</button>
      </form>

      {msg && <p>{msg}</p>}
    </div>
  );
}
