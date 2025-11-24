import { useState } from "react";
import { API } from "../api";

export default function Register() {
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    password: ""
  });

  function handle(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function registrar() {
    fetch(API + "/clientes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })
      .then(r => r.json())
      .then(() => alert("Cliente registrado"));
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Registrar cliente</h2>
      <input name="nombre" placeholder="Nombre" onChange={handle} /><br/>
      <input name="correo" placeholder="Correo" onChange={handle} /><br/>
      <input name="password" placeholder="Contraseña" type="password" onChange={handle} /><br/>
      <input type="text" placeholder="Número telefónico" name="telefono" required />
      <button onClick={registrar}>Registrar</button>
    </div>
  );
}
