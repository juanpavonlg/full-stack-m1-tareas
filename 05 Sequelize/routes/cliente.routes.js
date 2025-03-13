const express = require("express");
const {
  obtenerClientes,
  obtenerCliente,
  crearCliente,
  actualizarCliente,
  eliminarCliente
} = require("../controllers/cliente.controller");

const router = express.Router();

router.get("/clientes", obtenerClientes);
router.get("/clientes/:id", obtenerCliente);
router.post("/clientes", crearCliente);
router.put("/clientes/:id", actualizarCliente);
router.delete("/clientes/:id", eliminarCliente);

module.exports = router;
