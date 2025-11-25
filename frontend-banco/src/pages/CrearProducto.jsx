import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api";

export default function CrearProducto() {
  const [nombre, setNombre] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();
  const id_cliente = Number(localStorage.getItem("id_cliente"));

  // Verificar login
  useEffect(() => {
    if (!id_cliente) {
      navigate("/login");
    }
  }, [id_cliente, navigate]);

  async function crear(e) {
    e.preventDefault();

    const resp = await fetch(API + "/productos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_cliente, nombre })
    });

    const data = await resp.json();

    if (resp.ok) {
      setMsg("Producto creado correctamente.");
      setTimeout(() => navigate("/dashboard"), 1000);
    } else {
      setMsg(data.msg || "Error al crear el producto.");
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

      {msg && <p>{msg}</p>}
    </div>
  );
}
