import express from "express";
import cors from "cors";
import fs from "fs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// ==================================
//  BD utilidades
// ==================================
function leerDB() {
  return JSON.parse(fs.readFileSync("db.json", "utf8"));
}

function guardarDB(data) {
  fs.writeFileSync("db.json", JSON.stringify(data, null, 2));
}

// ==================================
//  Servidor
// ==================================
const app = express();
app.use(cors());
app.use(express.json());

const SECRET = "secreto123"; // JWT simple para este proyecto

// ==================================
//  SIMULADOR DE ENVÍO DE CORREO
// ==================================
function enviarCodigoSimulado(correo, codigo) {
  console.log("=======================================");
  console.log(" SIMULANDO ENVÍO DE CORREO 2FA ");
  console.log(" Para:", correo);
  console.log(" Código generado:", codigo);
  console.log("=======================================");
}

// ==================================
//  ENDPOINTS
// ==================================

// Crear cliente
app.post("/clientes", async (req, res) => {
  const db = leerDB();
  const { nombre, correo, password } = req.body;

  if (db.clientes.find(c => c.correo === correo))
    return res.status(400).json({ msg: "Este correo ya está registrado" });

  const hash = await bcrypt.hash(password, 10);

  const nuevo = {
    id: Date.now(),
    nombre,
    correo,
    password: hash
  };

  db.clientes.push(nuevo);
  guardarDB(db);

  res.json({ msg: "Cliente creado", cliente: nuevo });
});

// Login (genera código 2FA)
app.post("/login", async (req, res) => {
  const db = leerDB();
  const { correo, password } = req.body;

  const cliente = db.clientes.find(c => c.correo === correo);
  if (!cliente) return res.status(400).json({ msg: "Cliente no existe" });

  const ok = await bcrypt.compare(password, cliente.password);
  if (!ok) return res.status(400).json({ msg: "Contraseña incorrecta" });

  // Generar código 2FA
  const codigo = Math.floor(100000 + Math.random() * 900000);

  // Registrar código en DB
  db.codigos2FA = db.codigos2FA.filter(c => c.id_cliente !== cliente.id);
  db.codigos2FA.push({
    id_cliente: cliente.id,
    codigo,
    expira: Date.now() + 5 * 60 * 1000
  });
  guardarDB(db);

  // Simular correo
  enviarCodigoSimulado(cliente.correo, codigo);

  res.json({ msg: "Código generado" });
});

// Validar 2FA
app.post("/login/2fa", (req, res) => {
  const db = leerDB();
  const { correo, codigo } = req.body;

  const cliente = db.clientes.find(c => c.correo === correo);
  if (!cliente) return res.status(400).json({ msg: "Cliente no existe" });

  const registro = db.codigos2FA.find(
    r => r.id_cliente === cliente.id && r.codigo == codigo
  );

  if (!registro) return res.status(400).json({ msg: "Código incorrecto" });

  if (Date.now() > registro.expira)
    return res.status(400).json({ msg: "Código expirado" });

  const token = jwt.sign({ id: cliente.id }, SECRET);

  res.json({ msg: "Login exitoso", token });
});

// Crear producto
app.post("/productos", (req, res) => {
  const db = leerDB();
  const { id_cliente, nombre } = req.body;

  const producto = {
    id: Date.now(),
    id_cliente,
    nombre,
    saldo: 0
  };

  db.productos.push(producto);
  guardarDB(db);

  res.json({ msg: "Producto creado", producto });
});

// Consignar
app.post("/productos/:id/consignar", (req, res) => {
  const db = leerDB();
  const { monto } = req.body;
  const producto = db.productos.find(p => p.id == req.params.id);

  producto.saldo += Number(monto);
  guardarDB(db);

  res.json({ msg: "Consignación realizada", saldo: producto.saldo });
});

// Retirar
app.post("/productos/:id/retirar", (req, res) => {
  const db = leerDB();
  const { monto } = req.body;
  const producto = db.productos.find(p => p.id == req.params.id);

  if (producto.saldo < monto)
    return res.status(400).json({ msg: "Saldo insuficiente" });

  producto.saldo -= Number(monto);
  guardarDB(db);

  res.json({ msg: "Retiro realizado", saldo: producto.saldo });
});

// Consultar saldo
app.get("/productos/:id", (req, res) => {
  const db = leerDB();
  const producto = db.productos.find(p => p.id == req.params.id);
  res.json(producto);
});

// ==================================
app.listen(3000, () => console.log("API Banco JSON lista en puerto 3000"));
