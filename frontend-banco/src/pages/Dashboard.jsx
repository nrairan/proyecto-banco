import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { API } from "../api";

export default function Dashboard() {
  const [productos, setProductos] = useState([]);
  const id_cliente = Number(localStorage.getItem("id_cliente"));

  useEffect(() => {
    if (!id_cliente) return;

    fetch(API + "/productos")
      .then(r => r.json())
      .then(prod => {
        const lista = prod.filter(p => p.id_cliente === id_cliente);
        setProductos(lista);
      });
  }, [id_cliente]);

  return (
    <div>
      <Navbar />

      <div style={{ padding: 20 }}>
        <h2>Mis productos</h2>

        <Link to="/crear-producto">Crear producto</Link>
        <br /><br />

        {/* 👇 BOTÓN QUE FALTABA */}
        <Link to="/crear-cliente">Crear cliente</Link>
        <br /><br />

        {productos.map(p => (
          <div key={p.id} style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}>
            <strong>{p.nombre}</strong>
            <br />
            <Link to={`/producto/${p.id}`}>Ver / Operaciones</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
