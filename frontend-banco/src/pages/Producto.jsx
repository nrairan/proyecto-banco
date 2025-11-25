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
    if (!monto || monto <= 0) {
      alert("Ingresa un monto válido.");
      return;
    }

    fetch(`${API}/productos/${id}/consignar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ monto })
    })
      .then(r => r.json())
      .then(res => {
        alert("Consignación exitosa. Nuevo saldo: $" + res.saldo);
        cargar(); // Recargar datos del producto
      });
  }

  function retirar() {
    if (!monto || monto <= 0) {
      alert("Ingresa un monto válido.");
      return;
    }

    fetch(`${API}/productos/${id}/retirar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ monto })
    })
      .then(r => r.json())
      .then(res => {
        if (res.msg) {
          alert(res.msg); // Saldo insuficiente
        } else {
          alert("Retiro exitoso. Nuevo saldo: $" + res.saldo);
        }
        cargar();
      });
  }

  return (
    <div>
      <Navbar />
      <div style={{ padding: 20 }}>
        <h2>{producto.nombre}</h2>
        <p><strong>Saldo: ${producto.saldo}</strong></p>

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
