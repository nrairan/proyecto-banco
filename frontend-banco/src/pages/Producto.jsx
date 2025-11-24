import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { API } from "../api";

export default function Producto() {
  const { id } = useParams();
  const [producto, setProducto] = useState({});
  const [monto, setMonto] = useState("");

  function cargar() {
    fetch(API + "/productos/" + id)
      .then(r => r.json())
      .then(setProducto);
  }

  useEffect(() => {
    cargar();
  }, []);

  function consignar() {
    fetch(`${API}/productos/${id}/consignar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ monto })
    }).then(cargar);
  }

  function retirar() {
    fetch(`${API}/productos/${id}/retirar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ monto })
    }).then(cargar);
  }

  return (
    <div>
      <Navbar />
      <div style={{ padding: 20 }}>
        <h2>{producto.nombre}</h2>
        <p>Saldo: ${producto.saldo}</p>

        <input
          placeholder="Monto"
          type="number"
          onChange={e => setMonto(e.target.value)}
        />
        <br /><br />

        <button onClick={consignar}>Consignar</button>
        <button onClick={retirar} style={{ marginLeft: 10 }}>
          Retirar
        </button>
      </div>
    </div>
  );
}
