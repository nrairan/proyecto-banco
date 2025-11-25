import { useState } from "react";
import { API } from "../api";

export default function Register() {
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    password: "",
    telefono: ""
  });

  const [msg, setMsg] = useState("");

  function handle(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function registrar() {
    setMsg("");

    try {
      const resp = await fetch(API + "/clientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await resp.json();

      if (!resp.ok || data.error) {
        setMsg("❌ Error al registrar: " + (data.error || "Revisa los datos"));
        return;
      }

      setMsg("✅ Cliente registrado correctamente");
    } catch (e) {
      console.error(e);
      setMsg("❌ Error de conexión con el servidor");
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Registrar cliente</h2>

      <input
        name="nombre"
        placeholder="Nombre"
        onChange={handle}
      /><br />

      <input
        name="correo"
        placeholder="Correo"
        onChange={handle}
      /><br />

      <input
        name="password"
        placeholder="Contraseña"
        type="password"
        onChange={handle}
      /><br />

      <input
        name="telefono"
        placeholder="Número telefónico"
        onChange={handle}
      /><br />

      {msg && <p>{msg}</p>}

      <button onClick={registrar}>Registrar</button>
      <a href="/">Iniciar Sesion</a>
    </div>
  );
}
