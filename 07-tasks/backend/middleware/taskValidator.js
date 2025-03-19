const { body, validationResult } = require("express-validator");

exports.taskCreateValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("El título es obligatorio")
    .bail(),
  body("status")
    .trim()
    .notEmpty()
    .withMessage("El estado es obligatorio")
    .bail()
    .equals("pendiente")
    .withMessage("Una tarea nueva debe empezar como 'pendiente'")
    .bail(),
  body("dueDate")
    .optional()
    .isDate()
    .withMessage("Debe ser una fecha válida")
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];

exports.taskUpdateValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("El título es obligatorio")
    .bail(),
  body("status")
    .trim()
    .notEmpty()
    .withMessage("El estado es obligatorio")
    .bail()
    .isIn(["pendiente", "en progreso", "completada"])
    .withMessage("Una tarea sólo puede estar 'pendiente', 'en progreso' o 'completada'")
    .bail(),
  body("dueDate")
    .optional()
    .isDate()
    .withMessage("Debe ser una fecha válida")
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];
