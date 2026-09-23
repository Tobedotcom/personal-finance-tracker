import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";

import "../css/layouts/dashboardLayout.css";

function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;
