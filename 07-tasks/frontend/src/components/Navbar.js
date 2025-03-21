import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Iniciar sesión</Link></li>
        <li><Link to="/register">Registrar</Link></li>
        <li><Link to="/tasks">Tareas</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
