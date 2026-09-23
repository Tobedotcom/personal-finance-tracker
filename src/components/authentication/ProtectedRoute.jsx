import { Navigate, Outlet } from "react-router-dom";
import { getLoggedInUser } from "../../utils/auth";

function ProtectedRoute() {
  const user = getLoggedInUser();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
