const mongoose = require("mongoose");

const PedidoSchema = new mongoose.Schema({
  clienteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cliente",
    required: true,
  },
  fecha_pedido: {
    type: Date,
    required: true,
    default: Date.now,
  },
  productos: [
    {
      producto_id: {
        type: String,
        required: true,
      },
      cantidad: {
        type: Number,
        required: true,
      },
      precio_unitario: {
        type: Number,
        required: true,
      },
    },
  ],
  total: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Pedido", PedidoSchema);
