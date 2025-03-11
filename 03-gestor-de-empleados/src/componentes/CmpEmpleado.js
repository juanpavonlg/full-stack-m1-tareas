import React from "react"; // importar React
import "../estilos/App.css"; // importar los estilos

function CmpEmpleado({ empleado, cambiarEstado }) { // se extrae el empleado y su función para cambiar de estado
  return (
    <div className={`empleado-card ${empleado.activo ? "activo" : "inactivo"}`}>
      {/* Muestra los datos del empleado y si está activo o inactivo */}
      <p>
        <strong>
          {empleado.apellido} {empleado.nombre}
        </strong>
      </p>
      <p>Cargo: {empleado.cargo}</p>
      <p>
        Estado:{" "}
        <span className={empleado.activo ? "estado-activo" : "estado-inactivo"}>
          {empleado.activo ? "Activo 👍" : "Inactivo 🙈"}
        </span>
      </p>
      
      {/* Botón para cambiar el estado del empleado */}
      <button
        className="cambiar-estado-btn"
        onClick={() => cambiarEstado(empleado.id)}
      >
        Cambiar Estado
      </button>
    </div>
  );
}

export default CmpEmpleado;
