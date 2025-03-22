import CreateTaskForm from "../components/CreateTaskForm";
import TasksList from "../components/TasksList";

const Tasks = () => {
  return (
    <div className="container">
      <h1>Tareas</h1>
      <div className="form">
        <CreateTaskForm />
      </div>
      <div className="tasks-list">
        <TasksList />
      </div>
    </div>
  );
};

export default Tasks;
