import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { API } from "../api";

export default function Dashboard() {
  const [productos, setProductos] = useState([]);
  const correo = localStorage.getItem("correo");

  useEffect(() => {
    fetch(API + "/clientes")
      .then(r => r.json())
      .then(db => {
        const cliente = db.clientes.find(c => c.correo === correo);
        if (cliente) {
          fetch(API + "/productos")
            .then(r => r.json())
            .then(() => setProductos(db.productos.filter(p => p.id_cliente === cliente.id)));
        }
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div style={{ padding: 20 }}>
        <h2>Mis productos</h2>

        <Link to="/crear-producto">Crear producto</Link><br/><br/>

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
