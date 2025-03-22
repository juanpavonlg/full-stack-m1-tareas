import { useEffect, useState } from "react";
import axios from "axios";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get("https://tasks-smil.onrender.com/api/tasks", {
        withCredentials: true,
      })
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Error al obtener clientes", error));
  }, []);

  return (
    <div className="table-container">
      <h2>Lista de tareas</h2>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Título</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Fecha de vencimiento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.status}</td>
              <td>{task.dueDate}</td>
              <td>
                <button>Actualizar</button>
                <button>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
