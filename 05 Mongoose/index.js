const express = require("express");
const app = express();
const connectDB = require("./config/db");

// Conectar a la base de datos ejemplo2
connectDB();

// Middleware para parsear JSON
app.use(express.json());

// Definir las rutas
app.use("/api/clientes", require("./routes/clientes"));
app.use("/api/pedidos", require("./routes/pedidos"));

app.get("/", (req, res) => {
  res.send(" ¡Bienvenido a la API! Usa /clientes o /pedidos para interactuar.");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
