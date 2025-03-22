const jwt = require("jsonwebtoken");
const { Task } = require("../models");
const { Op } = require("sequelize");

exports.createTask = async (req, res) => {
  const { title, description, status, dueDate } = req.body;
  const task = await Task.findOne({ where: { title } });
  if (task) {
    return res.status(400).json({ message: "La tarea ya existe" });
  }
  const newTask = await Task.create({
    title,
    description,
    status,
    dueDate,
    userId: req.user.id,
  });
  return res
    .status(201)
    .json({ message: "Tarea registrada con éxito", newTask });
};

exports.getTasks = async (req, res) => {
  const userId = req.user.id;
  const status = req.query.status;
  const search = req.query.search;
  const dueDate = req.query.dueDate;
  if (status) {
    const tasks = await Task.findAll({ where: { userId, status } });
    return res.status(200).json(tasks);
  } else if (search) {
    const tasks = await Task.findAll({
      where: {
        userId,
        [Op.or]: [
          {
            title: {
              [Op.iLike]: `%${search}%`,
            },
          },
          {
            description: {
              [Op.iLike]: `%${search}%`,
            },
          },
        ],
      },
    });
    return res.status(200).json(tasks);
  } else if (dueDate) {
    const tasks = await Task.findAll({
      where: { userId, dueDate: { [Op.lte]: `%${dueDate}%` } },
    });
    return res.status(200).json(tasks);
  }
  const tasks = await Task.findAll({ where: { userId } });
  return res.status(200).json(tasks);
};

exports.getTask = async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;
  const task = await Task.findOne({ where: { id, userId } });
  if (!task) {
    return res.status(404).json({ message: "Tarea no encontrada" });
  }
  return res.status(200).json(task);
};

exports.updateTask = async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;
  const task = await Task.findOne({ where: { id, userId } });
  if (!task) {
    return res.status(404).json({ message: "Tarea no encontrada" });
  }
  const statuses = { pendiente: "en progreso", "en progreso": "completada" };
  const status = req.body.status;
  if (task.status === "completada") {
    return res
      .status(400)
      .json({ message: "No se puede modificar una tarea 'completada'" });
  } else if (status !== task.status && status !== statuses[task.status]) {
    if (task.status === "pendiente") {
      return res.status(400).json({
        message: "Una tarea 'pendiente' sólo puede pasar a 'en progreso'",
      });
    } else if (task.status === "en progreso") {
      return res.status(400).json({
        message: "Una tarea 'en progreso' sólo puede pasar a 'completada'",
      });
    }
  }
  await task.update(req.body);
  return res.status(200).json({ message: "Tarea actualizada con éxito", task });
};

exports.deleteTask = async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;
  const task = await Task.findOne({ where: { id, userId } });
  if (!task) {
    return res.status(404).json({ message: "Tarea no encontrada" });
  }
  await task.destroy();
  return res.status(200).json({ message: "Tarea eliminada con éxito", task });
};
