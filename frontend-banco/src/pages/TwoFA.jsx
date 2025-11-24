import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TwoFA() {
  const navigate = useNavigate();
  const [codigo, setCodigo] = useState("");
  const [error, setError] = useState("");

  // Usuario que está intentando iniciar sesión
  const usuario = localStorage.getItem("usuario-login");

  const enviarCodigo = async (e) => {
    e.preventDefault();

    try {
      const resp = await fetch("http://localhost:3000/api/login/2fa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario: usuario,
          codigo: codigo,
        }),
      });

      const data = await resp.json();

      if (!data.ok) {
        setError("Código incorrecto o expirado.");
        return;
      }

      // Guardar token
      localStorage.setItem("token", data.token);

      // Redirigir al dashboard
      navigate("/dashboard");

    } catch (err) {
      console.error(err);
      setError("Error de conexión con el servidor.");
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
        <p>Ingresa el código enviado a tu Telegram</p>

        <form onSubmit={enviarCodigo}>
          <input 
            type="text"
            placeholder="Código de 6 dígitos"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
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
            Verificar
          </button>
        </form>

      </div>
    </div>
  );
}
