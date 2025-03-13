const { Pedido } = require("../models");

// Obtener todos los pedidos
exports.obtenerPedidos = async (req, res) => {
  const pedidos = await Pedido.findAll(); // Busca todos los pedidos en la BD
  res.json(pedidos); // Devuelve la lista de pedidos en formato JSON
};

// Obtener un pedido por ID
exports.obtenerPedido = async (req, res) => {
  const pedido = await Pedido.findByPk(req.params.id); // Busca un pedido por su ID
  pedido
    ? res.json(pedido)
    : res.status(404).json({ error: "Pedido no encontrado" }); // Devuelve error si no existe
};

// Crear un nuevo pedido
exports.crearPedido = async (req, res) => {
  try {
    const pedido = await Pedido.create(req.body); // Crea un pedido con los datos enviados en la petición
    res.status(201).json(pedido); // Devuelve el pedido creado con código 201 (Created)
  } catch (error) {
    res.status(400).json({ error: error.message }); // Manejo de errores en caso de datos incorrectos
  }
};

// Actualizar un pedido
exports.actualizarPedido = async (req, res) => {
  let pedido = await Pedido.findByPk(req.params.id); // Busca el pedido por ID
  if (!pedido) return res.status(404).json({ error: "Pedido no encontrado" }); // Si no existe, envía error
  await pedido.update(req.body); // Actualiza el pedido con los nuevos datos
  res.json(pedido); // Devuelve el pedido actualizado
};

// Eliminar un pedido
exports.eliminarPedido = async (req, res) => {
  const pedido = await Pedido.findByPk(req.params.id); // Busca el pedido por ID
  if (!pedido) return res.status(404).json({ error: "Pedido no encontrado" }); // Si no existe, envía error
  await pedido.destroy(); // Elimina el pedido de la base de datos
  res.json({ mensaje: "Pedido eliminado" }); // Devuelve mensaje de éxito
};
