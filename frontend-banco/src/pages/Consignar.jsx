import { useState, useEffect } from "react";
import { API } from "../api";
import { useNavigate, useParams } from "react-router-dom";

export default function Consignar() {
  const { id_producto } = useParams();
  const navigate = useNavigate();
  const [valor, setValor] = useState("");
  const [mensaje, setMensaje] = useState("");

  async function consignar(e) {
    e.preventDefault();

    const resp = await fetch(API + "/transacciones/consignar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_producto: Number(id_producto), valor: Number(valor) })
    });

    const data = await resp.json();

    if (resp.ok) {
      setMensaje("Consignación exitosa");
      setTimeout(() => navigate("/dashboard"), 1200);
    } else {
      setMensaje(data.msg);
    }
  }

  return (
    <div style={{ padding: 30 }}>
      <h2>Consignar a producto #{id_producto}</h2>

      <form onSubmit={consignar}>
        <input
          type="number"
          placeholder="Valor a consignar"
          value={valor}
          onChange={e => setValor(e.target.value)}
        /><br /><br />

        <button type="submit">Consignar</button>
      </form>

      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}
