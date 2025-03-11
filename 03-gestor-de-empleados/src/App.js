import React, { Component } from "react"; // Importa React y la clase Component para crear un componente de clase.
import "./estilos/App.css"; // Importa los estilos del proyecto.
import empleadosData from "./datos/empleados.json"; // Importa los datos de empleados desde un archivo JSON.
import CmpEmpleados from "./componentes/CmpEmpleados"; // Importa el componente que mostrará la lista de empleados.

class App extends Component {
  constructor(props) {
    super(props); // Llama al constructor de la clase `Component`.
    this.state = {
      empleados: empleadosData, // Carga la lista de empleados desde el JSON.
      filtro: "todos", // Estado inicial del filtro: muestra todos los empleados.
    };
  }

  // Función para cambiar el estado de un empleado (activo/inactivo)
  cambiarEstadoEmpleado = (id) => {
    // Cambia el estado de un emplado con base a su id
    this.setState((prevState) => ({
      empleados: prevState.empleados.map((empleado) =>
        empleado.id === id
          ? { ...empleado, activo: !empleado.activo }
          : empleado
      ),
    }));
  };

  // Función para actualizar el filtro
  cambiarFiltro = (event) => {
    this.setState({ filtro: event.target.value }); // establece el estado de acuerdo al valor del filtro
  };

  render() {
    // Filtrar empleados según la opción seleccionada
    const empleadosFiltrados = this.state.empleados.filter((empleado) => {
      if (this.state.filtro === "activos") return empleado.activo; // mostrar los empleados activos
      if (this.state.filtro === "inactivos") return !empleado.activo; // mostrar los empleados inactivos
      return true; // "todos" muestra todos
    });

    return (
      <div className="container">
        <h1>Gestor de Empleados</h1>

        {/* Selector para filtrar empleados */}
        <label>Filtrar por estado: </label>
        <select onChange={this.cambiarFiltro} value={this.state.filtro}>
          <option value="todos">Todos</option>
          <option value="activos">Activos</option>
          <option value="inactivos">Inactivos</option>
        </select>

        {/* Renderiza el componente CmpEmpleados con base a los empleados filtrados */}
        <CmpEmpleados
          empleados={empleadosFiltrados}
          cambiarEstado={this.cambiarEstadoEmpleado}
        />
      </div>
    );
  }
}

export default App;
