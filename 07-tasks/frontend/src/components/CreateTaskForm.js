import { useState } from "react";
import axios from "axios";

const CreateTaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState();
  const [error, setError] = useState(null);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await axios.post(
        "https://tasks-smil.onrender.com/api/tasks",
        { title, description, status: "pendiente", dueDate },
        { withCredentials: true }
      );
      alert("Tarea creada con éxito");
    } catch (err) {
      setError(err.response?.data?.message ?? "Error al crear la tarea");
    }
  };

  return (
    <div>
      <h2>Crear tarea</h2>
      <form onSubmit={handleCreateTask}>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Descripción de la tarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button type="submit">Crear tarea</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default CreateTaskForm;
