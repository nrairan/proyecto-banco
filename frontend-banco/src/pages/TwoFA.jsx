import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TwoFA() {
  const navigate = useNavigate();

  const [codigo, setCodigo] = useState("");
  const [codigoIngresado, setCodigoIngresado] = useState("");
  const [error, setError] = useState("");

  const TELEGRAM_TOKEN = "8334850094:AAEXJj9pXkSY6GkkwbWB9t4y88E0cBDqL38";
  const CHAT_ID = "8038075060";

  function generarCodigo() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  const enviarCodigoTelegram = async () => {
    const nuevoCodigo = generarCodigo();
    setCodigo(nuevoCodigo);

    const mensaje = `Tu código de verificación es: ${nuevoCodigo}`;

    await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text: mensaje })
    });

    alert("Código enviado a tu Telegram");
  };

  const verificarCodigo = (e) => {
    e.preventDefault();

    if (codigo === codigoIngresado) {
      localStorage.setItem("token", "ok"); // mínimo para permitir el dashboard

      navigate("/dashboard");
    } else {
      setError("Código incorrecto");
    }
  };

  return (
    <div style={{ 
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f2f2f2"
    }}>
      <div style={{
        background: "white",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        width: "350px",
        textAlign: "center"
      }}>

        <h2>Verificación 2FA</h2>
        <p>Clic para recibir un código por Telegram</p>

        <button
          onClick={enviarCodigoTelegram}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Enviar código a Telegram
        </button>

        <form onSubmit={verificarCodigo}>
          <input 
            type="text"
            placeholder="Código recibido"
            value={codigoIngresado}
            onChange={(e) => setCodigoIngresado(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              borderRadius: "5px",
              border: "1px solid #ddd"
            }}
          />

          {error && (
            <div style={{ color: "red", marginBottom: "10px" }}>
              {error}
            </div>
          )}

          <button 
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Verificar código
          </button>
        </form>

      </div>
    </div>
  );
}
