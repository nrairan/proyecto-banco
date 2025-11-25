import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api";

export default function CrearProducto() {
  const [nombre, setNombre] = useState("");
  const navigate = useNavigate();

  const id_cliente = Number(localStorage.getItem("id_cliente"));

  async function crear(e) {
    e.preventDefault();

    const resp = await fetch(API + "/productos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_cliente, nombre })
    });

    const data = await resp.json();
    if (resp.ok) {
      navigate("/dashboard");
    }
  }

  return (
    <div style={{ padding: 30 }}>
      <h2>Crear Producto</h2>
      
      <form onSubmit={crear}>
        <input
          type="text"
          placeholder="Nombre del producto"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
        /><br /><br />

        <button type="submit">Crear</button>
      </form>
    </div>
  );
}
