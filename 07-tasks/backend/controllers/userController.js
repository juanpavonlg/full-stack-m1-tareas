const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (user) {
    return res.status(400).json({ message: "El ususario ya está registrado" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ name, email, password: hashedPassword });
  return res.status(201).json({ message: "Usuario registrado con éxito" });
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(400).json({ message: "Usuario no encontrado" });
  }
  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: "Contraseña incorrecta" });
  }
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.SECRET_KEY,
    { expiresIn: process.env.TOKEN_EXPIRATION ?? "1h" }
  );
  return res.status(200).json({ token: token });
};

exports.meUser = async (req, res) => {
  const user = await User.findByPk(req.user.id);
  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }
  return res
    .status(200)
    .json({ user: { id: user.id, name: user.name, email: user.email } });
};
