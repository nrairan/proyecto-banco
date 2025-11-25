import { Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import TwoFA from "./pages/TwoFA";
import Dashboard from "./pages/Dashboard";
import Producto from "./pages/Producto";
import CrearProducto from "./pages/CrearProducto";
import CrearCliente from "./pages/CrearCliente";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/TwoFA" element={<TwoFA />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/producto/:id" element={<Producto />} />
      <Route path="/crear-producto" element={<CrearProducto />} />
      <Route path="/crear-cliente" element={<CrearCliente />} />
      <Route path="/login" element={<Login />} />
      
      {/* fallback para rutas inexistentes */}
      <Route path="*" element={<h1>Página no encontrada</h1>} />
    </Routes>
  );
}

export default App;
