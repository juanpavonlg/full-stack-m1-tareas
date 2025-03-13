const { Cliente } = require("../models");

// Obtener todos los clientes
exports.obtenerClientes = async (req, res) => {
  const clientes = await Cliente.findAll(); // Busca todos los clientes en la BD
  res.json(clientes); // Devuelve la lista de clientes en formato JSON
};

// Obtener un cliente por ID
exports.obtenerCliente = async (req, res) => {
  const cliente = await Cliente.findByPk(req.params.id); // Busca un cliente por su ID
  cliente
    ? res.json(cliente)
    : res.status(404).json({ error: "Cliente no encontrado" }); // Devuelve error si no existe
};

// Crear un nuevo cliente
exports.crearCliente = async (req, res) => {
  try {
    const cliente = await Cliente.create(req.body); // Crea un cliente con los datos enviados en la petición
    res.status(201).json(cliente); // Devuelve el cliente creado con código 201 (Created)
  } catch (error) {
    res.status(400).json({ error: error.message }); // Manejo de errores en caso de datos incorrectos
  }
};

// Actualizar un cliente
exports.actualizarCliente = async (req, res) => {
  let cliente = await Cliente.findByPk(req.params.id); // Busca el cliente por ID
  if (!cliente) return res.status(404).json({ error: "Cliente no encontrado" }); // Si no existe, envía error
  await cliente.update(req.body); // Actualiza el cliente con los nuevos datos
  res.json(cliente); // Devuelve el cliente actualizado
};

// Eliminar un cliente
exports.eliminarCliente = async (req, res) => {
  const cliente = await Cliente.findByPk(req.params.id); // Busca el cliente por ID
  if (!cliente) return res.status(404).json({ error: "Cliente no encontrado" }); // Si no existe, envía error
  await cliente.destroy(); // Elimina el cliente de la base de datos
  res.json({ mensaje: "Cliente eliminado" }); // Devuelve mensaje de éxito
};
