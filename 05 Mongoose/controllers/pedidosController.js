const Pedido = require("../models/pedido");

// Crear un pedido
exports.crearPedido = async (req, res) => {
  try {
    const nuevoPedido = new Pedido(req.body);
    const pedidoGuardado = await nuevoPedido.save();
    res.status(201).json(pedidoGuardado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todos los pedidos (con información del cliente)
exports.obtenerPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find().populate("clienteId");
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un pedido por id
exports.obtenerPedidoPorId = async (req, res) => {
  try {
    const pedido = await Pedido.findById(req.params.id).populate("clienteId");
    if (!pedido) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }
    res.json(pedido);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un pedido
exports.actualizarPedido = async (req, res) => {
  try {
    const pedidoActualizado = await Pedido.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!pedidoActualizado) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }
    res.json(pedidoActualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un pedido
exports.eliminarPedido = async (req, res) => {
  try {
    const pedidoEliminado = await Pedido.findByIdAndDelete(req.params.id);
    if (!pedidoEliminado) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }
    res.json({ message: "Pedido eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
