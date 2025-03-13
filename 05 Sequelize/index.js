const express = require("express");
const { Sequelize } = require("sequelize");
const dbConfig = require("./config/config.json").development;
const clienteRoutes = require("./routes/cliente.routes");
const pedidoRoutes = require("./routes/pedido.routes");

const app = express();
const sequelize = new Sequelize(dbConfig);
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use("/", clienteRoutes);
app.use("/", pedidoRoutes);

// Conectar a la base de datos
sequelize
  .authenticate()
  .then(() => console.log(" Conectado a PostgreSQL"))
  .catch((err) => console.error(" Error al conectar:", err));

app.get("/", (req, res) => {
  res.send(" ¡Bienvenido a la API! Usa /clientes o /pedidos para interactuar.");
});

app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
