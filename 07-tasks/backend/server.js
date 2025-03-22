const express = require("express");
const { Sequelize } = require("sequelize");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dbConfig = require("./config/config.json").development;
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
require("dotenv").config();

const app = express();
const sequelize = new Sequelize(dbConfig);

const PORT = process.env.PORT ?? 3000;
const corsOptions = {
  origin: process.env.FRONTEND_URL ?? "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth/", userRoutes);
app.use("/api/tasks/", taskRoutes);

sequelize
  .authenticate()
  .then("Conectado a PostgreSQL...")
  .catch((err) => console.error("Error al conectar: ", err));

app.get("/", (req, res) => {
  res.status(200).send("Bienvenid@ al servidor...");
});

app.use((req, res) => {
  res.status(404).send("Página no encontrada");
});

app.listen(PORT, () => {
  console.log(`El servidor está corriendo en el puerto ${PORT}...`);
});
