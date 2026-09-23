import { useNavigate } from "react-router-dom";
import { logout } from "../../utils/auth";
import Button from "../ui/Button";

function LogoutButton() {
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/", { replace: true });
  }

  return (
    <Button
      type="button"
      className="logout-button"
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
}

export default LogoutButton;