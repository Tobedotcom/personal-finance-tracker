import { Link } from "react-router-dom";
import LoginForm from "../components/authentication/LoginForm";
import "../css/pages/auth.css";

function Login() {
  return (

   
    <div className="auth-page">
        
      <div className="auth-topbar">
        <div className="auth-brand">Paper Obs</div>
      </div>

      <div className="auth-main">
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;