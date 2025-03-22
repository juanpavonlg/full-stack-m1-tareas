import RegisterForm from "../components/RegisterForm";
import "../styles/App.css";

const Register = () => {
  return (
    <div className="container">
      <h1>Registrar</h1>
      <div className="form">
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
