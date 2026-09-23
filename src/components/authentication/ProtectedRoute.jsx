import { Navigate, Outlet } from "react-router-dom";
import { getLoggedInUser, DEV_BYPASS_AUTH } from "../../utils/auth";

function ProtectedRoute() {
  const user = getLoggedInUser();

  if (!DEV_BYPASS_AUTH && !user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
