import { Link } from "react-router-dom";
import SignupForm from "../components/authentication/SignupForm";
import "../css/pages/auth.css";

function Signup() {
  return (
    <div className="auth-page">
      <div className="auth-topbar">
        <div className="auth-brand">Heritage Ledger</div>
        <span className="auth-topbar-hint">
          Already have an account? <Link to="/">Login</Link>
        </span>
      </div>

      <div className="auth-main">
        <SignupForm />
      </div>
    </div>
  );
}

export default Signup;
