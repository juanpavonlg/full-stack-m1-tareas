const jwt = require("jsonwebtoken");

exports.authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(403)
      .json({ message: "Acceso denegado, token requerido" });
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token inválido o expirado" });
    }
    req.user = user;
    next();
  });
};
