import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <div className="container">
      <h1>
        Bienvenido a la gestión de tareas. Si no está registrado, ha clic en
        'Registrar'
      </h1>
      <div className="form">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
